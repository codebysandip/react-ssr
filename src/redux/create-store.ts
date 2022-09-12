import { HttpClient } from "src/core/services/http-client.js";
import {
  AnyAction,
  EnhancedStore,
  MiddlewareArray,
  ReducersMapObject,
  Store,
  Dispatch,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { configureStore, combineReducers } from "./redux.imports.js";
import { ThunkMiddleware } from "redux-thunk";
import AuthReducer from "pages/auth/auth.redux";
import { RootState as RootStateType } from "./root-state.js";
import AppReducer from "src/app.redux.js";

const reducer = {
  auth: AuthReducer,
  app: AppReducer
};
/**
 * All reducers will always hold all the reducers loaded
 * on client side during lazy load reducers will load on page change
 * allReduces will hold all default reducers + lazy loaded reducers
 */
let allReducers: ReducersMapObject = {
  ...reducer,
};

export const replaceReducer = (store: Store, lazyReducers: ReducersMapObject) => {
  allReducers = {
    ...allReducers,
    ...lazyReducers,
  };
  // add new lazy loaded reducers to current store
  store.replaceReducer(combineReducers(allReducers));
};

export function createStore(lazyReducers?: ReducersMapObject) {
  if (!lazyReducers) {
    lazyReducers = {};
  }
  const preloadedState = !process.env.IS_SERVER ? window.__SSRDATA__ : {};
  const store = configureStore({
    reducer: {
      ...allReducers,
      ...lazyReducers,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: HttpClient,
        },
      });
    },
    preloadedState,
    devTools: process.env.IS_LOCAL,
  });

  return store;
}

export type RootState = RootStateType;
export type AppDispatch = ThunkDispatch<any, typeof HttpClient, AnyAction> & Dispatch<AnyAction>;
export type AppStore = EnhancedStore<
  RootState,
  AnyAction,
  MiddlewareArray<[ThunkMiddleware<RootState, AnyAction, typeof HttpClient>]>
>;
