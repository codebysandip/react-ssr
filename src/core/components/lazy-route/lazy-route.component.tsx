import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { CompModule, CompModuleImport, IRoute } from "src/core/models/route.model.js";
import { processRequest } from "core/functions/process-request.js";
import { INTERNET_NOT_AVAILABLE, TOAST } from "src/const.js";
import { Toaster } from "src/core/models/toaster.model.js";
import { HttpClient, isOnline, retryPromise } from "src/core/services/http-client.js";
import { getRoute } from "src/core/functions/get-route.js";
import { Loader } from "../loader/loader.comp.js";
import { useContextData } from "src/core/hook.js";

/**
 * Lazy Load Route Component
 * @param props {@link LazyProps}
 * @returns Route Component or Loading Component
 */
export default function LazyRoute(props: LazyProps) {
  let module = props.module;
  const [Comp, setComp] = useState<CompModule | null>(props.module || null);
  const isFirstRendering = useRef<boolean>(true);
  const ctx = useContextData();
  const [pageData, setPageData] = useState((ctx as any).store ? {} : window.__SSRDATA__ || {});
  const location = useLocation();
  const navigate = useNavigate();

  // if IRoute.isSSR will false then server will not process request for any api calls
  // in that case page data will not available on client. So need to fetch data on client for page
  let route: IRoute | undefined;
  if (!process.env.IS_SERVER && isFirstRendering.current && module) {
    route = getRoute(location.pathname);
    if (!route?.isSSR) {
      if (props.module) {
        processRequest(props.module, ctx, isFirstRendering.current).then((data) => {
          // after process request mark isFirstRendering to false
          isFirstRendering.current = false;
          if (data.isError) {
            navigate(data.redirect.path, {
              replace: data.redirect.replace || false,
              state: data.redirect.state || {},
            });
          }
        });
      }
    } else {
      // if page full rendered on SSR then we can set isFirstRendering to false here
      isFirstRendering.current = false;
    }
  }

  useEffect(() => {
    if (location.key === "default") {
      return;
    }
    module = undefined;
    window.__SSRDATA__ = null;
    retryPromise(isOnline, 1000, HttpClient.maxRetryCount)
      .then(() => {
        props.moduleProvider().then((moduleObj) => {
          processRequest(moduleObj, ctx, isFirstRendering.current).then((data) => {
            if (data.isError) {
              navigate(data.redirect.path, {
                replace: data.redirect.replace || false,
                state: data.redirect.state || {},
              });
            } else {
              setComp(moduleObj);
              setPageData((ctx as any).store ? {} : data.apiResponse?.data);
            }
          });
        });
      })
      .catch(() => {
        window.dispatchEvent(
          new CustomEvent<Toaster>(TOAST, {
            detail: {
              type: "error",
              message: INTERNET_NOT_AVAILABLE,
            },
          }),
        );
      });

    // show loader while lazy load component
    setComp(null);
  }, [location.pathname]);

  if (Comp) {
    return <Comp.default {...pageData} />;
  }
  return <Loader show={true} />;
}

export interface LazyProps {
  /**
   * Module to render
   * Module will come only when page will reload check [client.tsx](../../../client.tsx)
   */
  module?: CompModule;
  moduleProvider: CompModuleImport;
}
