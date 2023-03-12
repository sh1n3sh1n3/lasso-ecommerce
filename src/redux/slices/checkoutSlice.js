import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userShippingAddress: {},
  userBillingAddress: {},
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    saveUserShippingAddress(state, action) {
      state.userShippingAddress = action.payload;
    },
    saveUserBillingAddress(state, action) {
      state.userBillingAddress = action.payload;
    },
  },
});

export const { saveUserShippingAddress, saveUserBillingAddress } = checkoutSlice.actions;
export const selectUserShippingAddress = (state) => state.checkout.userShippingAddress;
export const selectUserBillingAddress = (state) => state.checkout.userBillingAddress;

export default checkoutSlice.reducer;
