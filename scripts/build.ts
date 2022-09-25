import express from "express";
import WebpackDevMiddleware from "webpack-dev-middleware";
import WebpackHotMiddleware from "webpack-hot-middleware";
import webpack from "webpack";
import webpackDevConfig from "../config/webpack.dev.js";
import webpackProdConfig from "../config/webpack.prod.js";
import { log } from "./logger.js";
import { proxyMiddleware } from "../src/ssr/middlewares/proxy-middleware.js";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const shell = require('shelljs');


const app = express();
/**
 * flag to check if server build completed for first time only
 */
let isServerBuildCompleted = false;

/**
 * start SSR app server with nodemon watch. Whenever their wil be change nodemon will restart
 * SSR node server
 */
const startAppNodeServer = () => {
  shell.exec(`nodemon --delay 2000ms --watch "build/server.js" --exec "node build/server.js"`, {
    async: true,
    cwd: process.cwd(),
  }, (code: any, stdout: any, stderr: any) => {
    console.log(code, stdout, stderr);
  });

  // start server only after server build completed
  app.listen(5000, () => {
    log(`App listening on port 5000`);
  });
}

const env = process.env.ENV;
log(`environment: ${env}`);
let webpackClientConfig: any;
let webpackServerConfig: any;

const baseEnv = { IS_LOCAL: "true", IS_SERVER: "false", ENV: env };
const isDev = env === "development" || env === "cypress";
// webpack client build
if (isDev) {
  webpackClientConfig = webpackDevConfig(baseEnv, {});
} else {
  webpackClientConfig = webpackProdConfig(baseEnv, {});
}
const compiler = webpack(webpackClientConfig, () => {
  console.log("client file changed!!");
});

// webpack server build
baseEnv.IS_SERVER = "true";
if (isDev) {
  webpackServerConfig = webpackDevConfig(baseEnv, {});
} else {
  webpackServerConfig = webpackProdConfig(baseEnv, {});
}
webpack(webpackServerConfig, () => {
  if (!isServerBuildCompleted) {
    isServerBuildCompleted = true;
    startAppNodeServer();
  }
  console.log("server file changed!!");
});

// start webpack dev server for HMR
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


// Redirect every request to SSR app
app.all("*", proxyMiddleware("http://localhost:5001"));

