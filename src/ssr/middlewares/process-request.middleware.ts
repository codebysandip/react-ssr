import { ApiResponse } from "src/core/models/api-response";
import { sendResponse } from "src/ssr/functions/send-response";
import { Empty } from "core/components/empty/empty.component";
import { getRoute } from "core/functions/get-route";
import { Observable } from "rxjs";
import { getHtml } from "src/template";
import { createContextServer } from "core/functions/create-context";
import { IRedirect, PageData } from "core/models/page-data";
import { Request, Response } from "express";

/**
 * Process all get requests
 * @param staticPageCache node-cache object
 * @returns void
 */
export const processRequest = (staticPageCache: any) => {
  return (req: Request, resp: Response) => {
    // match route from React routes
    const route = getRoute(req.path);
    // if no match found redirect client to 404(not found) page
    if (!route) {
      resp.redirect("/404");
      return;
    }
    if (route.static || !route.isSSR) {
      const html = staticPageCache.get(req.url);
      if (html) {
        sendResponse(html, resp, req);
        return;
      }
    }

    // check if route is for SSR
    // if not send only template.
    if (!route.isSSR) {
      const props: ApiResponse<PageData> | PageData = { status: 200, data: {} };
      const html = getHtml(Empty, props, req.url, false);
      sendResponse(html, resp, req);
      return;
    }
    // get component asychronously
    route.component().then(async (dComp) => {
      const Component = dComp.default;
      let props: ApiResponse<any> | IRedirect = { status: 200, data: {} };
      const sendHtml = () => {
        if (resp.headersSent) {
          return;
        }
        if ((props as IRedirect).redirect) {
          resp.redirect((props as IRedirect).redirect?.path || "/");
        } else if (
          (props as ApiResponse<any>).status === 401 ||
          (props as ApiResponse<any>).status === 403
        ) {
          // logout and naviage to login page
          // for now redirecting to 500 but can take step here
          resp.redirect("/500");
        } else if (
          (props as ApiResponse<any>).status.toString().startsWith("5") ||
          (props as ApiResponse<any>).status === 0
        ) {
          resp.redirect("/500");
        } else if ((props as ApiResponse<any>).status.toString().startsWith("4")) {
          // client err
          // [TODO] for now redirecting to 500 but can take step here
          resp.redirect("/500");
        } else {
          try {
            const html = getHtml(Component, props as ApiResponse<any>, req.url);
            if (route.static) {
              staticPageCache.set(req.url, html);
            }
            sendResponse(html, resp, req);
          } catch (err: any) {
            console.log("Error in rendering !!", err);
            resp.redirect("/500");
          }
        }
      };
      // get page data
      if (Component.getInitialProps) {
        const ctx = createContextServer(req, resp);

        // call page/route getInitialProps static method to get sync data to render page
        // this data will pass as props to page/route component
        const initialProps = (Component as SsrComponent).getInitialProps(ctx);
        if (initialProps instanceof Observable) {
          initialProps.subscribe({
            next: (prop) => {
              if (prop && typeof prop.status === "number") {
                props = prop;
              }
              sendHtml();
            },
            error: (err) => {
              console.error(`Error in getInitialProps of ${req.url}. Error: ${err}`);
              resp.redirect("/500");
            },
          });
        } else if (initialProps.redirect && initialProps.redirect.path) {
          props = initialProps;
          sendHtml();
        } else {
          sendHtml();
        }
      } else {
        sendHtml();
      }
    });
  };
};
