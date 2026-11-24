/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Backend base URL incl. /api/v1, e.g. https://ebook-backend-production-df12ce62.up.railway.app/api/v1 (no trailing slash). */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
