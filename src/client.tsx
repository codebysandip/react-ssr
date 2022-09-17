import { hydrateRoot, createRoot } from "react-dom/client";
// import { matchPath } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { getRoute } from "./core/functions/get-route.js";
import { CompModule } from "./core/models/route.model.js";
import ReactSsrApp from "./index.js";

const container = document.getElementById("root");
if (!container) {
  throw new Error("root element not available!!");
}
/**
 * Find route for Routes by matching current current location of browser
 */
const route = getRoute(window.location.pathname);

const createBrowserRouter = (module: CompModule) => {
  // Don't change anything here
  // Add your code in src/index.tsx
  return (
    <BrowserRouter>
      <ReactSsrApp module={module} />
    </BrowserRouter>
  );
};
const hydrateApp = (module: CompModule) => {
  return hydrateRoot(container, createBrowserRouter(module));
};

// Hot module reload
// Don't delete below if condinition. If you need to reload server type rs in same command window
// of npm start and hit enter. nodemon will restart server
// Below line will automatically get removed in production build
if (process.env.IS_LOCAL && (module as any).hot) {
  console.log("updating app via reload or hot reload!!");
  // fixed for hot reload
  window.isFirstRendering = true;
  const root = createRoot(container);
  route?.component().then((module) => {
    root.render(createBrowserRouter(module));
  });
} else {
  /**
   * During hydration Client side HTML should match with virtual DOM.
   * Rendering is synchronousn but lazy loading of component is asynchronus.
   * So while getting route component(asynchronous lazy loading), Hydration will complete
   * creation of virtual DOM synchronousally. When React will compare vitual DOM with actual DOM
   * then route component HTML will not be there. In this case hydration will fail and React will re render
   * again on client side. Re rendering of full page will decrease the performance
   */
  route?.component().then((module) => {
    hydrateApp(module);
  });
}
