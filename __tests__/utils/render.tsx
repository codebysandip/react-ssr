import { render } from "@testing-library/react";
import { createContextClient } from "src/core/functions/create-context.js";
import { getRoute } from "src/core/functions/get-route.js";
import "@testing-library/jest-dom/extend-expect";
import { ContextData } from "src/core/models/context.model.js";
import { Provider } from "react-redux";
import { AppStore, createStore } from "src/redux/create-store.js";
import { ContextDataWithStore } from "src/core/models/context-with-store.model.js";
import { matchPath, MemoryRouter } from "react-router";

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
  const url = new URL(requestUrl);

  const route = getRoute(url.pathname);
  if (!route) {
    throw new Error("requestUrl is not valid");
  }
  const matchedPath = matchPath(route.path, url.pathname);

  const location = {
    hash: "",
    pathname: url.pathname,
    key: "default",
    search: url.search,
    state: {},
  };
  const ctx: ContextData = createContextClient(
    location,
    new URLSearchParams(url.search),
    (matchedPath?.params as Record<string, string>) || {},
  );

  const module = await route?.component();
  const store = createStore(module.reducer);
  (ctx as ContextDataWithStore).store = store as AppStore;
  const getInitialProps = module.getInitialProps || module.default.getInitialProps;
  if (getInitialProps) {
    await getInitialProps(ctx);
  }
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[location.pathname]}>
        <module.default />
      </MemoryRouter>
    </Provider>,
  );
}
