import React from "react";
import { hydrateRoot } from "react-dom/client";
// import { matchPath } from "react-router";
import { BrowserRouter, matchPath } from "react-router-dom";
import { App } from "./app";
import { Routes } from "./routes";

console.log("client!!");
const container = document.getElementById("root");
if (!container) {
    throw new Error("root element not available!!");
}
let route = Routes.find(r => matchPath(r.path, window.location.pathname));
if (!route) {
    route = Routes.find(r => r.path === "/404");
}
route?.component().then(module => {
    hydrateRoot(
        container,
        <BrowserRouter>
            <App routes={Routes} comp={module.default} pageProps={window.pageProps || {}} />
        </BrowserRouter>
    );
});
