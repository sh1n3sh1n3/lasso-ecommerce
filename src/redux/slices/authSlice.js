import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setActiveUser(state, action) {
      const { email, userName, userId } = action.payload;

      state.isLoggedIn = true;
      state.email = email;
      state.userName = userName;
      state.userId = userId;
    },
  },
});

export const { setActiveUser } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmailn = (state) => state.auth.email;
export const selectUsername = (state) => state.auth.username;
export const selectUserId = (state) => state.auth.userId;

export default authSlice.reducer;
