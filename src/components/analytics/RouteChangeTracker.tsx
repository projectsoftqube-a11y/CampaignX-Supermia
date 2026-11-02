"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Reports App Router navigations to GTM.
 *
 * GTM's History Change trigger does see Next's `pushState` calls, but it
 * fires before React has committed the new page, so `document.title` is
 * still the previous page's title. Pushing an explicit event after the
 * commit means the GA4 page_view carries the right title and path.
 *
 * The first load is skipped: the GTM snippet's own `gtm.js` event already
 * produces one page_view, and sending another here would double-count every
 * landing.
 *
 * `useSearchParams` is read so a filter or `?plan=` change counts as a view;
 * it is also what forces this component into a Suspense boundary during
 * static rendering, which is why the caller wraps it.
 */
export function RouteChangeTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const query = searchParams.toString();
    const path = query ? `${pathname}?${query}` : pathname;

    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({
      event: "route_change",
      page_path: path,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [pathname, searchParams]);

  return null;
}
