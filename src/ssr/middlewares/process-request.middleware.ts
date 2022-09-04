import { getRoute } from "core/functions/get-route.js";
import { pipeHtml } from "src/ssr/template.js";
import { createContextServer } from "core/functions/create-context.js";
import { PageData } from "core/models/page-data.js";
import { Request, Response } from "express";
import { getHtmlStartPart } from "../functions/getHtml.js";
import { sendResponse } from "../functions/send-response.js";
import { processRequest as processRequestServer } from "core/functions/process-request";
import SsrConfig from "src/react-ssr.config.js";

/**
 * Process all get requests
 * @param staticPageCache node-cache object
 * @returns void
 */
export const processRequest = () => {
  return (req: Request, resp: Response) => {
    // match route from React routes
    const route = getRoute(req.path);
    req.params = route.params || {};
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
    const ssrConfig = SsrConfig();

    // if (!route.isSSR) {
    //   const store = createStore();
    //   const ctx = createContextServer(req, resp, store as any);
    //   pipeHtml(resp, { default: Empty }, {}, req.path, false, true, ctx.store);
    //   return;
    // }
    // get component asychronously
    route
      .component()
      .then(async (module) => {
        const ctx = createContextServer(req, resp);
        if (ssrConfig.configureStore) {
          ssrConfig.configureStore(module, ctx);
        }

        processRequestServer(module, ctx).then((data) => {
          sendHtml(data.isError ? data.redirect.path : req.url, data.apiResponse?.data, data.isError);
        });

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
          pipeHtml(ctx, module, pageData, url, isError, route.static || false);
        };
      })
      .catch((err) => {
        console.error(`Error in fetching page component for ${route.path}. Error: ${err}`);
        throw err;
      });
  };
};
