import { basename } from "path";

export default {
  process(_src, filename, _options) {
    console.log("asset-transformer!!", filename);
    return {
      code: `module.exports = ${JSON.stringify(basename(filename))};`,
    };
  },
};
