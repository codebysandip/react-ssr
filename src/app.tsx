import React, { useEffect, useState } from "react";
import { Header } from "core/components/header/header";
import { Route, Routes } from "react-router-dom";
import Lazy from "./core/components/lazy/lazy.component";
import { matchPath, useLocation } from "react-router";
import { Routes as PageRoutes } from "./routes";
import { NO_HEADER_PATHS } from "./const";

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
      {showHeader && <Header />}
      {/* for SSR component will available so we can directly render component */}
      {process.env.IS_SERVER === "true" && props.comp ? (
        <props.comp {...(props.pageProps || {})} />
      ) : (
        <Routes>
          {PageRoutes.map((r, idx) => {
            return (
              <Route
                path={r.path}
                element={
                  <Lazy
                    moduleProvider={r.component}
                    Component={isFirst ? props.comp : undefined}
                    {...props}
                  />
                }
                key={idx}
              />
            );
          })}
        </Routes>
      )}
    </>
  );
}

export interface AppProps {
  comp?: React.ComponentClass;
  pageProps?: any;
}
