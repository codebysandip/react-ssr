import { Request, Response } from "express";
import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN } from "src/const.js";
import { User } from "src/pages/auth/auth.model.js";
import { CookieService } from "../services/cookie.service.js";

function getToken(key: string, req?: Request) {
  if (process.env.IS_SERVER && !req) {
    throw new Error("req cann't be undefined in SSR");
  }
  const accessToken = CookieService.get(key, req);
  return accessToken;
}
/**
 * get access token from cookie
 * @param req Node Request Object
 * @returns access token from cookie
 */
export function getAccessToken(req?: Request) {
  return getToken(COOKIE_ACCESS_TOKEN, req);
}

/**
 * decode JWT token
 * @param token JWT token
 * @returns decoded token of type T
 */
export function decodeToken<T>(token: string) {
  let tokenStr = "";
  if (process.env.IS_SERVER) {
    tokenStr = Buffer.from(token.split(".")[1], "base64").toString();
  } else {
    tokenStr = atob(token.split(".")[1]);
  }
  return JSON.parse(tokenStr) as T;
}
/**
 * get access token data from cookie
 * @param req Node Request Object
 * @returns decoded token of type T
 */
export function getAccessTokenData(req?: Request) {
  const accessToken = getAccessToken(req);
  if (accessToken) {
    return decodeToken<User>(accessToken);
  } else {
    return undefined;
  }
}

/**
 * get refresh token from cookie
 * @param req Node Request Object
 * @returns refresh token from cookie
 */
export function getRefreshToken(req?: Request) {
  return getToken(COOKIE_REFRESH_TOKEN, req);
}

/**
 * get refresh token data from cookie
 * @param req Node Request Object
 * @returns decoded token of type T
 */
export function getRefreshTokenData(req?: Request) {
  const accessToken = getRefreshToken(req);
  if (accessToken) {
    return decodeToken<User>(accessToken);
  } else {
    return undefined;
  }
}

/**
 * set access token and refresh token in cookie
 * with expiry time
 * @param accessToken Access Token
 * @param refreshToken Refresh Token
 * @param res Node Response Object
 */
export function setAccessAndRefreshToken(accessToken: string, refreshToken: string, res?: Response) {
  const accessTokenData = decodeToken<User>(accessToken);
  const refreshTokenData = decodeToken<User>(refreshToken);
  CookieService.set(
    COOKIE_ACCESS_TOKEN,
    accessToken,
    new Date(accessTokenData.exp ? accessTokenData.exp * 1000 : Date.now()),
    res,
  );
  CookieService.set(
    COOKIE_REFRESH_TOKEN,
    refreshToken,
    new Date(refreshTokenData?.exp ? refreshTokenData?.exp * 1000 : Date.now()),
    res,
  );
}
