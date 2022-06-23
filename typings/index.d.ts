import React from "react";
import { ContextData } from "src/core/models/context.model";

declare global {
    interface Window {
        pageProps: any;
    }
    class SsrComponent<P={}, S={}> extends React.Component<P, S> {
        getInitialProps: (context: ContextData) => Promise<Record<string, any>>;
    }
}

