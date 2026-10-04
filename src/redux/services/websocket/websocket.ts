import type { AppDispatch } from "../../store/store";

import { receiveMessage } from "../../slices/chatSlice";

import {
  setOnlineUsers,
  setUserPresence,
} from "../../slices/presenceSlice";

import { wsManager } from "./websocketManager";


export const startWebSocket = (
  token: string,
  currentUserId: number,
  dispatch: AppDispatch
) => {
  wsManager.connect(token);

  const unsubscribe =
    wsManager.subscribe((event) => {
      switch (event.type) {

        case "message":
          dispatch(
            receiveMessage({
              message: {
                id: event.id,
                sender_id:
                  event.sender_id,
                receiver_id:
                  event.receiver_id,
                message:
                  event.message,
                timestamp:
                  event.timestamp,
              },
              currentUserId,
            })
          );

          break;


        case "message_read":
          window.dispatchEvent(
            new CustomEvent(
              "pulse:message-read",
              {
                detail: {
                  messageId:
                    event.message_id,
                },
              }
            )
          );

          break;


        case "online_users":
          dispatch(
            setOnlineUsers(
              event.data
            )
          );

          break;


        case "presence":
          dispatch(
            setUserPresence(event)
          );

          break;


        case "typing":
          break;


        default:
          break;
      }
    });


  return () => {
    unsubscribe();
    wsManager.disconnect();
  };
};


export const sendChatMessage = (
  receiverId: number,
  message: string
) => {
  const trimmedMessage =
    message.trim();

  if (!trimmedMessage) {
    return;
  }

  wsManager.send({
    type: "message",
    receiver_id: receiverId,
    message: trimmedMessage,
  });
};


export const markMessageAsRead = (
  messageId: number,
  senderId: number
) => {
  wsManager.send({
    type: "read",
    message_id: messageId,
    sender_id: senderId,
  });
};