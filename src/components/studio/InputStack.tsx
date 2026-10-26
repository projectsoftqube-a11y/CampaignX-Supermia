"use client";

import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import {
  CX_EASE,
  T,
  gsap,
  prefersReducedMotion,
  registerStudio,
} from "@/lib/animations/studio";
import { cn } from "@/lib/utils";

interface InputStackProps {
  className?: string;
}

/**
 * The three inputs feeding the brand model.
 *
 * An earlier version drew a staircase of offset cards with one
 * absolutely-positioned SVG curve behind them. The curve could not
 * track the cards — its coordinates were fixed while the cards moved
 * with the layout — so the line met nothing and a brand sphere floated
 * unattached in the corner.
 *
 * This is built as a single column instead: each source is a row, the
 * connectors are short in-flow segments between them, and the model at
 * the foot is the thing they all arrive at. Nothing is positioned
 * absolutely, so the parts stay joined at every width.
 */

const SOURCES = [
  {
    kind: "browser" as const,
    label: "Your website",
    note: "Pages you have edited repeatedly — the strongest signal",
    weight: "Strongest",
  },
  {
    kind: "doc" as const,
    label: "Tone of voice guidelines",
    note: "Most useful where they say what to avoid",
    weight: "Useful",
  },
  {
    kind: "cards" as const,
    label: "One past campaign",
    note: "Shows the voice doing a real job, not describing itself",
    weight: "Useful",
  },
];

export function InputStack({ className }: InputStackProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerStudio();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const rows = root.querySelectorAll<HTMLElement>("[data-row]");
      const links = root.querySelectorAll<HTMLElement>("[data-link]");
      const model = root.querySelector<HTMLElement>("[data-model]");
      const ring = root.querySelector<HTMLElement>("[data-ring]");

      if (prefersReducedMotion()) return;

      gsap.set(rows, { opacity: 0, y: 18 });
      gsap.set(links, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(model, { opacity: 0, y: 18 });

      gsap
        .timeline({
          defaults: { ease: CX_EASE.out },
          scrollTrigger: { trigger: root, start: "top 84%", once: true },
        })
        .to(rows[0], { opacity: 1, y: 0, duration: T.md })
        .to(links[0], { scaleY: 1, duration: T.sm }, "-=0.2")
        .to(rows[1], { opacity: 1, y: 0, duration: T.md }, "-=0.1")
        .to(links[1], { scaleY: 1, duration: T.sm }, "-=0.2")
        .to(rows[2], { opacity: 1, y: 0, duration: T.md }, "-=0.1")
        .to(links[2], { scaleY: 1, duration: T.sm }, "-=0.2")
        .to(
          model,
          { opacity: 1, y: 0, duration: T.lg, ease: CX_EASE.spring },
          "-=0.15",
        );

      /* The model keeps a slow halo once it has arrived. */
      gsap.to(ring, {
        scale: 1.18,
        opacity: 0,
        duration: 2.4,
        repeat: -1,
        ease: "power1.out",
        delay: 2,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn("relative select-none", className)}
    >
      {SOURCES.map((source, i) => (
        <div key={source.label}>
          <div
            data-row
            className="flex items-center gap-3.5 rounded-panel border border-line bg-surface p-3.5 shadow-soft sm:gap-4 sm:p-4"
          >
            {/* A small drawing of the source. */}
            <div className="hidden w-[4.5rem] shrink-0 overflow-hidden rounded-card bg-surface-soft p-2 min-[380px]:block sm:w-[5.5rem]">
              {source.kind === "browser" ? (
                <div className="space-y-1">
                  <div className="flex gap-0.5">
                    <span className="size-1 rounded-full bg-surface-sunk" />
                    <span className="size-1 rounded-full bg-surface-sunk" />
                  </div>
                  <span className="block h-4 rounded bg-[linear-gradient(135deg,rgba(var(--brand-blue-rgb),0.28),rgba(var(--brand-magenta-rgb),0.18))]" />
                  <span className="block h-1 w-4/5 rounded-full bg-surface-sunk" />
                </div>
              ) : null}

              {source.kind === "doc" ? (
                <div className="space-y-1">
                  <span className="block h-1 w-full rounded-full bg-surface-sunk" />
                  <span className="bg-brand block h-1 w-1/2 rounded-full" />
                  <span className="block h-1 w-5/6 rounded-full bg-surface-sunk" />
                  <span className="block h-1 w-2/3 rounded-full bg-surface-sunk" />
                </div>
              ) : null}

              {source.kind === "cards" ? (
                <div className="flex gap-1">
                  <span className="h-6 flex-1 rounded bg-surface-sunk" />
                  <span className="h-6 flex-1 rounded bg-[linear-gradient(135deg,rgba(var(--brand-violet-rgb),0.26),rgba(var(--brand-magenta-rgb),0.16))]" />
                  <span className="h-6 flex-1 rounded bg-surface-sunk" />
                </div>
              ) : null}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-[0.875rem] font-medium text-foreground">
                  {source.label}
                </p>
                <span
                  className={cn(
                    "shrink-0 rounded-pill px-2 py-0.5 text-[0.5625rem] uppercase tracking-[0.1em]",
                    i === 0
                      ? "bg-accent-soft text-accent"
                      : "bg-surface-sunk text-muted",
                  )}
                >
                  {source.weight}
                </span>
              </div>
              <p className="mt-1 text-[0.8125rem] leading-snug text-muted">
                {source.note}
              </p>
            </div>
          </div>

          {/* The connector to whatever comes next. In flow, so it
              always starts and ends where the rows actually are — the
              previous version used one absolutely positioned curve,
              which could not track the cards and met nothing. */}
          <div className="flex justify-center py-1.5">
            <span
              data-link
              className={cn(
                "bg-brand block w-[2px] rounded-full",
                /* The last link runs into the model, so it is longer
                   and fully opaque: it is an arrival, not a gap. */
                i === SOURCES.length - 1 ? "h-7 opacity-80" : "h-5 opacity-50",
              )}
            />
          </div>
        </div>
      ))}

      {/* What they all arrive at. */}
      <div
        data-model
        className="relative flex items-center gap-3.5 rounded-panel border border-accent-line bg-surface p-4 shadow-float"
      >
        <span className="relative flex size-10 shrink-0 items-center justify-center">
          <span
            data-ring
            className="absolute inset-0 rounded-full bg-[rgba(var(--brand-blue-rgb),0.25)]"
          />
          <span className="bg-brand relative flex size-10 items-center justify-center rounded-full text-white">
            <ArrowDown aria-hidden="true" className="size-4" strokeWidth={2.4} />
          </span>
        </span>

        <div className="min-w-0">
          <p className="text-[0.875rem] font-medium text-foreground">
            Your brand model
          </p>
          <p className="mt-0.5 text-[0.8125rem] leading-snug text-muted">
            Private to your workspace, improving with every approval
          </p>
        </div>
      </div>
    </div>
  );
}
