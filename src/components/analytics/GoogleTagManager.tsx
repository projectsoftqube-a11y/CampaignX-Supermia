import { Suspense } from "react";
import Script from "next/script";
import { RouteChangeTracker } from "@/components/analytics/RouteChangeTracker";
import { gtmId } from "@/lib/analytics/config";

/**
 * Google Tag Manager.
 *
 * GA4 is configured as a tag *inside* the container rather than loaded
 * separately here. Loading gtag.js alongside GTM is the common mistake: both
 * send a page_view for the same visit, which doubles session counts and
 * halves every engagement rate in the reports.
 *
 * `afterInteractive` rather than `beforeInteractive`: nothing on the page
 * renders from GTM, so it has no business competing with the hero for the
 * main thread.
 *
 * Renders nothing when `NEXT_PUBLIC_GTM_ID` is unset, so a developer machine
 * and any preview deployment stay out of the production property.
 */
export function GoogleTagManager() {
  if (!gtmId) return null;

  return (
    <>
      <Script id="gtm-init" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
      </Script>

      {/* RouteChangeTracker reads useSearchParams, which without a Suspense
          boundary would opt every route out of static rendering — the blog
          and category pages are prerendered and must stay that way. */}
      <Suspense fallback={null}>
        <RouteChangeTracker />
      </Suspense>
    </>
  );
}

/**
 * The <noscript> half of the GTM snippet.
 *
 * Separate from the script because it belongs immediately inside <body>,
 * while the script sits at the end of it. Kept in this file so both halves
 * of one integration are read together.
 */
export function GoogleTagManagerNoScript() {
  if (!gtmId) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
