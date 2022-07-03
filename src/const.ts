/* ####### Cookie storage keys ####### */
export const COOKIE_TOKEN = "token";
export const COOKIE_REFRESH_TOKEN = "refreshToken";

/* ##### API URLS ##### */
export const URL_REFERESH_TOKEN = "/api/auth/refresh-token";

/* ##### Page URLS ##### */
export const ROUTE_HOME = "/home";
export const ROUTE_404 = "/404";
export const ROUTE_500 = "/500";

export const NO_HEADER_PATHS = [
  // don't show header or footer in case of error page
  // error can happen in header/footer api
  ROUTE_404,
  ROUTE_500,
];
