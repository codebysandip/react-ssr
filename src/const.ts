/* ####### Cookie storage keys ####### */
export const COOKIE_ACCESS_TOKEN = "accessToken";
export const COOKIE_REFRESH_TOKEN = "refreshToken";

/* ##### API URLS ##### */
export const URL_REFERESH_TOKEN = "/api/refresh-token";

/* ##### Page URLS ##### */
export const ROUTE_HOME = "/home";
export const ROUTE_404 = "/404";
export const ROUTE_500 = "/500";
export const ROUTE_LOGIN = "/login";

export const NO_HEADER_PATHS = [
  // don't show header or footer in case of error page
  // error can happen in header/footer api
  ROUTE_404,
  ROUTE_500,
];

/* ##### ERROR MESSAGES ##### */
export const PAGE_INVALID_RETURN_DATA = `
Page component should return IRedirect or ApiResponse object!!
Reason: Api server can return other status than 200 in that case
User should redirect to appropriate page base on status of api
`;
