import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { createContextClient } from "src/core/functions/create-context.js";
import { CompModule, CompModuleImport } from "src/core/models/route.model.js";
import { replaceReducer } from "src/redux/create-store.js";
import { processRequest } from "core/functions/process-request.js";
import { CommonService } from "src/core/services/common.service.js";

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

  useEffect(() => {
    if (location.key === "default") {
      return;
    }
    module = undefined;
    window.__SSRDATA__ = null;
    CommonService.toggleLoader(true);
    props.moduleProvider().then((moduleObj) => {
      // added timeout because if api call will made then loader will not hide in between
      setTimeout(() => {
        CommonService.toggleLoader(false);
      });
      // inject lazy loaded reducer into store
      const ctx = createContextClient(location, searchParams[0], params as Record<string, string>);
      if (props.store) {
        (ctx as any).store = props.store;
      }
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
  }, [location.pathname]);

  if (Comp) {
    return <Comp.default {...pageData} />;
  }
  return module ? <module.default {...pageData} /> : <h1>Loading...</h1>;
}

export interface LazyProps {
  /**
   * Module to render
   * Module will come only when page will reload (check client.tsx)
   */
  module?: CompModule;
  moduleProvider: CompModuleImport;
  store?: any;
}
