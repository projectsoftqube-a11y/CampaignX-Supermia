"use client";

import { useEffect, useRef, useState } from "react";
import { BrandGlyph } from "@/components/ui/BrandGlyph";
import {
  CX_EASE,
  T,
  gsap,
  prefersReducedMotion,
  registerStudio,
} from "@/lib/animations/studio";
import type { PlatformName } from "@/types/content";
import { cn } from "@/lib/utils";

interface PostDeckProps {
  className?: string;
}

/**
 * One brief, five platform-native posts.
 *
 * The feature pages argue in numbered segments. A channel page should
 * not: the claim here is about *surface*, and the only convincing way
 * to show that five posts differ is to draw the five posts.
 *
 * So this is a deck of real post cards, each with its own chrome — a
 * caption field and a hashtag row for Instagram, a headline and a
 * read-more for LinkedIn, a character counter for X, a listing card
 * with a CTA button for Google Business. The differences are structural
 * rather than described, which is the point the copy cannot make on
 * its own.
 *
 * Cards can be stepped through by hand. Left alone they advance on
 * their own, so a reader who does not touch anything still sees all
 * five.
 */

interface Post {
  platform: PlatformName;
  label: string;
  /** The constraint this surface imposes. */
  limit: string;
  body: string;
  meta?: string;
  /** Rendered as the platform's own affordance under the copy. */
  action?: string;
}

const POSTS: readonly Post[] = [
  {
    platform: "instagram",
    label: "Instagram",
    limit: "Carousel · 4 slides",
    body: "Two weeks only — here's what's new inside.",
    meta: "#springoffer #regulars #instore",
    action: "Swipe",
  },
  {
    platform: "facebook",
    label: "Facebook",
    limit: "Link post · 1 image",
    body: "Our spring offer is open to existing customers. Two weeks, in store and online.",
    action: "Learn more",
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    limit: "Text post · no link",
    body: "We're running something for the people already with us. No new-customer-only pricing, no catch — just two weeks of our best rates for the ones who stayed.",
    meta: "See more",
  },
  {
    platform: "x",
    label: "X",
    limit: "Thread · 3 posts",
    body: "Spring offer's live. Existing customers, this one's yours.",
    meta: "1/3 · 212 characters left",
  },
  {
    platform: "google",
    label: "Google Business",
    limit: "Offer post · 14 days",
    body: "Spring offer — ends in two weeks.",
    meta: "Valid 1–14 April",
    action: "Call now",
  },
];

export function PostDeck({ className }: PostDeckProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  /* Once a reader picks a card, stop advancing under them. */
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (held || prefersReducedMotion()) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % POSTS.length),
      3200,
    );
    return () => window.clearInterval(id);
  }, [held]);

  useEffect(() => {
    registerStudio();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const cards = root.querySelectorAll<HTMLElement>("[data-card]");
      const brief = root.querySelector<HTMLElement>("[data-brief]");

      if (prefersReducedMotion()) {
        gsap.set([brief, ...cards].filter(Boolean), { opacity: 1, y: 0 });
        return;
      }

      gsap
        .timeline({
          scrollTrigger: { trigger: root, start: "top 80%", once: true },
        })
        .fromTo(
          brief,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: T.md, ease: CX_EASE.out },
        )
        .fromTo(
          cards,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: T.md,
            stagger: 0.08,
            ease: CX_EASE.out,
          },
          "-=0.3",
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      {/* The brief every card below is written from. */}
      <div
        data-brief
        className="relative rounded-panel border border-line bg-surface p-4 text-center shadow-soft"
      >
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
          One brief
        </p>
        <p className="mt-1.5 text-[0.9375rem] leading-snug text-foreground">
          &ldquo;Spring offer, two weeks, for existing customers.&rdquo;
        </p>
      </div>

      {/* The selector. Also the legend, so the constraint each surface
          imposes is readable without opening the card. */}
      <div
        role="tablist"
        aria-label="Social platforms"
        className="mt-5 flex flex-wrap gap-1.5"
      >
        {POSTS.map((post, i) => (
          <button
            key={post.platform}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => {
              setActive(i);
              setHeld(true);
            }}
            className={cn(
              "flex items-center gap-1.5 rounded-pill border px-2.5 py-1.5 text-[0.875rem] transition-colors duration-200",
              i === active
                ? "border-accent-line bg-accent-soft text-accent"
                : "border-line bg-surface text-muted hover:border-accent-line hover:text-foreground",
            )}
          >
            <BrandGlyph name={post.platform} className="size-3.5" />
            <span className="hidden sm:inline">{post.label}</span>
          </button>
        ))}
      </div>

      {/* The deck. All five are in the DOM so the copy is real text for
          search and screen readers; only the active one is shown.

          The min-height stops the page jumping as the deck advances:
          the LinkedIn post is several lines longer than the X one. */}
      <div className="mt-4 min-h-[13.5rem] sm:min-h-[12.5rem]">
        {POSTS.map((post, i) => (
          <article
            key={post.platform}
            data-card
            hidden={i !== active}
            className="overflow-hidden rounded-panel border border-line bg-surface shadow-float"
          >
            {/* Platform chrome.

                The row wraps below 360px: avatar, two lines of text and
                the character-limit badge together left the brand name
                about 42px at 320px, so "Instagram" rendered as "Inst…".
                Letting the badge drop to its own line gives the name
                the full width instead. */}
            <header className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 border-b border-line px-4 py-2.5">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-line bg-surface-soft">
                <BrandGlyph name={post.platform} className="size-3.5" />
              </span>
              <span className="min-w-[7rem] flex-1">
                <span className="block truncate text-[0.875rem] font-medium leading-tight text-foreground">
                  Your brand
                </span>
                <span className="block truncate text-[0.875rem] leading-tight text-muted">
                  {post.label}
                </span>
              </span>
              <span className="shrink-0 rounded-[0.25rem] bg-surface-soft px-1.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                {post.limit}
              </span>
            </header>

            <div className="px-4 py-4">
              <p className="text-[0.9375rem] leading-[1.6] text-foreground">
                {post.body}
              </p>
              {post.meta ? (
                <p className="mt-2.5 text-[0.875rem] leading-snug text-accent">
                  {post.meta}
                </p>
              ) : null}
            </div>

            {post.action ? (
              <footer className="border-t border-line px-4 py-2.5">
                <span className="inline-flex items-center rounded-[0.3rem] border border-line bg-surface-soft px-2.5 py-1 text-[0.875rem] font-medium text-muted-strong">
                  {post.action}
                </span>
              </footer>
            ) : null}
          </article>
        ))}
      </div>

      <p className="mt-4 text-center text-[0.875rem] text-muted">
        Illustration of the five surfaces, not a published campaign.
      </p>
    </div>
  );
}
