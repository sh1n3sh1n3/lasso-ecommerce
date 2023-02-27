import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';

const mainReducer = combineReducers({ auth: authReducer, product: productReducer });

const store = configureStore({
  reducer: mainReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
