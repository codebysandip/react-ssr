import { ApiResponse } from "core/services/http-client.js";
import { RootState } from "src/redux/create-store.js";
import { HttpClient } from "../services/http-client.js";
import { ContextData } from "./context.model.js";
import { IRedirect } from "./page-data.js";

export interface GetState {
  (): RootState;
}

export type ThunkApi = typeof HttpClient;

export type GetInitialProps = (
  ctx: ContextData,
) => Promise<ApiResponse<any> | IRedirect> | IRedirect;
