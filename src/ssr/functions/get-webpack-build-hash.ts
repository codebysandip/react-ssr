import { existsSync, readFileSync } from "fs";
import { join } from "path";

/**
 * Get hash of main js and css of webpack build.
 * This hash generated by MethInfoPlugin (config/meta-info.plugin.js)
 * @returns Hash of main css and js
 */
export function getWebpackBuildHash(): null | { clientJsHash: string; styleHash: string } {
  if (!process.env.IS_LOCAL) {
    let hashStr = "";
    const path = join(process.cwd(), "build/meta.json");
    if (existsSync(path)) {
      hashStr = readFileSync(path, { encoding: "utf8" });
    } else {
      throw new Error(`meta.json not found at path: ${path}`);
    }
    if (hashStr) {
      try {
        return JSON.parse(hashStr);
      } catch {
        throw new Error(`Invalid meta.json at path ${path}`);
      }
    } else {
      throw new Error("Empty meta.json");
    }
  }
  return null;
}
