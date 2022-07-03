import React from "react";
import { Observable } from "rxjs";
import { ContextData } from "src/core/models/context.model";
import { PageData } from "src/core/models/page-data";
import { ServerResponse } from "src/core/models/server-response";

declare global {
    interface Window {
        pageProps?: PageData;
    }
    class SsrComponent<P={}, S={}> extends React.Component<P, S> {
        getInitialProps: (context: ContextData) => Observable<PageData&ServerResponse<any>> | PageData&ServerResponse<any>;
    }
}

