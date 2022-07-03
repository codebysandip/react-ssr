export interface ServerResponse<T> {
  /**
   * status code of response
   */
  status: number;
  /**
   * response data of server
   */
  data: T;
  /**
   * Error Message in case of error
   * Error message can be multiple in case of validation of form
   */
  errorMessage?: string[];
  /**
   * Error Code. Some api send error code.
   * Error code helps in logging and also helps in multi language to show message
   * based on error code
   */
  errorCode?: string;
}
