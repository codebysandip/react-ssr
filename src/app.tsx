import { useEffect, useState } from "react";
import { Header } from "core/components/header/header.js";
import { Route, Routes } from "react-router-dom";
import Lazy from "./core/components/lazy/lazy.component.js";
import { matchPath, useLocation } from "react-router";
import { Routes as PageRoutes } from "./routes.js";
import { NO_HEADER_PATHS } from "./const.js";
import { CompModule } from "./core/models/route.model.js";
import { SsrHead } from "core/components/ssr-head/ssr-head.comp.js";
import "./style.scss";

/**
 * Check for rendering is first time.
 * We declared outside of react component because we don't want to re render on changing
 * value of isFirst.
 * In case of first rendering, we will provide lazy component to component(we get in client.tsx)
 * so that lazy component will able to render route component without laoding component asychronousally
 * and will prevent from hydration fail. Check comment on {@linkfile ./client.tsx:23}
 */
let isFirst = true;
export function App(props: AppProps) {
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

  useEffect(() => {
    isFirst = false;
    const isHeaderVisible = checkHeader();
    if (isHeaderVisible !== showHeader) {
      setShowHeader(isHeaderVisible);
    }
  }, [location.pathname]);

  return (
    <>
      {/* Use SsrHead component to set common Head */}
      <SsrHead />
      {showHeader && <Header />}
      <div className="container">
        <Routes>
          {PageRoutes.map((r, idx) => {
            const match = matchPath(r.path, location.pathname);
            return (
              <Route
                path={r.path}
                element={
                  <Lazy moduleProvider={r.component} module={isFirst && match ? props.module : undefined} {...props} />
                }
                key={idx}
              />
            );
          })}
        </Routes>
      </div>
    </>
  );
}

export interface AppProps {
  module?: CompModule;
  pageProps?: any;
  store?: any;
}
