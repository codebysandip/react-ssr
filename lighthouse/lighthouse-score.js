import chromeLauncher from "chrome-launcher";
import { createRequire } from "module";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "path";
import { cwd } from "process";

const require = createRequire(import.meta.url);
const lighthouse = require("lighthouse");

(async () => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
  const options = {
    logLevel: "info",
    output: "html",
    outputPath: "./lighthouse/report.html",
    port: chrome.port,
    // onlyCategories: ["performance", "seo"],
    screenEmulation: { width: 1280, height: 720 },
  };
  const runnerResult = await lighthouse("https://codebysandip-react-ssr.herokuapp.com/", options);

  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;
  const categories = runnerResult.lhr.categories;
  writeFileSync(options.outputPath, reportHtml);
  let svgStr = readFileSync(join(cwd(), "lighthouse", "pagespeed_placeholder.svg"), {
    encoding: "utf-8",
  });
  svgStr = svgStr
    .replace("performance_score", categories.performance.score * 100)
    .replace("accessibility_score", categories.accessibility.score * 100)
    .replace("best_practices_score", categories["best-practices"].score * 100)
    .replace("seo_score", categories.seo.score * 100)
    .replace("pwa_score", categories.pwa.score * 100);
  writeFileSync(join(cwd(), "lighthouse", "pagespeed.svg"), svgStr, { encoding: "utf-8" });

  // `.lhr` is the Lighthouse Result as a JS object
  console.log("Report is done for", runnerResult.lhr.finalUrl);
  console.log("Performance score was", runnerResult.lhr.categories.performance.score * 100);
  await chrome.kill();
})();
