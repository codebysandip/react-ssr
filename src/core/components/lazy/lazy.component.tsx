import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { Observable } from "rxjs";
import { createContextClient } from "src/core/functions/create-context";
import { PageData } from "src/core/models/page-data";
import { ApiResponse } from "src/core/models/api-response";

/**
 * Lazy Load Route Component
 * @param props {@link LazyProps}
 * @returns Route Component or Loading Component
 */
export default function Lazy(props: LazyProps) {
  const Component = props.Component;
  const [Comp, setComp] = useState<{ default: any } | null>(null);
  const [pageData, setPageData] = useState<ApiResponse<any>>({ status: 200, data: null });
  const location = useLocation();
  const searchParams = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.pageProps = undefined;
    if (!Component) {
      props.moduleProvider().then((moduleObj) => {
        if (moduleObj.default.getInitialProps) {
          const ctx = createContextClient(
            location,
            searchParams[0],
            params as Record<string, string>,
          );
          const processInitialProps = (data: ApiResponse<PageData> | PageData) => {
            if ((data as PageData)?.redirect) {
              const redirect = (data as PageData).redirect || { path: "/" };
              navigate(redirect?.path, {
                replace: redirect.replace || false,
                state: redirect.state || {},
              });
            } else if (
              (data as ApiResponse<any>).status === 401 ||
              (data as ApiResponse<any>).status === 403
            ) {
              // logout and naviage to login page
              // [TODO] navigating to 500 but change to login path
              navigate("/500");
            } else if ((data as ApiResponse<any>).status === 500) {
              navigate("/500");
            } else if ((data as ApiResponse<any>).status === 0) {
              // show toast or page for internet not available
              navigate("/500");
            } else {
              // set data only in case of 200
              setPageData(data as ApiResponse<PageData>);
              setComp(moduleObj);
            }
          };

          const initialProps = (moduleObj.default as SsrComponent).getInitialProps(ctx);
          if (initialProps instanceof Observable) {
            initialProps.subscribe({
              next: (data) => {
                processInitialProps(data);
              },
              error: (err: ApiResponse<any>) => {
                console.error(
                  `Error in getInitialProps of ${moduleObj.default.constructor.name}. Error: ${err}`,
                );
                navigate("/500");
              },
            });
          } else {
            processInitialProps(initialProps);
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
  Component?: any;
  moduleProvider: () => Promise<{ default: any }>;
}
