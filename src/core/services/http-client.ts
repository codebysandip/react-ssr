/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from "express";
import { COOKIE_REFRESH_TOKEN, COOKIE_ACCESS_TOKEN, URL_REFERESH_TOKEN } from "src/const.js";
import { ApiResponse } from "../models/api-response.js";
import { CookieService } from "./cookie.service.js";
import ReactSsrConfig from "src/react-ssr.config.js";
import axios, { AxiosRequestConfig, ResponseType, AxiosResponse, AxiosError } from "axios";
import { setAccessAndRefreshToken } from "../functions/get-token.js";

const HttClientConfig = ReactSsrConfig().httpClient;
export class HttpClient {
  public static get<T>(url: string, options?: HttpClientOptions) {
    return this.sendRequest<T>(url, "GET", options);
  }

  public static post<T>(url: string, body: any, options?: HttpClientOptions) {
    if (!options) {
      options = {};
    }
    return this.sendRequest<T>(url, "POST", { body, ...options });
  }

  public static put<T>(url: string, body: any, options?: HttpClientOptions) {
    if (!options) {
      options = {};
    }
    return this.sendRequest<T>(url, "PUT", { body, ...options });
  }

  public static delete<T>(url: string, options?: HttpClientOptions) {
    return this.sendRequest<T>(url, "DELETE", options);
  }

  private static getUrl(url: string) {
    return `${process.env.IS_SERVER === "true" ? process.env.API_BASE_URL : ""}${url}`;
  }

  private static getDefaultApiResponseObj() {
    const response: ApiResponse<null> = {
      status: 200,
      data: null,
      message: [],
      errorCode: -1,
    };
    return response;
  }

