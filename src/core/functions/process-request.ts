import { PAGE_INVALID_RETURN_DATA, ROUTE_500, ROUTE_LOGIN } from "src/const.js";
import SsrConfig from "src/react-ssr.config.js";
import { ApiResponse } from "../models/api-response.js";
import { ContextData } from "../models/context.model.js";
import { IRedirect, PageData, PageRedirect } from "../models/page-data.js";
import { CompModule } from "../models/route.model.js";

/**
 * Validate response of api and return redirect path in case of error
 * @param response ApiResponse
 * @returns redirect path
 */
export function validateApiResponse(response: ApiResponse<any>): PageRedirect {
  if (response.status === undefined) {
    throw new Error(PAGE_INVALID_RETURN_DATA);
  }
  if (response.status === 401 || response.status === 403) {
    return { path: ROUTE_LOGIN };
  } else if (response.status.toString().startsWith("5") || response.status === 0) {
    return { path: ROUTE_500 };
  } else if (response.status.toString().startsWith("4")) {
    // client err
    // [TODO] for now redirecting to 500 but can take step here
    return { path: ROUTE_500 };
  } else if (response.status === 600) {
    return { path: ROUTE_500 };
  } else {
    return { path: "" };
  }
}

export function processRequest(module: CompModule, ctx: ContextData) {
  return new Promise<{
    redirect: PageRedirect;
    isError: boolean;
    apiResponse?: ApiResponse<PageData>;
  }>((resolve) => {
    const ssrConfig = SsrConfig();
    const Component = module.default;
    const getInitialProps = Component.getInitialProps || module.getInitialProps;

    if (ssrConfig.preInitialProps) {
      ssrConfig.preInitialProps(ctx);
    }

    // get page data
    if (getInitialProps) {
      // call page/route getInitialProps static method to get sync data to render page
      // this data will pass as props to page/route component
      const initialPropsAsync = getInitialProps(ctx);
      if (initialPropsAsync instanceof Promise) {
        // add common api calls in fork join
        // common api like header/footer api and put in PageData.header
        Promise.all([initialPropsAsync])
          .then((result) => {
            let redirect: PageRedirect;
            if ((result[0] as IRedirect).redirect) {
              redirect = (result[0] as IRedirect).redirect;
              if (typeof redirect !== "object" || redirect.path === undefined) {
                throw new Error("redirect must be of type IRedirect");
              }
              resolve({
                redirect,
                isError: true,
              });
              return;
            } else {
              redirect = validateApiResponse(result[0] as ApiResponse<PageData>);
            }

            if (redirect.path) {
              resolve({
                redirect,
                isError: true,
                apiResponse: result[0] as ApiResponse<PageData>,
              });
            } else {
              resolve({
                redirect: { path: "" },
                isError: false,
                apiResponse: result[0],
              });
            }
          })
          .catch((err) => {
            console.error(`Error in getInitialProps of ${Component.constructor.name}. Error: ${err}`);
            console.error(err.stack);
            resolve({
              redirect: { path: ROUTE_500 },
              isError: true,
            });
          });
      } else {
        throw new Error("getInitialProps must return Promise");
      }
    } else {
      resolve({
        redirect: { path: "" },
        isError: false,
      });
    }
  });
}
