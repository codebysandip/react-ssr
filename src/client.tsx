import React from "react";
import { hydrateRoot } from "react-dom/client";
// import { matchPath } from "react-router";
import { BrowserRouter, matchPath } from "react-router-dom";
import { App } from "./app";
import { Routes } from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";

const container = document.getElementById("root");
if (!container) {
  throw new Error("root element not available!!");
}
/**
 * Find route for Routes by matching current current location of browser
 */
let route = Routes.find((r) => matchPath(r.path, window.location.pathname));
/**
 * If route will not match redirect to 404 not found page
 */
if (!route) {
  route = Routes.find((r) => r.path === "/404");
}

const hydrateApp = (module?: { default: any }) => {
  return hydrateRoot(
    container,
    <BrowserRouter>
      <App comp={module?.default} />
    </BrowserRouter>,
  );
};

if (!route?.isSSR) {
  hydrateApp();
} else {
  /**
   * During hydration Client side HTML should match with virtual DOM.
   * Rendering is synchronousn but lazy loading of component is asynchronuse.
   * So while getting route component(asynchronous lazy loading), Hydration will complete
   * creation of virtual DOM synchronousally. When React will compare vitual DOM with actual DOM
   * then route component HTML will not be there. In this case hydration will fail and React will re render
   * again on client side. Re rendering of full page will decrease the performance
   */
  route?.component().then((module) => {
    hydrateApp(module);
  });
}
