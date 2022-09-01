import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { createContextClient } from "src/core/functions/create-context.js";
import { IRedirect, PageData } from "src/core/models/page-data.js";
import { ApiResponse } from "src/core/models/api-response.js";
import { CompModule, CompModuleImport } from "src/core/models/route.model.js";
import { logout } from "src/pages/auth/auth.redux.js";
import { useStore } from "react-redux";
import { AppStore, replaceReducer } from "src/redux/create-store.js";
import { PAGE_INVALID_RETURN_DATA, ROUTE_LOGIN } from "src/const.js";

/**
 * Lazy Load Route Component
 * @param props {@link LazyProps}
 * @returns Route Component or Loading Component
 */
export default function Lazy(props: LazyProps) {
  let module = props.module;
  const [Comp, setComp] = useState<CompModule | null>(null);
  const location = useLocation();
  const searchParams = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();
  const store = useStore() as AppStore;

  useEffect(() => {
    if (location.key === "default") {
      return;
    }
    module = undefined;
    props.moduleProvider().then((moduleObj) => {
      // inject lazy loaded reducer into store
      if (moduleObj?.reducer) {
        replaceReducer(store, moduleObj.reducer);
      }

      // get getInitialProps method/function from lazy loaded module
      // Either getInitialProps should present in class component or exported as function
      const getInitialProps = moduleObj.default.getInitialProps || moduleObj.getInitialProps;
      if (getInitialProps) {
        const ctx = createContextClient(location, searchParams[0], params as Record<string, string>, store);
        /**
         *
         * @param apiResponse Object of ApiResponse/IRedirect
         */
        const processInitialProps = (apiResponse: ApiResponse<PageData> | IRedirect) => {
          if ((apiResponse as IRedirect)?.redirect) {
            const redirect = (apiResponse as PageData).redirect || { path: "/" };
            navigate(redirect?.path, {
              replace: redirect.replace || false,
              state: redirect.state || {},
            });
          } else if ((apiResponse as ApiResponse<any>).status === undefined) {
            navigate("/500");
            throw new Error(PAGE_INVALID_RETURN_DATA);
          } else if (
            (apiResponse as ApiResponse<any>).status === 401 ||
            (apiResponse as ApiResponse<any>).status === 403
          ) {
            // logout and naviage to login page
            // [TODO] navigating to 500 but change to login path
            if ((apiResponse as ApiResponse<any>).status === 401) {
              ctx.store.dispatch(logout());
              navigate(ROUTE_LOGIN);
            } else {
              // show notification for 403 status
            }
          } else if ((apiResponse as ApiResponse<any>).status === 500) {
            navigate("/500");
          } else if ((apiResponse as ApiResponse<any>).status === 0) {
            // show toast or page for internet not available
          }
          // set apiResponse only in case of 200
          setComp(moduleObj);
        };

        const initialProps = getInitialProps(ctx);
        if (initialProps instanceof Promise) {
          initialProps
            .then((apiResponse) => {
              processInitialProps(apiResponse);
            })
            .catch((err: ApiResponse<any>) => {
              console.error(`Error in getInitialProps of ${moduleObj.default.constructor.name}. Error: ${err}`);
              navigate("/500");
            });
        } else {
          throw new Error("getInitialProps must return Promise");
        }
      } else {
        setComp(moduleObj);
      }
    });
  }, [location.pathname]);

  if (Comp) {
    return <Comp.default />;
  }
  return module ? <module.default /> : <h1>Loading...</h1>;
}

export interface LazyProps {
  /**
   * Module to render
   * Module will come only when page will reload (check client.tsx)
   */
  module?: CompModule;
  moduleProvider: CompModuleImport;
}
