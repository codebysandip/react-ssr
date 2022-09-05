import React from "react";
import { ContextData } from "src/core/models/context.model.js";
import { IRedirect, PageData } from "src/core/models/page-data.js";
import { ApiResponse } from "src/core/models/api-response.js";
import NodeCache from "node-cache";
import { RootState } from "src/redux/create-store.js";
import { SHOW_LOADER } from "src/const.js";
import { Toaster } from "src/core/models/toaster.model.js";

declare global {
    interface Window {
        pageProps?: ApiResponse<PageData>;
        __SSRDATA__: any;
    }
    interface WindowEventMap {
        [SHOW_LOADER]: CustomeEvent<boolean>;
        ["toast"]: CustomEvent<Toaster>;
    }
    class SsrComponent<P={}, S={}> extends React.Component<P, S> {
        getInitialProps: (context: ContextData) => Promise<ApiResponse<PageData>|IRedirect>;
    }

    var XMLHttpRequest: XMLHttpRequest;
    var staticPageCache: NodeCache;
    var createRequire: any;
}

