import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import PulseMark from "../../../components/PulseStatus/PulseMark";

import {
  markMessageAsRead,
} from "../../../redux/services/websocket/websocket";

import type { Message } from "../../../types/chat.type";

interface MessageListProps {
  messages: Message[];
  currentUserId: number;
  isLoading?: boolean;
}

type MessageStatus =
  | "sent"
  | "delivered"
  | "seen";

interface DisplayMessage extends Message {
  isOwn: boolean;
  status: MessageStatus | null;
  showDate: boolean;
}

/* =========================================================
   TIME
========================================================= */

const formatTime = (
  timestamp: string
) => {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
};

/* =========================================================
   DATE KEY
========================================================= */

const getDateKey = (
  timestamp: string
) => {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ].join("-");
};

/* =========================================================
   DATE LABEL
========================================================= */

const formatDateLabel = (
  timestamp: string
) => {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const today = new Date();

  const todayKey = getDateKey(
    today.toISOString()
  );

  const messageKey = getDateKey(
    timestamp
  );

  if (todayKey === messageKey) {
    return "Today";
  }

  const yesterday = new Date(
    today
  );

  yesterday.setDate(
    yesterday.getDate() - 1
  );

  if (
    getDateKey(
      yesterday.toISOString()
    ) === messageKey
  ) {
    return "Yesterday";
  }

  return date.toLocaleDateString([], {
    day: "numeric",
    month: "short",
    year:
      date.getFullYear() !==
      today.getFullYear()
        ? "numeric"
        : undefined,
  });
};

/* =========================================================
   MESSAGE STATUS
========================================================= */

const MessageStatusIcon = ({
  status,
}: {
  status: MessageStatus;
}) => {
  if (status === "sent") {
    return (
      <span
        className={[
          "message-status",
          "message-status--sent",
        ].join(" ")}
        aria-label="Sent"
        title="Sent"
      >
        <PulseMark size="xs" />
      </span>
    );
  }

  const label =
    status === "seen"
      ? "Seen"
      : "Delivered";

  return (
    <span
      className={[
        "message-status",
        `message-status--${status}`,
      ].join(" ")}
      aria-label={label}
      title={label}
    >
      <PulseMark size="xs" />
      <PulseMark size="xs" />
    </span>
  );
};

/* =========================================================
   MESSAGE LIST
========================================================= */

