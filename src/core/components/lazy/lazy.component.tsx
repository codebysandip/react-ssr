import React, { useEffect, useState } from "react";
import { useParams , useLocation } from "react-router";
import { useSearchParams } from "react-router-dom";
import { createContextClient } from "src/core/functions/create-context";

export default function Lazy(props: LazyProps) {
    const Component = props.Component;
    const [Comp, setComp] = useState<{default: any}|null>(null);
    const [pageData, setPageData] = useState<Record<string, any>>({});
    const location = useLocation();
    const searchParams = useSearchParams();
    const params = useParams();

    useEffect(() => {
        window.pageProps = null;
        if (!Component) {
            props.moduleProvider().then(moduleObj => {
                if (moduleObj.default.getInitialProps) {
                    const ctx = createContextClient(location, searchParams[0], params as Record<string, string>);
                    (moduleObj.default as SsrComponent).getInitialProps(ctx).then((data) => {
                        setPageData(data);
                        setComp(moduleObj);
                    });
                } else {
                    setComp(moduleObj);
                }
            })
        }
    }, [location.pathname]);
    const pageProps = props.pageProps || window.pageProps || pageData;
    if (Comp) {
        return <Comp.default {...pageProps} />;
    }
    return Component ? <Component {...pageProps} /> : <h1>Loading...</h1>;
}

export interface LazyProps {
    Component?: any;
    moduleProvider: () => Promise<{default: any}>;
    pageProps?: any;
}