import { createSlice } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';

const initialState = {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

      if (productIndex >= 0) {
        state.cartItems[productIndex].cartTotalQuantity += 1;
        toast.info(`Adicionado mais um ${action.payload.name} ao carrinho.`, {
          position: 'top-left',
        });
      } else {
        const productToBeAdded = { ...action.payload, cartTotalQuantity: 1 };
        state.cartItems.push(productToBeAdded);
        toast.success(`${action.payload.name} adicionado ao carrinho!`, { position: 'top-left' });
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    decreaseCartProductQuantity(state, action) {
      const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

      if (state.cartItems[productIndex].cartTotalQuantity > 1) {
        state.cartItems[productIndex].cartTotalQuantity -= 1;
        toast.info(`Diminuiu menos um ${action.payload.name} do carrinho.`, {
          position: 'top-left',
        });
      } else if (state.cartItems[productIndex].cartTotalQuantity === 1) {
        const newProductCartItem = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartItems = newProductCartItem;
        toast.success(`${action.payload.name} removido do carrinho!`, { position: 'top-left' });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeProductFromCart(state, action) {
      const removedProductCartItem = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartItems = removedProductCartItem;
      toast.success(`${action.payload.name} removido do carrinho!`, { position: 'top-left' });
    },
    clearAllCartItems(state, action) {
      state.cartItems = [];
      toast.info('Todos os produtos removidos do carrinho.', { position: 'top-left' });
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    calculateProductsSubtotal(state, action) {
      const subtotalArray = [];
      state.cartItems.map((item) => {
        const { price, cartTotalQuantity } = item;
        const cartProductsAmont = price * cartTotalQuantity;
        return subtotalArray.push(cartProductsAmont);
      });
      const totalProductsPriceAmount = subtotalArray.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalAmount = totalProductsPriceAmount;
    },
  },
});

export const {
  addToCart,
  decreaseCartProductQuantity,
  removeProductFromCart,
  clearAllCartItems,
  calculateProductsSubtotal,
} = cartSlice.actions;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export default cartSlice.reducer;
