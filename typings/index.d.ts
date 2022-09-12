import React from "react";
import { ContextData } from "src/core/models/context.model.js";
import { IRedirect, PageData } from "src/core/models/page-data.js";
import { ApiResponse } from "core/services/http-client.js";
import NodeCache from "node-cache";
import { RootState } from "src/redux/create-store.js";
import { SHOW_LOADER } from "core/services/http-client.js";
import { Toaster } from "src/core/models/toaster.model.js";
import { GetInitialProps } from "core/models/common.model.js";

declare global {
    interface Window {
        pageProps?: ApiResponse<PageData>;
        __SSRDATA__: any;
    }
    interface WindowEventMap {
        [SHOW_LOADER]: CustomeEvent<boolean>;
        ["toast"]: CustomEvent<Toaster>;
    }
    class SsrComponent<P = {}, S = {}> extends React.Component<P, S> {
        getInitialProps: GetInitialProps;
    }

    var staticPageCache: NodeCache;
    var createRequire: any;
}

