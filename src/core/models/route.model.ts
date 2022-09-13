import { Reducer } from "@reduxjs/toolkit";
import { ApiResponse } from "core/services/http-client.js";
import { ContextDataWithStore } from "./context-with-store.model.js";
import { PageData } from "./page-data.js";

export interface IRoute {
  /**
   * React route path
   */
  path: string;
  /**
   * Lazy loaded component
   */
  component: CompModuleImport;
  /**
   * Is Static Page. If true it will cached for performance
   * @default false
   */
  static?: boolean;
  /**
   * Is route need to render on server. If false server will send a template only
   * Whole page will render on client
   * There is case when page is not for SEO or page access required login
   */
  isSSR: boolean;
}

export type CompModule = {
  default: any;
  getInitialProps?: (ctx: ContextDataWithStore) => Promise<ApiResponse<PageData | null>>;
  reducer?: { [key: string]: Reducer<any> };
};
export type CompModuleImport = () => Promise<CompModule>;
