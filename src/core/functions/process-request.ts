import { ROUTE_500 } from "src/const.js";
import { ssrConfig } from "src/react-ssr.config.js";

import { ApiResponse, getDefaultApiResponseObj } from "core/services/http-client.js";
import { GetInitialProps } from "../models/common.model.js";
import { ContextData } from "../models/context.model.js";
import { IRedirect, PageData, PageRedirect } from "../models/page-data.js";
import { CompModule } from "../models/route.model.js";

export function processRequest(module: CompModule, ctx: ContextData) {
  return new Promise<{
    redirect: PageRedirect;
    isError: boolean;
    apiResponse?: ApiResponse<PageData>;
  }>((resolve) => {
    const Component = module.default;
    if (!Component) {
      throw new Error("Page component must export component as default");
    }
    const getInitialProps = Component.getInitialProps || module.getInitialProps;

    let headerFooterPromise: Promise<ApiResponse<any>> | void;
    if (ssrConfig.preInitialProps) {
      headerFooterPromise = ssrConfig.preInitialProps(ctx, module);
    }

    // get page data
    if (getInitialProps) {
      // call page/route getInitialProps static method to get async data to render page
      // this data will pass as props to page/route component
      const initialPropsAsync: ReturnType<GetInitialProps> = getInitialProps(ctx);
      if (initialPropsAsync instanceof Promise) {
        // add common api calls in fork join
        // common api like header/footer api and put in PageData.header
        const promiseArr = [initialPropsAsync];
        if (headerFooterPromise instanceof Promise) {
          promiseArr.push(headerFooterPromise);
        }
        let pageData: any = {};
        Promise.all(promiseArr)
          .then((result) => {
            let redirect: PageRedirect = { path: "" };
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
              // check for every api response object for error
              result.forEach((apiResponse) => {
                const resp = apiResponse as ApiResponse<any>;
                const redirectObj = ssrConfig.validateApiResponse(resp, ctx);
                if (redirectObj.path && !redirect.path) {
                  redirect = redirectObj;
                }
                if (!redirect.path && typeof resp.data === "object") {
                  pageData = {
                    ...pageData,
                    ...resp.data,
                  };
                }
              });
            }

            if (redirect.path) {
              resolve({
                redirect,
                isError: true,
              });
            } else {
              resolve({
                redirect: { path: "" },
                isError: false,
                apiResponse: getDefaultApiResponseObj<any>(pageData),
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