const MessageList = ({
  messages,
  currentUserId,
  isLoading = false,
}: MessageListProps) => {
  const bottomRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const readByMeMessageIds =
    useRef<Set<number>>(
      new Set()
    );

  const previousMessageCount =
    useRef(messages.length);

  const [
    seenMessageIds,
    setSeenMessageIds,
  ] = useState<Set<number>>(
    new Set()
  );

  /* =======================================================
     DISPLAY MESSAGES
  ======================================================= */

  const groupedMessages =
    useMemo<DisplayMessage[]>(() => {
      return messages.map(
        (message, index) => {
          const isOwn =
            message.sender_id ===
            currentUserId;

          const currentDateKey =
            getDateKey(
              message.timestamp
            );

          const previousMessage =
            index > 0
              ? messages[index - 1]
              : null;

          const previousDateKey =
            previousMessage
              ? getDateKey(
                  previousMessage.timestamp
                )
              : null;

          const showDate =
            index === 0 ||
            currentDateKey !==
              previousDateKey;

          let status:
            | MessageStatus
            | null = null;

          if (isOwn) {
            if (
              seenMessageIds.has(
                message.id
              )
            ) {
              status = "seen";
            } else {
              /*
               * The backend sends the
               * saved message back to the
               * sender.
               *
               * Therefore the message
               * has successfully reached
               * the server/connection and
               * is treated as delivered.
               */
              status = "delivered";
            }
          }

          return {
            ...message,
            isOwn,
            status,
            showDate,
          };
        }
      );
    }, [
      messages,
      currentUserId,
      seenMessageIds,
    ]);

  /* =======================================================
     SCROLL TO BOTTOM
  ======================================================= */

  useEffect(() => {
    if (messages.length === 0) {
      previousMessageCount.current = 0;

      return;
    }

    const hasNewMessage =
      messages.length >
      previousMessageCount.current;

    previousMessageCount.current =
      messages.length;

    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({
        behavior: hasNewMessage
          ? "smooth"
          : "auto",
        block: "end",
      });
    });
  }, [messages.length]);

  /* =======================================================
     MARK INCOMING MESSAGES AS READ
  ======================================================= */

  useEffect(() => {
    const unreadMessages =
      messages.filter(
        (message) =>
          message.receiver_id ===
            currentUserId &&
          message.sender_id !==
            currentUserId &&
          !readByMeMessageIds.current.has(
            message.id
          )
      );

    unreadMessages.forEach(
      (message) => {
        readByMeMessageIds.current.add(
          message.id
        );

        markMessageAsRead(
          message.id,
          message.sender_id
        );
      }
    );
  }, [
    messages,
    currentUserId,
  ]);

  /* =======================================================
     MESSAGE READ EVENT
  ======================================================= */

  useEffect(() => {
    const handleMessageRead = (
      event: Event
    ) => {
      const customEvent =
        event as CustomEvent<{
          messageId?: number;
        }>;

      const messageId =
        customEvent.detail?.messageId;

      if (
        typeof messageId !== "number"
      ) {
        return;
      }

      const message = messages.find(
        (item) =>
          item.id === messageId
      );

      if (!message) {
        return;
      }

      /*
       * Only messages sent by us
       * can become seen.
       */
      if (
        message.sender_id !==
        currentUserId
      ) {
        return;
      }

      setSeenMessageIds(
        (previous) => {
          if (
            previous.has(messageId)
          ) {
            return previous;
          }

          const next = new Set(
            previous
          );

          next.add(messageId);

          return next;
        }
      );
    };

    window.addEventListener(
      "pulse:message-read",
      handleMessageRead
    );

    return () => {
      window.removeEventListener(
        "pulse:message-read",
        handleMessageRead
      );
    };
  }, [
    messages,
    currentUserId,
  ]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (isLoading) {
    return (
      <div
        className={[
          "message-list",
          "message-list--loading",
        ].join(" ")}
      >
        <div className="message-list__inner">
          <div className="message-list__loading">
            <div className="message-list__loading-pulse">
              <PulseMark
                size="md"
                animated
              />
            </div>

            <div className="message-list__loading-content">
              <span>
                Loading messages
              </span>

              <span
                className="message-list__loading-dots"
                aria-hidden="true"
              >
                ...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     EMPTY
  ======================================================= */

  if (messages.length === 0) {
    return (
      <div
        className={[
          "message-list",
          "message-list--empty",
        ].join(" ")}
      >
        <div className="message-list__inner">
          <div className="message-list__empty">
            <div className="message-list__empty-mark">
              <PulseMark
                size="lg"
                animated
              />
            </div>

            <div className="message-list__empty-content">
              <span className="message-list__empty-eyebrow">
                NEW CONVERSATION
              </span>

              <h3>
                Start the conversation
              </h3>

              <p>
                Send a message and let
                the Pulse begin.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     MAIN MESSAGE LIST
  ======================================================= */

  return (
    <div className="message-list">
      <div className="message-list__inner">
        <div className="message-list__messages">
          {groupedMessages.map(
            (message) => (
              <div
                key={message.id}
                className={[
                  "message-list__group",
                  message.isOwn
                    ? "message-list__group--outgoing"
                    : "message-list__group--incoming",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {message.showDate && (
                  <div className="message-list__date">
                    <span>
                      {formatDateLabel(
                        message.timestamp
                      )}
                    </span>
                  </div>
                )}

                <div
                  className={[
                    "message-row",
                    message.isOwn
                      ? "message-row--outgoing"
                      : "message-row--incoming",
                  ].join(" ")}
                >
                  <div
                    data-message-id={
                      message.id
                    }
                    className={[
                      "message-bubble",
                      message.isOwn
                        ? "message-bubble--outgoing"
                        : "message-bubble--incoming",
                    ].join(" ")}
                  >
                    {!message.isOwn && (
                      <span
                        className="message-bubble__incoming-mark"
                        aria-hidden="true"
                      >
                        <PulseMark size="xs" />
                      </span>
                    )}

                    {message.isOwn && (
                      <span
                        className="message-bubble__energy"
                        aria-hidden="true"
                      >
                        <span />
                        <span />
                        <span />
                      </span>
                    )}

                    <div className="message-bubble__body">
                      <div className="message-bubble__content">
                        {message.message}
                      </div>

                      <div className="message__meta">
                        <span className="message__time">
                          {formatTime(
                            message.timestamp
                          )}
                        </span>

                        {message.isOwn &&
                          message.status && (
                            <MessageStatusIcon
                              status={
                                message.status
                              }
                            />
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}

          <div
            ref={bottomRef}
            className="message-list__bottom"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};

export default MessageList;