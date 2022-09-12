/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios, { AxiosRequestConfig, ResponseType, AxiosResponse, AxiosError, Method, AxiosRequestHeaders } from "axios";
import { ContextData } from "../models/context.model.js";

export class HttpClient {
  /**
   * set maxRetryCount to retry HttpClient to defined number of times
   * HttpClient retry request in case of internet not available or api will respond 5xx status
   */
  public static maxRetryCount = 3;
  /**
   * HttpClient uses isAuthDefault to set default value for {@link HttpClientOptions.isAuth}
   */
  public static isAuthDefault = false;
  public static internetNotAvialiableMsg = "Please check your network connection. Internet not available";
  /**
   * Implement this function to return sucess and error message from api resonse
   * HttpClient will call this function after getting response from api
   * to create ApiResponse object
 */
  public static processMessage?: (response: AxiosResponse<any> | AxiosError<any>) => string[];
  /**
   * Implement this function to return data from api resonse
   * HttpClient will call this function after getting response from api
   * to create ApiResponse object
   */
  public static processData?: (response: AxiosResponse<any> | AxiosError<any>) => any;
  /**
   * implement this function to retiurn code from api response
   * HttpClient will call this function after getting response from api
   * to create ApiResponse object
   */
  public static getErrorCode?: (response: AxiosResponse<any> | AxiosError<any>) => number;
  /**
   * implement this function to retiurn status code from api response
   * HttpClient will call this function after getting response from api
   * to create ApiResponse object
   */
  public static getStatusCode?: (response: AxiosResponse<any> | AxiosError<any>) => number;
  /**
   * HttpClient will call this function just before return ApiResponse
   */
  public static onResponse?: (apiResponse: ApiResponse<any>, options: HttpClientOptions) => void;
  /**
   * HttpClient calls this function to get Auth token
   * return empty string in case token not available
   * in case of empty string HttpClient will send ApiResponse with 401 status
   */
  public static getAuthToken?: (options: HttpClientOptions) => string;
  /**
   * HttpClient calls this function when {@link HttpClientOptions.isAuth} sets to true
   * this function must return authentication header
   */
  public static getAuthHeader?: (token: string) => AxiosRequestHeaders;
  /**
   * HttpClient calls this function when api server respond with 401 status code
   * HttpClient calls this function to regenerate token
   * If this function will return succcess then HttpClient will call api again with new token
   */
  public static handleRefreshTokenFlow?: (options: HttpClientOptions) => Promise<ApiResponse<unknown>>;

  private static loaderCount = 0;

  public static toggleLoader(status: boolean) {
    if (typeof window !== "undefined") {
      if (status) {
        this.loaderCount += 1;
      } else {
        this.loaderCount -= 1;
      }
      if (!status) {
        if (this.loaderCount === 0) {
          window.dispatchEvent(LoaderEvent(false));
        }
        return;
      }
      window.dispatchEvent(LoaderEvent(status));
    }
  }

  public static get<T>(url: string, options?: HttpClientOptions) {
    return this.sendRequest<T>(url, "GET", options);
  }

  public static post<T>(url: string, body: any, options?: HttpClientOptions) {
    if (!options) {
      options = {};
    }
    return this.sendRequest<T>(url, "POST", { data: body, ...options });
  }

  public static put<T>(url: string, body: any, options?: HttpClientOptions) {
    if (!options) {
      options = {};
    }
    return this.sendRequest<T>(url, "PUT", { data: body, ...options });
  }

  public static delete<T>(url: string, options?: HttpClientOptions) {
    return this.sendRequest<T>(url, "DELETE", options);
  }

  private static getUrl(url: string) {
    return `${process.env.IS_SERVER ? process.env.API_BASE_URL : ""}${url}`;
  }

  private static setDefaultHttpClientOptions<T>(options?: HttpClientOptions) {
    if (!options) {
      options = {};
    }
    if (!options.headers) {
      options.headers = {};
    }
    if (options.isAuth === undefined) {
      // change based on requirement
      options.isAuth = this.isAuthDefault;
    }
    if (!options.responseType) {
      options.responseType = "json";
    }

    if (options.showLoader === undefined) {
      options.showLoader = false;
    }
    if (!process.env.IS_SERVER && options.extra) {
      options.headers["extra"] = options.extra;
    }

    if (options.doCache === undefined) {
      options.doCache = false;
    }
    if (options.doCache) {
      options.headers["doCache"] = true;
    } else {
      options.headers["doCache"] = false;
    }
    if (options.isAuth) {
      if (!this.getAuthToken) {
        throw new Error("Please set HttpClient.getAuthToken in your application");
      }
      const token = this.getAuthToken({ ...options });
      if (token) {
        if (!this.getAuthHeader) {
          throw new Error("Please set HttpClient.getAuthHeader in your application");
        }
        options.headers = {
          ...options.headers,
          ...this.getAuthHeader(token),
        };
      } else {
        const apiResponse = getDefaultApiResponseObj<T>();
        apiResponse.status = 401;
        return Promise.resolve(apiResponse);
      }
    }
    return options;
  }

