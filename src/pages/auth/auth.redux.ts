import * as toolkitRaw from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { COOKIE_REFRESH_TOKEN, COOKIE_ACCESS_TOKEN } from "src/const.js";
import { getAccessTokenData, setAccessAndRefreshToken } from "src/core/functions/get-token.js";
import { GetState, ThunkApi } from "src/core/models/common.model.js";
import { ContextDataWithStore } from "src/core/models/context-with-store.model.js";
import { CookieService } from "src/core/services/cookie.service.js";
import { AuthResponse } from "src/core/services/http-client.js";
import { AppDispatch } from "src/redux/create-store.js";
import { LoginPayload, User } from "./auth.model.js";
const { createSlice } = ((toolkitRaw as any).default ?? toolkitRaw) as typeof toolkitRaw;

export interface AuthState {
  isLoggedIn: boolean;
  user?: User;
  login: {
    errorMessage: string;
  };
}

const initialState: AuthState = {
  isLoggedIn: false,
  login: {
    errorMessage: "",
  },
};

export const login = (payload: LoginPayload) => {
  return async (dispath: AppDispatch, _getState: GetState, api: ThunkApi) => {
    const apiResponse = await api.post<AuthResponse>("/api/login", payload);
    if (apiResponse.data) {
      setAccessAndRefreshToken(apiResponse.data.accessToken, apiResponse.data.refreshToken);
      dispath(
        loginSuccess({
          isLoggedIn: true,
          user: getAccessTokenData(),
        }),
      );
    } else {
      dispath(loginError(apiResponse.message[0]));
    }
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ isLoggedIn: boolean; user?: User }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
    },
    loginError: (state, action: PayloadAction<string>) => {
      state.login.errorMessage = action.payload;
    },
    logout: (state, action: PayloadAction<{ ctx?: ContextDataWithStore }>) => {
      state.isLoggedIn = false;
      state.user = undefined;
      CookieService.delete(COOKIE_ACCESS_TOKEN, action.payload.ctx?.res);
      CookieService.delete(COOKIE_REFRESH_TOKEN, action.payload.ctx?.res);
    },
  },
});

export const { loginSuccess, logout, loginError } = authSlice.actions;
export default authSlice.reducer;
