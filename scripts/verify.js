import * as logger from "./logger.js";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { existsSync } from "node:fs";
const require = createRequire(import.meta.url);

const packageJson = require(resolve(process.cwd(), `package.json`));

const depsList = ["", ...Object.keys(packageJson.devDependencies), ...Object.keys(packageJson.dependencies)];
const reqList = [];

depsList.every((dep) => {
  const nodeModulesPath = resolve(process.cwd(), `node_modules/${dep}`);
  if (!existsSync(nodeModulesPath)) {
    reqList.push(dep);
    if (!dep) return false;
  }
  return true;
});

if (reqList.length > 0) {
  if (reqList.includes("")) {
    logger.error("No 💩 can happen unless you run:");
    logger.warn("npm install\n");
  } else {
    logger.error("To err is human.. 🍺");
    logger.warn(`You must install: ${reqList.join(", ")}\n`);
  }
  process.exit(1);
}
