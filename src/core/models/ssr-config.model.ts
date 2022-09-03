import { AxiosResponse, AxiosError } from "axios";
import { ContextData } from "./context.model.js";
import { CompModule } from "./route.model.js";

export interface HttpClient {
  /**
   * we retry request in HttpClient when 5xx error or
   * internet not available
   * set this for number of times HttpClient will retry
   */
  maxRetryCount: number;
  /**
   * set this for default of HttpClientOptions.isAuth
   */
  isAuthDefault: boolean;
  /**
   * Implement this function to return sucess and error message from api resonse
   * HttpClient will call this function after getting response from api
   * to create ApiResponse object
   */
  processMessage: (response: AxiosResponse<any> | AxiosError<any>) => string[];
  /**
   * Implement this function to return data from api resonse
   * HttpClient will call this function after getting response from api
   * to create ApiResponse object
   */
  processData: (response: AxiosResponse<any> | AxiosError<any>) => any;
  /**
   * implement this function to retiurn code from api response
   * HttpClient will call this function after getting response from api
   * to create ApiResponse object
   */
  getErrorCode: (response: AxiosResponse<any> | AxiosError<any>) => number;
  /**
   * implement this function to retiurn code from api response
   * HttpClient will call this function after getting response from api
   * to create ApiResponse object
   */
  getStatusCode: (response: AxiosResponse<any> | AxiosError<any>) => number;
}

export interface SSRConfig {
  httpClient: HttpClient;
  /**
   * Implement this function react-ssr.config.ts to create store
   * We internally call this function before calling getInitialProps
   * create store in this function and add reference of store in context
   * we send module object to enable lazy loading of reducer
   * @link https://redux.js.org/usage/code-splitting
   */
  configureStore?: (module: CompModule, ctx: ContextData) => void;
  /**
   * Implement this function to execute common code
   * we internally call this function before calling getInitialProps
   * This function get call on server as well as client
   */
  preInitialProps?: (ctx: ContextData) => void;
  /**
   * Implement this function to modify ssrData
   * We set ssr data on window object with key __SSRDATA__
   * Widely used to function when you implement store
   * We call this function after react page rendered
   */
  getSsrData?: (ctx: ContextData) => any;
}
