import { HomeData, Product } from "./home.model.js";
import { PayloadAction } from "@reduxjs/toolkit";
import { GetState, ThunkApi } from "src/core/models/common.model.js";
import { AppDispatch } from "src/redux/create-store.js";
import * as toolkitRaw from "@reduxjs/toolkit";
const { createSlice } = ((toolkitRaw as any).default ?? toolkitRaw) as typeof toolkitRaw;

export interface HomeState {
  products: Product[];
  productById?: Product;
}
const initialState: HomeState = {
  products: [],
  productById: undefined,
};

// export const fetchProducts = createAsyncThunk("home/fetchProducts", async (thunkApi: typeof HttpClient) => {
//   const homeData = await thunkApi.get<HomeData>("/api/products");
//   return homeData.data?.products || [];
// });

export const fetchProducts = () => {
  return async (dispatch: AppDispatch, _getState: GetState, api: ThunkApi) => {
    const apiResponse = await api.get<HomeData>("/api/product");
    dispatch(productsLoaded(apiResponse.data?.products || []));
    return apiResponse;
  };
};

export const fetchProductById = (id: number) => {
  return async (dispatch: AppDispatch, _getState: GetState, api: ThunkApi) => {
    const apiResponse = await api.get<Product>(`/api/product/${id}`, { isAuth: true });
    dispatch(productByIdLoaded(apiResponse.data || undefined));
    return apiResponse;
  };
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    productsLoaded: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
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

export const { productsLoaded, productByIdLoaded } = homeSlice.actions;
export default homeSlice.reducer;
