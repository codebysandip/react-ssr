import React, { Component, ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { App } from "./app";
import { PageData } from "./core/models/page-data";
import { Routes } from "./routes";

export class HtmlTemplate extends Component<HtmlTemplateProps, HtmlTemplateState> {
    public render() {
        const script = `
        window.pageProps = ${JSON.stringify(this.props.pageProps || {})};
        `;
        return(
            <html>
                <head>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
                    <title>{this.props.pageProps.seo.title}</title>
                </head>
                <body>
                    <div id="root">
                        {this.props.children}
                    </div>
                    <script dangerouslySetInnerHTML={{__html: script }}>
                    </script>
                    <script src="/client.js"></script>
                    <script src="/reload/reload.js"></script>
                </body>
            </html>
        )
    }
}


export interface HtmlTemplateProps {
    children: ReactNode;
    pageProps: PageData;
}
export interface HtmlTemplateState {}

export function getHtml(Component: any, props: PageData, url: string) {
    const html = renderToString(
        <HtmlTemplate pageProps={props}>
            <StaticRouter location={url}>
                <App comp={Component} routes={Routes} pageProps={props} />
            </StaticRouter>
        </HtmlTemplate>
    );
    return html;
}
