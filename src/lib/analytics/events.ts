/**
 * The site's analytics event vocabulary.
 *
 * Every event the site can send is named here, once. Components import a
 * constant rather than typing a string, so an event cannot be renamed in one
 * place and left stale in another — the usual way a GA4 report quietly
 * starts under-counting.
 *
 * Names are snake_case to match GA4's own convention, and are chosen to
 * describe what the visitor did, not which component they did it in: a
 * button can move between pages without invalidating months of history.
 */

export const ANALYTICS_EVENTS = {
  /** A sign-up CTA was clicked, sending the visitor to the app. */
  signupClick: "signup_click",
  /** A log-in link was clicked. */
  loginClick: "login_click",
  /** The Contact Sales dialog was opened. */
  contactSalesOpen: "contact_sales_open",
  /** The Contact Sales form was submitted and the API accepted it. */
  contactSalesSubmit: "contact_sales_submit",
  /** The Contact Sales form was submitted and failed. */
  contactSalesError: "contact_sales_error",
  /** The demo video was started. */
  demoPlay: "demo_play",
  /** A "Book a demo" link was clicked, going to the scheduler. */
  demoBooking: "demo_booking_click",
  /** The brochure PDF was downloaded or opened. */
  brochureDownload: "brochure_download",
} as const;

export type AnalyticsEvent =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

/**
 * Parameters allowed alongside an event.
 *
 * Deliberately narrow. GA4 accepts arbitrary parameters, but anything not
 * registered as a custom dimension is invisible in reports, so a wide type
 * only invites writing data that is never read. Nothing here may carry
 * personal data: the Contact Sales form collects a name, email and phone
 * number, and none of it belongs in an analytics payload.
 */
export interface AnalyticsParams {
  /** Where on the page the interaction happened, e.g. "header", "pricing_card". */
  location?: string;
  /** The plan a pricing CTA belongs to, e.g. "free", "premium". */
  plan?: string;
  /** Outbound destination, for CTAs that leave the site. */
  destination?: string;
  /** A short, non-identifying reason for a failure event. */
  reason?: string;
  /**
   * Which variant of an action was taken, where one control has two forms —
   * the brochure can be saved or opened in a viewer, and the difference is
   * worth keeping without inventing a second event name.
   */
  method?: string;
}
