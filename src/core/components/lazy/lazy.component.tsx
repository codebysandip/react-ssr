import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { Observable } from "rxjs";
import { createContextClient } from "src/core/functions/create-context";
import { IRedirect, PageData } from "src/core/models/page-data";
import { ApiResponse } from "src/core/models/api-response";
import { Notification$ } from "src/app-subject";

/**
 * Lazy Load Route Component
 * @param props {@link LazyProps}
 * @returns Route Component or Loading Component
 */
export default function Lazy(props: LazyProps) {
  const Component = props.Component;
  const [Comp, setComp] = useState<{ default: any } | null>(null);
  const [pageData, setPageData] = useState<ApiResponse<any>>({
    status: 200,
    data: null,
    message: [],
    errorCode: -1,
  });
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
          const processInitialProps = (data: ApiResponse<PageData> | IRedirect) => {
            if ((data as IRedirect)?.redirect) {
              const redirect = (data as PageData).redirect || { path: "/" };
              navigate(redirect?.path, {
                replace: redirect.replace || false,
                state: redirect.state || {},
              });
            } else if ((data as ApiResponse<any>).status === 401 || (data as ApiResponse<any>).status === 403) {
              // logout and naviage to login page
              // [TODO] navigating to 500 but change to login path
              if ((data as ApiResponse<any>).status === 401) {
                navigate("/login");
              } else {
                Notification$.next({
                  message: (data as ApiResponse<any>).message[0],
                  notificationType: "error",
                });
              }
            } else if ((data as ApiResponse<any>).status === 500) {
              Notification$.next({
                message: (data as ApiResponse<any>).message[0],
                notificationType: "error",
              });
              // navigate("/500");
            } else if ((data as ApiResponse<any>).status === 0) {
              // show toast or page for internet not available
              Notification$.next({
                message: "Internet Not Available",
                notificationType: "error",
              });
            }
            // set data only in case of 200
            setPageData(data as ApiResponse<PageData>);
            setComp(moduleObj);
          };

          const initialProps = (moduleObj.default as SsrComponent).getInitialProps(ctx);
          if (initialProps instanceof Observable) {
            initialProps.subscribe({
              next: (data) => {
                processInitialProps(data);
              },
              error: (err: ApiResponse<any>) => {
                console.error(`Error in getInitialProps of ${moduleObj.default.constructor.name}. Error: ${err}`);
                navigate("/500");
              },
            });
          } else {
            throw new Error("getInitialProps must return observable");
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
