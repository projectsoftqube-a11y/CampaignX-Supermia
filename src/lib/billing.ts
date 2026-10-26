/**
 * Pricing plans from the CampaignX billing API.
 *
 * The base URL is read from the server-only `BILLING_API_BASE_URL` env var.
 * If it is missing or the request fails we fall back to the static plans in
 * the content config, so the pricing section never renders empty or broken.
 */

type ApiFeatures = {
  display_features?: unknown;
};

type ApiPlan = {
  name?: unknown;
  slug?: unknown;
  description?: unknown;
  price_monthly?: unknown;
  price_yearly?: unknown;
  currency?: unknown;
  is_active?: unknown;
  is_popular?: unknown;
  sort_order?: unknown;
  features?: ApiFeatures;
};

type ApiResponse = {
  data?: unknown;
  message?: unknown;
  status?: unknown;
};

/** One bullet on a pricing card. */
export type PricingPoint = {
  label: string;
  /** False renders a cross instead of a tick, e.g. "No Analytics Reports". */
  included: boolean;
};

/** Display-ready plan, so the component never touches raw API field names. */
export type LivePlan = {
  id: string;
  name: string;
  summary: string;
  /** Formatted price, e.g. "$30" or "Free". */
  price: string;
  /** Shown next to the price, e.g. "/month". Empty when not applicable. */
  priceNote: string;
  featured: boolean;
  /** A contact-sales tier: shows a badge and no figure. */
  isCustom: boolean;
  /** Small line under the price, e.g. "Tailored for your organization". */
  priceCaption: string;
  cta: string;
  points: PricingPoint[];
};

/** Abort the request if the API has not responded in this many ms. */
const REQUEST_TIMEOUT_MS = 8000;

/** Reject a body larger than this (the real payload is ~3.5 KB). */
const MAX_RESPONSE_BYTES = 512 * 1024;

/** Upper bounds so a runaway payload cannot flood the page. */
const MAX_PLANS = 12;
const MAX_POINTS = 30;
const MAX_TEXT_LENGTH = 400;

/**
 * Clamp a string from the API. React escapes interpolated text, so this is
 * not an XSS guard; it stops absurd values from breaking the layout and
 * strips control characters.
 */
function safeText(value: unknown, maxLength = MAX_TEXT_LENGTH): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .trim()
    .slice(0, maxLength);
}

/** Coerce an API number into a finite, non-negative value. */
function safeNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0
    ? value
    : 0;
}

/**
 * Build the plans URL, rejecting anything that is not a well-formed http(s)
 * origin so a bad env value cannot redirect the request elsewhere.
 */
function buildEndpoint(baseUrl: string | undefined): string | null {
  const trimmed = baseUrl?.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return new URL("/api/plans", url.origin).toString();
  } catch {
    return null;
  }
}

/**
 * The API sends ready-to-render bullet strings, phrasing an excluded feature
 * as a negative ("No Analytics Reports", "X / Twitter Excluded"). Detect that
 * wording so the UI can show a cross rather than a tick.
 */
function toPoint(label: string): PricingPoint {
  const normalised = label.toLowerCase();
  const excluded =
    /^(no|not included|none)\b/.test(normalised) ||
    /\b(excluded|not included)\b/.test(normalised);

  return { label, included: !excluded };
}

/**
 * Whether a plan is a contact-sales tier. The API returns a figure for the
 * Custom plan, but it is negotiated rather than self-serve, so the card shows
 * the next step instead of a number.
 */
function isCustomPlan(plan: ApiPlan): boolean {
  const slug = typeof plan.slug === "string" ? plan.slug.toLowerCase() : "";
  const name =
    typeof plan.name === "string" ? plan.name.trim().toLowerCase() : "";
  return slug === "custom" || name === "custom" || name === "enterprise";
}

