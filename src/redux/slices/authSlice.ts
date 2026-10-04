import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import {
  loginUser,
  registerUser,
  fetchCurrentUser,
} from "../thunk/authThunks";

import type { User } from "../../types/auth.type";

export type AuthUser = User;

export type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

const getStoredUser = (): AuthUser | null => {
  const storedUser = localStorage.getItem("pulse_user");

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    localStorage.removeItem("pulse_user");
    return null;
  }
};

const getStoredToken = (): string | null => {
  return localStorage.getItem("pulse_access_token");
};

const storedToken = getStoredToken();
const storedUser = getStoredUser();

const initialState: AuthState = {
  user: storedUser,
  accessToken: storedToken,
  isAuthenticated: Boolean(storedToken && storedUser),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{
        accessToken: string;
        user: AuthUser;
      }>
    ) => {
      const {
        accessToken,
        user,
      } = action.payload;

      state.accessToken = accessToken;
      state.user = user;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;

      localStorage.setItem(
        "pulse_access_token",
        accessToken
      );

      localStorage.setItem(
        "pulse_user",
        JSON.stringify(user)
      );
    },

    setUser: (
      state,
      action: PayloadAction<AuthUser | null>
    ) => {
      state.user = action.payload;

      if (action.payload) {
        localStorage.setItem(
          "pulse_user",
          JSON.stringify(action.payload)
        );
      } else {
        localStorage.removeItem("pulse_user");
      }
    },

    setAccessToken: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.accessToken = action.payload;

      state.isAuthenticated = Boolean(
        action.payload && state.user
      );

      if (action.payload) {
        localStorage.setItem(
          "pulse_access_token",
          action.payload
        );
      } else {
        localStorage.removeItem(
          "pulse_access_token"
        );
      }
    },

    setAuthLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isLoading = action.payload;
    },

    setAuthError: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.error = action.payload;
    },

    clearAuthError: (state) => {
      state.error = null;
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;

      localStorage.removeItem(
        "pulse_access_token"
      );

      localStorage.removeItem(
        "pulse_user"
      );
    },
  },

  extraReducers: (builder) => {
    /* =====================================================
       LOGIN
    ===================================================== */

    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        const {
          access_token,
          user,
        } = action.payload;

        state.accessToken = access_token;
        state.user = user;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;

        localStorage.setItem(
          "pulse_access_token",
          access_token
        );

        localStorage.setItem(
          "pulse_user",
          JSON.stringify(user)
        );
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error =
          action.payload ?? "Login failed";
      });


    /* =====================================================
       REGISTER
    ===================================================== */

    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        const {
          access_token,
          user,
        } = action.payload;

        state.accessToken = access_token;
        state.user = user;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;

        localStorage.setItem(
          "pulse_access_token",
          access_token
        );

        localStorage.setItem(
          "pulse_user",
          JSON.stringify(user)
        );
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload ?? "Registration failed";
      });


    /* =====================================================
       CURRENT USER
    ===================================================== */

    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(
        fetchCurrentUser.fulfilled,
        (state, action) => {
          state.user = action.payload;

          state.isAuthenticated =
            Boolean(state.accessToken);

          state.isLoading = false;
          state.error = null;

          localStorage.setItem(
            "pulse_user",
            JSON.stringify(action.payload)
          );
        }
      )

      .addCase(
        fetchCurrentUser.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error =
            action.payload ??
            "Failed to fetch current user";
        }
      );
  },
});

export const {
  setAuth,
  setUser,
  setAccessToken,
  setAuthLoading,
  setAuthError,
  clearAuthError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;