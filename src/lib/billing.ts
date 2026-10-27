/**
 * Pricing plans from the CampaignX billing API.
 *
 * The base URL is read from the server-only `BILLING_API_BASE_URL` env var.
 * If it is missing or the request fails we fall back to the static plans in
 * the content config, so the pricing section never renders empty or broken.
 */
import { cache } from "react";

type ApiFeatures = {
  display_features?: unknown;
  /* Structured limits. These drive the comparison table, which needs
     comparable values rather than the ready-made display strings.
     A -1 means unlimited throughout. */
  ai_campaign_limit?: unknown;
  manual_campaign_limit?: unknown;
  x_campaign_limit?: unknown;
  is_x_campaign_allowed?: unknown;
  workspace_limit?: unknown;
  scheduled_post_limit?: unknown;
  analytics_history_days?: unknown;
  is_analytics_enabled?: unknown;
  connected_accounts_limit?: unknown;
  is_storage_uncapped?: unknown;
};

type ApiPlan = {
  name?: unknown;
  slug?: unknown;
  description?: unknown;
  price_monthly?: unknown;
  price_yearly?: unknown;
  price_monthly_inr?: unknown;
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

/**
 * The comparable limits behind a plan, normalised.
 *
 * `null` means unlimited (the API sends -1), so the table can print a
 * word rather than a negative number. Every value here comes from the
 * API; none of it is written into the page.
 */
export type PlanLimits = {
  workspaces: number | null;
  connectedAccounts: number | null;
  scheduledPosts: number | null;
  aiCampaigns: number | null;
  manualCampaigns: number | null;
  xCampaigns: number | null;
  xAllowed: boolean;
  analyticsEnabled: boolean;
  analyticsHistoryDays: number;
  storageUncapped: boolean;
};

/** Display-ready plan, so the component never touches raw API field names. */
export type LivePlan = {
  id: string;
  name: string;
  summary: string;
  /** Formatted monthly price, e.g. "$30" or "Free". */
  price: string;
  /** Formatted per-month price when billed annually, e.g. "$25". */
  priceAnnual: string;
  /** Shown next to the price, e.g. "/month". Empty when not applicable. */
  priceNote: string;
  featured: boolean;
  /** A contact-sales tier: shows a badge and no figure. */
  isCustom: boolean;
  /** True when the plan costs nothing on either cycle. */
  isFree: boolean;
  /** Whole-percent saving from paying annually; 0 when there is none. */
  annualSavingPct: number;
  /** What a year costs up front, formatted. Empty for free and custom. */
  annualTotal: string;
  /** Small line under the price, e.g. "Tailored for your organization". */
  priceCaption: string;
  cta: string;
  points: PricingPoint[];
  /** Normalised limits, for the comparison table. */
  limits: PlanLimits;
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

/** The plan's currency code, falling back to USD if the API omits it. */
function currencyOf(plan: ApiPlan): string {
  const code = typeof plan.currency === "string" ? plan.currency : "";
  return /^[A-Z]{3}$/.test(code) ? code : "USD";
}

/** Format one figure as money, never rounding beyond two decimals. */
function money(amount: number, currency: string): string {
  // A whole number stays clean ($30); a fractional one shows exactly two
  // decimals, so 0.5 reads as $0.50 and 99.555 rounds to $99.56.
  const decimals = Number.isInteger(amount) ? 0 : 2;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount);
  } catch {
    return `$${amount.toFixed(decimals)}`;
  }
}

/** Format a monthly price, never rounding beyond two decimals. */
function formatPrice(plan: ApiPlan): { price: string; priceNote: string } {
  const cost = safeNumber(plan.price_monthly);
  /* A free plan still carries the period. Without it the "Free" card
     was a line shorter than the paid ones, so the CTA buttons sat at
     different heights across the row. */
  if (cost <= 0) return { price: "Free", priceNote: "/month" };

  return { price: money(cost, currencyOf(plan)), priceNote: "/month" };
}

/**
 * Normalise one limit. The API uses -1 for unlimited, which must not
 * reach the page as a number, and 0 is a real value (no X campaigns on
 * Free) rather than a missing one.
 */
function limit(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return 0;
  return value < 0 ? null : value;
}

function toLimits(f: ApiFeatures | undefined): PlanLimits {
  return {
    workspaces: limit(f?.workspace_limit),
    connectedAccounts: limit(f?.connected_accounts_limit),
    scheduledPosts: limit(f?.scheduled_post_limit),
    aiCampaigns: limit(f?.ai_campaign_limit),
    manualCampaigns: limit(f?.manual_campaign_limit),
    xCampaigns: limit(f?.x_campaign_limit),
    xAllowed: f?.is_x_campaign_allowed === true,
    analyticsEnabled: f?.is_analytics_enabled === true,
    analyticsHistoryDays: safeNumber(f?.analytics_history_days),
    storageUncapped: f?.is_storage_uncapped === true,
  };
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
  const monthly = safeNumber(plan.price_monthly);
  const yearlyPerMonth = safeNumber(plan.price_yearly);
  const isFree = monthly <= 0 && yearlyPerMonth <= 0;
  const currency = currencyOf(plan);

  /* The API's `price_yearly` is the per-month rate when billed
     annually, not the annual total — the Essentials plan is $10
     monthly and $8 yearly, which only makes sense per month. The
     saving and the yearly total are both derived from that. */
  const savingPct =
    monthly > 0 && yearlyPerMonth > 0 && yearlyPerMonth < monthly
      ? Math.round((1 - yearlyPerMonth / monthly) * 100)
      : 0;

  const rawPoints = Array.isArray(plan.features?.display_features)
    ? plan.features.display_features
    : [];

  return {
    id: safeText(plan.slug, 64) || safeText(plan.name, 64),
    name: safeText(plan.name, 60),
    summary: safeText(plan.description),
    price: custom ? "Flexible Pricing" : price,
    priceAnnual: custom
      ? "Flexible Pricing"
      : isFree
        ? "Free"
        : money(yearlyPerMonth, currency),
    priceNote: custom ? "" : priceNote,
    isCustom: custom,
    isFree,
    annualSavingPct: custom ? 0 : savingPct,
    annualTotal:
      custom || isFree || yearlyPerMonth <= 0
        ? ""
        : money(yearlyPerMonth * 12, currency),
    priceCaption: custom ? "Tailored for your organization" : "",
    // A custom tier is never the highlighted self-serve plan.
    featured: plan.is_popular === true && !custom,
    cta: custom ? "Contact Sales" : isFree ? "Get Started Free" : "Get Started",
    points: rawPoints
      .map((label) => safeText(label, 120))
      .filter((label) => label.length > 0)
      .slice(0, MAX_POINTS)
      .map(toPoint),
    limits: toLimits(plan.features),
  };
}

/**
 * Fetch active plans for the pricing section (server-side).
 *
 * Returns display-ready plans sorted by `sort_order`, or null on any failure
 * (missing base URL, network error, non-OK status, bad payload) so the caller
 * can fall back to the static content config.
 *
 * Wrapped in React's `cache` below, because the pricing page needs the
 * plans twice in one render (the cards and the comparison table) and
 * `cache: "no-store"` defeats fetch deduplication — without this the
 * page would call the billing API twice per request.
 */
async function fetchLivePlans(): Promise<LivePlan[] | null> {
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

/**
 * Plans for the current render, fetched at most once.
 *
 * Several components on the pricing page need the same plans; `cache`
 * makes the second and third callers reuse the first call's result for
 * the duration of one request, while still fetching fresh figures on
 * the next one.
 */
export const getLivePlans = cache(fetchLivePlans);
