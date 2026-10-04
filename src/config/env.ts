export const env = {
  APP_NAME: import.meta.env.VITE_PULSE_APP_NAME ?? "Pulse",
  API_URL: import.meta.env.VITE_PULSE_API_URL ?? "http://localhost:8000",
  WS_URL: import.meta.env.VITE_PULSE_WS_URL ?? "ws://localhost:8000/ws",
};