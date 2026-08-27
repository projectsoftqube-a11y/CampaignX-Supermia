"use client";

import { EASE, gsap, prefersReducedMotion, ScrollTrigger } from "./gsap";

export interface RevealOptions {
  /** Stagger between children carrying [data-animate]. */
  stagger?: number;
  /** Extra delay before the reveal starts. */
  delay?: number;
  /** Viewport position that triggers the reveal. */
  start?: string;
  /** Vertical travel in pixels. */
  y?: number;
}

/**
 * Reveals `[data-animate]` descendants of `root` as it enters the viewport.
 * Must be called inside a `gsap.context()` so cleanup is automatic.
 */
export function revealOnScroll(
  root: HTMLElement,
  options: RevealOptions = {},
): void {
  const { stagger = 0.08, delay = 0, start = "top 82%", y = 18 } = options;

  const targets = root.querySelectorAll<HTMLElement>('[data-animate="reveal"]');
  const items: HTMLElement[] = targets.length ? Array.from(targets) : [root];

  if (prefersReducedMotion()) {
    gsap.set(items, { opacity: 1, y: 0, clearProps: "transform" });
    return;
  }

  gsap.fromTo(
    items,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration: 0.85,
      delay,
      stagger,
      ease: EASE.out,
      scrollTrigger: {
        trigger: root,
        start,
        once: true,
      },
    },
  );
}

/**
 * Subtle vertical parallax driven by scroll position.
 * Returns nothing; the enclosing gsap.context() reverts it.
 */
export function parallax(
  element: HTMLElement,
  distance = 60,
  scrub: number | boolean = 1,
): void {
  if (prefersReducedMotion()) return;

  gsap.fromTo(
    element,
    { yPercent: 0 },
    {
      y: -distance,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub,
      },
    },
  );
}

export { ScrollTrigger };
