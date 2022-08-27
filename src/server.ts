import express from "express";
import { join } from "path";

import { proxyMiddleware } from "src/ssr/middlewares/proxy-middleware.js";
import bodyParser from "body-parser";
import { StaticRoute } from "./ssr/middlewares/static-files.middleware.js";
import { XMLHttpRequest } from "./ssr/functions/XMLHttpRequest.js";
import { processRequest } from "./ssr/middlewares/process-request.middleware.js";
import NodeCache from "node-cache";
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

/**
 * reload module is used for reload of browser when there is change
 * in React or Node
 */
const reload = require("reload");

// support for XMLHttpRequest on node
(global as any).XMLHttpRequest = XMLHttpRequest;


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
  // If api is not available and you want to return dummy response
  // create a test api in test-api.ts and add here
  // Don't forget to remove proxy otherwise response will alaways come from test api
  app.get("/api/home", proxyMiddleware(process.env.LOCAL_API_SERVER));
}
// proxy to api to tackle cors problem
app.all("/api/*", proxyMiddleware(process.env.API_BASE_URL || ""));

// Get all request of node server
app.get("*", processRequest(staticPageCache));