  private static retryPromise = (
    fn: () => Promise<any>,
    ms = 1000,
    maxRetries = 5,
    retries = 0,
    // eslint-disable-next-line @typescript-eslint/ban-types
    rejectFn: Function | undefined = undefined,
  ) => {
    return new Promise((resolve, reject) => {
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
            this.retryPromise(fn, ms, maxRetries, retries, rejectFn).then(resolve);
          }, ms);
        });
    });
  };

  private static isOnline() {
    return new Promise((resolve, reject) => {
      const status = process.env.IS_SERVER === "true" ? true : navigator.onLine;
      if (status) {
        resolve(status);
      } else {
        reject(status);
      }
    });
  }

  private static sendRequest<T>(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    options: HttpClientOptions = {},
  ): Promise<ApiResponse<T | null>> {
    if (!options) {
      options = {};
    }
    if (!options.responseType) {
      options.responseType = "json";
    }
    if (!options.headers) {
      options.headers = {};
    }
    if (options.isAuth === undefined) {
      // change based on requirement
      options.isAuth = HttClientConfig.isAuthDefault;
    }
    if (options.isAuth) {
      // add code here to send Authorization header
      const token = CookieService.get(COOKIE_ACCESS_TOKEN, options.nodeReqObj);
      if (token) {
        options.headers["Authorization"] = `Bearer ${token}`;
      } else {
        const apiResponse = this.getDefaultApiResponseObj();
        apiResponse.status = 401;
        return Promise.resolve(apiResponse);
      }
    }

    url = this.getUrl(url);
    // let retryCount = 0;
    const maxRetryCount = HttClientConfig.maxRetryCount || 3;
    const requestConfig: AxiosRequestConfig = {
      url,
      method,
      data: options.body,
      responseType: options.responseType,
      headers: options.headers,
    };
    // @ts-ignore
    return (
      this.retryPromise(this.isOnline, 1000, maxRetryCount)
        .then(() => {
          return (
            axios(requestConfig)
              // @ts-ignore
              .then((response) => {
                return this.handleResponse<T>(response, true, options);
              })
              // this catch will execute When error in original request
              // if 401 status will come then handleErrorResponse will try to
              // regenerate token from refresh token
              // @ts-ignore
              .catch((err) => {
                return this.handleErrorResponse<T>(err, true, options);
              })
              // this catch will execute only when refresh token request
              // will throw error response
              .catch((err: AxiosError<T> | ApiResponse<T>) => {
                if ((err as AxiosError).isAxiosError) {
                  const apiResponse = this.getDefaultApiResponseObj();
                  apiResponse.status = 401;
                  return apiResponse;
                } else if (err.status && err.message) {
                  return err;
                } else {
                  // this will execute only for any client error
                  const apiResponse = this.getDefaultApiResponseObj();
                  apiResponse.status = 600;
                  return apiResponse;
                }
              })
              // @ts-ignore
              .then((response) => {
                // response of refresh token request
                if (
                  (response as AxiosResponse<AuthResponse>).config &&
                  (response as AxiosResponse<AuthResponse>).config.url === URL_REFERESH_TOKEN
                ) {
                  const apiResponse = this.getApiResponseObject<AuthResponse>(response as AxiosResponse<AuthResponse>);
                  // if status 200 then token generated
                  if (apiResponse.status === 200) {
                    // save new token in cookie storage
                    setAccessAndRefreshToken(
                      apiResponse.data.accessToken,
                      apiResponse.data.refreshToken,
                      options.nodeRespObj,
                    );
                    // add new token in Authorization header
                    if (!requestConfig.headers) {
                      requestConfig.headers = {};
                    }
                    requestConfig.headers["Authorization"] = `Bearer ${apiResponse.data?.accessToken}`;
                    // send original request again
                    return axios(requestConfig);
                  } else {
                    // logout && redirect to login page
                    const apiResponseN = this.getDefaultApiResponseObj();
                    apiResponse.status = 401;
                    return apiResponseN;
                  }
                } else {
                  return response as ApiResponse<T | null>;
                }
              })
              // this catch will execute only after token regenerated and error in original request
              .catch((err: AxiosError<T>) => {
                // @ts-ignore
                return this.handleErrorResponse<T>(err, false, options || {}) as Promise<ApiResponse<T | null>>;
              })
              .then((response: any) => {
                // response of original request after token regenertated
                if (
                  (response as AxiosResponse<T>).request &&
                  (response as AxiosResponse<T>).request.url === requestConfig.url
                ) {
                  const handledResponse = this.handleResponse<T>(response as AxiosResponse<T>, false, options || {});
                  return handledResponse as ApiResponse<T>;
                }
                return response as ApiResponse<T>;
              })
              // this catch will catch any unknown error
              .catch((error: Error) => {
                console.error("Unknown Error!!", error);
                // [TODO] this error should log in database to get client side errors
                const response = this.getDefaultApiResponseObj();
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
                  return this.retryPromise(
                    () => {
                      // @ts-ignore
                      return axios(requestConfig).then((res: AxiosResponse<T>) => {
                        return this.handleResponse<T>(res, false, options);
                      });
                    },
                    1000,
                    maxRetryCount,
                  ).catch(() => {
                    return response;
                  });
                }
                return response;
              })
              // This catch will execute after max retry reach
              // so in any case HttpClient will always send success
              // Error can detect from status of response/result of HttpClient
              .catch((error: ApiResponse<T | null>) => {
                return error;
              })
          );
        })
        // this catch will only when internet not available
        .catch(() => {
          // show toast message of internet not available
          const apiResponse: ApiResponse<null> = {
            status: 0,
            data: null,
            message: ["Please check your network connection. Internet not available"],
            errorCode: -1,
          };
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
    let resp: AxiosResponse | undefined;
    if (!(response as AxiosError).isAxiosError) {
      resp = response as AxiosResponse<any>;
    } else {
      resp = (response as AxiosError<any>).response;
    }

    const data: any = resp?.data;

    const message = HttClientConfig.processMessage(response);
    const apiResponse: ApiResponse<T> = {
      status: resp?.status || 0,
      data: HttClientConfig.processData(response),
      message,
      errorCode: (data && data[HttClientConfig.apiResponse.errorCodeKey]) || -1,
    };
    if (process.env.NODE_ENV === "test") {
      apiResponse.response = response;
    }
    return apiResponse;
  }

  private static handleResponse<T>(response: AxiosResponse<T>, isFirst: boolean, options: HttpClientOptions) {
    if (process.env.IS_SERVER === "true" && options.nodeRespObj && !options.nodeRespObj.headersSent) {
      // check if api sending cookie to set
      const setCookie = response.headers["Set-Cookie"] || response.headers["Set-Cookie".toLocaleLowerCase()];
      if (setCookie) {
        if (options.nodeRespObj) {
          options.nodeRespObj.setHeader("Set-Cookie", setCookie.replace(/\r?\n|\r/g, ""));
        }
      }
    }
    const apiResponse = this.getApiResponseObject<T>(response);
    if (apiResponse.status.toString().startsWith("2")) {
      return apiResponse;
    }
    // some api always send 200 status and follows a response structure
    // and sends actual response status in response body
    return this.handleErrorServerResponse(apiResponse, isFirst, options);
  }

  private static handleErrorResponse<T>(
    response: AxiosResponse<T> | AxiosError<T>,
    isFirst: boolean,
    options: HttpClientOptions,
  ) {
    const apiResponse = this.getApiResponseObject<T>(response);
    return this.handleErrorServerResponse(apiResponse, isFirst, options);
  }

  private static handleErrorServerResponse<T>(
    apiResponse: ApiResponse<T | null>,
    isFirst: boolean,
    options: HttpClientOptions,
  ) {
    if (apiResponse.status === 401) {
      if (!isFirst) {
        apiResponse.data = null;
        return apiResponse;
      }
      // This code will execute when token is invalid
      // get refresh token from cookie storage
      const refreshToken = CookieService.get(COOKIE_REFRESH_TOKEN, options.nodeReqObj);
      // regenerate token from refresh token
      return axios({
        url: this.getUrl(URL_REFERESH_TOKEN),
        data: { refreshToken },
        method: "POST",
      }) as Promise<AxiosResponse<T> | AxiosError<T>>;
    } else {
      if (!options.sendResponseWhenError) {
        apiResponse.data = null;
      }
      return apiResponse;
    }
  }
}

export interface HttpClientOptions {
  queryString?:
    | string
    | URLSearchParams
    | Record<string, string | number | boolean | string[] | number[] | boolean[]>
    | [string, string | number | boolean | string[] | number[] | boolean[]][];
  body?: any;
  /**
   * Request is authenticated
   * If true Authorization header will send
   * @default true
   */
  isAuth?: boolean;
  headers?: Record<string, string | number | boolean>;
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
   * Request object of node. This will use only in case of getting
   * cookie on server
   */
  nodeReqObj?: Request;
  /**
   * Response object of node. This will use only in case of setting
   * cookie on server
   */
  nodeRespObj?: Response;
  /**
   * Show loader
   * @default true
   */
  showLoader?: boolean;
  /**
   * Show toast/snackbar when error
   * @default true
   */
  showNotificationMessage?: boolean;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}
