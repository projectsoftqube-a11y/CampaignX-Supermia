"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { LenisContext, type LenisRef } from "@/hooks/useLenis";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  ScrollTrigger,
} from "@/lib/animations/gsap";

/**
 * The single Lenis instance for the whole app, driven by the GSAP ticker so
 * ScrollTrigger and Lenis never disagree about the scroll position.
 * Skipped entirely when the user prefers reduced motion.
 *
 * The instance is shared through a ref rather than state: nothing renders
 * from it, so putting it in state would only cause an extra render pass.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef: LenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    registerGsap();

    if (prefersReducedMotion()) {
      ScrollTrigger.refresh();
      return;
    }

    const instance = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      autoRaf: false,
      /* Lenis sets `scroll-behavior: auto` on <html> while it is mounted,
         which switches off the native smooth scrolling declared in
         globals.css. Without this, every in-page anchor — the header nav,
         the legal pages' contents rail — jumps instantly instead of
         travelling, which reads as a page reload. `anchors` hands those
         clicks to Lenis so they ease like everything else. */
      anchors: { offset: -96 },
    });

    const onScroll = (): void => ScrollTrigger.update();
    instance.on("scroll", onScroll);

    const tick = (time: number): void => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    lenisRef.current = instance;
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tick);
      instance.off("scroll", onScroll);
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}
