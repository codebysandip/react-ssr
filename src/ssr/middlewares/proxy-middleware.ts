import { Request, Response } from "express";
import proxy from "express-http-proxy";

const isMultipartRequest = function (req: Request) {
  const contentTypeHeader = req.headers["content-type"];
  return contentTypeHeader && contentTypeHeader.indexOf("multipart") > -1;
};

export const proxyMiddleware = function (proxyUrl: string) {
  return function (req: Request, res: Response, next: () => void) {
    let reqAsBuffer = false;
    let reqBodyEncoding: string | null = "utf-8";
    // eslint-disable-next-line prefer-const
    let parseReqBody = true;
    if (isMultipartRequest(req)) {
      reqAsBuffer = true;
      reqBodyEncoding = null;
      parseReqBody = false;
    }
    return proxy(proxyUrl, {
      reqAsBuffer,
      reqBodyEncoding,
      parseReqBody,
      proxyReqOptDecorator: (proxyReqOpts) => {
        return proxyReqOpts;
      },
      // eslint-disable-next-line n/handle-callback-err
      proxyErrorHandler: (err, res) => {
        // change response as per need
        // this should match the error response of API
        console.error(`Error in proxy request. Url:${req.url}!!`, err);
        res.status(500).send({
          error_message: "Something went wrong!!",
        });
      },
    })(req, res, next);
  };
};
