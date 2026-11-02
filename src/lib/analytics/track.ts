import type { AnalyticsEvent, AnalyticsParams } from "@/lib/analytics/events";

/**
 * Pushing an event into the GTM dataLayer.
 *
 * GTM is loaded only when `NEXT_PUBLIC_GTM_ID` is set, so on a developer
 * machine and in any preview without that variable there is no dataLayer at
 * all. Every call therefore has to survive its absence: tracking is not
 * worth a runtime error in front of a visitor, and a component should never
 * need to know whether analytics happens to be switched on.
 *
 * The array is created if GTM has not finished loading yet. That is the
 * documented pattern — GTM adopts an existing `window.dataLayer` when its
 * script arrives, so an event fired during that window is replayed rather
 * than lost.
 */

/* GTM's own shape. The entries are plain objects keyed by string; the GTM
   snippet also pushes an arguments object, which is why this is not a
   stricter type. */
type DataLayerEntry = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DataLayerEntry[];
  }
}

/**
 * Send one event to GTM.
 *
 * Safe to call from anywhere in a client component, including inside an
 * event handler that also navigates: the push is synchronous, so it lands
 * before the page starts unloading.
 */
export function track(event: AnalyticsEvent, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event, ...params });
  } catch {
    /* A blocked or sandboxed dataLayer must not break the interaction the
       visitor actually came for. */
  }
}
