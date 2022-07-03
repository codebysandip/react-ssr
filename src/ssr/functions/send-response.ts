import { Request, Response } from "express";
import zlib from "zlib";

/**
 * send response function will compress response and send back to client
 * @param response response HTML
 * @param res {@link Response}
 * @param req {@link Request}
 * @param contentType content type of response
 */
export function sendResponse(
  response: string | Buffer,
  res: Response,
  req: Request,
  contentType = "text/html",
) {
  const acceptEncoding = req.headers["accept-encoding"] as string;
  res.set("Content-Type", contentType);
  if (/\bbr\b/.test(acceptEncoding)) {
    zlib.brotliCompress(response, (err: any, buffer) => {
      if (err) {
        res.send(response);
        return;
      }
      res.set("Content-Encoding", "br");
      res.send(buffer);
    });
  } else if (/\bdeflate\b/.test(acceptEncoding)) {
    zlib.deflate(response, (err: any, buffer) => {
      if (err) {
        res.send(response);
        return;
      }
      res.set("Content-Encoding", "deflate");
      res.send(buffer);
    });
  } else if (/\bgzip\b/.test(acceptEncoding)) {
    zlib.gzip(response, (err: any, buffer) => {
      if (err) {
        res.send(response);
        return;
      }
      res.set("Content-Encoding", "gzip");
      res.send(buffer);
    });
  } else {
    res.send(response);
  }
}
