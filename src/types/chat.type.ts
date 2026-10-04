export interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  timestamp: string;
}

export type WSIncomingEvent =
  | {
      type: "message";
      id: number;
      sender_id: number;
      receiver_id: number;
      message: string;
      timestamp: string;
    }
  | {
      type: "message_read";
      message_id: number;
      reader_id: number;
    }
  | {
      type: "online_users";
      data: number[];
    }
  | {
      type: "presence";
      user_id: number;
      is_online: boolean;
    }
  | {
      type: "typing";
      sender_id: number;
      is_typing: boolean;
    };

export type WSOutgoingEvent =
  | {
      type: "message";
      receiver_id: number;
      message: string;
    }
  | {
      type: "read";
      message_id: number;
      sender_id: number;
    }
  | {
      type: "typing";
      receiver_id: number;
      is_typing: boolean;
    };