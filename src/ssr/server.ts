import express from "express";
import { join } from "path";

import { proxyMiddleware } from "src/ssr/middlewares/proxy-middleware.js";
import bodyParser from "body-parser";
import { StaticRoute } from "./middlewares/static-files.middleware.js";
import { processRequest } from "./middlewares/process-request.middleware.js";
import NodeCache from "node-cache";
import { createRequire } from "node:module";
import { configureHttpClient } from "src/core/functions/configure-httpclient.js";

const require = createRequire(import.meta.url);

(global as any).staticPageCache = new NodeCache();
// page components can use metaJson to load page css on before loading of client Js
// this will enable fix the issue of CLS. Without css page will render without styling
global.metaJson = { mainJs: "", mainStyle: "", chunkCss: {} };

const app = express();

require("dotenv").config();

configureHttpClient();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// eslint-disable-next-line @typescript-eslint/no-var-requires
if (process.env.IS_LOCAL) {
  // Following code is just for reference
  // If api is not available and you want to return dummy response
  // create a test api in test-api.ts and add here
  // Don't forget to remove proxy otherwise response will alaways come from test api
  app.get("/api/products", proxyMiddleware(process.env.LOCAL_API_SERVER));
}

app.get("*.(css|js|svg|jpg|woff|woff2|json)", StaticRoute);

// Tell express for public folder
app.use(express.static(join(process.cwd(), "build/public")));

// proxy to api to tackle cors problem
app.all("/api/*", proxyMiddleware(process.env.API_BASE_URL || ""));

// Get all request of node server
app.get("*", processRequest());
const PORT = (process.env.IS_LOCAL ? 5001 : (process.env.PORT || 5000));

const startServer = () => {
  app.listen(PORT, () => {
    if (!process.env.IS_LOCAL) {
      console.log(`App listening on port: ${PORT}`);
    }
  });
};
startServer();
