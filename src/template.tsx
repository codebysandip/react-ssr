import React, { Component, ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { App } from "./app";
import { PageData } from "./core/models/page-data";
import { ApiResponse } from "./core/models/api-response";
import { getWebpackBuildHash } from "./ssr/functions/get-webpack-build-hash";

const hashObj = getWebpackBuildHash();

/**
 * Base HTML template.
 * This component will use as index.html
 */
export class HtmlTemplate extends Component<HtmlTemplateProps> {
  public render() {
    const script = `
        window.pageProps = ${JSON.stringify(this.props.pageProps)};
        `;
    const pageProps = this.props.pageProps.data;
    // for non SSR pages or for static pages default title will use
    // Change Default Title here
    const title = pageProps?.seo?.title || "React SSR";
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1.0, user-scalable=0"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            href={`/assets/css/style${
              process.env.IS_LOCAL === "false" ? "." + hashObj?.styleHash : ""
            }.css`}
            rel="stylesheet"
          />
          <title>{title}</title>
        </head>
        <body>
          <div id="root">{this.props.children}</div>
          <script dangerouslySetInnerHTML={{ __html: script }}></script>
          <script
            src={`/client${process.env.IS_LOCAL === "false" ? "." + hashObj?.clientJsHash : ""}.js`}
          ></script>
          {JSON.parse(process.env.IS_LOCAL) && <script src="/reload/reload.js"></script>}
        </body>
      </html>
    );
  }
}

export interface HtmlTemplateProps {
  children: ReactNode;
  pageProps: ApiResponse<PageData>;
}

/**
 * Get rendered HTML
 * @param Component component to render
 * @param props Page props {@link ApiResponse<PageData>}
 * @param url request url
 * @returns rendered HTML
 */
export function getHtml(Component: any, props: ApiResponse<PageData>, url: string, isSSR = true) {
  const html = renderToString(
    <HtmlTemplate pageProps={props}>
      {isSSR ? (
        <StaticRouter location={url}>
          <App comp={Component} pageProps={props} />
        </StaticRouter>
      ) : (
        <Component {...(props || {})} />
      )}
    </HtmlTemplate>,
  );
  return html;
}
