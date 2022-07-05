import { IRoute } from "./core/models/route.model";

/**
 * React routes of all pages.
 * Always define webpackChunkName for import. This chunk name will use while creating build.
 * This will help developers to debug in production.
 */
export const Routes: IRoute[] = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "pages/home/home.component"),
    isSSR: true,
  },
  // Replace 404 component code with own code
  {
    path: "/404",
    component: () => import(/* webpackChunkName: "404" */ "src/pages/error/404/404.component"),
    static: true,
    isSSR: true,
  },
  // Replace 500 component code with own code
  {
    path: "/500",
    component: () => import(/* webpackChunkName: "500" */ "src/pages/error/500/500.component"),
    static: true,
    isSSR: true,
  },
  // If no route will match 404 component will server to client
  {
    path: "/*",
    component: () => import(/* webpackChunkName: "404" */ "src/pages/error/404/404.component"),
    static: true,
    isSSR: true,
  },
];
