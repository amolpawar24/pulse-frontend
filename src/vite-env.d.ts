/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PULSE_APP_NAME: string;
  readonly VITE_PULSE_API_URL: string;
  readonly VITE_PULSE_WS_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}