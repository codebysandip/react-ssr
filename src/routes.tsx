import { ROUTE_404, ROUTE_500, ROUTE_LOGIN } from "./const.js";
import { IRoute } from "./core/models/route.model.js";

/**
 * React routes of all pages.
 * Always define webpackChunkName for import. This chunk name will use while creating build.
 * This will help developers to debug in production.
 */
export const Routes: IRoute[] = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "src/pages/home/home.component.js"),
    isSSR: true,
  },
  {
    path: "/product",
    component: () => import(/* webpackChunkName: "home" */ "src/pages/home/home.component.js"),
    isSSR: true,
  },
  {
    path: "/product/edit/:id",
    component: () => import(/* webpackChunkName: "edit-product" */ "src/pages/home/edit/edit-product.component.js"),
    isSSR: false,
  },
  {
    path: ROUTE_LOGIN,
    component: () => import(/* webpackChunkName: "login" */ "pages/auth/login/login.comp.js"),
    isSSR: true,
  },
  // Replace 404 component code with own code
  {
    path: ROUTE_404,
    component: () => import(/* webpackChunkName: "404" */ "src/pages/error/404/404.component.js"),
    static: true,
    isSSR: true,
  },
  // Replace 500 component code with own code
  {
    path: ROUTE_500,
    component: () => import(/* webpackChunkName: "500" */ "src/pages/error/500/500.component.js"),
    isSSR: false,
  },
  // If no route will match 404 component will serve to client
  {
    path: "/*",
    component: () => import(/* webpackChunkName: "404" */ "src/pages/error/404/404.component.js"),
    static: true,
    isSSR: true,
  },
];
