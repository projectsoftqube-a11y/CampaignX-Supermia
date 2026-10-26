"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionGlow } from "@/components/ui/SectionGlow";
import { BrandGlyph } from "@/components/ui/BrandGlyph";
import {
  DURATION,
  EASE,
  gsap,
  prefersReducedMotion,
  registerGsap,
} from "@/lib/animations/gsap";
import type { PlatformName } from "@/types/content";

interface MetricPanelProps {
  heading: string;
  eyebrow?: string;
  intro?: string;
  /** Renders only the report card, for use inside a `Segment`. */
  bare?: boolean;
}

/**
 * A mock campaign report.
 *
 * Analytics is the one page where a picture of the thing beats any
 * description of it, and there is no product screenshot of the report in
 * the asset library. This draws a representative one instead.
 *
 * The bars are proportions of a channel's share of engagement, not real
 * customer numbers, and the panel says so in a caption — an illustration
 * presented as data would be a fabricated result, which the Fact Sheet's
 * claim rules forbid.
 *
 * Bars grow from zero on scroll via `scaleX`, which composites rather than
 * triggering layout on every frame.
 */

const ROWS: readonly { name: PlatformName; label: string; share: number }[] = [
  { name: "instagram", label: "Instagram", share: 1 },
  { name: "email", label: "Email", share: 0.82 },
  { name: "linkedin", label: "LinkedIn", share: 0.64 },
  { name: "facebook", label: "Facebook", share: 0.47 },
  { name: "sms", label: "SMS", share: 0.38 },
  { name: "x", label: "X", share: 0.26 },
  { name: "google", label: "Google Business", share: 0.19 },
];

export function MetricPanel({
  heading,
  eyebrow,
  intro,
  bare = false,
}: MetricPanelProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const bars = root.querySelectorAll<HTMLElement>("[data-bar]");
      const rows = root.querySelectorAll<HTMLElement>("[data-row]");

      if (prefersReducedMotion()) {
        gsap.set(bars, { scaleX: 1 });
        gsap.set(rows, { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
      });

      tl.fromTo(
        rows,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: DURATION.fast,
          stagger: 0.06,
          ease: EASE.out,
        },
      ).fromTo(
        bars,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: DURATION.slow,
          stagger: 0.06,
          ease: EASE.expo,
        },
        "-=0.3",
      );
    }, root);

    return () => ctx.revert();
  }, []);

  /* A solid surface rather than the glass panel this used to be:
     glassmorphism was dropped across the site. */
  const card = (
    <div
      ref={rootRef}
      className="rounded-frame border border-line bg-surface p-6 shadow-float sm:p-8"
    >
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="text-eyebrow text-muted">Campaign report</p>
          <p className="text-display mt-1 text-[1.125rem] font-medium">
            Spring offer
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-pill bg-accent-soft px-2.5 py-1 text-[0.75rem] text-accent">
          <ArrowUpRight aria-hidden="true" className="size-3" />
          Engagement
        </span>
      </div>

      <ul className="mt-7 space-y-3.5">
        {ROWS.map((row) => (
          <li key={row.name} data-row className="opacity-0">
            <div className="flex items-center gap-3">
              <BrandGlyph name={row.name} className="size-4 shrink-0" />
              <span className="w-[7.5rem] shrink-0 truncate text-[0.8125rem] text-muted-strong">
                {row.label}
              </span>

              <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-surface-sunk">
                <span
                  data-bar
                  style={{ width: `${row.share * 100}%` }}
                  className="bg-brand absolute inset-y-0 left-0 origin-left rounded-full"
                />
              </span>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-6 border-t border-line pt-4 text-[0.75rem] leading-relaxed text-muted">
        Illustration of the report layout, not customer data. Figures shown
        are relative shares, not performance claims.
      </p>
    </div>
  );

  if (bare) return card;

  return (
    <section className="relative isolate py-[clamp(3.25rem,5.5vw,5rem)]">
      <SectionGlow position="right" />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h2 className="text-display mt-4 text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.03em]">
              {heading}
            </h2>
            {intro ? (
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted-strong">
                {intro}
              </p>
            ) : null}
          </div>

          {card}
        </div>
      </Container>
    </section>
  );
}
