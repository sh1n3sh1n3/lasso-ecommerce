import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  minPrice: null,
  maxPrice: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    storeProducts(state, action) {
      state.products = action.payload.products;
    },
    getProductPriceRange(state, action) {
      const { products } = action.payload;
      const pricesArray = [];
      products.map((product) => {
        const productPrice = product.price;
        return pricesArray.push(productPrice);
      });
      const max = Math.max(...pricesArray);
      const min = Math.min(...pricesArray);

      state.maxPrice = max;
      state.minPrice = min;
    },
  },
});

export const { storeProducts, getProductPriceRange } = productSlice.actions;
export const selectProducts = (state) => state.product.products;
export const selectMinPrice = (state) => state.product.minPrice;
export const selectMaxPrice = (state) => state.product.maxPrice;

export default productSlice.reducer;