/** Format a monthly price, never rounding beyond two decimals. */
function formatPrice(plan: ApiPlan): { price: string; priceNote: string } {
  const cost = safeNumber(plan.price_monthly);
  /* A free plan still carries the period. Without it the "Free" card
     was a line shorter than the paid ones, so the CTA buttons sat at
     different heights across the row. */
  if (cost <= 0) return { price: "Free", priceNote: "/month" };

  const code = typeof plan.currency === "string" ? plan.currency : "";
  const currency = /^[A-Z]{3}$/.test(code) ? code : "USD";

  // A whole number stays clean ($30); a fractional one shows exactly two
  // decimals, so 0.5 reads as $0.50 and 99.555 rounds to $99.56.
  const decimals = Number.isInteger(cost) ? 0 : 2;

  try {
    return {
      price: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(cost),
      priceNote: "/month",
    };
  } catch {
    return { price: `$${cost.toFixed(decimals)}`, priceNote: "/month" };
  }
}

/** Reject entries that are not usable plan objects before mapping them. */
function isValidPlan(plan: unknown): plan is ApiPlan {
  if (!plan || typeof plan !== "object") return false;
  const candidate = plan as ApiPlan;
  return (
    typeof candidate.name === "string" &&
    candidate.name.trim().length > 0 &&
    candidate.is_active === true
  );
}

function toLivePlan(plan: ApiPlan): LivePlan {
  const custom = isCustomPlan(plan);
  const { price, priceNote } = formatPrice(plan);
  const isFree = safeNumber(plan.price_monthly) <= 0;

  const rawPoints = Array.isArray(plan.features?.display_features)
    ? plan.features.display_features
    : [];

  return {
    id: safeText(plan.slug, 64) || safeText(plan.name, 64),
    name: safeText(plan.name, 60),
    summary: safeText(plan.description),
    price: custom ? "Flexible Pricing" : price,
    priceNote: custom ? "" : priceNote,
    isCustom: custom,
    priceCaption: custom ? "Tailored for your organization" : "",
    // A custom tier is never the highlighted self-serve plan.
    featured: plan.is_popular === true && !custom,
    cta: custom ? "Contact Sales" : isFree ? "Get Started Free" : "Get Started",
    points: rawPoints
      .map((label) => safeText(label, 120))
      .filter((label) => label.length > 0)
      .slice(0, MAX_POINTS)
      .map(toPoint),
  };
}

/**
 * Fetch active plans for the pricing section (server-side).
 *
 * Returns display-ready plans sorted by `sort_order`, or null on any failure
 * (missing base URL, network error, non-OK status, bad payload) so the caller
 * can fall back to the static content config.
 */
export async function getLivePlans(): Promise<LivePlan[] | null> {
  const endpoint = buildEndpoint(process.env.BILLING_API_BASE_URL);
  if (!endpoint) return null;

  try {
    const res = await fetch(endpoint, {
      method: "GET",
      headers: { Accept: "application/json" },
      // Never follow a redirect: it could point the request at another host.
      redirect: "error",
      // Abort a hung upstream so a slow API cannot stall page rendering.
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      // Always fetch fresh pricing: a plan change must show on the next load.
      cache: "no-store",
    });

    if (!res.ok) return null;

    const declaredLength = Number(res.headers.get("content-length") ?? 0);
    if (declaredLength > MAX_RESPONSE_BYTES) return null;

    const raw = await res.text();
    if (raw.length > MAX_RESPONSE_BYTES) return null;

    let json: ApiResponse;
    try {
      json = JSON.parse(raw) as ApiResponse;
    } catch {
      return null;
    }

    // The API signals success with `status: 1`.
    if (json?.status !== 1) return null;

    // Plans arrive as a flat array under `data`.
    const plans = json?.data;
    if (!Array.isArray(plans)) return null;

    const mapped = plans
      .filter(isValidPlan)
      .slice(0, MAX_PLANS)
      .sort((a, b) => safeNumber(a.sort_order) - safeNumber(b.sort_order))
      .map(toLivePlan)
      .filter((plan) => plan.name.length > 0);

    if (mapped.length === 0) return null;

    // The API can flag several plans as popular; highlight only the first so
    // the badge stays meaningful.
    let highlighted = false;
    return mapped.map((plan) => {
      if (!plan.featured) return plan;
      if (highlighted) return { ...plan, featured: false };
      highlighted = true;
      return plan;
    });
  } catch {
    // Network error, timeout, unexpected redirect or malformed body: the
    // caller falls back to the static plans rather than failing the render.
    return null;
  }
}
