import { Response } from "express";
import { renderToPipeableStream, renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.js";
import { App } from "./app.js";
import { PageData } from "./core/models/page-data.js";
import ServerError from "pages/error/500/500.component.js";
import { getHtmlEndPart, getHtmlMidPart, getHtmlStartPart } from "./ssr/functions/getHtml.js";
import { Writable } from "stream";

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
 * @param props Page props {@link ApiResponse<PageData>}
 * @param url request url
 * @param isError isError page
 * @returns rendered HTML
 */
export function pipeHtml(
  resp: Response,
  Component: any,
  props: PageData,
  url: string,
  isError: boolean,
  doCache: boolean,
) {
  const htmlMidPart = getHtmlMidPart(props);
  resp.write(htmlMidPart);
  const htmlEndPart = getHtmlEndPart(props, isError, url);
  let didError = isError;
  const writeable = new HtmlWritable(resp);
  const stream = renderToPipeableStream(
    <StaticRouter location={url}>
      <App comp={Component} pageProps={props} />
    </StaticRouter>,
    {
      onShellReady() {
        resp.statusCode = didError ? 500 : 200;

        stream.pipe(writeable);
      },
      onShellError() {
        console.log("onShellError!!");
        resp.statusCode = 500;
        const errorHtml = renderToString(<ServerError />);
        resp.send(errorHtml + htmlEndPart);
      },
      onError(err) {
        console.log("error!!", err);
        didError = true;
      },
    },
  );
  writeable.on("finish", () => {
    // const html = writeable.getHtml();
    // console.log("html!!", html);
    // resp.write(html);
    resp.write(htmlEndPart);
    resp.end();
    if (!isError && doCache) {
      staticPageCache.set(url, getHtmlStartPart() + htmlMidPart + writeable.getHtml() + htmlEndPart);
    }
  });
}
