import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterProductsBySearch(state, action) {
      const { products, search } = action.payload;
      const searchedProducts = products.filter((product) => {
        return (
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
        );
      });
      state.filteredProducts = searchedProducts;
    },
    sortProducts(state, action) {
      const { products, sort } = action.payload;
      let sortedProducts = [];

      if (sort === 'latest') {
        sortedProducts = products;
      }

      if (sort === 'lowest-price') {
        sortedProducts = products.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }

      if (sort === 'highest-price') {
        sortedProducts = products.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }

      if (sort === 'ascending') {
        sortedProducts = products.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }

      if (sort === 'descending') {
        sortedProducts = products.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }

      state.filteredProducts = sortedProducts;
    },
    filterProductsByCategory(state, action) {
      const { products, category } = action.payload;
      let categoryFilteredProducts = [];
      if (category === 'Todos') {
        categoryFilteredProducts = products;
      } else {
        categoryFilteredProducts = products.filter((product) => product.category === category);
      }
      state.filteredProducts = categoryFilteredProducts;
    },
    filterProductsByBrand(state, action) {
      const { products, brand } = action.payload;
      let brandFilteredProducts = [];
      if (brand === 'Todos') {
        brandFilteredProducts = products;
      } else {
        brandFilteredProducts = products.filter((product) => product.brand === brand);
      }
      state.filteredProducts = brandFilteredProducts;
    },
    filterProductsByPrice(state, action) {
      const { products, price } = action.payload;
      let priceFilteredProducts = [];
      priceFilteredProducts = products.filter((product) => product.price <= price);
      state.filteredProducts = priceFilteredProducts;
    },
  },
});

export const {
  filterProductsBySearch,
  sortProducts,
  filterProductsByCategory,
  filterProductsByBrand,
  filterProductsByPrice,
} = filterSlice.actions;
export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
