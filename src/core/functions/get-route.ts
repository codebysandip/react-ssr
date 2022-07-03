import { matchPath } from "react-router";
import { Routes } from "src/routes";

export function getRoute(url?: string) {
  let route = Routes.find((r) => matchPath(r.path, url || window.location.pathname));
  if (!route) {
    route = Routes.find((r) => r.path === "/404");
  }
  return route;
}
