import { configureStore, combineReducers } from '@reduxjs/toolkit';

const mainReducer = combineReducers();

const store = configureStore({
  reducer: mainReducer,
});

export default store;
