import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { AuthState, User } from "../../types/auth.type";

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        accessToken: string;
        user: User;
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },

    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setCredentials,
  setUser,
  logout,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;