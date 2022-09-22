import { HomeData, Product } from "./home.model.js";
import { PayloadAction } from "@reduxjs/toolkit";
import { GetState, ThunkApi } from "src/core/models/common.model.js";
import { AppDispatch } from "src/redux/create-store.js";
import { ContextData } from "src/core/models/context.model.js";
import { createSlice } from "src/redux/redux.imports.js";

export interface HomeState {
  pageData: HomeData;
  productById?: Product;
  topProducts: Product[];
}
const initialState: HomeState = {
  pageData: { products: [] },
  productById: undefined,
  topProducts: []
};

export const fetchProducts = () => {
  return async (dispatch: AppDispatch, _getState: GetState, api: ThunkApi) => {
    const apiResponse = await api.get<HomeData>("/api/product", { extra: "home/productsPageDataLoaded" });
    dispatch(productsPageDataLoaded(apiResponse.data || { products: [] }));
    return apiResponse;
  };
};

export const fetchProductById = (id: number, ctx: ContextData) => {
  return async (dispatch: AppDispatch, _getState: GetState, api: ThunkApi) => {
    const apiResponse = await api.get<Product>(
      `/api/product/${id}`,
      { isAuth: true, nodeReqObj: ctx.req, nodeRespObj: ctx.res }
    );
    dispatch(productByIdLoaded(apiResponse.data || undefined));
    return apiResponse;
  };
};

export function fetchTopProducts() {
  return async (dispatch: AppDispatch, _getState: GetState, api: ThunkApi) => {
    const apiResponse = await api.get<Product[]>("/api/product/top-products");
    dispatch(topProductsLoaded(apiResponse.data || []));
    return apiResponse;
  }
}

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    productsPageDataLoaded: (state, action: PayloadAction<HomeData>) => {
      state.pageData = action.payload;
    },
    productByIdLoaded: (state, action: PayloadAction<Product | undefined>) => {
      state.productById = action.payload;
    },
    topProductsLoaded: (state, action: PayloadAction<Product[]>) => {
      state.topProducts = action.payload;
    }
  },
});

export const { productsPageDataLoaded, productByIdLoaded, topProductsLoaded } = homeSlice.actions;
export default homeSlice.reducer;
