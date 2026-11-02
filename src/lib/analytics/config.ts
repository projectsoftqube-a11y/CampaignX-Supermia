/**
 * Analytics configuration, read once from the environment.
 *
 * Both IDs are public by nature — they ship to the browser in the GTM
 * snippet — so `NEXT_PUBLIC_` is correct and neither is a secret.
 *
 * Gating on the variable rather than on `NODE_ENV` is deliberate: it keeps
 * dev and preview traffic out of the production property, while still
 * allowing a staging container to be pointed at a test property by setting a
 * different ID. Checking `NODE_ENV === "production"` instead would make that
 * impossible to test before it is live.
 */

/** GTM container ID, e.g. GTM-XXXXXXX. Empty string when unset. */
export const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? "";

/**
 * GA4 measurement ID, e.g. G-XXXXXXXXXX.
 *
 * Not used to load gtag.js — GA4 is a tag inside the GTM container. It is
 * exposed here so the GA4 property can be named in one place and referenced
 * if a tag ever needs it, and so the value is documented in the codebase
 * rather than living only in the GTM UI.
 */
export const ga4Id = process.env.NEXT_PUBLIC_GA4_ID?.trim() ?? "";
