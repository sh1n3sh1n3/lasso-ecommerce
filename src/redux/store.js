import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

const mainReducer = combineReducers({ auth: authReducer });

const store = configureStore({
  reducer: mainReducer,
});

export default store;
