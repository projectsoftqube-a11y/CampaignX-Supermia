"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MEDIA } from "@/lib/constants";

let registered = false;

/** Registers GSAP plugins exactly once, and only in the browser. */
export function registerGsap(): void {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: EASE.out, duration: DURATION.base });
  registered = true;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MEDIA.reducedMotion).matches;
}

export const EASE = {
  out: "power3.out",
  inOut: "power2.inOut",
  expo: "expo.out",
} as const;

export const DURATION = {
  fast: 0.32,
  base: 0.7,
  slow: 1.1,
  cinematic: 1.4,
} as const;

export { gsap, ScrollTrigger };
