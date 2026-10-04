import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { fetchUsers } from "../thunk/chatThunks";

export type User = {
  id: number;
  name: string;
  email: string;
  is_online?: boolean;
};

export type UserState = {
  list: User[];
  isLoading: boolean;
  error: string | null;
};

const initialState: UserState = {
  list: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    setUsers: (
      state,
      action: PayloadAction<User[]>
    ) => {
      state.list = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    setUsersLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isLoading = action.payload;
    },

    setUsersError: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    updateUserPresence: (
      state,
      action: PayloadAction<{
        userId: number;
        isOnline: boolean;
      }>
    ) => {
      const user = state.list.find(
        (item) =>
          item.id === action.payload.userId
      );

      if (user) {
        user.is_online =
          action.payload.isOnline;
      }
    },

    clearUsers: (state) => {
      state.list = [];
      state.isLoading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = false;
        state.error = null;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.list = [];
        state.isLoading = false;
        state.error =
          action.payload ?? "Failed to load users";
      });
  },
});

export const {
  setUsers,
  setUsersLoading,
  setUsersError,
  updateUserPresence,
  clearUsers,
} = userSlice.actions;

export default userSlice.reducer;