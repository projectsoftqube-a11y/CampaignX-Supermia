"use client";

import { gsap, prefersReducedMotion, ScrollTrigger } from "./gsap";

/**
 * Fires a callback whenever the page crosses a scroll threshold.
 * Used by the header to swap between transparent and glass states.
 */
export function onScrollThreshold(
  threshold: number,
  callback: (passed: boolean) => void,
): () => void {
  let last: boolean | null = null;

  const evaluate = (): void => {
    const passed = window.scrollY > threshold;
    if (passed !== last) {
      last = passed;
      callback(passed);
    }
  };

  evaluate();
  window.addEventListener("scroll", evaluate, { passive: true });
  return () => window.removeEventListener("scroll", evaluate);
}

/**
 * Horizontal drift for decorative rows as they pass through the viewport.
 */
export function driftX(
  element: HTMLElement,
  distance: number,
  scrub: number | boolean = 1,
): void {
  if (prefersReducedMotion()) return;

  gsap.fromTo(
    element,
    { x: 0 },
    {
      x: distance,
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

/**
 * Grows a set of bars from zero once the chart scrolls into view.
 */
export function growBars(container: HTMLElement): void {
  const bars = gsap.utils.toArray<HTMLElement>("[data-bar]", container);
  if (!bars.length) return;

  if (prefersReducedMotion()) {
    gsap.set(bars, { scaleY: 1 });
    return;
  }

  gsap.fromTo(
    bars,
    { scaleY: 0.04 },
    {
      scaleY: 1,
      duration: 1,
      stagger: 0.06,
      ease: "power3.out",
      scrollTrigger: { trigger: container, start: "top 80%", once: true },
    },
  );
}

export { ScrollTrigger };
