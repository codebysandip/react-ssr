import { ROUTE_500 } from "src/const.js";
import { ssrConfig } from "src/react-ssr.config.js";

import { ApiResponse } from "../models/api-response.js";
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
    const getInitialProps = Component.getInitialProps || module.getInitialProps;

    if (ssrConfig.preInitialProps) {
      ssrConfig.preInitialProps(ctx);
    }

    // get page data
    if (getInitialProps) {
      // call page/route getInitialProps static method to get async data to render page
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
              redirect = ssrConfig.validateApiResponse(result[0] as ApiResponse<PageData>, ctx);
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
