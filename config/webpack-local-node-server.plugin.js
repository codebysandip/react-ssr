const pluginName = "WebpackLocalNodeServerPlugin";
const shell = require("shelljs");
const fs = require("fs");
const os = require("os");
const tempDir = os.tmpdir();
const path = require("path");

/**
 * WebpackLocalNodeServerPlugin manages restart of application when there is change in
 * node or React files. It prevents to reload two times of node server.
 * In case of SSR React, we build React two times. One for client and one for server.
 * Webpack watches src folder for file changes so webpack will compile two times and nodemon
 * will restart two times.
 */
class WebpackLocalNodeServerPlugin {
  constructor(options = {}) {
    this.options = options;
    this.defaultBuildData = {
      isServerBuildCompleted: false,
      isClientBuildCompleted: false,
      isFirst: true,
    };
  }

  getPath() {
    return path.join(tempDir, "build-data.json");
  }

  readTempFile() {
    return JSON.parse(fs.readFileSync(this.getPath()));
  }

  writeTempFile(data) {
    fs.writeFileSync(this.getPath(), JSON.stringify(data));
  }

  restart() {
    // write a restart file to restart nodemon
    // nodemon will watch restart file
    const file = path.join(process.cwd(), "restart");
    fs.writeFileSync(file, Math.random().toString());
    console.log("Server restarting...");
  }

  apply(/** @type {import('webpack').Compiler} */ compiler) {
    // On initialization of webpack add build data to temp file
    compiler.hooks.initialize.tap(pluginName, (compilation) => {
      this.writeTempFile(this.defaultBuildData);
    });

    // on compilation done restart/start nodemon
    compiler.hooks.done.tap(pluginName, (/** @type {import('webpack').Stats} */ stats) => {
      const buildData = this.readTempFile();
      // restart nodemon if change in only server or client js
      if (
        !buildData.isFirst &&
        (stats.compilation.emittedAssets.has(this.options.serverMainJs) ||
          stats.compilation.emittedAssets.has(this.options.clientMainJs))
      ) {
        this.restart();
      }
      // when server compilation done write build data for isServerBuildCompleted true
      if (this.options.isServer) {
        buildData.isServerBuildCompleted = true;
        this.writeTempFile(buildData);
      }

      // when client compilation done write build data for isClientBuildCompleted true
      if (!this.options.isServer) {
        buildData.isClientBuildCompleted = true;
        this.writeTempFile(buildData);
      }
      if (stats.compilation.errors.length) {
        return;
      }

      // when client and server both build completed witrhout error restart/start nodemon
      if (buildData.isClientBuildCompleted && buildData.isServerBuildCompleted) {
        if (buildData.isFirst) {
          console.log("Server starting!!");
          shell.exec(this.options.command, {
            async: true,
            cwd: process.cwd(),
          });
        } else {
          this.restart();
        }
        // after server restart/start write default build data
        this.defaultBuildData.isFirst = false;
        this.writeTempFile(this.defaultBuildData);
      }
    });
  }
}

module.exports = WebpackLocalNodeServerPlugin;
