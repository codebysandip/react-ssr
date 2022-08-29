import { AxiosResponse, AxiosError } from "axios";

export interface ApiResponseKeys {
  statusKey: string;
  successMessageKey: string;
  errorMessageKey: string;
  errorCodeKey: string;
}

export interface HttpClient {
  maxRetryCount: number;
  isAuthDefault: boolean;
  apiResponse: ApiResponseKeys;
  processMessage: (response: AxiosResponse<any>|AxiosError<any>) => string[];
  processData: (response: AxiosResponse<any>|AxiosError<any>) => any;
}

export interface SSRConfig {
  httpClient: HttpClient;
}
