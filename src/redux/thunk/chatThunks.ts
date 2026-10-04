import { createAsyncThunk } from "@reduxjs/toolkit";

import { messagesService } from "../services/messages/messagesService";
import { usersService } from "../services/users/usersService";

import type { User } from "../../types/auth.type";
import type { Message } from "../../types/chat.type";

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await usersService.getUsers();
    return response.data;
  } catch {
    return rejectWithValue("Failed to load users");
  }
});

export const fetchMessages = createAsyncThunk<
  { userId: number; messages: Message[] },
  number,
  { rejectValue: string }
>("chat/fetchMessages", async (userId, { rejectWithValue }) => {
  try {
    const response = await messagesService.getConversation(userId);
    return { userId, messages: response.data };
  } catch {
    return rejectWithValue("Failed to load messages");
  }
});