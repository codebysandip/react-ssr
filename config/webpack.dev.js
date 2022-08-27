import { merge } from "webpack-merge";
import { isServerFn } from "./functions/helper-functions.js";
import commonConfig from "./webpack.common.js";
import webpack from "webpack";
import { getDevServerConfig } from "./functions/get-devServer-config.js";

/**
 * Dev config for webpack. This build should not use for production.
 * It's for local development only
 * @param {[key:string]: string} env environment key value pair provided when running webpack command
 * @param {*} args args
 * @returns dev env webpack config
 */
const devConfig = (env) => {
  const isServer = isServerFn(env);
  const plugins = [];
  if (!isServer) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }
  const config = {
    mode: "development",
    plugins,
    optimization: {
      minimize: false,
      splitChunks: false,
    },
    devtool: "inline-source-map",
  };
  if (!isServer) {
    config.devServer = getDevServerConfig();
  }
  return config;
};

const config = (env, args) => {
  return merge(commonConfig(env, args), devConfig(env));
};
export default config;
