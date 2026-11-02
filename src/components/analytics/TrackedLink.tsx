"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { AnalyticsEvent, AnalyticsParams } from "@/lib/analytics/events";
import { track } from "@/lib/analytics/track";

interface Props extends AnalyticsParams {
  href: string;
  event: AnalyticsEvent;
  children: ReactNode;
  className?: string;
  /** Set for links that leave the site. */
  external?: boolean;
  download?: string;
  /**
   * Accessible name, for a link whose visible content does not read as one
   * — the hero prompt looks like a text field, so its label is load-bearing.
   */
  "aria-label"?: string;
}

/**
 * A link that reports its own click.
 *
 * Exists because most CTAs on this site sit inside Server Components, which
 * cannot carry an onClick handler. Wrapping just the link keeps the client
 * boundary as small as the interaction that needs it, rather than turning a
 * whole pricing card or header into client code.
 *
 * The push happens before navigation and is synchronous, so it lands even
 * when the click immediately unloads the page.
 */
export function TrackedLink({
  href,
  event,
  children,
  className,
  external = false,
  download,
  "aria-label": ariaLabel,
  ...params
}: Props) {
  const handleClick = () => {
    track(event, { destination: href, ...params });
  };

  /* An outbound or download link is a plain anchor: next/link prefetches and
     client-side routes, neither of which applies to a different origin or a
     file. */
  if (external || download) {
    return (
      <a
        href={href}
        onClick={handleClick}
        className={className}
        download={download}
        aria-label={ariaLabel}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : null)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
