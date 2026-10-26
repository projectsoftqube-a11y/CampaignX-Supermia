"use client";

import { useEffect, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import { CreativeArt, type CreativeArtKind } from "@/components/studio/CreativeArt";
import {
  CX_EASE,
  T,
  gsap,
  prefersReducedMotion,
  registerStudio,
} from "@/lib/animations/studio";
import { cn } from "@/lib/utils";

interface BrandMatchProps {
  className?: string;
}

/**
 * Regenerating one asset without touching the rest.
 *
 * The claim: if a single visual misses, you regenerate that one and
 * leave the campaign alone. That is a sequence, not a state — the
 * middle tile cycles through regenerating and resolving to a new
 * composition while its neighbours sit still, which is exactly the
 * behaviour being described.
 *
 * The palette strip underneath shows where the colours come from, so
 * the regenerated tile is visibly drawn from the same brand rather
 * than being random.
 */

/**
 * The compositions the middle tile cycles between. Real layouts rather
 * than gradient angles, so a regeneration visibly produces a different
 * piece of creative instead of the same block in another colour.
 */
const VARIANTS: readonly CreativeArtKind[] = [
  "product",
  "editorial",
  "lifestyle",
];

/** The two tiles that never change. */
const FIXED: readonly CreativeArtKind[] = ["offer", "product", "lifestyle"];

export function BrandMatch({ className }: BrandMatchProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  /* Which composition the regenerating tile is currently showing. */
  const [variant, setVariant] = useState(0);

  useEffect(() => {
    registerStudio();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const tiles = root.querySelectorAll<HTMLElement>("[data-tile]");
      const swatches = root.querySelectorAll<HTMLElement>("[data-swatch]");
      const target = root.querySelector<HTMLElement>("[data-target]");
      const spinner = root.querySelector<HTMLElement>("[data-spinner]");
      const badge = root.querySelector<HTMLElement>("[data-badge]");

      if (prefersReducedMotion()) return;

      gsap.set(tiles, { opacity: 0, y: 16 });
      gsap.set(swatches, { opacity: 0, scale: 0.5 });
      gsap.set(spinner, { opacity: 0 });

      gsap
        .timeline({
          defaults: { ease: CX_EASE.out },
          scrollTrigger: { trigger: root, start: "top 84%", once: true },
        })
        .to(tiles, { opacity: 1, y: 0, duration: T.md, stagger: 0.09 })
        .to(
          swatches,
          { opacity: 1, scale: 1, duration: T.sm, stagger: 0.06, ease: CX_EASE.spring },
          "-=0.3",
        );

      /* The regeneration loop: the badge pulses, the tile dims and
         spins, then resolves to the next composition. Only the middle
         tile changes — that is the point. */
      if (target) {
        let index = 0;
        const loop = gsap.timeline({ repeat: -1, repeatDelay: 1.6, delay: 2.4 });

        loop
          .to(badge, { scale: 1.12, duration: 0.18, ease: CX_EASE.spring })
          .to(badge, { scale: 1, duration: 0.24 })
          .to(spinner, { opacity: 1, duration: 0.2 }, "<")
          .to(target, { opacity: 0.25, scale: 0.97, duration: 0.3 }, "<")
          .to(spinner, { rotate: "+=360", duration: 0.9, ease: "none" }, "<")
          .add(() => {
            index = (index + 1) % VARIANTS.length;
            setVariant(index);
          })
          .to(spinner, { opacity: 0, duration: 0.2 })
          .to(
            target,
            { opacity: 1, scale: 1, duration: T.md, ease: CX_EASE.spring },
            "<",
          );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn("relative select-none", className)}
    >
      <ul className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {[0, 1, 2].map((i) => {
          const isTarget = i === 1;
          return (
            <li
              key={i}
              data-tile
              className={cn(
                "relative overflow-hidden rounded-panel border bg-surface p-2 shadow-soft sm:p-2.5",
                isTarget ? "border-accent-line" : "border-line",
              )}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-surface-sunk">
                <div
                  {...(isTarget ? { "data-target": true } : {})}
                  className="absolute inset-0"
                >
                  <CreativeArt
                    kind={isTarget ? VARIANTS[variant] : FIXED[i]}
                  />
                </div>

                {isTarget ? (
                  <span
                    data-spinner
                    className="absolute inset-0 z-10 flex items-center justify-center bg-[rgba(10,10,26,0.45)] opacity-0"
                  >
                    <RefreshCw
                      aria-hidden="true"
                      className="size-5 text-white"
                      strokeWidth={2.2}
                    />
                  </span>
                ) : null}

                {/* Inside the well, not hanging off the tile's corner:
                    the parent clips, so an offset badge lost half its
                    label. */}
                {isTarget ? (
                  <span
                    data-badge
                    className="bg-brand absolute right-1.5 top-1.5 z-10 rounded-pill px-2 py-0.5 text-[0.5625rem] font-medium uppercase tracking-[0.08em] text-white shadow-brand"
                  >
                    Regenerating
                  </span>
                ) : null}
              </div>

              <p className="mt-1.5 truncate text-[0.625rem] text-muted">
                {isTarget ? "This one only" : "Unchanged"}
              </p>
            </li>
          );
        })}
      </ul>

      {/* The palette the new composition is drawn from. */}
      <div className="mt-4 flex items-center gap-3 rounded-panel border border-line bg-surface p-3">
        <span className="shrink-0 text-[0.5625rem] font-medium uppercase tracking-[0.14em] text-muted">
          Your palette
        </span>
        <span className="flex gap-1.5">
          {[
            "rgb(var(--brand-blue-rgb))",
            "rgb(var(--brand-violet-rgb))",
            "rgb(var(--brand-purple-rgb))",
            "rgb(var(--brand-magenta-rgb))",
          ].map((colour) => (
            <span
              key={colour}
              data-swatch
              style={{ background: colour }}
              className="size-4 rounded-[0.25rem]"
            />
          ))}
        </span>
        <span className="ml-auto shrink-0 text-[0.625rem] text-muted">
          From your brand model
        </span>
      </div>
    </div>
  );
}
