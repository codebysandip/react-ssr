import express, { Request, Response } from "express";
import { join } from "path";

import { matchPath } from "react-router";
import { Routes } from "src/routes";
import { getHtml } from "src/template";
import { createContextServer } from "./core/functions/create-context";
import { PageData } from "./core/models/page-data";
import { proxyMiddleware } from "src/ssr/middlewares/proxy-middleware";
import bodyParser from "body-parser";
import { StaticRoute } from "./ssr/middlewares/static-files.middleware";
import { Observable } from "rxjs";
import { XMLHttpRequest } from "./ssr/functions/XMLHttpRequest";
import { ServerResponse } from "./core/models/server-response";
import { sendResponse } from "./ssr/functions/send-response";
import { Empty } from "core/components/empty/empty.component";

// support for XMLHttpRequest on node
(global as any).XMLHttpRequest = XMLHttpRequest;

/**
 * reload module is used for reload of browser when there is change
 * in React or Node
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const reload = require("reload");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const NodeCache = require("node-cache");
const staticPageCache = new NodeCache();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
  });
};

const reloadServer = () => {
  reload(app)
    .then(() => startServer())
    .catch((err: Error) => {
      console.log(`Error on reload of app!!`, err.stack);
    })
    .catch((err: Error) => {
      console.log("reload app error!!!", err);
    });
};

const isLocal = JSON.parse(process.env.IS_LOCAL);
if (isLocal) {
  reloadServer();
} else {
  startServer();
}

app.get("*.(css|js|svg|jpg|woff|woff2|ico)", StaticRoute);

// Tell express for public folder
app.use(express.static(join(process.cwd(), "build/public")));

if (process.env.IS_LOCAL === "true") {
  // Following code is just for reference
  // If api is not available you want to return dummy response
  // create a test api in test-api.ts and add here
  // Don't forget to remove proxy otherwise response will alaways come from test api
  app.get("/api/home", proxyMiddleware(process.env.LOCAL_API_SERVER));
}
// proxy to api to tackle cors problem
app.all("/api/*", proxyMiddleware(process.env.API_BASE_URL || ""));

// Get all request of node server
app.get("*", async (req: Request, resp: Response) => {
  // match route from React routes
  const route = Routes.find((r) => matchPath(r.path, req.path));
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
    const html = getHtml(Empty, null, req.url, false);
    sendResponse(html, resp, req);
    return;
  }
  // get component asychronously
  route.component().then(async (dComp) => {
    const Component = dComp.default;
    let props: PageData & ServerResponse<any> = { status: 200, data: null };
    const sendHtml = () => {
      if (resp.headersSent) {
        return;
      }
      if (props.redirect) {
        resp.redirect(props.redirect.path);
      } else if (props.status === 401 || props.status === 403) {
        // logout and naviage to login page
        // for now redirecting to 500 but can take step here
        resp.redirect("/500");
      } else if (props.status.toString().startsWith("5") || props.status === 0) {
        resp.redirect("/500");
      } else if (props.status.toString().startsWith("4")) {
        // client err
        // for now redirecting to 500 but can take step here
        resp.redirect("/500");
      } else {
        try {
          const html = getHtml(Component, props, req.url);
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
            props = prop || {};
            sendHtml();
          },
          error: (err) => {
            console.error(`Error in getInitialProps of ${req.url}. Error: ${err}`);
            resp.redirect("/500");
          },
        });
      } else {
        props = initialProps;
        sendHtml();
      }
    } else {
      sendHtml();
    }
  });
});
