const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const { isLocalFn } = require("./helper-functions");

/**
 * Dev config for webpack. This build should not use for production.
 * It's for local development only
 * @param {[key:string]: string} env environment key value pair provided when running webpack command
 * @param {*} args args
 * @returns dev env webpack config
 */
const devConfig = (env) => {
  const plugins = [];

  return {
    mode: "development",
    plugins,
    optimization: {
      minimize: false,
      splitChunks: false,
    },
    devtool: "inline-source-map",
  };
};

module.exports = (env, args) => {
  return merge(commonConfig(env, args), devConfig(env, args));
};
