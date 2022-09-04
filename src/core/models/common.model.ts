import { RootState } from "src/redux/create-store.js";
import { HttpClient } from "../services/http-client.js";

export interface GetState {
  (): RootState;
}

export type ThunkApi = typeof HttpClient;
