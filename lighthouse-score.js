import chromeLauncher from "chrome-launcher";
import { createRequire } from "module";
import { writeFileSync } from "node:fs";

const require = createRequire(import.meta.url);
const lighthouse = require("lighthouse");

// const config = {
//   extends: "lighthouse:default",
// };
(async () => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
  const options = {
    logLevel: "info",
    output: "html",
    outputPath: "./lighthouse-report.html",
    port: chrome.port,
    onlyCategories: ["performance", "seo"],
    screenEmulation: { width: 1280, height: 720 },
  };
  const runnerResult = await lighthouse("http://localhost:5001/", options);

  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;
  writeFileSync(options.outputPath, reportHtml);

  // `.lhr` is the Lighthouse Result as a JS object
  console.log("Report is done for", runnerResult.lhr.finalUrl);
  console.log("Performance score was", runnerResult.lhr.categories.performance.score * 100);
  await chrome.kill();
})();
