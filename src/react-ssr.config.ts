import { AxiosResponse, AxiosError } from "axios";
import { SSRConfig } from "./core/models/ssr-config.model.js";
import { HttpClient } from "./core/services/http-client.js";

let dbConfig: SSRConfig;

function mergeConfig(configDb: SSRConfig, localConfig: SSRConfig) {
  const primitiveTypes = ["string", "number", "boolean"];
  /**
   * Merge Object 2 into Object 1
   * Object 2 must have same structure as Object 1
   * if Object 2 have extra keys then it will be ignored
   * @param obj1 Object 1
   * @param obj2 Object 2
   */
  function merge(obj1: Record<string, any>, obj2: Record<string, any>) {
    Object.keys(obj1).forEach((key) => {
      // type of both config must match
      // checked configDb key must have value so that don't need to check after this
      if (typeof obj2[key] === typeof obj1[key] && obj2[key]) {
        if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
          obj1[key] = [...obj1[key], ...obj2[key]];
        } else if (
          primitiveTypes.indexOf(typeof obj1[key]) &&
          typeof obj1[key] === typeof obj2[key]
        ) {
          obj1[key] = obj2[key];
        } else if (typeof obj1[key] === "object") {
          merge(obj1[key], obj2[key]);
        }
      }
    });
  }

  merge(localConfig, dbConfig);
}

/**
 * Get config from db
 * call this function from App.tsx
 * @example
 * ```typescript
 * useEffect({
 *  // can call on specific time also
 *  // this code will execute when page loads
 *  getConfigFromDb();
 * }, [])
 * ```
 */
export function getConfigFromDb() {
  HttpClient.get<SSRConfig>("/api/url-of-config").then((dbConfig) => {
    if (dbConfig.data && typeof dbConfig.data === "object") {
      // merge config with local config
      mergeConfig(config(), dbConfig.data);
    }
  });
}
const config = () => {
  if (dbConfig) {
    return dbConfig;
  }
  const ssrConfig: SSRConfig = {
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
      processMessage: (response: AxiosResponse<any>|AxiosError<any>) => {
        let resp: AxiosResponse|undefined;
        if (!(response as AxiosError).isAxiosError) {
          resp = (response as AxiosResponse<any>);
        } else {
          resp = (response as AxiosError<any>).response;
        }
    
        const data: any = resp?.data;
        let message: string[] = [];
        const status: number =
          (data && data[config().httpClient.apiResponse.statusKey]) ||
          resp?.status;

        if (status.toString().startsWith("2")) {
          const successMessage =
            data &&
            data[config().httpClient.apiResponse.successMessageKey];
          if (typeof successMessage === "string") {
            message.push(successMessage);
          } else if (Array.isArray(successMessage) && typeof successMessage[0] === "string") {
            message = successMessage;
          }
        } else {
          const errorMessage =
            data && data[config().httpClient.apiResponse.errorMessageKey];
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
      processData: (response: AxiosResponse<any>|AxiosError<any>) => {
        let resp: AxiosResponse|undefined;
        if (!(response as AxiosError).isAxiosError) {
          resp = (response as AxiosResponse<any>);
        } else {
          resp = (response as AxiosError<any>).response;
        }
    
        const data: any = resp?.data;
        // can check instanceOf to know response type
        // some api send data in response and data field contain actual data
        return data?.data || data;
      },
    },
  };
  return ssrConfig;
};

export default config;
