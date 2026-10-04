import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface PresenceEvent {
  user_id: number;
  is_online: boolean;
}

interface PresenceState {
  onlineUserIds: number[];
}

/* -------------------------------------------------------------------------- */
/* Initial State                                                              */
/* -------------------------------------------------------------------------- */

const initialState: PresenceState = {
  onlineUserIds: [],
};

/* -------------------------------------------------------------------------- */
/* Slice                                                                      */
/* -------------------------------------------------------------------------- */

const presenceSlice = createSlice({
  name: "presence",

  initialState,

  reducers: {
    /* ---------------------------------------------------------------------- */
    /* Set all currently online users                                        */
    /* ---------------------------------------------------------------------- */

    setOnlineUsers: (
      state,
      action: PayloadAction<number[]>
    ) => {
      state.onlineUserIds = action.payload;
    },

    /* ---------------------------------------------------------------------- */
    /* Update one user's presence                                             */
    /* ---------------------------------------------------------------------- */

    setUserPresence: (
      state,
      action: PayloadAction<PresenceEvent>
    ) => {
      const { user_id, is_online } = action.payload;

      if (is_online) {
        // Don't add the same user twice.
        if (!state.onlineUserIds.includes(user_id)) {
          state.onlineUserIds.push(user_id);
        }
      } else {
        state.onlineUserIds =
          state.onlineUserIds.filter(
            (id) => id !== user_id
          );
      }
    },

    /* ---------------------------------------------------------------------- */
    /* Explicitly mark user online                                            */
    /* ---------------------------------------------------------------------- */

    setUserOnline: (
      state,
      action: PayloadAction<number>
    ) => {
      const userId = action.payload;

      if (!state.onlineUserIds.includes(userId)) {
        state.onlineUserIds.push(userId);
      }
    },

    /* ---------------------------------------------------------------------- */
    /* Explicitly mark user offline                                           */
    /* ---------------------------------------------------------------------- */

    setUserOffline: (
      state,
      action: PayloadAction<number>
    ) => {
      const userId = action.payload;

      state.onlineUserIds =
        state.onlineUserIds.filter(
          (id) => id !== userId
        );
    },

    /* ---------------------------------------------------------------------- */
    /* Clear presence on logout                                               */
    /* ---------------------------------------------------------------------- */

    clearPresence: (state) => {
      state.onlineUserIds = [];
    },
  },
});

/* -------------------------------------------------------------------------- */
/* Actions                                                                    */
/* -------------------------------------------------------------------------- */

export const {
  setOnlineUsers,
  setUserPresence,
  setUserOnline,
  setUserOffline,
  clearPresence,
} = presenceSlice.actions;

/* -------------------------------------------------------------------------- */
/* Reducer                                                                    */
/* -------------------------------------------------------------------------- */

export default presenceSlice.reducer;