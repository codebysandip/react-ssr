import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.js";
import { CompModule } from "../core/models/route.model.js";
import { Helmet } from "react-helmet";
import { ContextData } from "src/core/models/context.model.js";
import ReactSsrApp from "src/index.js";
import { ssrConfig } from "src/react-ssr.config.js";
import { Component } from "react";
import { getWebpackBuildHash } from "./functions/get-webpack-build-hash.js";
import jsBeautify from "js-beautify";
import { Empty } from "core/components/empty/empty.component.js";

const hashObj = getWebpackBuildHash();
/**
 * Base HTML template.
 * This component will use as index.html
 */
class HtmlTemplate extends Component<HtmlTemplateProps> {
  public render() {
    const helmet = Helmet.renderStatic();
    const ssrDataScript = `
        window.__SSRDATA__ = ${JSON.stringify(this.props.ssrData)};
        `;
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
          <link
            href={`/assets/css/style${!process.env.IS_LOCAL ? "." + hashObj?.styleHash : ""}.css`}
            rel="stylesheet"
          />
          {helmet.style.toComponent()}
          {helmet.title.toComponent()}
          {helmet.link.toComponent()}
          {helmet.meta.toComponent()}
        </head>
        <body {...helmetBody}>
          {helmet.noscript.toComponent()}
          <div id="root" dangerouslySetInnerHTML={{ __html: this.props.html }}></div>
          <script dangerouslySetInnerHTML={{ __html: ssrDataScript }}></script>
          <script src={`/client${!process.env.IS_LOCAL ? "." + hashObj?.clientJsHash : ""}.js`}></script>
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
 * @param Component component to render
 * @param props Page props {@link ApiResponse<PageData>}
 * @param url request url
 * @returns rendered HTML
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
  let html = renderToString(<HtmlTemplate ssrData={ctx.ssrData || ctx.pageData} html={innerHtml}></HtmlTemplate>);
  if (process.env.IS_LOCAL) {
    html = jsBeautify.html_beautify(html);
  }
  return html;
}
