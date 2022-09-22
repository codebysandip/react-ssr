import { useEffect, useState } from "react";
import { Header } from "core/components/header/header.js";
import { Route, Routes } from "react-router-dom";
import LazyRoute from "./core/components/lazy-route/lazy-route.component.js";
import { matchPath, useLocation } from "react-router";
import { Routes as PageRoutes } from "./routes.js";
import { NO_HEADER_PATHS } from "./const.js";
import { CompModule } from "./core/models/route.model.js";
import { SsrHead } from "core/components/ssr-head/ssr-head.comp.js";
import "./style.scss";
import { Loader } from "core/components/loader/loader.comp.js";
import { Toaster } from "./core/components/toaster/toaster.comp.js";
import { useAppDispatch } from "./core/hook.js";
import { SHOW_LOADER } from "./core/services/http-client.js";

export function App(props: AppProps) {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const checkHeader = () => {
    let isHeaderVisible = true;
    for (const path of NO_HEADER_PATHS) {
      if (matchPath(path, location.pathname)) {
        isHeaderVisible = false;
        break;
      }
    }
    return isHeaderVisible;
  };
  const [showHeader, setShowHeader] = useState(checkHeader());
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const isHeaderVisible = checkHeader();
    if (isHeaderVisible !== showHeader) {
      setShowHeader(isHeaderVisible);
    }
  }, [location.pathname]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      // listening onmmesage event to receive message from service worker
      navigator.serviceWorker.onmessage = function (evt) {
        const message = JSON.parse(evt.data);

        const isRefresh = message.type === "refresh";

        // check for message type of refresh
        // we enabled api caching in service worker. First api service from cache if available then
        // service worker calls api to fetch response and saves in cache and also return back us via postMessage with type refresh
        if (isRefresh) {
          console.log("serviceWorker updated in background!!", message);
          if (message.extra) {
            dispatch({
              type: message.extra,
              payload: message.data,
            });
          }
        }
      };
    }

    window.addEventListener(SHOW_LOADER, (e) => {
      setShowLoader(e.detail);
    });
    return function () {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      window.removeEventListener(SHOW_LOADER, () => {});
    };
  }, []);

  return (
    <>
      {/* Use SsrHead component to set common Head tags */}
      {process.env.IS_SERVER && <SsrHead />}
      {/* Header and footer should not visible on error page if header/footer is dynamic.
      Why? because may be error page coming because of Header/Footer api */}
      {showHeader && <Header />}
      <div className="container mt-4 mb-4">
        <Routes>
          {PageRoutes.map((r, idx) => {
            return (
              <Route
                path={r.path}
                element={
                  <LazyRoute moduleProvider={r.component} module={props.module} {...props} />
                }
                key={idx}
              />
            );
          })}
        </Routes>
      </div>
      <Loader show={showLoader} />
      <Toaster />
    </>
  );
}

export interface AppProps {
  module?: CompModule;
  pageProps?: any;
}
