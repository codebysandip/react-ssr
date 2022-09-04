import { matchPath } from "react-router";
import { ROUTE_404 } from "src/const.js";
import { Routes } from "src/routes.js";
import { IRoute } from "../models/route.model.js";

/**
 * Match route from {@link Routes} for given path
 * @param path path to be matched
 * @returns {@link IRoute}
 */
export function getRoute(path: string) {
  let route = Routes.find((r) => {
    const match = matchPath(r.path, path);
    if (match) {
      r.params = match.params as Record<string, string>;
      return true;
    }
    return false;
  });
  if (!route) {
    route = Routes.find((r) => r.path === ROUTE_404) as IRoute;
  }
  return route;
}
