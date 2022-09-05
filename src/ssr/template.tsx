import { Response } from "express";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.js";
import { PageData } from "../core/models/page-data.js";
import ServerError from "pages/error/500/500.component.js";
import { getHtmlEndPart, getHtmlMidPart, getHtmlStartPart } from "./functions/getHtml.js";
import { Writable } from "stream";
import { CompModule } from "../core/models/route.model.js";
import { Helmet, HelmetData } from "react-helmet";
import { ROUTE_500 } from "src/const.js";
import { ContextData } from "src/core/models/context.model.js";
import ReactSsrApp from "src/index.js";
import { ssrConfig } from "src/react-ssr.config.js";

class HtmlWritable extends Writable {
  private resp: Response;
  private chunks: any[] = [];
  private html = "";
  public helmet!: HelmetData;

  constructor(resp: Response) {
    super();
    this.resp = resp;
  }

  getHtml() {
    return this.html;
  }

  _write(chunk: any, encoding: BufferEncoding, callback: () => void) {
    if (!this.chunks.length) {
      this.helmet = Helmet.renderStatic();
      this.resp.write(getHtmlMidPart(this.helmet));
    }
    this.chunks.push(chunk);
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
  ctx: ContextData,
  module: CompModule,
  props: PageData,
  url: string,
  isError: boolean,
  doCache: boolean,
) {
  let didError = isError;
  const writeable = new HtmlWritable(ctx.res as Response);
  const stream = renderToPipeableStream(
    <StaticRouter location={url}>
      <ReactSsrApp module={module} ctx={ctx} />
    </StaticRouter>,
    {
      onShellReady() {
        stream.pipe(writeable);
      },
      onShellError() {
        console.log("onShellError!!");
        const errorHtmlStream = renderToPipeableStream(<ServerError />);
        errorHtmlStream.pipe(writeable);
      },
      onError(err) {
        console.log("error!!", err);
        didError = true;
        url = ROUTE_500;
      },
    },
  );
  writeable.on("finish", () => {
    if (ssrConfig.getSsrData) {
      ctx.ssrData = ssrConfig.getSsrData(ctx);
    }
    const htmlEndPart = getHtmlEndPart(
      ctx.ssrData || ctx.pageData || {},
      didError,
      url,
      writeable.helmet.script.toString(),
    );
    (ctx.res as Response).write(htmlEndPart);
    (ctx.res as Response).end();
    if (!didError && doCache) {
      staticPageCache.set(
        url,
        getHtmlStartPart() + getHtmlMidPart(writeable.helmet) + writeable.getHtml() + htmlEndPart,
      );
    }
  });
}
