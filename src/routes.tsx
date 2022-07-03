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
  {
    path: "contact-us",
    component: () =>
      import(/* webpackChunkName: "contact-us" */ "pages/contact-us/contact-us.component"),
    isSSR: false,
  },
  {
    path: "/404",
    component: () => import(/* webpackChunkName: "404" */ "src/pages/error/404/404.component"),
    static: true,
    isSSR: true,
  },
  {
    path: "/500",
    component: () => import(/* webpackChunkName: "500" */ "src/pages/error/500/500.component"),
    static: true,
    isSSR: true,
  },
];