  public static sendRequest<T>(
    url: string,
    method: Method | string,
    options: HttpClientOptions = {},
  ): Promise<ApiResponse<T | null>> {
    const newoptions = this.setDefaultHttpClientOptions<T>(options);
    if (newoptions instanceof Promise) {
      return newoptions;
    } else {
      options = newoptions;
    }

    if (options.showLoader) {
      this.toggleLoader(true);
    }
    options.url = this.getUrl(url);
    options.method = method;
    const maxRetryCount = options.maxRetryCount || this.maxRetryCount;
    const requestConfig: AxiosRequestConfig = options;
    return (
      retryPromise(isOnline, 1000, maxRetryCount)
        .then(() => {
          return (
            axios(requestConfig)
              .then((response) => {
                return this.handleResponse<T>(response, options);
              })
              // this catch will execute When error in original request
              // if 401 status will come then handleErrorResponse will try to
              // regenerate token from refresh token
              .catch((err: AxiosError<T>) => {
                return this.handleErrorResponse<T>(err, options);
              })
              // this catch will catch any unknown error
              .catch((error: Error) => {
                console.error("Unknown Error!!", error);
                // [TODO] this error should log in database to get client side errors
                const response = getDefaultApiResponseObj<null>();
                response.status = 600;
                return response;
              })
              // this will execute after request process and we have response from server
              .then((response) => {
                // only checking for 5xx because retry should happen only in case of server error
                // not in the case of 4xx which is client error or 2xx success case
                if (response.status.toString().startsWith("5") || response.status === 0) {
                  // throw Error as strigify response because we will need response
                  // to return to component
                  // throwing error because retry will retry request
                  return retryPromise<ApiResponse<T>>(
                    () => {
                      // @ts-ignore
                      return axios(requestConfig).then((res: AxiosResponse<T>) => {
                        return this.handleResponse<T>(res, options);
                      });
                    },
                    1000,
                    maxRetryCount,
                  ).catch(() => {
                    // in case of error send same response generated
                    return response;
                  });
                }
                return response;
              })
              .then((response) => {
                if (options.showLoader) {
                  this.toggleLoader(false);
                }
                if (this.onResponse) {
                  this.onResponse(response as ApiResponse<any>, options);
                }
                return response;
              })
          );
        })
        // this catch will only when internet not available
        .catch(() => {
          // show toast message of internet not available
          const apiResponse: ApiResponse<null> = {
            status: 0,
            data: null,
            message: [this.internetNotAvialiableMsg],
            errorCode: -1,
            isError: true
          };
          if (this.onResponse) {
            this.onResponse(apiResponse, options);
          }
          return apiResponse;
        })
    );
  }

  /**
   * Get ApiResponse object
   * @param response {@link AjaxResponse} response object of ajax request
   * @returns {@link ApiResponse}
   */
  private static getApiResponseObject<T>(response: AxiosResponse<T> | AxiosError<T>) {
    if (!this.processMessage) {
      throw new Error("Please set HttpClient.processMessage in your application")
    }
    const message = this.processMessage(response);
    let isError = false;
    if (!this.getStatusCode) {
      throw new Error("Please set HttpClient.getStatusCode in your application")
    }
    const statusCode = this.getStatusCode(response);
    if (statusCode >= 400 || statusCode === 0) {
      isError = true;
    }

    if (!this.processData) {
      throw new Error("Please set HttpClient.processData in your application")
    }
    if (!this.getErrorCode) {
      throw new Error("Please set HttpClient.getErrorCode in your application")
    }

    const apiResponse: ApiResponse<T> = {
      status: statusCode,
      data: this.processData(response),
      message,
      errorCode: this.getErrorCode(response),
      isError
    };
    if (process.env.NODE_ENV === "test") {
      apiResponse.response = response;
    }
    return apiResponse;
  }

  private static handleResponse<T>(response: AxiosResponse<T>, options: HttpClientOptions) {
    if (process.env.IS_SERVER && options.ctx?.res && !options.ctx.res.headersSent) {
      // check if api sending cookie to set
      const setCookie = response.headers["Set-Cookie"] || response.headers["Set-Cookie".toLocaleLowerCase()];
      if (setCookie) {
        if (options.ctx.res) {
          options.ctx.res.setHeader("Set-Cookie", setCookie.replace(/\r?\n|\r/g, ""));
        }
      }
    }
    const apiResponse = this.getApiResponseObject<T>(response);
    if (!apiResponse.isError) {
      return apiResponse;
    }
    // some api always send 200 status and follows a response structure
    // and sends actual response status in response body
    return this.handleErrorServerResponse(apiResponse, options);
  }

