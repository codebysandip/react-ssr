import { AuthState } from "src/pages/auth/auth.redux.js";
import { HomeState } from "src/pages/home/home.redux.js";

export interface RootState {
  home: HomeState;
  auth: AuthState;
}
