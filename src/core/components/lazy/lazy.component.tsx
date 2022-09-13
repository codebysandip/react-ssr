import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { createContextClient } from "src/core/functions/create-context.js";
import { CompModule, CompModuleImport, IRoute } from "src/core/models/route.model.js";
import { replaceReducer } from "src/redux/create-store.js";
import { processRequest } from "core/functions/process-request.js";
import { INTERNET_NOT_AVAILABLE, TOAST } from "src/const.js";
import { Toaster } from "src/core/models/toaster.model.js";
import { HttpClient, isOnline, retryPromise } from "src/core/services/http-client.js";
import { getRoute } from "src/core/functions/get-route.js";
import { Loader } from "../loader/loader.comp.js";

/**
 * Check rendering is first or not
 * if not then don't render props.module. Always show a loader till the route component not ready to render
 */
let isFirst = true;
/**
 * Lazy Load Route Component
 * @param props {@link LazyProps}
 * @returns Route Component or Loading Component
 */
export default function Lazy(props: LazyProps) {
  let module = props.module;
  const [Comp, setComp] = useState<CompModule | null>(null);
  const [pageData, setPageData] = useState(props.store ? {} : window.__SSRDATA__ || {});
  const location = useLocation();
  const searchParams = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();

  const createContext = () => {
    const ctx = createContextClient(location, searchParams[0], params as Record<string, string>);
    if (props.store) {
      (ctx as any).store = props.store;
    }
    return ctx;
  };

  // if IRoute.isSSR will false then server will not process request for any api calls
  // in that case page data will not available on client. So need to fetch data on client for page
  let route: IRoute | undefined;
  if (!process.env.IS_SERVER && props.module) {
    route = getRoute(location.pathname);
    if (!route?.isSSR) {
      if (props.module) {
        const ctx = createContext();
        processRequest(props.module, ctx).then((data) => {
          if (data.isError) {
            navigate(data.redirect.path, {
              replace: data.redirect.replace || false,
              state: data.redirect.state || {},
            });
          }
        });
      }
    }
  }

  useEffect(() => {
    if (location.key === "default") {
      return;
    }
    if (isFirst) {
      isFirst = false;
    }
    module = undefined;
    window.__SSRDATA__ = null;
    retryPromise(isOnline, 1000, HttpClient.maxRetryCount)
      .then(() => {
        props.moduleProvider().then((moduleObj) => {
          // inject lazy loaded reducer into store
          const ctx = createContext();
          if (moduleObj?.reducer && props.store) {
            replaceReducer(props.store, moduleObj.reducer);
          }

          processRequest(moduleObj, ctx).then((data) => {
            if (data.isError) {
              navigate(data.redirect.path, {
                replace: data.redirect.replace || false,
                state: data.redirect.state || {},
              });
            } else {
              setComp(moduleObj);
              setPageData(props.store ? {} : data.apiResponse?.data);
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
  return module && isFirst ? <module.default {...pageData} /> : <Loader show={true} />;
}

export interface LazyProps {
  /**
   * Module to render
   * Module will come only when page will reload check [client.tsx](../../../client.tsx)
   */
  module?: CompModule;
  moduleProvider: CompModuleImport;
  store?: any;
}
