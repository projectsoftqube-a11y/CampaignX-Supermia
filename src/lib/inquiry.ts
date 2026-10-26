/**
 * Custom plan (enterprise) sales inquiry.
 *
 * Submitted from the pricing section's "Contact Sales" form. The endpoint is
 * public and needs no credentials, so the request is made from the browser.
 * The base URL is exposed via `NEXT_PUBLIC_API_BASE_URL`; it is only an
 * origin, not a secret.
 *
 * Every field is required by the API, and `phone_no` is one combined string
 * including the dialling code.
 */

export type ContactSalesPayload = {
  first_name: string;
  last_name: string;
  company_name: string;
  email: string;
  /** Dialling code and number together, e.g. "+919265572316". */
  phone_no: string;
  industry: string;
  inquiry: string;
};

export type ContactSalesResponseData = {
  inquiry_id: string;
};

type ApiResponse = {
  data?: { inquiry_id?: unknown } | null;
  message?: unknown;
  status?: unknown;
  /** FastAPI validation errors arrive here on a 422. */
  detail?: unknown;
};

/** Thrown when the submission fails, carrying a message safe to display. */
export class InquiryError extends Error {}

const GENERIC_ERROR =
  "Something went wrong. Please try again, or email us directly.";

/** Abort a submission that has not completed in this many ms. */
const REQUEST_TIMEOUT_MS = 15000;

/** Longest server message we will show, to keep the UI predictable. */
const MAX_SERVER_MESSAGE = 300;

/**
 * Build the inquiry URL from the public API base, rejecting anything that is
 * not a well-formed http(s) origin.
 */
function buildEndpoint(): string | null {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (!base) return null;

  try {
    const url = new URL(base);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return new URL("/api/plans/contact-sales", url.origin).toString();
  } catch {
    return null;
  }
}

/** Keep a server message short and free of control characters. */
function safeMessage(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .trim()
    .slice(0, MAX_SERVER_MESSAGE);
}

/**
 * Turn a FastAPI 422 `detail` array into one readable sentence, so a field
 * the client missed is named rather than shown as a generic failure.
 */
function describeValidationError(detail: unknown): string {
  if (!Array.isArray(detail) || detail.length === 0) return "";

  const names = detail
    .map((item) => {
      const loc = (item as { loc?: unknown })?.loc;
      if (!Array.isArray(loc)) return "";
      const field = loc[loc.length - 1];
      return typeof field === "string" ? field.replace(/_/g, " ") : "";
    })
    .filter((name) => name.length > 0);

  if (names.length === 0) return "";
  return `Please check these fields: ${names.join(", ")}.`;
}

/**
 * Submit a contact sales inquiry.
 *
 * Resolves with the created inquiry on success, and rejects with an
 * `InquiryError` carrying a message suitable for display otherwise.
 */
export async function submitContactSales(
  payload: ContactSalesPayload,
  signal?: AbortSignal,
): Promise<ContactSalesResponseData | null> {
  const endpoint = buildEndpoint();
  if (!endpoint) throw new InquiryError(GENERIC_ERROR);

  let res: Response;
  try {
    res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "error",
      signal: signal ?? AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    // Re-throw a deliberate cancellation so the caller can ignore it.
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }
    throw new InquiryError(
      "Network error. Please check your connection and try again.",
    );
  }

  let json: ApiResponse | null = null;
  try {
    json = (await res.json()) as ApiResponse;
  } catch {
    json = null;
  }

  if (res.ok && json?.status === 1) {
    const id = json.data?.inquiry_id;
    return { inquiry_id: typeof id === "string" ? id : "" };
  }

  // A 422 names the offending fields; other statuses do not explain usefully.
  if (res.status === 422) {
    const described = describeValidationError(json?.detail);
    throw new InquiryError(described || GENERIC_ERROR);
  }

  const serverMessage = safeMessage(json?.message);
  throw new InquiryError(
    res.status === 400 && serverMessage ? serverMessage : GENERIC_ERROR,
  );
}
