const shell = require('shelljs');
const args = process.argv.slice(2);

const isLocalArg = args.find(arg => arg.startsWith("IS_LOCAL"));
const envArg = args.find(arg => arg.startsWith("ENV"));
/**
 * isLocal will tell webpack that build running on local system
 * for development
 */
let isLocal = false;
/**
 * env arg will use to decide production and development build
 * (webpack.dev.js|webpack.prod.js)
 */
let env = "development";

if (isLocalArg) {
    if (isLocalArg.split("=").length !== 2) {
        throw new Error(`IS_LOCAL is not valid. Valid values IS_LOCAL=true|false`)
    }
    isLocal = JSON.parse(isLocalArg.split("=")[1]);
}

if (envArg) {
    if (envArg.split("=").length !== 2) {
        throw new Error(`ENV is not valid. Valid values ENV=development|production`)
    }
    env = envArg.split("=")[1];
}
/**
 * Build React for client side(src/client.tsx)
 */
const clientScript = `npx webpack --config ./config/webpack.${env === "development" ? "dev" : "prod"}.js --env IS_LOCAL=${isLocal} --env IS_SERVER=false`;
/**
 * Build React for server side(src/server.ts)
 */
const serverScript = `npx webpack --config ./config/webpack.${env === "development" ? "dev" : "prod"}.js --env IS_LOCAL=${isLocal} --env IS_SERVER=true`;

console.log("clientScript", clientScript);
console.log("serverScript", serverScript);
shell.exec(serverScript, {
    async: true,
    cwd: process.cwd(),
}, (code, stdout, stderr) => {
    console.log("error!!", code, stdout, stderr);
});
shell.exec(clientScript, {
    async: true,
    cwd: process.cwd(),
}, (code, stdout, stderr) => {
    console.log("error!!", code, stdout, stderr);
});