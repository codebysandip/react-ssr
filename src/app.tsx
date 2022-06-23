import React, { useEffect } from "react";
import { Header } from "core/components/header/header";
import { IRoute } from "core/models/route.model";
import { Route, Routes } from "react-router-dom";
import Lazy from "./core/components/lazy/lazy.component";
import { useLocation } from "react-router";

let isFirst = true;
export function App(props: AppProps) {
    const location = useLocation();
    useEffect(() => {
        isFirst = false;
    }, [location.pathname]);
    return (
        <>
            <Header />
            <Routes>
                {
                    props.routes.map((r, idx) => {
                        return <Route
                                    path={r.path}
                                    element={
                                        <Lazy
                                            moduleProvider={r.component}
                                            Component={isFirst ? props.comp : undefined}
                                            {...props} 
                                        />
                                    }
                                    key={idx}
                                />;
                    })
                }
            </Routes>
        </>
    );
}

export interface AppProps {
    routes: IRoute[];
    comp?: React.ComponentClass;
    pageProps: any;
}