import chromeLauncher from "chrome-launcher";
import { createRequire } from "module";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "path";
import { cwd, exit } from "process";
const require = createRequire(import.meta.url);

const shell = require("shelljs");

shell.exec("npm run build");
shell.exec("npm run pm2:prod:heroku");
startLighthouse();

function startLighthouse() {
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
    const runnerResult = await lighthouse("http://localhost:5000", options);

    // `.report` is the HTML report as a string
    const reportHtml = runnerResult.report;
    const categories = runnerResult.lhr.categories;
    writeFileSync(options.outputPath, reportHtml);
    let svgStr = readFileSync(join(cwd(), "lighthouse", "pagespeed_placeholder.svg"), {
      encoding: "utf-8",
    });

    // replace score
    svgStr = svgStr
      .replace("{performance_score}", categories.performance.score * 100)
      .replace("{accessibility_score}", categories.accessibility.score * 100)
      .replace("{best_practices_score}", categories["best-practices"].score * 100)
      .replace("{seo_score}", categories.seo.score * 100)
      .replace("{pwa_score}", categories.pwa.score * 100);

    // replace stroke
    svgStr = svgStr
      .replace(
        "{performance_stroke}",
        `${((360 * categories.performance.score) / 100) * 100}, ${
          360 - ((360 * categories.performance.score) / 100) * 100
        }`,
      )
      .replace("{accessibility_stroke}", `${((360 * categories.accessibility.score) / 100) * 100}`)
      .replace(
        "{best_practices_stroke}",
        `${((360 * categories["best-practices"].score) / 100) * 100}, ${
          360 - ((360 * categories["best-practices"].score) / 100) * 100
        }`,
      )
      .replace(
        "{seo_stroke}",
        `${((360 * categories.seo.score) / 100) * 100},${
          360 - ((360 * categories.seo.score) / 100) * 100
        }`,
      )
      .replace(
        "{pwa_stroke}",
        `${((360 * categories.pwa.score) / 100) * 100}, ${
          360 - ((360 * categories.pwa.score) / 100) * 100
        }`,
      );

    // replace gauge color
    function getColor(score) {
      if (score >= 90) {
        return "green";
      } else if (score >= 50 && score < 90) {
        return "orange";
      } else {
        return "red";
      }
    }
    svgStr = svgStr
      .replace("{performance_gauge_color}", getColor(categories.performance.score * 100))
      .replace("{accessibility_gauge_color}", getColor(categories.accessibility.score * 100))
      .replace("{best_practices_gauge_color}", getColor(categories["best-practices"].score * 100))
      .replace("{seo_gauge_color}", getColor(categories.seo.score * 100))
      .replace("{pwa_gauge_color}", getColor(categories.pwa.score * 100));

    writeFileSync(join(cwd(), "lighthouse", "pagespeed.svg"), svgStr, { encoding: "utf-8" });

    // `.lhr` is the Lighthouse Result as a JS object
    console.log("Report is done for", runnerResult.lhr.finalUrl);
    console.log("Performance score was", runnerResult.lhr.categories.performance.score * 100);
    await chrome.kill();
    shell.exec("npx pm2 delete all");
    exit();
  })();
}
