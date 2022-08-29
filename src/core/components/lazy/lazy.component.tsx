import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { createContextClient } from "src/core/functions/create-context.js";
import { IRedirect, PageData } from "src/core/models/page-data.js";
import { ApiResponse } from "src/core/models/api-response.js";

/**
 * Lazy Load Route Component
 * @param props {@link LazyProps}
 * @returns Route Component or Loading Component
 */
export default function Lazy(props: LazyProps) {
  const Component = props.Component;
  const [Comp, setComp] = useState<{ default: any } | null>(null);
  const [pageData, setPageData] = useState<PageData>({});
  const location = useLocation();
  const searchParams = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.pageProps = undefined;
    if (!Component) {
      props.moduleProvider().then((moduleObj) => {
        if (moduleObj.default.getInitialProps) {
          const ctx = createContextClient(location, searchParams[0], params as Record<string, string>);
          const processInitialProps = (apiResponse: ApiResponse<PageData> | IRedirect) => {
            if ((apiResponse as IRedirect)?.redirect) {
              const redirect = (apiResponse as PageData).redirect || { path: "/" };
              navigate(redirect?.path, {
                replace: redirect.replace || false,
                state: redirect.state || {},
              });
            } else if ((apiResponse as ApiResponse<any>).status === 401 || (apiResponse as ApiResponse<any>).status === 403) {
              // logout and naviage to login page
              // [TODO] navigating to 500 but change to login path
              if ((apiResponse as ApiResponse<any>).status === 401) {
                navigate("/login");
              } else {
                // show notification for 403 status
              }
            } else if ((apiResponse as ApiResponse<any>).status === 500) {
              navigate("/500");
            } else if ((apiResponse as ApiResponse<any>).status === 0) {
              // show toast or page for internet not available
            }
            // set apiResponse only in case of 200
            setPageData((apiResponse as ApiResponse<PageData>).data as PageData);
            setComp(moduleObj);
          };

          const initialProps = (moduleObj.default as SsrComponent).getInitialProps(ctx);
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
    }
  }, [location.pathname]);
  const pageProps = window.pageProps || pageData;
  if (Comp) {
    return <Comp.default {...pageProps} />;
  }
  return Component ? <Component {...pageProps} /> : <h1>Loading...</h1>;
}

export interface LazyProps {
  /**
   * Component to render
   * Component will come only when page will reload (check client.tsx)
   */
  Component?: any;
  moduleProvider: () => Promise<{ default: any }>;
}
