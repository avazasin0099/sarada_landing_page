/**
 * Contact API — POST {VITE_API_BASE_URL}/contacts
 * VITE_API_BASE_URL already includes the version prefix, e.g.
 * https://ebook-backend-production-df12ce62.up.railway.app/api/v1
 * Payload agreed with the backend developer:
 * { name, phone, topic, message, submittedAt }
 */

export type ContactPayload = {
  name: string;
  phone: string; // normalised 10-digit Indian mobile (required by backend)
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

// Not set = same domain as the website (/api/v1/contacts).
const BASE = (import.meta.env.VITE_API_BASE_URL || "/api/v1").replace(/\/+$/, "");
export const CONTACT_ENDPOINT = `${BASE}/contacts`;

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

  if (!res.ok) throw new ContactApiError("http", res.status, parseFieldErrors(body));
  return body;
}

// Bengali messages shown under a field when the server rejects it.
const BN_FIELD_MSG: Required<FieldErrors> = {
  name: "তোমার নাম লেখো।",
  phone: "সঠিক ১০ সংখ্যার মোবাইল নম্বর দাও।",
  topic: "একটি বিষয় বেছে নাও।",
  message: "তোমার প্রশ্ন বা অনুরোধটি লেখো।",
};

/**
 * Backend validation format (HTTP 400, errorCode "VALIDATION_ERROR"):
 * { success: false, message, errors: [{ field: "body.name", message: "Name is required" }, ...] }
 */
function parseFieldErrors(body: unknown): FieldErrors {
  const list = body && typeof body === "object" && "errors" in body ? (body as { errors: unknown }).errors : null;
  if (!Array.isArray(list)) return {};
  const out: FieldErrors = {};
  for (const item of list) {
    const raw = typeof item?.field === "string" ? item.field : "";
    const key = raw.replace(/^body\./, "") as keyof FieldErrors;
    if (key in BN_FIELD_MSG) out[key] = BN_FIELD_MSG[key];
  }
  return out;
}
