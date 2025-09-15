import { createSlice } from "@reduxjs/toolkit"
import { getProduct } from "../action/product.action";



const initialState = {
  products: [],
  productLoading: false,
}

const productSlice = createSlice({
  name: 'product',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, { payload }) => {
        state.productLoading = false;
        state.products = payload.products;
      })
      .addCase(getProduct.rejected, (state) => {
        state.productLoading = false;
      });

  }
});

export default productSlice.reducer;