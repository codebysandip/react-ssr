import { render } from "@testing-library/react";
import { StaticRouter } from "react-router-dom/server.js";
import ReactSsrApp from "src/index.js";
import { createContextServer } from "src/core/functions/create-context.js";
import { getRoute } from "src/core/functions/get-route.js";
import { processRequest } from "src/core/functions/process-request.js";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import HeaderData from "mocks/headers.json";
import "@testing-library/jest-dom/extend-expect";
import { Location } from "react-router";
import { ContextData } from "src/core/models/context.model.js";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { HttpClient } from "src/core/services/http-client.js";

const mockAxios = new MockAdapter(axios);

/**
 * renderPage will render a route page based on request url
 * renderPage function does all necessary mocks and steps to render a page
 * @param requestUrl url of page. url should be valid url
 * @example
 * // mock api of page here
 * // to render about us page having path /about-us
 * await renderPage("https://test-domain.com/about-us");
 * // testing code will go here
 */
export async function renderPage(requestUrl: string) {
  mockAxios.onGet(HttpClient.setUrl("/api/header")).replyOnce(200, HeaderData);
  const url = new URL(requestUrl);
  const location: Location = {
    pathname: url.pathname,
    state: "",
    hash: url.hash,
    key: "default",
    search: url.search,
  };
  const req = getMockReq({
    path: url.pathname,
    hostname: url.hostname,
  });

  const resp = getMockRes();

  const ctx: ContextData = {
    ...createContextServer(req, resp.res),
  };
  const route = getRoute(url.pathname);
  if (!route) {
    throw new Error("requestUrl is not valid");
  }

  const module = await route?.component();
  const data = await processRequest(module, ctx, true);
  if (data.isError) {
    throw new Error("Error occurred while process request");
  }
  global.metaJson = { mainJs: "", mainStyle: "", chunkCss: {} };

  render(
    <StaticRouter location={location}>
      <ReactSsrApp module={module} ctx={ctx} />
    </StaticRouter>,
  );
}

export { mockAxios };
