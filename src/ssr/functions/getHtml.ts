import { getWebpackBuildHash } from "./get-webpack-build-hash.js";
import { HelmetData } from "react-helmet";

const hashObj = getWebpackBuildHash();

/**
 * getHtmlStartPart returns static head part of HTML
 * @returns string
 */
export function getHtmlStartPart() {
  return `
<html>
<head>
  <meta charSet="utf-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1.0, user-scalable=0"
  />
  <link rel="shortcut icon" href="/favicon.ico" />
  <link href="/assets/css/style${
    process.env.IS_LOCAL === "false" ? "." + hashObj?.styleHash : ""
  }.css" rel="stylesheet" />
`;
}

/**
 * getHtmlMidPart returns dynamic head part and partial body part
 * @param props PageData
 * @returns string
 */
export function getHtmlMidPart(helmet: HelmetData) {
  return `
  ${helmet.title.toString()}
  ${helmet.meta.toString()}
  ${helmet.link.toString()}
</head>
<body ${helmet.bodyAttributes.toString()}>
  ${helmet.noscript.toString()}
  <div id="root">
  `;
}

/**
 * getHtmlEndPart returns scripts of body
 * @param props PageData
 * @param isError Is Error Page
 * @param url url of error page
 * @returns string
 */
export function getHtmlEndPart(ssrData: any, isError: boolean, url: string, scripts = "") {
  return `
  </div>
  <script async src="/client${process.env.IS_LOCAL === "false" ? "." + hashObj?.clientJsHash : ""}.js"></script>
  <script>
  window.__SSRDATA__ = ${JSON.stringify(ssrData, null, 2)}
  if(${isError}) {
    window.location.replace("${url}");
  }
  </script>
  ${scripts}
  </body>
  </html>
`;
}
