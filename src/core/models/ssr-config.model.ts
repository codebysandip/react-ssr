import { AjaxResponse, AjaxError } from "rxjs/ajax";

export interface ApiResponse {
  statusKey: string;
  successMessageKey: string;
  errorMessageKey: string;
  errorCodeKey: string;
}

export interface HttpClient {
  maxRetryCount: number;
  isAuthDefault: boolean;
  apiResponse: ApiResponse;
  processMessage: (response: AjaxResponse<any> | AjaxError) => string[];
  processData: (response: AjaxResponse<any> | AjaxError) => any;
}

export interface SSRConfig {
  httpClient: HttpClient;
}
