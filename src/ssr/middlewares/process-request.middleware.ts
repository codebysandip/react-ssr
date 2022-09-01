import { ApiResponse } from "src/core/models/api-response.js";
import { getRoute } from "core/functions/get-route.js";
import { pipeHtml } from "src/template.js";
import { createContextServer } from "core/functions/create-context.js";
import { IRedirect, PageData } from "core/models/page-data.js";
import { Request, Response } from "express";
import { getHtmlStartPart } from "../functions/getHtml.js";
import { sendResponse } from "../functions/send-response.js";
import { Empty } from "core/components/empty/empty.component";
import { getAccessTokenData } from "src/core/functions/get-token.js";
import { loginSuccess } from "src/pages/auth/auth.redux.js";
import { createStore } from "src/redux/create-store.js";
import { PAGE_INVALID_RETURN_DATA } from "src/const.js";

/**
 * Validate response of api and return redirect path in case of error
 * @param response ApiResponse
 * @returns redirect path
 */
function validateApiResponse(response: ApiResponse<any>) {
  if (response.status === undefined) {
    throw new Error(PAGE_INVALID_RETURN_DATA);
  }
  if (response.status === 401 || response.status === 403) {
    // logout and naviage to login page
    // for now redirecting to 500 but can take step here
    return "/login";
  } else if (response.status.toString().startsWith("5") || response.status === 0) {
    return "/500";
  } else if (response.status.toString().startsWith("4")) {
    // client err
    // [TODO] for now redirecting to 500 but can take step here
    return "/500";
  } else {
    return "";
  }
}
/**
 * Process all get requests
 * @param staticPageCache node-cache object
 * @returns void
 */
export const processRequest = () => {
  return (req: Request, resp: Response) => {
    // match route from React routes
    const route = getRoute(req.path);
    // if no match found redirect client to 404(not found) page
    if (!route) {
      resp.redirect("/404");
      return;
    }
    if (route.static || !route.isSSR) {
      const html = staticPageCache.get(req.url) as string;
      if (html) {
        console.log("static page!!", req.url);
        sendResponse(html, resp, req);
        return;
      }
    }

    resp.setHeader("Content-type", "text/html");
    resp.write(getHtmlStartPart());
    if (!route.isSSR) {
      const store = createStore();
      const ctx = createContextServer(req, resp, store as any);
      pipeHtml(resp, { default: Empty }, {}, req.path, false, true, ctx.store);
      return;
    }
    // get component asychronously
    route
      .component()
      .then(async (module) => {
        let Component = module.default;
        const getInitialProps = Component.getInitialProps || module.getInitialProps;
        const store = createStore(module.reducer);
        const ctx = createContextServer(req, resp, store as any);
        const accessTokenData = getAccessTokenData(req);
        if (accessTokenData) {
          ctx.store.dispatch(
            loginSuccess({
              isLoggedIn: true,
              user: accessTokenData,
            }),
          );
        }

        /**
         * Send HTML back to client
         * @param url Reuest url path
         * @param pageData PageData of page
         * @param isError is error page
         */
        const sendHtml = (url: string, pageData?: PageData, isError = false) => {
          if (!pageData) {
            pageData = {};
          }
          pipeHtml(resp, module, pageData, url, isError, route.static || false, ctx.store);
        };
        // get page data
        if (getInitialProps) {
          // call page/route getInitialProps static method to get sync data to render page
          // this data will pass as props to page/route component
          const initialProps = getInitialProps(ctx);
          if (initialProps instanceof Promise) {
            // add common api calls in fork join
            // common api like header/footer api and put in PageData.header
            Promise.all([initialProps])
              .then((result) => {
                let errorPath = "";
                if ((result[0] as IRedirect).redirect) {
                  errorPath = (result[0] as IRedirect).redirect?.path || "/";
                } else {
                  errorPath = validateApiResponse(result[0] as ApiResponse<PageData>);
                }
                // uncomment this code for header api call. Also uncomment from PageData
                // if (result[1]) {
                //   errorPath = validateApiResponse(result[1] as ApiResponse<PageData>);
                //   (props as PageData).header = result[1];
                // }
                if (errorPath) {
                  // resp.statusCode = parseInt(errorPath.substring(1)) || 500;
                  console.log("errorPath!!", errorPath, resp.headersSent);
                  // resp.setHeader("location", "/500");
                  const newRoute = getRoute(errorPath);
                  newRoute?.component().then((module) => {
                    Component = module.default;
                    sendHtml(errorPath, undefined, true);
                  });
                } else {
                  const pageData: PageData = (result[0] as ApiResponse<PageData>).data;
                  sendHtml(errorPath || req.url, pageData);
                }
              })
              .catch((err) => {
                console.error(`Error in getInitialProps of ${req.url}. Error: ${err}`);
                sendHtml("/500", undefined, true);
              });
          } else {
            throw new Error("getInitialProps must return Promise");
          }
        } else {
          sendHtml(req.url);
        }
      })
      .catch((err) => {
        console.error("Error in fetching page component. ", route.path, "Error: ", err);
        // resp.redirect("/500");
      });
  };
};
