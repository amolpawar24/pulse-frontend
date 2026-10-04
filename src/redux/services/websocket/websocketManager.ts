import { env } from "../../../config/env";

import type {
  WSIncomingEvent,
  WSOutgoingEvent,
} from "../../../types/chat.type";

type Listener = (event: WSIncomingEvent) => void;

class WebSocketManager {
  private socket: WebSocket | null = null;

  private listeners = new Set<Listener>();

  private token: string | null = null;

  private retryTimer: number | null = null;

  private retries = 0;

  private manuallyClosed = false;

  private pendingMessages: WSOutgoingEvent[] = [];

  connect(token: string) {
    if (
      this.socket &&
      (
        this.socket.readyState === WebSocket.OPEN ||
        this.socket.readyState === WebSocket.CONNECTING
      )
    ) {
      return;
    }

    this.token = token;
    this.manuallyClosed = false;

    const url = `${env.WS_URL}?token=${encodeURIComponent(token)}`;

    console.log("Pulse WebSocket connecting:", url);

    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log("Pulse WebSocket connected");

      this.retries = 0;

      this.flushPendingMessages();
    };

    this.socket.onmessage = (msg) => {
      try {
        const event = JSON.parse(
          msg.data
        ) as WSIncomingEvent;

        console.log("Pulse WebSocket received:", event);

        this.listeners.forEach((listener) => {
          listener(event);
        });
      } catch {
        console.error(
          "Invalid WebSocket message:",
          msg.data
        );
      }
    };

    this.socket.onerror = (error) => {
      console.error(
        "Pulse WebSocket error:",
        error
      );
    };

    this.socket.onclose = (event) => {
      console.log(
        "Pulse WebSocket closed:",
        event.code,
        event.reason
      );

      this.socket = null;

      if (!this.manuallyClosed) {
        this.scheduleReconnect();
      }
    };
  }

  private scheduleReconnect() {
    if (!this.token) {
      return;
    }

    if (this.retryTimer !== null) {
      return;
    }

    const delay = Math.min(
      1000 * 2 ** this.retries,
      15000
    );

    this.retries += 1;

    console.log(
      `Pulse WebSocket reconnecting in ${delay}ms`
    );

    this.retryTimer = window.setTimeout(() => {
      this.retryTimer = null;

      if (this.token && !this.manuallyClosed) {
        this.connect(this.token);
      }
    }, delay);
  }

  send(event: WSOutgoingEvent) {
    if (
      this.socket &&
      this.socket.readyState === WebSocket.OPEN
    ) {
      console.log(
        "Pulse WebSocket sending:",
        event
      );

      this.socket.send(
        JSON.stringify(event)
      );

      return;
    }

    console.log(
      "Pulse WebSocket not ready. Queuing message:",
      event
    );

    this.pendingMessages.push(event);

    if (
      this.token &&
      (!this.socket ||
        this.socket.readyState === WebSocket.CLOSED)
    ) {
      this.connect(this.token);
    }
  }

  private flushPendingMessages() {
    if (
      !this.socket ||
      this.socket.readyState !== WebSocket.OPEN
    ) {
      return;
    }

    while (this.pendingMessages.length > 0) {
      const event =
        this.pendingMessages.shift();

      if (!event) {
        continue;
      }

      console.log(
        "Pulse WebSocket sending queued message:",
        event
      );

      this.socket.send(
        JSON.stringify(event)
      );
    }
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  disconnect() {
    this.manuallyClosed = true;

    this.token = null;

    if (this.retryTimer !== null) {
      window.clearTimeout(
        this.retryTimer
      );

      this.retryTimer = null;
    }

    this.pendingMessages = [];

    this.socket?.close();

    this.socket = null;
  }
}

export const wsManager =
  new WebSocketManager();