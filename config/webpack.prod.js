import { merge } from "webpack-merge";
import commonConfig from "./webpack.common.js";
import { isServerFn, getPath, isLocalFn } from "./functions/helper-functions.js";
import TerserPlugin from "terser-webpack-plugin";
import CompressionPlugin from "compression-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { getDevServerConfig } from "./functions/get-devServer-config.js";
import webpack from "webpack";

/**
 * Prod config for webpack. This build will use for production.
 * @param {[key:string]: string} env environment key value pair provided when running webpack command
 * @param {*} args args
 * @returns prod env webpack config
 */
const prodConfig = (env) => {
  const isServer = isServerFn(env);
  const plugins = [];

  // on github action don't compress to save build time
  if (!isServer && process.env.GITHUB_ACTION !== "true") {
    plugins.push(
      new CompressionPlugin({
        filename: "[file].gz[query]",
        algorithm: "gzip",
        test: /\.(js|css|html|svg|woff|woff2|jpg)$/,
        // compressionOptions: { level: 11 },
        minRatio: Number.MAX_SAFE_INTEGER, // to compress all assets because we are serving files based on encoding support of browser
        deleteOriginalAssets: false,
      }),
      new CompressionPlugin({
        filename: "[file].br[query]",
        algorithm: "brotliCompress",
        test: /\.(js|css|html|svg|woff|woff2|jpg)$/,
        // compressionOptions: { level: 11 },
        minRatio: Number.MAX_SAFE_INTEGER,
        deleteOriginalAssets: false,
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false,
      }),
    );
  }
  const config = {
    mode: "production",
    plugins,
    optimization: {
      minimize: true,
      mergeDuplicateChunks: true,
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          parallel: 2,
          terserOptions: {
            ie8: false,
            safari10: false,
            ecma: 2016,
            output: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ],
    },
  };
  if (isLocalFn(env) && !isServer) {
    config.devServer = getDevServerConfig();
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }
  return config;
};

const config = (env, args) => {
  return merge(commonConfig(env, args, true), prodConfig(env));
};

export default config;
