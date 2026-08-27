"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "@/lib/animations/gsap";
import { revealOnScroll } from "@/lib/animations/reveal";
import type { MotionTag } from "@/types/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds between each revealed descendant. */
  stagger?: number;
  delay?: number;
  y?: number;
  start?: string;
  as?: MotionTag;
}

/**
 * Staggers every descendant marked `data-animate="reveal"`.
 * The wrapper itself is never hidden, so layout is stable before hydration.
 */
export function Reveal({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  y = 18,
  start = "top 82%",
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      revealOnScroll(el, { stagger, delay, y, start });
    }, el);
    return () => ctx.revert();
  }, [stagger, delay, y, start]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
