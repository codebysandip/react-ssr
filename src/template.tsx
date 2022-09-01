import { Response } from "express";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.js";
import { App } from "./app.js";
import { PageData } from "./core/models/page-data.js";
import ServerError from "pages/error/500/500.component.js";
import { getHtmlEndPart, getHtmlMidPart, getHtmlStartPart } from "./ssr/functions/getHtml.js";
import { Writable } from "stream";
import { Provider } from "react-redux";
import { EnhancedStore } from "@reduxjs/toolkit";
import { CompModule } from "./core/models/route.model.js";

class HtmlWritable extends Writable {
  private resp: Response;
  private chunks: any = [];
  private html = "";
  constructor(resp: Response) {
    super();
    this.resp = resp;
  }

  getHtml() {
    return this.html;
  }

  _write(chunk: any, encoding: BufferEncoding, callback: () => void) {
    this.chunks.push(chunk);
    // console.log("chunk!!", Buffer.from(chunk).toString());
    this.resp.write(chunk);
    callback();
  }

  _final(callback: any) {
    this.html = Buffer.concat(this.chunks).toString();
    callback();
  }
}
/**
 * Get rendered HTML
 * @param Component component to render
 * @param props Page props {@link PageData}
 * @param url request url
 * @param isError isError page
 * @returns rendered HTML
 */
export function pipeHtml(
  resp: Response,
  module: CompModule,
  props: PageData,
  url: string,
  isError: boolean,
  doCache: boolean,
  store: EnhancedStore,
) {
  const htmlMidPart = getHtmlMidPart(props);
  resp.write(htmlMidPart);
  let didError = isError;
  const writeable = new HtmlWritable(resp);
  const stream = renderToPipeableStream(
    <StaticRouter location={url}>
      <Provider store={store}>
        <App module={module} pageProps={props} />
      </Provider>
    </StaticRouter>,
    {
      onShellReady() {
        resp.statusCode = didError ? 500 : 200;

        stream.pipe(writeable);
      },
      onShellError() {
        console.log("onShellError!!");
        resp.statusCode = 500;
        const errorHtmlStream = renderToPipeableStream(<ServerError />);
        errorHtmlStream.pipe(writeable);
      },
      onError(err) {
        console.log("error!!", err);
        didError = true;
        url = "/500";
      },
    },
  );
  writeable.on("finish", () => {
    // const html = writeable.getHtml();
    // console.log("html!!", html);
    // resp.write(html);
    const htmlEndPart = getHtmlEndPart(props, didError, url, store);
    resp.write(htmlEndPart);
    resp.end();
    if (!didError && doCache) {
      staticPageCache.set(url, getHtmlStartPart() + htmlMidPart + writeable.getHtml() + htmlEndPart);
    }
  });
}
