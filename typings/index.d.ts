import React from "react";
import { Observable } from "rxjs";
import { ContextData } from "src/core/models/context.model";
import { IRedirect, PageData } from "src/core/models/page-data";
import { ApiResponse } from "src/core/models/api-response";

declare global {
    interface Window {
        pageProps?: ApiResponse<PageData>;
    }
    class SsrComponent<P={}, S={}> extends React.Component<P, S> {
        getInitialProps: (context: ContextData) => Observable<ApiResponse<PageData>> | IRedirect;
    }
}

