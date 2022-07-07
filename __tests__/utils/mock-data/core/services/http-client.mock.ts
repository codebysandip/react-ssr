import { AjaxError, AjaxResponse } from "rxjs/ajax";

export function getAjaxResponse<T>(
  url: string,
  status?: number,
  responseBody?: any,
  method?: string,
  responseHeaders?: Record<string, string>,
  requestHeaders?: Record<string, string>,
) {
  const ajaxResponse: Partial<AjaxResponse<T>> = {
    status: status || 200,
    response: responseBody,
    responseHeaders: responseHeaders || {},
    request: {
      url,
      method: method || "GET",
      headers: requestHeaders || {},
      timeout: 0,
      withCredentials: false,
      async: true,
      crossDomain: true,
      responseType: "json",
    },
  };
  return ajaxResponse;
}

export function getAjaxErrorResponse(
  url: string,
  status: number,
  responseBody?: any,
  method?: string,
  responseHeaders?: Record<string, string>,
  requestHeaders?: Record<string, string>,
) {
  const ajaxErrorResponse: Partial<AjaxError> = getAjaxResponse(
    url,
    status,
    responseBody,
    method,
    responseHeaders,
    requestHeaders,
  );
  return ajaxErrorResponse;
}
