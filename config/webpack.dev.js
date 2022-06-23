/** @type {import('webpack').Configuration} */

const webpack = require("webpack");

const nodeExternals = require("webpack-node-externals");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const WebpackEventPlugin = require("./webpack-event-plugin");

const rootPath = process.cwd();

function getPath(relativePath) {
    return `${rootPath}/${relativePath}`;
}
module.exports = (env) => {
    const isServer = JSON.parse(env.IS_SERVER || "false");
    const isLocal = JSON.parse(env.IS_LOCAL || "false");
    const clientBuildPath = getPath("build/public");
    const outFolder = isServer ? getPath("build") : clientBuildPath;
  
    const entry = {};
    if (isServer) {
        entry.server = getPath("src/server.ts");
    } else {
        entry.client = getPath("src/client.tsx");
    }
    const definePluginObj = {};
    Object.keys(env).forEach(key => {
      definePluginObj[`process.env.${key}`] = JSON.stringify(env[key]);
    });
    const plugins = [
        new webpack.DefinePlugin(definePluginObj)
    ];
    plugins.push(new WebpackEventPlugin({
        command: `nodemon --inspect --signal SIGHUP --delay 2000ms --watch restart ${getPath("build")}/server.js`,
        env
      }))

    if (isServer) {
        plugins.push(
            new CleanWebpackPlugin(),
            new IgnoreEmitPlugin(/\.(css|bundle.js)$/)
        );
        if (isLocal) {
            // plugins.push(new NodemonPlugin({
            //     script: getPath("build/server.js"),
            //     watch: getPath("build"),
            //     signal: "SIGHUP",
            //     delay: "1000"
            //   }))
        // }
        }
    } else {
        plugins.push(new webpack.ProvidePlugin({
            process: "process/browser"
          }));
    }

    const config = {
        entry,
        output: {
            filename: `[name]${!isLocal && !isServer ? ".[contentHash]" : ""}.js`,
            chunkFilename: `[name]${!isLocal && !isServer ? ".[contentHash]" : ""}.chunk.js`,
            path: outFolder,
            publicPath: "/"
        },
        mode: isLocal ? "development" : "production",
        watch: isLocal,
        resolve: {
            alias: {
                src: getPath("src"),
                core: getPath("src/core"),
                pages: getPath("src/pages")
            },
            extensions: [".ts", ".tsx"]
            // fallback: {
            //     url: false,
            //     path: false,
            //     util: false,
            //     stream: require.resolve("stream-browserify")
            // }
        },
        watchOptions: {
            ignored: /node_modules/,
        },
        optimization: {
            minimize: false,
            splitChunks: false,
        },
        devtool: "inline-source-map",
        target: isServer ? "node" : "web",
        externals: isServer ? [nodeExternals()] : [],
        externalsPresets: {node: isServer},
        module: {
            rules: [
                {
                    test: /.(ts|tsx)$/,
                    exclude: "/node_modules/",
                    use: [
                        {
                          loader: 'ts-loader',
                          options: {
                            configFile: 'tsconfig.json',
                          }
                        }
                      ],
            
                }
            ]
        },
        plugins
    };
    // console.log("webpack config!!", config);
    return config;
}