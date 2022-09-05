import { HomeData, Product } from "./home.model.js";
import { PayloadAction } from "@reduxjs/toolkit";
import { GetState, ThunkApi } from "src/core/models/common.model.js";
import { AppDispatch } from "src/redux/create-store.js";
import { ContextData } from "src/core/models/context.model.js";
import { createSlice } from "src/redux/redux.imports.js";

export interface HomeState {
  pageData: HomeData;
  productById?: Product;
}
const initialState: HomeState = {
  pageData: { products: [] },
  productById: undefined,
};

export const fetchProducts = () => {
  return async (dispatch: AppDispatch, _getState: GetState, api: ThunkApi) => {
    const apiResponse = await api.get<HomeData>("/api/product");
    dispatch(productsPageDataLoaded(apiResponse.data || { products: [] }));
    return apiResponse;
  };
};

export const fetchProductById = (id: number, ctx: ContextData) => {
  return async (dispatch: AppDispatch, _getState: GetState, api: ThunkApi) => {
    const apiResponse = await api.get<Product>(`/api/product/${id}`, { isAuth: true, ctx });
    console.log("fetchProductById!!", apiResponse.data);
    dispatch(productByIdLoaded(apiResponse.data || undefined));
    return apiResponse;
  };
};

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
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchProducts.fulfilled, (state, action) => {
  //     state.products = action.payload;
  //   });
  // },
});

export const { productsPageDataLoaded, productByIdLoaded } = homeSlice.actions;
export default homeSlice.reducer;
