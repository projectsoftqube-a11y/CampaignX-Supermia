"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "@/lib/animations/gsap";
import { revealOnScroll } from "@/lib/animations/reveal";
import type { MotionTag } from "@/types/motion";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  /** Seconds of delay before the element reveals. */
  delay?: number;
  /** Vertical travel in pixels. */
  y?: number;
  /** ScrollTrigger start position. */
  start?: string;
  as?: MotionTag;
}

/**
 * Reveals *itself* on scroll. Do not nest inside <Reveal>, which staggers
 * its own descendants — use one or the other per subtree.
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 18,
  start = "top 84%",
  as = "div",
}: FadeInProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      revealOnScroll(el, { delay, y, start, stagger: 0 });
    }, el);
    return () => ctx.revert();
  }, [delay, y, start]);

  return (
    <Tag ref={ref} className={className} data-animate="reveal">
      {children}
    </Tag>
  );
}
