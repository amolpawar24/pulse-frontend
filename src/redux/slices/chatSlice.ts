import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { Message } from "../../types/chat.type";

import {
  fetchMessages,
} from "../thunk/chatThunks";

interface ChatState {
  activeUserId: number | null;
  messagesByUser: Record<number, Message[]>;
  isLoading: boolean;
  error: string | null;
}

interface ReceiveMessagePayload {
  message: Message;
  currentUserId: number;
}

interface AddMessagePayload {
  message: Message;
  currentUserId: number;
}

const initialState: ChatState = {
  activeUserId: null,
  messagesByUser: {},
  isLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",

  initialState,

  reducers: {
    setActiveUser: (
      state,
      action: PayloadAction<number | null>
    ) => {
      state.activeUserId = action.payload;
    },

    setMessages: (
      state,
      action: PayloadAction<{
        userId: number;
        messages: Message[];
      }>
    ) => {
      state.messagesByUser[
        action.payload.userId
      ] = action.payload.messages;

      state.isLoading = false;
      state.error = null;
    },

    receiveMessage: (
      state,
      action: PayloadAction<ReceiveMessagePayload>
    ) => {
      const {
        message,
        currentUserId,
      } = action.payload;

      const conversationUserId =
        message.sender_id === currentUserId
          ? message.receiver_id
          : message.sender_id;

      if (
        !state.messagesByUser[
          conversationUserId
        ]
      ) {
        state.messagesByUser[
          conversationUserId
        ] = [];
      }

      const alreadyExists =
        state.messagesByUser[
          conversationUserId
        ].some(
          (item) =>
            item.id === message.id
        );

      if (alreadyExists) {
        return;
      }

      state.messagesByUser[
        conversationUserId
      ].push(message);
    },

    addMessage: (
      state,
      action: PayloadAction<AddMessagePayload>
    ) => {
      const {
        message,
        currentUserId,
      } = action.payload;

      const conversationUserId =
        message.sender_id === currentUserId
          ? message.receiver_id
          : message.sender_id;

      if (
        !state.messagesByUser[
          conversationUserId
        ]
      ) {
        state.messagesByUser[
          conversationUserId
        ] = [];
      }

      const alreadyExists =
        state.messagesByUser[
          conversationUserId
        ].some(
          (item) =>
            item.id === message.id
        );

      if (alreadyExists) {
        return;
      }

      state.messagesByUser[
        conversationUserId
      ].push(message);
    },

    setChatLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isLoading =
        action.payload;
    },

    setChatError: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.error =
        action.payload;
    },

    clearMessages: (state) => {
      state.messagesByUser = {};
    },

    clearChat: (state) => {
      state.activeUserId = null;
      state.messagesByUser = {};
      state.isLoading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================================
      // FETCH MESSAGES
      // ==========================================

      .addCase(
        fetchMessages.pending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchMessages.fulfilled,
        (
          state,
          action
        ) => {
          const {
            userId,
            messages,
          } = action.payload;

          state.messagesByUser[
            userId
          ] = messages;

          state.isLoading = false;
          state.error = null;
        }
      )

      .addCase(
        fetchMessages.rejected,
        (
          state,
          action
        ) => {
          state.isLoading = false;
          state.error =
            action.payload ??
            "Failed to load messages";
        }
      );
  },
});

export const {
  setActiveUser,
  setMessages,
  receiveMessage,
  addMessage,
  setChatLoading,
  setChatError,
  clearMessages,
  clearChat,
} = chatSlice.actions;

export default chatSlice.reducer;