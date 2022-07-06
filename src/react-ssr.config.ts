import { AjaxResponse, AjaxError } from "rxjs/ajax";

const config = {
  httpClient: {
    maxRetryCount: 3,
    isAuthDefault: false,
    apiResponse: {
      statusKey: "status",
      successMessageKey: "message",
      errorMessageKey: "message",
      errorCodeKey: "errorCode",
    },
    /**
     * To process message by your own replace this function code
     * with your own code
     */
    processMessage: (response: AjaxResponse<any> | AjaxError) => {
      let message: string[] = [];
      const status: number =
        (response.response && response.response[config.httpClient.apiResponse.statusKey]) ||
        response.status;

      if (status.toString().startsWith("2")) {
        const successMessage =
          response.response && response.response[config.httpClient.apiResponse.successMessageKey];
        if (typeof successMessage === "string") {
          message.push(successMessage);
        } else if (Array.isArray(successMessage) && typeof successMessage[0] === "string") {
          message = successMessage;
        }
      } else {
        const errorMessage =
          response.response && response.response[config.httpClient.apiResponse.errorMessageKey];
        if (typeof errorMessage === "string") {
          message.push(errorMessage);
        } else if (Array.isArray(errorMessage) && typeof errorMessage[0] === "string") {
          message = errorMessage;
        }
      }
      return message;
    },
    /**
     * Replace this function body with your own code if api return different type of response
     * While replacing rember that this function will get called for success as well as error response
     * @param response AjaxResponse<any> | AjaxError
     * @returns Api Response
     */
    processData: (response: AjaxResponse<any> | AjaxError) => {
      // can check instanceOf to know response type
      // some api send data in response and data field contain actual data
      return response.response?.data || response.response;
    },
  },
};

export default config;
