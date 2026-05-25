/// <reference types="vite/client" />

/** Injected by Vite `define` from `.env` (not `import.meta.env`). */
declare namespace NodeJS {
  interface ProcessEnv {
    readonly GEMINI_API_KEY?: string;
    readonly APP_URL?: string;
  }
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  /** When not `'false'`, use mock API layer (default: mock on). */
  readonly VITE_USE_API_MOCK?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
