import express from "express";
import { join } from "path";

import { proxyMiddleware } from "src/ssr/middlewares/proxy-middleware.js";
import bodyParser from "body-parser";
import { StaticRoute } from "./middlewares/static-files.middleware.js";
import { XMLHttpRequest } from "./functions/XMLHttpRequest.js";
import { processRequest } from "./middlewares/process-request.middleware.js";
import NodeCache from "node-cache";
import WebpackDevMiddleware from "webpack-dev-middleware";
import WebpackHotMiddleware from "webpack-hot-middleware";
import webpack from "webpack";
import webpackDevConfig from "../../config/webpack.dev.js";
import webpackProdConfig from "../../config/webpack.prod.js";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

// support for XMLHttpRequest on node
(global as any).XMLHttpRequest = XMLHttpRequest;
(global as any).staticPageCache = new NodeCache();

// const staticPageCache = new NodeCache();
const app = express();

const isLocal = JSON.parse(process.env.IS_LOCAL);
require("dotenv").config();

if (isLocal) {
  const env = process.env.ENV;
  let webpackClientConfig: any;
  const baseEnv = { IS_LOCAL: process.env.IS_LOCAL, IS_SERVER: "false", ENV: env };
  if (env === "development") {
    webpackClientConfig = webpackDevConfig(baseEnv, {});
  } else {
    webpackClientConfig = webpackProdConfig(baseEnv, {});
  }
  const compiler = webpack(webpackClientConfig, () => {
    console.log("client file changed!!");
  });

  app.use(
    WebpackDevMiddleware(compiler, {
      publicPath: webpackClientConfig.output.publicPath,
      serverSideRender: true,
      writeToDisk: true,
    }),
  );

  app.use(
    WebpackHotMiddleware(compiler, {
      heartbeat: 10000,
    }),
  );
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// eslint-disable-next-line @typescript-eslint/no-var-requires

if (process.env.IS_LOCAL === "true") {
  // Following code is just for reference
  // If api is not available and you want to return dummy response
  // create a test api in test-api.ts and add here
  // Don't forget to remove proxy otherwise response will alaways come from test api
  app.get("/api/home", proxyMiddleware(process.env.LOCAL_API_SERVER));
}

app.get("*.(css|js|svg|jpg|woff|woff2|json)", StaticRoute);

// Tell express for public folder
app.use(express.static(join(process.cwd(), "build/public")));

// proxy to api to tackle cors problem
app.all("/api/*", proxyMiddleware(process.env.API_BASE_URL || ""));

// Get all request of node server
app.get("*", processRequest());
const PORT = process.env.PORT || 5000;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
  });
};
startServer();
