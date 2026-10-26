"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/layout/Container";
import {
  DURATION,
  EASE,
  gsap,
  prefersReducedMotion,
  registerGsap,
} from "@/lib/animations/gsap";

export interface Stat {
  /** Shown large. Keep it short: "7", "~10 min", "0". */
  value: string;
  label: string;
  /** One line of context under the label. */
  note?: string;
}

interface StatBandProps {
  stats: readonly Stat[];
}

/**
 * A dark band of figures between two light sections.
 *
 * Numbers that are purely numeric count up; anything else (a tilde, a
 * unit, a word) simply fades in, because animating "~10 min" digit by
 * digit produces nonsense in the intermediate frames.
 *
 * Every figure here must be one the Fact Sheet actually supports. Results
 * language stays hedged: no performance promises, no invented metrics.
 */
export function StatBand({ stats }: StatBandProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const items = root.querySelectorAll<HTMLElement>("[data-stat]");

      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        items,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: DURATION.base,
          stagger: 0.1,
          ease: EASE.out,
          scrollTrigger: { trigger: root, start: "top 80%", once: true },
        },
      );

      /* Count up only where the whole value is a number. */
      root.querySelectorAll<HTMLElement>("[data-count]").forEach((node) => {
        const target = Number(node.dataset.count);
        if (!Number.isFinite(target)) return;
        const counter = { n: 0 };
        gsap.to(counter, {
          n: target,
          duration: DURATION.cinematic,
          ease: EASE.expo,
          scrollTrigger: { trigger: root, start: "top 80%", once: true },
          onUpdate: () => {
            node.textContent = String(Math.round(counter.n));
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-foreground py-[clamp(2.75rem,4.5vw,4rem)] text-white">
      {/* A single brand light, so the band is not a flat black rectangle. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55] [background:radial-gradient(60%_80%_at_20%_0%,rgba(var(--brand-blue-rgb),0.35),transparent_60%),radial-gradient(50%_70%_at_85%_100%,rgba(139,92,246,0.3),transparent_65%)]"
      />

      <Container>
        <div
          ref={rootRef}
          className="relative grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => {
            const numeric = /^\d+$/.test(stat.value);
            return (
              <div key={stat.label} data-stat className="opacity-0">
                <p className="text-display text-[clamp(2.5rem,5vw,3.5rem)] font-medium leading-none tracking-[-0.04em]">
                  {numeric ? (
                    <span data-count={stat.value}>0</span>
                  ) : (
                    stat.value
                  )}
                </p>
                <p className="mt-3 text-[0.9375rem] font-medium text-white">
                  {stat.label}
                </p>
                {stat.note ? (
                  <p className="mt-1.5 text-[0.8125rem] leading-snug text-white/55">
                    {stat.note}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
