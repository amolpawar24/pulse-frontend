import { useEffect, useRef } from "react";

import PulseMark from "../../components/PulseStatus/PulseMark";

import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import { useAppSelector } from "../../redux/hooks/useAppSelector";

import {
  sendChatMessage,
  startWebSocket,
} from "../../redux/services/websocket/websocket";

import { logout } from "../../redux/slices/authSlice";

import {
  clearChat,
  setActiveUser,
} from "../../redux/slices/chatSlice";

import { clearPresence } from "../../redux/slices/presenceSlice";

import {
  fetchMessages,
  fetchUsers,
} from "../../redux/thunk/chatThunks";

import ChatHeader from "./components/ChatHeader";
import MessageInput from "./components/MessageInput";
import MessageList from "./components/MessageList";
import Sidebar from "./components/Sidebar";

interface User {
  id: number;
  name: string;
  email: string;
  is_online: boolean;
}

const ACTIVE_CHAT_KEY = "pulse_active_chat";

const IndexChat = () => {
  const dispatch = useAppDispatch();

  /* =====================================================
     AUTH
  ===================================================== */

  const me = useAppSelector(
    (state) => state.auth.user
  );

  const token = useAppSelector(
    (state) => state.auth.accessToken
  );

  /* =====================================================
     USERS
  ===================================================== */

  const users = useAppSelector(
    (state) => state.user.list
  ) as User[];

  const usersLoading = useAppSelector(
    (state) => state.user.isLoading
  );

  /* =====================================================
     PRESENCE
  ===================================================== */

  const onlineIds = useAppSelector(
    (state) => state.presence.onlineUserIds
  );

  /* =====================================================
     CHAT
  ===================================================== */

  const activeUserId = useAppSelector(
    (state) => state.chat.activeUserId
  );

  const messagesByUser = useAppSelector(
    (state) => state.chat.messagesByUser
  );

  const isLoading = useAppSelector(
    (state) => state.chat.isLoading
  );

  const restoredChatRef = useRef(false);

  /* =====================================================
     START APP
  ===================================================== */

  useEffect(() => {
    if (!token || !me) {
      return;
    }

    dispatch(fetchUsers());

    const stopWebSocket = startWebSocket(
      token,
      me.id,
      dispatch
    );

    return () => {
      stopWebSocket();
    };
  }, [token, me, dispatch]);

  /* =====================================================
     RESTORE LAST CHAT
  ===================================================== */

  useEffect(() => {
    if (!token || !me) {
      return;
    }

    if (usersLoading) {
      return;
    }

    if (users.length === 0) {
      return;
    }

    if (restoredChatRef.current) {
      return;
    }

    const storedChat = localStorage.getItem(
      ACTIVE_CHAT_KEY
    );

    if (!storedChat) {
      restoredChatRef.current = true;
      return;
    }

    const storedUserId = Number(storedChat);

    if (
      !Number.isInteger(storedUserId) ||
      storedUserId <= 0
    ) {
      localStorage.removeItem(
        ACTIVE_CHAT_KEY
      );

      restoredChatRef.current = true;
      return;
    }

    if (storedUserId === me.id) {
      localStorage.removeItem(
        ACTIVE_CHAT_KEY
      );

      restoredChatRef.current = true;
      return;
    }

    const userExists = users.some(
      (user) => user.id === storedUserId
    );

    if (!userExists) {
      localStorage.removeItem(
        ACTIVE_CHAT_KEY
      );

      restoredChatRef.current = true;
      return;
    }

    restoredChatRef.current = true;

    dispatch(
      setActiveUser(storedUserId)
    );

    dispatch(
      fetchMessages(storedUserId)
    );
  }, [
    token,
    me,
    users,
    usersLoading,
    dispatch,
  ]);

  /* =====================================================
     ACTIVE USER
  ===================================================== */

  const activeUser =
    users.find(
      (user) => user.id === activeUserId
    ) ?? null;

  /* =====================================================
     ACTIVE CONVERSATION MESSAGES
  ===================================================== */

  const messages =
    activeUserId !== null
      ? messagesByUser[activeUserId] ?? []
      : [];

  /* =====================================================
     SELECT USER
  ===================================================== */

  const handleSelectUser = (
    userId: number
  ) => {
    if (!me || userId === me.id) {
      return;
    }

    localStorage.setItem(
      ACTIVE_CHAT_KEY,
      String(userId)
    );

    dispatch(
      setActiveUser(userId)
    );

    dispatch(
      fetchMessages(userId)
    );
  };

  /* =====================================================
     BACK TO SIDEBAR
  ===================================================== */

  const handleBack = () => {
    localStorage.removeItem(
      ACTIVE_CHAT_KEY
    );

    dispatch(
      setActiveUser(null)
    );
  };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = () => {
    localStorage.removeItem(
      ACTIVE_CHAT_KEY
    );

    dispatch(clearChat());
    dispatch(clearPresence());
    dispatch(logout());
  };

  /* =====================================================
     SEND MESSAGE
  ===================================================== */

  const handleSendMessage = (
    content: string
  ) => {
    const message = content.trim();

    if (!activeUser || !message) {
      return;
    }

    sendChatMessage(
      activeUser.id,
      message
    );
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <main
      className={[
        "chat-page",
        activeUser
          ? "chat-page--conversation-open"
          : "chat-page--no-conversation",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="chat-page__shell">

        {/* =================================================
            SIDEBAR
        ================================================= */}

        <Sidebar
          me={me}
          users={users}
          onlineIds={onlineIds}
          activeUserId={activeUserId}
          onSelect={handleSelectUser}
          onLogout={handleLogout}
        />

        {/* =================================================
            MAIN CHAT AREA
        ================================================= */}

        <section className="chat-main">

          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {!activeUser || !me ? (
            <div className="chat-main__empty">

              <div
                className="chat-main__empty-glow"
                aria-hidden="true"
              />

              <div className="chat-main__empty-icon">
                <PulseMark
                  size="xl"
                  animated
                />
              </div>

              <div className="chat-main__empty-content">

                <span className="chat-main__empty-eyebrow">
                  YOUR CONVERSATIONS
                </span>

                <h2>
                  Select a conversation
                </h2>

                <p>
                  Choose someone from your
                  conversations to start chatting.
                </p>

              </div>
            </div>
          ) : (

            /* =================================================
               ACTIVE CONVERSATION
            ================================================= */

            <div className="chat-conversation">

              {/* ---------------------------------------------
                  HEADER
              --------------------------------------------- */}

              <ChatHeader
                user={activeUser}
                isOnline={onlineIds.includes(
                  activeUser.id
                )}
                onBack={handleBack}
              />

              {/* ---------------------------------------------
                  MESSAGES
              --------------------------------------------- */}

              <div className="chat-conversation__body">
                <MessageList
                  messages={messages}
                  currentUserId={me.id}
                  isLoading={isLoading}
                />
              </div>

              {/* ---------------------------------------------
                  INPUT
              --------------------------------------------- */}

              <div className="chat-conversation__input">
                <MessageInput
                  onSend={handleSendMessage}
                />
              </div>

            </div>
          )}

        </section>
      </div>
    </main>
  );
};

export default IndexChat;