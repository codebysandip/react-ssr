/** @type {import("webpack").Configuration} */

import webpack from "webpack";

import nodeExternals from "webpack-node-externals";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import IgnoreEmitPlugin from "ignore-emit-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import Dotenv from "dotenv-webpack";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";

import { isServerFn, isLocalFn, getPath } from "./functions/helper-functions.js";
import { join } from "path";
import { readFileSync } from "fs";

/**
 * Common webpack config that will used for production as well as development env
 * @param {Object} env environment key value pair
 * @returns webpack common config
 */
export default function (env, args, isProd = false) {
  const isWatch = JSON.parse(env.WATCH || env.IS_LOCAL);
  const packageJson = JSON.parse(readFileSync(join(process.cwd(), "package.json"), { encoding: "utf-8" }));
  const tsconfigJson = JSON.parse(readFileSync(join(process.cwd(), "tsconfig.json"), { encoding: "utf-8" }));

  /**
   * Is Build running for Server or Client
   */
  const isServer = isServerFn(env);
  /**
   * Is Build running for local development
   */
  const isLocal = isLocalFn(env);
  /**
   * React client side css, js and other static will go here after build
   */
  const clientBuildPath = getPath("build/public");
  /**
   * Output folder for client as well as server
   */
  const outFolder = isServer ? getPath("build") : clientBuildPath;

  const entry = {};
  if (isServer) {
    /**
     * entry.server will produce server.js in build folder
     */
    entry.server = getPath("src/ssr/server.ts");
  } else {
    /**
     * entry.server will produce client.js in build/public folder
     */
    entry.client = [getPath("src/client.tsx")];
    if (isLocal) {
      entry.client.push(
        "webpack-hot-middleware/client?reload=true&noInfo=true&timeout=10000",
        "/node_modules/react-refresh/runtime.js",
      );
    }
  }
  if (isLocal && isServer) {
    entry.testApi = getPath("test-api.ts");
  }
  /**
   * Add webpack env key and value to webpack DefinePlugin.
   * This will allow to replace process.env.key to value in React and Node
   */
  const definePluginObj = {};
  Object.keys(env).forEach((key) => {
    definePluginObj[`process.env.${key}`] = JSON.stringify(env[key]);
  });
  const miniCssFileName = !isLocal ? "assets/css/style.[contenthash].css" : "assets/css/style.css";
  const miniCssChunkName = !isLocal ? "assets/css/[name].[contenthash].chunk.css" : "assets/css/[name].chunk.css";
  let slash = "/";
  if (process.platform === "win32") {
    slash = "\\";
  }

  const plugins = [
    new webpack.DefinePlugin(definePluginObj),
    new MiniCssExtractPlugin({
      filename: miniCssFileName,
      chunkFilename: miniCssChunkName,
    }),
    new Dotenv(),
    new webpack.NormalModuleReplacementPlugin(/.js$/, (resource) => {
      if (resource.context.indexOf("node_modules") !== -1) {
        return;
      }
      const context = resource.context
        .replace(process.cwd(), "")
        .replace(`${slash}node_modules`, "")
        .substring(1)
        .split(slash)[0];
      if (
        // packageJson.dependencies[context] ||
        // packageJson.devDependencies[context] ||
        packageJson.dependencies[resource.request] ||
        packageJson.devDependencies[resource.request] ||
        context === "config"
      ) {
        return;
      }
      resource.request = resource.request.replace(/.js$/, "");
    }),
  ];

  if (isServer) {
    plugins.push(new CleanWebpackPlugin(), new IgnoreEmitPlugin(/\.(css)$/));
  } else {
    plugins.push(
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
    );
    plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: getPath("favicon.ico"),
            to: join(clientBuildPath, "favicon.ico"),
            force: true,
          },
        ],
      }),
    );
  }

  if (isLocal) {
    if (!isServer) {
      plugins.push(new ReactRefreshPlugin());
    }
  }

  const alias = {};
  const aliasPaths = tsconfigJson.compilerOptions.paths;
  Object.keys(aliasPaths).forEach((key) => {
    const aliasKey = key.replace("/*", "");
    alias[aliasKey] = getPath(aliasPaths[key][0].replace("/*", ""));
  });
  return {
    entry,
    output: {
      filename: `[name]${!isLocal && !isServer ? ".[contenthash]" : ""}.js`,
      chunkFilename: `[name]${!isLocal && !isServer ? ".[contenthash]" : ""}.chunk.js`,
      path: outFolder,
      publicPath: "/",
      chunkFormat: isServer ? "module" : "array-push",
    },
    experiments: {
      outputModule: true,
    },
    watch: isWatch,
    watchOptions: {
      ignored: ["**/node_modules", "**/config"],
    },
    resolve: {
      alias,
      extensions: [".ts", ".tsx", ".js", ".scss", ".css"],
      fallback: {
        // url: false,
        // path: false,
        // util: false,
        // stream: require.resolve("stream-browserify"),
        // fs: false,
        // buffer: false,
        // querystring: false,
        // http: false,
        // https: false,
      },
    },
    target: isServer ? "node" : "web",
    externals: isServer
      ? [
          nodeExternals({
            importType: function (moduleName) {
              return moduleName;
            },
          }),
          "react-helmet",
        ]
      : [],
    externalsPresets: { node: isServer },
    module: {
      rules: [
        {
          test: /.(ts|tsx)$/,
          exclude: "/node_modules/",
          use: [
            {
              loader: "swc-loader",
              options: {
                jsc: {
                  parser: {
                    syntax: "typescript",
                    dynamicImports: true,
                  },
                  // target: "es2020",
                  transform: {
                    react: {
                      runtime: "automatic",
                      refresh: isLocal && !isServer,
                    },
                  },
                },
                // isModule: true,
                // sourceMaps: isLocal,
                // inlineSourcesContent: isLocal,
                // module: {
                //   type: "es6",
                //   lazy: true,
                // },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [isServer ? "ignore-loader" : MiniCssExtractPlugin.loader, "css-loader"],
          exclude: /\.module\.css$/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: isServer
            ? ["ignore-loader"]
            : [
                // Creates `style` nodes from JS strings
                MiniCssExtractPlugin.loader,
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
              ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff2?)$/i,
          type: "asset/resource",
          generator: {
            emit: !isServer,
          },
        },
      ],
    },
    plugins,
  };
}
