import { Request, Response } from "express";
import { AppStore } from "src/redux/create-store.js";

export interface ContextData {
  location: {
    pathname: string;
    hostname: string;
  };
  /**
   * Query string
   */
  query: Record<string, any>;
  /**
   * Path params
   * @example /path/:id :id will available as params.id
   */
  params: Record<string, string | number | boolean>;
  /**
   * Redux store
   */
  store: AppStore;
  /**
   * Request Object of express will available
   * only for server side
   * @see https://expressjs.com/en/api.html#req
   */
  req?: Request;
  /**
   * Response Object of express will available
   * only for server side
   * @see https://expressjs.com/en/api.html#res
   */
  res?: Response;
}
