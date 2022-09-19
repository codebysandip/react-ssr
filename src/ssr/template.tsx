import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.js";
import { CompModule } from "../core/models/route.model.js";
import { Helmet } from "react-helmet";
import { ContextData } from "src/core/models/context.model.js";
import ReactSsrApp from "src/index.js";
import { ssrConfig } from "src/react-ssr.config.js";
import { Component } from "react";
import { getWebpackBuildMetaJson } from "./functions/get-webpack-build-meta-json.js";
import jsBeautify from "js-beautify";
import { Empty } from "core/components/empty/empty.component.js";

// on development env met.json will not available until CSR build will not finish
// so wait for few seconds to finish client build
setTimeout(
  () => {
    const metaJson = getWebpackBuildMetaJson();
    global.metaJson = metaJson;
  },
  process.env.IS_LOCAL ? 1000 * 2 : 0,
);

const chunkRegex = /[a-z-0-9]{2,}(\.chunk\.css)/;
/**
 * Base HTML template.
 * This component will use as index.html
 */
class HtmlTemplate extends Component<HtmlTemplateProps> {
  public render() {
    const helmet = Helmet.renderStatic();
    /* cSpell:disable-next-line */
    const ssrDataScript = `window.__SSRDATA__ = ${JSON.stringify(this.props.ssrData)};`;
    const styleLinks = helmet.link.toString();
    const match = styleLinks.match(chunkRegex);
    if (!match) {
      // [TODO] if match not found then try to get page css through Request path
    }
    const helmetBody = helmet.bodyAttributes.toComponent();
    return (
      <html {...helmet.htmlAttributes.toComponent()}>
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1.0, user-scalable=0"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link href={metaJson.mainStyle} rel="stylesheet" />
          {helmet.style.toComponent()}
          {helmet.title.toComponent()}
          {helmet.link.toComponent()}
          {helmet.meta.toComponent()}
        </head>
        <body {...helmetBody}>
          {helmet.noscript.toComponent()}
          <div id="root" dangerouslySetInnerHTML={{ __html: this.props.html }}></div>
          <script dangerouslySetInnerHTML={{ __html: ssrDataScript }}></script>
          <script src={metaJson.mainJs}></script>
          {helmet.script.toComponent()}
        </body>
      </html>
    );
  }
}

interface HtmlTemplateProps {
  ssrData: any;
  html: string;
}

/**
 * Get rendered HTML
 * @param module Module exported from page component
 * @param ctx {@link ContextData}
 * @param url url of request
 * @param isSSR flag for page will render on server or client
 * @returns
 */
export function getHtml(module: CompModule, ctx: ContextData, url: string, isSSR = true) {
  if (ssrConfig.getSsrData) {
    ctx.ssrData = ssrConfig.getSsrData(ctx);
  }

  if (!isSSR) {
    module = {
      default: Empty,
    };
  }

  const innerHtml = renderToString(
    <StaticRouter location={url}>
      <ReactSsrApp module={module} ctx={ctx} />
    </StaticRouter>,
  );
  let html = renderToString(
    <HtmlTemplate ssrData={ctx.ssrData || ctx.pageData} html={innerHtml}></HtmlTemplate>,
  );
  if (process.env.IS_LOCAL) {
    html = jsBeautify.html_beautify(html);
  }
  return html;
}
