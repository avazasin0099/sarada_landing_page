/**
 * Contact API — POST {VITE_API_BASE_URL}/api/v1/contacts
 * Payload agreed with the backend developer:
 * { name, phone, topic, message, submittedAt }
 */

export type ContactPayload = {
  name: string;
  phone: string; // normalised 10-digit Indian mobile, or "" when not given
  topic: string; // Bengali topic label, e.g. "নোটস সংক্রান্ত প্রশ্ন"
  message: string;
  submittedAt: string; // ISO-8601 UTC
};

/** Field errors the server may return, keyed by payload field. */
export type FieldErrors = Partial<Record<"name" | "phone" | "topic" | "message", string>>;

export class ContactApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public fieldErrors: FieldErrors = {},
  ) {
    super(message);
  }
}

// Empty base URL = same domain as the website (e.g. https://thesaradapathshala.com/api/v1/contacts).
const BASE = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/+$/, "");
export const CONTACT_ENDPOINT = `${BASE}/api/v1/contacts`;

/** Strip spaces, dashes and a leading +91 / 0 → "9876543210". */
export const normalisePhone = (raw: string) => raw.replace(/[\s-]/g, "").replace(/^(\+91|0)/, "");

export async function submitContact(payload: ContactPayload, timeoutMs = 15000): Promise<unknown> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  let res: Response;
  try {
    res = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    });
  } catch {
    throw new ContactApiError("network", 0);
  } finally {
    clearTimeout(timer);
  }

  // Body may be JSON or empty; never let parsing break the flow.
  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    /* no / non-JSON body */
  }

  if (!res.ok) {
    const errors =
      body && typeof body === "object" && "errors" in body && body.errors && typeof body.errors === "object"
        ? (body.errors as FieldErrors)
        : {};
    throw new ContactApiError("http", res.status, errors);
  }
  return body;
}
