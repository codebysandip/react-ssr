const WebpackLocalNodeServerPlugin = require("./webpack-local-node-server.plugin");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const { isServerFn, isLocalFn, getPath } = require("./helper-functions");
const TerserPlugin = require("terser-webpack-plugin");
const MetaInfoPlugin = require("./meta-info.plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/**
 * Prod config for webpack. This build will use for production.
 * @param {[key:string]: string} env environment key value pair provided when running webpack command
 * @param {*} args args
 * @returns prod env webpack config
 */
const prodConfig = (env, args) => {
    const isServer = isServerFn(env);
    const plugins = [];
    if (!isServer) {
        plugins.push(
            new MetaInfoPlugin({ path: getPath("build/meta.json") }),
            new CompressionPlugin({
                filename: '[file].gz[query]',
                algorithm: 'gzip',
                test: /\.(js|css|html|svg|woff|woff2|jpg)$/,
                // compressionOptions: { level: 11 },
                minRatio: Number.MAX_SAFE_INTEGER, // to compress all assets because we are serving files based on encoding support of browser
                deleteOriginalAssets: false,
              }),
              new CompressionPlugin({
                filename: '[file].br[query]',
                algorithm: 'brotliCompress',
                test: /\.(js|css|html|svg|woff|woff2|jpg)$/,
                // compressionOptions: { level: 11 },
                minRatio: Number.MAX_SAFE_INTEGER, 
                deleteOriginalAssets: false,
              }),   
              new BundleAnalyzerPlugin({
                analyzerMode: "static",
                openAnalyzer: false
              })     
        );
    }
    return {
        mode: "production",
        plugins,
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    test: /\.js(\?.*)?$/i,
                    parallel: 2,
                    terserOptions: {
                        ie8: false,
                        safari10: false,
                        ecma: "2016",
                        output: {
                            comments: false
                        },
                    },
                    extractComments: false,
                })
            ]
        }
    }
};

module.exports = (env, args) => {
    return merge(commonConfig(env, args), prodConfig(env, args));
}
