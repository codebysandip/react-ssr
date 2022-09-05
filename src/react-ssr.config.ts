import { AxiosResponse, AxiosError } from "axios";
import { getAccessTokenData } from "./core/functions/get-token.js";
import { CompModule } from "./core/models/route.model.js";
import { SSRConfig } from "./core/models/ssr-config.model.js";
import { loginSuccess, logout } from "./pages/auth/auth.redux.js";
import { AppStore, createStore } from "src/redux/create-store";
import { ContextData } from "./core/models/context.model.js";
import { ContextDataWithStore } from "./core/models/context-with-store.model.js";
import { PAGE_INVALID_RETURN_DATA, ROUTE_LOGIN, ROUTE_500, ROUTE_403, ROUTE_404 } from "./const.js";
import { ApiResponse } from "./core/models/api-response.js";
import { CommonService } from "./core/services/common.service.js";

export const ssrConfig: SSRConfig = {
  httpClient: {
    maxRetryCount: 3,
    isAuthDefault: false,
    /**
     * To process message by your own replace this function code
     * with your own code
     */
    processMessage: (response: AxiosResponse<any> | AxiosError<any>) => {
      let resp: AxiosResponse | undefined;
      if (!(response as AxiosError).isAxiosError) {
        resp = response as AxiosResponse<any>;
      } else {
        resp = (response as AxiosError<any>).response;
      }

      const data: any = resp?.data;
      let message: string[] = [];
      const status: number = (data && data.statusCode) || resp?.status;

      if (status.toString().startsWith("2")) {
        const successMessage = data && data.message;
        if (typeof successMessage === "string") {
          message.push(successMessage);
        } else if (Array.isArray(successMessage) && typeof successMessage[0] === "string") {
          message = successMessage;
        }
      } else {
        const errorMessage = data && data.message;
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
    processData: (response: AxiosResponse<any> | AxiosError<any>) => {
      let resp: AxiosResponse | undefined;
      if (!(response as AxiosError).isAxiosError) {
        resp = response as AxiosResponse<any>;
      } else {
        resp = (response as AxiosError<any>).response;
      }

      const data: any = resp?.data;
      // can check instanceOf to know response type
      // some api send data in response and data field contain actual data
      return data?.data || data;
    },
    getErrorCode: (response: AxiosResponse<any> | AxiosError<any>) => {
      let resp: AxiosResponse | undefined;
      if (!(response as AxiosError).isAxiosError) {
        resp = response as AxiosResponse<any>;
      } else {
        resp = (response as AxiosError<any>).response;
      }
      const data: any = resp?.data;
      return data.errorCode || -1;
    },
    getStatusCode: (response: AxiosResponse<any> | AxiosError<any>) => {
      let resp: AxiosResponse | undefined;
      if (!(response as AxiosError).isAxiosError) {
        resp = response as AxiosResponse<any>;
      } else {
        resp = (response as AxiosError<any>).response;
      }
      return resp?.data.status || resp?.status || 0;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onResponse: (apiResponse, options) => {
      if (apiResponse.status === 0) {
        CommonService.toast({
          type: "error",
          message: apiResponse.message[0],
        });
        return;
      }
      if (!apiResponse.status.toPrecision().startsWith("2") && apiResponse.message.length) {
        CommonService.toast({
          type: "error",
          message: apiResponse.message[0],
        });
      }
    },
  },
  configureStore: (module: CompModule, ctx: ContextData) => {
    const store = createStore(module.reducer);
    (ctx as ContextDataWithStore).store = store as AppStore;
  },
  preInitialProps: (ctx: ContextData) => {
    const accessTokenData = getAccessTokenData(ctx.req);
    if (accessTokenData) {
      (ctx as ContextDataWithStore).store.dispatch(
        loginSuccess({
          isLoggedIn: true,
          user: accessTokenData,
        }),
      );
    }
  },
  getSsrData: (ctx: ContextData) => {
    return (ctx as ContextDataWithStore).store.getState();
  },
  validateApiResponse: (response: ApiResponse<any>, ctx: ContextData) => {
    if (response.status === undefined) {
      throw new Error(PAGE_INVALID_RETURN_DATA);
    }
    if (response.status === 401 || response.status === 403) {
      if (response.status === 401) {
        (ctx as ContextDataWithStore).store.dispatch(logout({ ctx: ctx as ContextDataWithStore }));
        return { path: ROUTE_LOGIN };
      } else {
        return { path: ROUTE_403 };
      }
    } else if (response.status.toString().startsWith("5") || response.status === 0) {
      return { path: ROUTE_500 };
    } else if (response.status === 404) {
      return { path: ROUTE_404 };
    } else if (response.status.toString().startsWith("4")) {
      return { path: ROUTE_500 };
    } else if (response.status === 600) {
      return { path: ROUTE_500 };
    } else {
      return { path: "" };
    }
  },
};
