/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Backend base URL incl. /api/v1, e.g. https://ebook-backend-production-df12ce62.up.railway.app/api/v1 (no trailing slash). */
  readonly VITE_API_BASE_URL?: string;
  /** Avazas ebook app deep link; `{id}` is replaced with the note id. */
  readonly VITE_APP_DEEP_LINK?: string;
  /** Avazas ebook app install file (.apk) or store URL. */
  readonly VITE_APP_DOWNLOAD_URL?: string;
  /** Avazas ebook app icon image URL (square). */
  readonly VITE_APP_ICON_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
