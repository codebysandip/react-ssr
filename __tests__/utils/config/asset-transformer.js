import { basename } from "path";

export default {
  process(_src, filename, _config, _options) {
    return {
      code: `export default ${JSON.stringify(basename(filename))};`,
    };
  },
};