  private static handleErrorResponse<T>(
    response: AxiosResponse<T> | AxiosError<T>,
    options: HttpClientOptions,
  ) {
    const apiResponse = this.getApiResponseObject<T>(response);
    return this.handleErrorServerResponse(apiResponse, options);
  }

  private static handleErrorServerResponse<T>(
    apiResponse: ApiResponse<T | null>,
    options: HttpClientOptions,
  ) {
    if (apiResponse.status === 401) {
      if (!this.handleRefreshTokenFlow) {
        return apiResponse;
      }
      // This code will execute when token is invalid
      return this.handleRefreshTokenFlow(options).then(res => {
        if (res.status === undefined) {
          throw new Error("handleRefreshTokenFlow should return object of ApiResponse")
        }
        return res as ApiResponse<T>;
      }).catch(err => {
        if (err.status === undefined) {
          throw new Error("handleRefreshTokenFlow should return object of ApiResponse")
        }
        return err as ApiResponse<T>;
      });
    } else {
      if (!options.sendResponseWhenError) {
        apiResponse.data = null;
      }
      return apiResponse;
    }
  }
}

export interface HttpClientOptions extends AxiosRequestConfig {
  /**
   * Request is authenticated
   * If true Authorization header will send
   * @default true
   */
  isAuth?: boolean;
  /**
   * Response type of response
   * @default json
   */
  responseType?: ResponseType;
  /**
   * send response when error
   * in case when component need error response
   * @default false
   */
  sendResponseWhenError?: boolean;
  /**
   * Max Retry for api if status 500 or network not available
   * @default 3
   */
  maxRetryCount?: number;
  /**
   * Context Data will be necessary to pass when HttpClient will run on server and needs data from cookie
   */
  ctx?: ContextData;
  /**
   * Show loader
   * HttpClient will dispatch CustomEvent with name {@link SHOW_LOADER}
   * Listen this event to show loader
   * @example
   * window.addEventListener(SHOW_LOADER, (e) => {
      // code will go here to show loader
    });
   * @default false
   */
  showLoader?: boolean;
  /**
   * Show toast/snackbar when error
   * @default true
   */
  showNotificationMessage?: boolean;
  /**
   * extra used by service worker while caching
   * service worker send back this extra via postMessage
   */
  extra?: string;
  /**
   * By default caching from service worker will diable for all api request
   * To enable caching for specific api set this option to false
   */
  doCache?: boolean;
}


export function getDefaultApiResponseObj<T>(data?: T) {
  const response: ApiResponse<T | null> = {
    status: 200,
    data: data || null,
    message: [],
    errorCode: -1,
    isError: false
  };
  return response;
}

/**
 * Custom Response converted by HttpClient
 * for ease of frontend development
 */
export interface ApiResponse<T> {
  /**
   * status code of response
   * If server api response will send status in response body as key status then
   * HttpClient will use response body status otherwise response status will use
   */
  status: number;
  /**
   * response data of server
   * HttpClient will convert api rensponse into ApiResponse
   * If API will send data key in response body as key then HttpClient will use response body data
   * otheriwise HttpClient will put response body in ApiResponse.data
   */
  data: T;
  /**
   * Message in case of success and error
   * Error message can be multiple in case of validation of form
   */
  message: string[];
  /**
   * Error Code. Some api sends error code.
   * Error code helps in logging and also helps in multi language to show message
   * based on error code
   * If API will not send error then default value will return
   * @default -1
   */
  errorCode: number | string;
  /**
   * ajaxResponse will available only in case of jest test
   * Don't use in service/component. It will always be undefined
   */
  response?: AxiosResponse<T> | AxiosError<T>;
  /**
   * Can use to check response was success or error
   * HttpClient will set true only in case of status code 4xx, 5xx, no internet available
   * or status code 600 (client error)
   */
  isError: boolean;
}

export const SHOW_LOADER = "showLoader";
export function LoaderEvent(status: boolean) {
  return new CustomEvent<boolean>(SHOW_LOADER, { detail: status });
}

export function retryPromise<T>(
  fn: () => Promise<any>,
  ms = 1000,
  maxRetries = 5,
  retries = 0,
  // eslint-disable-next-line @typescript-eslint/ban-types
  rejectFn: Function | undefined = undefined,
) {
  return new Promise<T>((resolve, reject) => {
    if (!rejectFn) {
      rejectFn = reject;
    }
    fn()
      .then(resolve)
      .catch(() => {
        setTimeout(() => {
          console.log("retrying failed promise...", retries);
          ++retries;
          if (retries === maxRetries) {
            return rejectFn && rejectFn("maximum retries exceeded");
          }
          retryPromise<T>(fn, ms, maxRetries, retries, rejectFn).then(resolve);
        }, ms);
      });
  });
};

export function isOnline() {
  return new Promise<boolean>((resolve, reject) => {
    const status = process.env.IS_SERVER ? true : navigator.onLine;
    if (status) {
      resolve(status);
    } else {
      reject(status);
    }
  });
}
