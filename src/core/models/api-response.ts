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
}
