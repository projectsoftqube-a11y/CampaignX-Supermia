/**
 * Analytics configuration.
 *
 * Neither ID is a secret: both ship to the browser inside the GTM snippet
 * and are visible in page source on any site that uses them. They are
 * written here rather than read from the environment so that deploying the
 * site is all it takes for tracking to work — an environment variable that
 * has to be set separately in the host is one more thing to forget, and
 * when it is forgotten the failure is silent.
 *
 * An environment variable still overrides them, which is what a staging
 * container would use to point at a test property.
 */

/** GTM container for campaignx.supermia.ai. */
const DEFAULT_GTM_ID = "GTM-NWJXBZ93";

/** GA4 property for campaignx.supermia.ai. */
const DEFAULT_GA4_ID = "G-7TDMWHHW6E";

/** GTM container ID. */
export const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim() || DEFAULT_GTM_ID;

/**
 * Whether to load GTM at all.
 *
 * Off during `next dev`, so that working on the site does not register as
 * visits, clicks and sign-up intent in the live GA4 property. A developer
 * who needs to test the tags can run a production build locally, which is
 * also the only way to see them behave as a visitor would.
 */
export const analyticsEnabled =
  process.env.NODE_ENV === "production" && gtmId !== "";

/**
 * GA4 measurement ID.
 *
 * Not used to load gtag.js — GA4 is a tag inside the GTM container, and
 * loading both would send two page_views per visit. It is recorded here so
 * the property is named in the codebase rather than only in the GTM UI.
 */
export const ga4Id = process.env.NEXT_PUBLIC_GA4_ID?.trim() || DEFAULT_GA4_ID;
