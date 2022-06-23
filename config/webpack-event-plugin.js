const pluginName = 'WebpackEventPlugin';
const shell = require('shelljs');
const fs = require("fs");
const os = require("os");
const tempDir = os.tmpdir();
const path = require("path");

class WebpackEventPlugin {
    constructor(options = {}) {
        this.options = options;
    }

    getPath() {
        return path.join(tempDir, "build-data.json");
    }

    readTempFile() {
        return JSON.parse(fs.readFileSync(this.getPath()))
    }

    writeTempFile(data) {
        fs.writeFileSync(this.getPath(), JSON.stringify(data));
    }

    restart() {
        const file = path.join(process.cwd(), "restart");
        fs.writeFileSync(file, Math.random().toString());
        console.log("Server restarting...");
    }

    apply(/** @type {import('webpack').Compiler} */ compiler) {
        compiler.hooks.initialize.tap(pluginName, (compilation) => {
            this.writeTempFile({
                isServerBuildCompleted: false,
                isClientBuildCompleted: false,
                isFirst: true
            });
        });
        compiler.hooks.done.tap(pluginName, (/** @type {import('webpack').Stats} */stats) => {
            const buildData = this.readTempFile();
            if (!buildData.isFirst && (stats.compilation.emittedAssets.has("server.js") || stats.compilation.emittedAssets.has("client.js"))) {
                this.restart();
            }
            if (JSON.parse(this.options.env.IS_SERVER || "false")) {
                buildData.isServerBuildCompleted = true;
                this.writeTempFile(buildData);
            }
            if (!JSON.parse(this.options.env.IS_SERVER || "false")) {
                buildData.isClientBuildCompleted = true;
                this.writeTempFile(buildData);
            }
            if (stats.compilation.errors.length) {
                return;
            }

            if (buildData.isClientBuildCompleted && buildData.isServerBuildCompleted){
                if (buildData.isFirst) {
                    console.log("Server starting!!");
                    shell.exec(this.options.command, {
                        async: true,
                        cwd: process.cwd()
                    });
                } else {
                    this.restart();
                }
                this.writeTempFile({
                    isServerBuildCompleted: false,
                    isClientBuildCompleted: false,
                    isFirst: false
                });      
            }
        });
    }
}

module.exports = WebpackEventPlugin;