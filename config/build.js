const shell = require('shelljs');

const clientScript = `npx webpack --config ./config/webpack.dev.js --env IS_LOCAL=true --env IS_SERVER=false`;
const serverScript = `npx webpack --config ./config/webpack.dev.js --env IS_LOCAL=true --env IS_SERVER=true`;

// let devStartScript = ""
// if (process.platform === "win32") {
//     devStartScript = `npx concurrently "${clientScript}" "${serverScript}"`;
// } else {
//     devStartScript = `${clientScript} & ${serverScript}`;
// }
// console.log("devStartScript!!!");
// console.log(devStartScript);

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