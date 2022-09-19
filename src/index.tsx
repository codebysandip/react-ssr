import { Provider } from "react-redux";
import { App } from "./app.js";
import { CompModule } from "core/models/route.model.js";
import { createContextClient } from "core/functions/create-context.js";
import { useLocation } from "react-router";
import { useSearchParams, useParams } from "react-router-dom";
import { ssrConfig } from "src/react-ssr.config.js";

import { ContextDataWithStore } from "./core/models/context-with-store.model.js";
import { ContextData } from "./core/models/context.model.js";
import { AppStore } from "./redux/create-store.js";
import { configureHttpClient } from "./core/functions/configure-http-client.js";
import { ContextProvider } from "./core/contexts/context-data-context.js";

if (!process.env.IS_SERVER) {
  window.isFirstRendering = true;
}
// store should not change/update when react updates itself
let store: AppStore;

configureHttpClient();

export default function ReactSsrApp(props: ReactSsrAppProps) {
  const location = useLocation();
  const searchParams = useSearchParams();
  const params = useParams();

  let ctx: ContextData;
  if (process.env.IS_SERVER) {
    ctx = props.ctx as ContextData;
  } else {
    ctx = createContextClient(location, searchParams[0], params as Record<string, string>);
  }
  if (!process.env.IS_SERVER) {
    if (window.isFirstRendering) {
      // ssrConfig.configureStore already called on server
      // before creating it on client check code should running on client
      // if we will again call here then new store will get created and we will lost page data
      if (ssrConfig.configureStore) {
        // this will create store and will save store object in ctx for future use
        ssrConfig.configureStore(props.module, props.ctx || ctx);
      }
      store = (ctx as ContextDataWithStore).store;
    } else {
      (ctx as ContextDataWithStore).store = store;
    }
  }
  return (
    <Provider store={(props.ctx as ContextDataWithStore)?.store || store}>
      <ContextProvider ctx={ctx}>
        <App module={props.module} />
      </ContextProvider>
    </Provider>
  );
}

interface ReactSsrAppProps {
  module: CompModule;
  /**
   * ctx prop will have value only on SSR
   * on client side it will always be undefined
   */
  ctx?: ContextData;
}
