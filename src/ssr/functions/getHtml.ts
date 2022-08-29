import { PageData } from "src/core/models/page-data.js";
import { getWebpackBuildHash } from "./get-webpack-build-hash.js";

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
export function getHtmlMidPart(props: PageData) {
  return `
  // <meta name="description" content="${props.seo?.metaData?.description || ""}" />
  // <meta name="keywords" content="${props.seo?.metaData?.keywords || ""}" />
  <title>${props.seo?.title || "React SSR"}</title>
</head>
<body>
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
export function getHtmlEndPart(props: PageData, isError: boolean, url: string) {
  return `
  </div>
  <script async src="/client${process.env.IS_LOCAL === "false" ? "." + hashObj?.clientJsHash : ""}.js"></script>
  <script>
  window.pageProps = ${JSON.stringify(props)};
  if(${isError}) {
    window.location.replace("${url}");
  }
  </script>
  </body>
  </html>
`;
}
