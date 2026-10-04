import http from "../axios/axios";
import type { Message } from "../../../types/chat.type";

// Get the conversation between the current user and another user
const getConversation = (userId: number) =>
  http.get<Message[]>(`/api/messages/${userId}`);

export const messagesService = {
  getConversation,
};