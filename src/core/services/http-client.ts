import { Request, Response } from "express";
import { catchError, mergeMap, Observable, of, retry, throwError, timer } from "rxjs";
import { ajax, AjaxConfig, AjaxError, AjaxResponse } from "rxjs/ajax";
import { COOKIE_REFRESH_TOKEN, COOKIE_TOKEN, URL_REFERESH_TOKEN } from "src/const";
import { ApiResponse } from "../models/api-response";
import { CookieService } from "./cookie.service";
import ReactSsrConfig from "src/react-ssr.config";

const HttClientConfig = ReactSsrConfig.httpClient;

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

  private static sendRequest<T>(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    options?: HttpClientOptions,
  ) {
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
      const token = CookieService.get(COOKIE_TOKEN, options.nodeReqObj);
      if (token) {
        options.headers["Authorization"] = `Bearer ${token}`;
      } else {
        // logout && redirect to login page
        // can add redirectToLogin in HttpClientOptions. if false don't redirect to login
      }
    }
    url = this.getUrl(url);
    // let retryCount = 0;
    const maxRetryCount = HttClientConfig.maxRetryCount || 3;
    const requestConfig: AjaxConfig = {
      url,
      method,
      body: options.body,
      responseType: options.responseType,
      headers: options.headers,
      createXHR: function () {
        return new XMLHttpRequest();
      },
    };
    const reqObs$ = of(process.env.IS_SERVER === "true" ? true : navigator.onLine).pipe(
      mergeMap((status) => {
        if (!status) {
          const response: ApiResponse<null> = {
            status: 0,
            data: null,
            message: [],
            errorCode: -1,
          };

          return throwError(() => response);
        }
        return of(status);
      }),
      // retry for max retry count if internet not available
      retry({
        count: maxRetryCount,
        delay: (_error, retryCount: number) => {
          if (retryCount === maxRetryCount) {
            return throwError(() => _error);
          }
          return timer(retryCount * 500);
        },
      }),

      mergeMap(() => {
        return ajax<T>(requestConfig).pipe(
          mergeMap((response) => {
            return this.handleResponse<T>(response, true, options || {});
          }),
          // this catch will execute When error in original request
          catchError((err: AjaxError) => {
            return this.handleErrorResponse<T>(err, true, options || {});
          }),
          // this catch will execute only when refresh token request
          // will throw error response
          catchError(() => {
            const apiResponse: ApiResponse<null> = {
              status: 401,
              data: null,
              message: [],
              errorCode: -1,
            };
            return of(apiResponse);
          }),
          mergeMap((response) => {
            // response of refresh token request
            if (
              response &&
              (response as AjaxResponse<AuthResponse>).request &&
              (response as AjaxResponse<AuthResponse>).request.url &&
              new URL((response as AjaxResponse<AuthResponse>).request.url).pathname ===
                URL_REFERESH_TOKEN
            ) {
              const serverResponse = this.getApiResponseObject<AuthResponse>(
                response as AjaxResponse<AuthResponse>,
              );
              // if status 200 then token generated
              if (serverResponse.status === 200) {
                // save new token in cookie storage
                CookieService.set(
                  COOKIE_TOKEN,
                  serverResponse.data?.token || "",
                  10,
                  options?.nodeRespObj,
                );
                CookieService.set(
                  COOKIE_REFRESH_TOKEN,
                  serverResponse.data?.refreshToken || "",
                  10,
                  options?.nodeRespObj,
                );
                // add new token in Authorization header
                if (!requestConfig.headers) {
                  requestConfig.headers = {};
                }
                (requestConfig as any).headers[
                  "Authorization"
                ] = `Bearer ${serverResponse.data?.token}`;
                // send original request again
                return ajax<T>(requestConfig);
              } else {
                // logout && redirect to login page
                const apiResponse: ApiResponse<null> = {
                  status: 401,
                  data: null,
                  message: [],
                  errorCode: -1,
                };
                return of(apiResponse);
              }
            } else {
              return of(response as ApiResponse<T | null>);
            }
          }),
          // this catch will execute only after token regenerated and error in original request
          catchError((err: AjaxError | Error) => {
            if (err instanceof AjaxError) {
              return this.handleErrorResponse<T>(err, false, options || {}) as Observable<
                ApiResponse<T | null>
              >;
            }
            return throwError(() => err);
          }),
          mergeMap((response) => {
            // response of original request after token regenertated
            if (
              response &&
              (response as AjaxResponse<T>).request &&
              (response as AjaxResponse<T>).request.url === requestConfig.url
            ) {
              const handledResponse = this.handleResponse<T>(
                response as AjaxResponse<T>,
                false,
                options || {},
              );
              return handledResponse as Observable<ApiResponse<T>>;
            }
            return of(response as ApiResponse<T>);
          }),
          // this catch will catch any unknown error
          catchError((error: Error) => {
            console.error("Unknown Error!!", error);
            // [TODO] this error should log in database to get client side errors
            const response: ApiResponse<any> = {
              status: 600, // any client side error
              data: null,
              message: [],
              errorCode: -1,
            };
            return of(response);
          }),
          // this will execute after request process and we have response from server
          mergeMap((response) => {
            // only checking for 5xx because retry should happen only in case of server error
            // not in the case of 4xx which is client error or 2xx success case
            if (response.status.toString().startsWith("5") || response.status === 0) {
              // throw Error as strigify response because we will need response
              // to return to component
              // throwing error because retry will retry request
              return throwError(() => response);
            }
            return of(response);
          }),
          // retry request if status is 5xx (server error)
          retry({
            count: maxRetryCount,
            delay: (_error: ApiResponse<T>, retryCount: number) => {
              console.log("retry 5xx error", retryCount);
              if (retryCount === maxRetryCount) {
                return throwError(() => _error);
              }
              return timer(retryCount * 500);
            },
          }),
          // This catch will execute after max retry reach
          // so in any case HttpClient will always send success
          // Error can detect from status of response/result of HttpClient
          catchError((error: ApiResponse<T | null>) => {
            return of(error);
          }),
        );
      }),
      // this catch will execute when internet will not available or
      // any error not catch by ajax request
      catchError((err: ApiResponse<null>) => {
        console.log(err);
        // show toast message of internet not available
        const apiResponse: ApiResponse<null> = {
          status: 0,
          data: null,
          message: ["Please check your network connection. Internet not available"],
          errorCode: -1,
        };
        return of(apiResponse);
      }),
    );
    return reqObs$;
  }

  /**
   * Get ServerResponse object
   * @param response {@link AjaxResponse} response object of ajax request
   * @returns {@link ServerResponse}
   */
  private static getApiResponseObject<T>(response: AjaxResponse<T> | AjaxError) {
    const status: number =
      (response.response && response.response[HttClientConfig.apiResponse.statusKey]) ||
      response.status;
    const message = HttClientConfig.processMessage(response);
    const apiResponse: ApiResponse<T> = {
      status,
      data: HttClientConfig.processData(response),
      message,
      errorCode:
        (response.response && response.response[HttClientConfig.apiResponse.errorCodeKey]) || -1,
    };
    return apiResponse;
  }

  private static handleResponse<T>(
    response: AjaxResponse<T>,
    isFirst: boolean,
    options: HttpClientOptions,
  ) {
    if (process.env.IS_SERVER === "true") {
      // check if api sending cookie to set
      const setCookie =
        response.responseHeaders["Set-Cookie"] ||
        response.responseHeaders["Set-Cookie".toLocaleLowerCase()];
      if (setCookie) {
        if (options.nodeRespObj) {
          options.nodeRespObj.setHeader("Set-Cookie", setCookie.replace(/\r?\n|\r/g, ""));
        }
      }
    }
    const apiResponse = this.getApiResponseObject<T>(response);
    if (apiResponse.status.toString().startsWith("2")) {
      return of(apiResponse);
    }
    // some api always send 200 status and follow a response structure
    // and sends actual response status in response body
    return this.handleErrorServerResponse(apiResponse, isFirst, options);
  }

  private static handleErrorResponse<T>(
    response: AjaxError,
    isFirst: boolean,
    options: HttpClientOptions,
  ) {
    const serverResponse = this.getApiResponseObject<T>(response);
    return this.handleErrorServerResponse(serverResponse, isFirst, options);
  }

  private static handleErrorServerResponse<T>(
    apiResponse: ApiResponse<T | null>,
    isFirst: boolean,
    options: HttpClientOptions,
  ) {
    if (apiResponse.status === 401) {
      if (!isFirst) {
        apiResponse.data = null;
        return of(apiResponse);
      }
      // This code will execute when token is invalid
      // get refresh token from cookie storage
      const refreshToken = CookieService.get(COOKIE_REFRESH_TOKEN, options.nodeReqObj);
      // regenerate token from refresh token
      return ajax<AuthResponse>({
        url: this.getUrl(URL_REFERESH_TOKEN),
        body: { refreshToken },
        method: "POST",
        createXHR: function () {
          return new XMLHttpRequest();
        },
      });
    } else {
      if (!options.sendResponseWhenError) {
        apiResponse.data = null;
      }
      return of(apiResponse);
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
  responseType?: XMLHttpRequestResponseType;
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
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
}
