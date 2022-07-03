const fs = require('fs');

/**
 * MetaInfoPlugin gets hash of main js and css file and 
 * saves as json into specified path.
 * Later project can use hash to serve main js and css file
 */
class MetaInfoPlugin {
  constructor(options) {
    this.options = { path: 'meta.json', ...options };
    this.metaInfo = {};
  }

  apply(compiler) {
    compiler.hooks.assetEmitted.tap(this.constructor.name, (file, { content, source, outputPath, compilation, targetPath }) => {
      if (file.match(/style.[\w].+(.css)$/)) {
        this.metaInfo.styleHash = file.split(".")[1];
      } else if (file.match(/client.[\w].+(.js)$/)) {
        this.metaInfo.clientJsHash = file.split(".")[1];
      }
    });

    compiler.hooks.done.tap(this.constructor.name, () => {
      const json = JSON.stringify(this.metaInfo);
      return new Promise((resolve, reject) => {
        fs.writeFile(this.options.path, json, 'utf8', error => {
          if (error) {
            reject(error);
            return;
          }
          resolve();
        });
      });
    })
  }
}

module.exports = MetaInfoPlugin;