"use client";

/**
 * Motion toolkit for the inner pages.
 *
 * Kept separate from `animations/gsap.ts` on purpose: that module is what
 * the homepage registers, and the homepage is not being changed. This one
 * registers the heavier plugins the inner pages use and nothing on the
 * homepage imports it, so its cost is never paid on the landing page.
 *
 * Every plugin in the GSAP package is free, including for commercial use,
 * since Webflow's acquisition — SplitText and MorphSVG included. No auth
 * token or private registry is required.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";
import { CustomEase } from "gsap/CustomEase";
import { MEDIA } from "@/lib/constants";

let registered = false;

/**
 * Custom eases, defined once.
 *
 * `cx.out` is the house curve: a long, flat tail so elements settle
 * rather than arrive. `cx.inOut` is symmetric for state swaps, and
 * `cx.spring` overshoots slightly for things that should feel physical,
 * like a node landing on an orbit.
 */
export const CX_EASE = {
  out: "cx.out",
  inOut: "cx.inOut",
  spring: "cx.spring",
} as const;

export function registerStudio(): void {
  if (registered || typeof window === "undefined") return;

  gsap.registerPlugin(
    ScrollTrigger,
    SplitText,
    DrawSVGPlugin,
    MotionPathPlugin,
    Flip,
    Observer,
    CustomEase,
  );

  CustomEase.create("cx.out", "M0,0 C0.16,1 0.3,1 1,1");
  CustomEase.create("cx.inOut", "M0,0 C0.65,0 0.35,1 1,1");
  CustomEase.create("cx.spring", "M0,0 C0.18,0.9 0.26,1.06 0.5,1.02 0.74,0.99 0.84,1 1,1");

  registered = true;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MEDIA.reducedMotion).matches;
}

/** Shared timings, so sections across the site move at the same speed. */
export const T = {
  xs: 0.28,
  sm: 0.45,
  md: 0.75,
  lg: 1.1,
  xl: 1.6,
} as const;

/**
 * Splits a heading into masked lines and reveals them.
 *
 * Masked rather than faded: each line sits in a clipping wrapper and
 * slides up from under it, which reads as type being set rather than
 * content appearing. `autoSplit` re-splits when fonts load or the box
 * is resized, so lines never break in the wrong place; the animation is
 * created inside `onSplit` and returned so GSAP can re-run and sync it.
 *
 * Returns the SplitText instance for cleanup, or null under reduced
 * motion, where the text is simply left alone.
 */
export function revealLines(
  target: HTMLElement,
  options: { delay?: number; stagger?: number; trigger?: HTMLElement } = {},
): SplitText | null {
  if (prefersReducedMotion()) return null;

  const { delay = 0, stagger = 0.08, trigger } = options;

  return SplitText.create(target, {
    type: "lines",
    mask: "lines",
    linesClass: "cx-line",
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.lines, {
        yPercent: 108,
        opacity: 0,
        duration: T.lg,
        stagger,
        delay,
        ease: CX_EASE.out,
        scrollTrigger: trigger
          ? { trigger, start: "top 82%", once: true }
          : undefined,
      });
    },
  });
}

export { gsap, ScrollTrigger, SplitText, Flip, Observer, MotionPathPlugin };
