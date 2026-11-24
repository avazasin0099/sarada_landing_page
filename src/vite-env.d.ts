/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Backend origin for the contact API, e.g. https://api.thesaradapathshala.com (no trailing slash). Empty = same domain. */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
