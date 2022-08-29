import React from "react";
import { ContextData } from "src/core/models/context.model.js";
import { IRedirect, PageData } from "src/core/models/page-data.js";
import { ApiResponse } from "src/core/models/api-response.js";
import NodeCache from "node-cache";

declare global {
    interface Window {
        pageProps?: ApiResponse<PageData>;
    }
    class SsrComponent<P={}, S={}> extends React.Component<P, S> {
        getInitialProps: (context: ContextData) => Promise<ApiResponse<PageData>|IRedirect>;
    }

    var XMLHttpRequest: XMLHttpRequest;
    var staticPageCache: NodeCache;
}

