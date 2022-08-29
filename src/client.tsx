import { hydrateRoot, createRoot } from "react-dom/client";
// import { matchPath } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app.js";
import { Routes } from "./routes.js";
import "./style.scss";
import { getRoute } from "./core/functions/get-route.js";

const container = document.getElementById("root");
if (!container) {
  throw new Error("root element not available!!");
}
/**
 * Find route for Routes by matching current current location of browser
 */
let route = getRoute(window.location.pathname);
/**
 * If route will not match redirect to 404 not found page
 */
if (!route) {
  route = Routes.find((r) => r.path === "/404");
}

const hydrateApp = (module?: { default: any }) => {
  return hydrateRoot(
    container,
    <BrowserRouter>
      <App comp={module?.default} />
    </BrowserRouter>,
  );
};

// Hot module reload
// Don't delete below if condinition. If you need to reload server type rs in same command window
// of npm start and hit enter. nodemon will restart server
// Below line will automatically get removed in production build
if (process.env.IS_LOCAL === "true" && (module as any).hot) {
  const root = createRoot(container);
  route?.component().then((module) => {
    root.render(<BrowserRouter>
      <App comp={module?.default} />
    </BrowserRouter>) 
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
