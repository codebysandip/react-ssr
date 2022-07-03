import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { Observable } from "rxjs";
import { createContextClient } from "src/core/functions/create-context";
import { PageData } from "src/core/models/page-data";
import { ServerResponse } from "src/core/models/server-response";

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
          const ctx = createContextClient(
            location,
            searchParams[0],
            params as Record<string, string>,
          );
          const processInitialProps = (data: PageData & ServerResponse<any>) => {
            if (data?.redirect) {
              navigate(data.redirect.path, {
                replace: data.redirect.replace || false,
                state: data.redirect.state || {},
              });
            } else if (data.status === 401 || data.status === 403) {
              // logout and naviage to login page
            } else if (data.status === 500) {
              navigate("/500");
            } else if (data.status === 0) {
              // show toast or page for internet not available
            } else {
              // set data only in case of 200
              setPageData(data);
              setComp(moduleObj);
            }
          };

          const initialProps = (moduleObj.default as SsrComponent).getInitialProps(ctx);
          if (initialProps instanceof Observable) {
            initialProps.subscribe({
              next: (data) => {
                processInitialProps(data);
              },
              error: (err: ServerResponse<any>) => {
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
