import { Provider } from "react-redux";
import { App } from "./app.js";
import { CompModule } from "core/models/route.model.js";
import { createContextClient } from "core/functions/create-context.js";
import { useLocation, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import SsrConfig from "src/react-ssr.config.js";
import { ContextDataWithStore } from "./core/models/context-with-store.model.js";
import { ContextData } from "./core/models/context.model.js";
import { AppStore } from "./redux/create-store.js";

const ssrConfig = SsrConfig();

// store should create only one time
// we declared isFirst outside of react because we don;t want to re render again
// when setting it to false
let isFirst = true;
// store should not change/update when react updates itself
let store: AppStore;

export default function ReactSsrApp(props: ReactSsrAppProps) {
  const location = useLocation();
  const searchParams = useSearchParams();
  const params = useParams();

  let ctx: ContextData;
  if (process.env.IS_SERVER === "true") {
    ctx = props.ctx as ContextData;
  } else {
    ctx = createContextClient(location, searchParams[0], params as Record<string, string>);
  }
  if (isFirst) {
    isFirst = false;
    // ssrConfig.configureStore already called on server
    // if we will again call here then new store will get created and we will lost page data
    if (process.env.IS_SERVER !== "true" && ssrConfig.configureStore) {
      ssrConfig.configureStore(props.module, props.ctx || ctx);
    }
    store = (ctx as ContextDataWithStore).store;
  }
  return (
    <Provider store={store}>
      <App module={props.module} store={store} />
    </Provider>
  );
}

interface ReactSsrAppProps {
  module: CompModule;
  ctx?: ContextData;
}
