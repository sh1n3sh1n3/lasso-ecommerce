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
        categoryFilteredProducts = products.filter((product) => (product.category = category));
      }
    },
  },
});

export const { filterProductsBySearch, sortProducts, filterProductsByCategory } =
  filterSlice.actions;
export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
