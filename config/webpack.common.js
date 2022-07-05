/** @type {import("webpack").Configuration} */

const webpack = require("webpack");

const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const IgnoreEmitPlugin = require("ignore-emit-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const { isServerFn, isLocalFn, getPath } = require("./helper-functions");
const { join } = require("path");
const WebpackLocalNodeServerPlugin = require("./webpack-local-node-server.plugin");

/**
 * Common webpack config that will used for production as well as development env
 * @param {Object} env environment key value pair
 * @returns webpack common config
 */
module.exports = (env) => {
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
    entry.server = getPath("src/server.ts");
  } else {
    /**
     * entry.server will produce client.js in build/public folder
     */
    entry.client = getPath("src/client.tsx");
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
  const miniCssChunkName = !isLocal
    ? "assets/css/[name].[contenthash].chunk.css"
    : "assets/css/[name].chunk.css";

  const plugins = [
    new webpack.DefinePlugin(definePluginObj),
    new MiniCssExtractPlugin({
      filename: miniCssFileName,
      chunkFilename: miniCssChunkName,
    }),
    new Dotenv(),
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
    plugins.push(
      new WebpackLocalNodeServerPlugin({
        command: `nodemon --inspect --watch restart build/server.js`,
        isServer: isServerFn(env),
        serverMainJs: "server.js",
        clientMainJs: "client.js",
      }),
    );
  }
  const config = {
    entry,
    output: {
      filename: `[name]${!isLocal && !isServer ? ".[contenthash]" : ""}.js`,
      chunkFilename: `[name]${!isLocal && !isServer ? ".[contenthash]" : ""}.chunk.js`,
      path: outFolder,
      publicPath: "/",
    },
    watch: isLocal,
    watchOptions: {
      ignored: /node_modules/,
    },
    resolve: {
      alias: {
        src: getPath("src"),
        core: getPath("src/core"),
        pages: getPath("src/pages"),
      },
      extensions: [".ts", ".tsx", ".js"],
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
    externals: isServer ? [nodeExternals()] : [],
    externalsPresets: { node: isServer },
    module: {
      rules: [
        {
          test: /.(ts|tsx)$/,
          exclude: "/node_modules/",
          use: [
            {
              loader: "ts-loader",
              options: {
                configFile: "tsconfig.json",
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
          use: [
            {
              loader: "file-loader",
              options: {
                name: `[path][name].[ext]`,
                emitFile: !isServer,
              },
            },
          ],
        },
      ],
    },
    plugins,
  };
  // console.log("webpack config!!", config);
  return config;
};
