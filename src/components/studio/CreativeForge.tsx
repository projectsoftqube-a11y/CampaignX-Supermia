"use client";

import { useEffect, useRef } from "react";
import { BrandGlyph } from "@/components/ui/BrandGlyph";
import { CreativeArt, type CreativeArtKind } from "@/components/studio/CreativeArt";
import {
  CX_EASE,
  T,
  gsap,
  prefersReducedMotion,
  registerStudio,
} from "@/lib/animations/studio";
import type { PlatformName } from "@/types/content";
import { cn } from "@/lib/utils";

interface CreativeForgeProps {
  className?: string;
}

/**
 * One brief becoming creative in three channel formats at once.
 *
 * The claim on this page is that visuals are generated *with* the copy
 * and sized for each surface, not resized afterwards. A still render
 * can show three frames of different shapes; only an animation can show
 * them being filled at the same moment from the same source, which is
 * the actual argument.
 *
 * Construction:
 *   - A source row at the top, with the brief and a brand swatch strip.
 *   - Three frames below at their real aspect ratios: 4:5 for the feed,
 *     16:9 for the inbox, 9:16 for the story.
 *   - Each frame's artwork wipes in, then its caption line writes.
 *   - A sheen crosses all three afterwards, on a slow loop, so the
 *     piece stays alive once the intro settles.
 */

const FRAMES: readonly {
  channel: PlatformName;
  label: string;
  ratio: string;
  /* Each frame gets a different composition, so the three read as
     three distinct pieces of creative rather than one gradient at
     three sizes. */
  art: CreativeArtKind;
}[] = [
  {
    channel: "instagram",
    label: "Feed",
    ratio: "aspect-[4/5]",
    art: "product",
  },
  {
    channel: "email",
    label: "Inbox",
    ratio: "aspect-[16/10]",
    art: "offer",
  },
  {
    channel: "sms",
    label: "Story",
    ratio: "aspect-[9/16]",
    art: "lifestyle",
  },
];

/** The brand swatches the creative is drawn from. */
const SWATCHES = [
  "rgb(var(--brand-blue-rgb))",
  "rgb(var(--brand-violet-rgb))",
  "rgb(var(--brand-purple-rgb))",
  "rgb(var(--brand-magenta-rgb))",
];

export function CreativeForge({ className }: CreativeForgeProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerStudio();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const source = root.querySelector<HTMLElement>("[data-source]");
      const chips = root.querySelectorAll<HTMLElement>("[data-swatch]");
      const frames = root.querySelectorAll<HTMLElement>("[data-frame]");
      const arts = root.querySelectorAll<HTMLElement>("[data-art]");
      const lines = root.querySelectorAll<HTMLElement>("[data-line]");
      const wires = root.querySelectorAll<SVGPathElement>("[data-wire]");

      if (prefersReducedMotion()) return;

      gsap.set(source, { opacity: 0, y: 14 });
      gsap.set(chips, { opacity: 0, scale: 0.6 });
      gsap.set(frames, { opacity: 0, y: 22 });
      gsap.set(arts, { scaleY: 0, transformOrigin: "bottom center" });
      gsap.set(lines, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(wires, { drawSVG: "0% 0%" });

      gsap
        .timeline({
          defaults: { ease: CX_EASE.out },
          scrollTrigger: { trigger: root, start: "top 84%", once: true },
        })
        .to(source, { opacity: 1, y: 0, duration: T.md })
        .to(
          chips,
          { opacity: 1, scale: 1, duration: T.sm, stagger: 0.06, ease: CX_EASE.spring },
          "-=0.3",
        )
        .to(wires, { drawSVG: "0% 100%", duration: T.md, stagger: 0.07 }, "-=0.1")
        .to(frames, { opacity: 1, y: 0, duration: T.md, stagger: 0.1 }, "-=0.4")
        /* The artwork fills each frame from the bottom, together — the
           point is that they are produced at the same moment. */
        .to(
          arts,
          { scaleY: 1, duration: T.lg, stagger: 0.12, ease: CX_EASE.inOut },
          "-=0.35",
        )
        .to(
          lines,
          { scaleX: 1, duration: T.sm, stagger: 0.08 },
          "-=0.5",
        );

      /* A sheen crossing the frames, on a slow loop. */
      root.querySelectorAll<HTMLElement>("[data-sheen]").forEach((sheen, i) => {
        gsap.fromTo(
          sheen,
          { xPercent: -130 },
          {
            xPercent: 260,
            duration: 2.2,
            repeat: -1,
            repeatDelay: 3.4,
            delay: 2.6 + i * 0.4,
            ease: "power1.inOut",
          },
        );
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
      {/* The source: one brief, one palette. */}
      <div
        data-source
        className="mx-auto flex w-full max-w-[26rem] items-center gap-3 rounded-panel border border-line bg-surface p-3.5 shadow-soft"
      >
        <div className="min-w-0 flex-1">
          <p className="text-[0.5625rem] font-medium uppercase tracking-[0.16em] text-muted">
            One brief
          </p>
          <p className="mt-1 truncate text-[0.8125rem] text-foreground">
            Spring offer, two weeks
          </p>
        </div>

        <div className="flex shrink-0 gap-1">
          {SWATCHES.map((colour) => (
            <span
              key={colour}
              data-swatch
              style={{ background: colour }}
              className="size-4 rounded-[0.25rem]"
            />
          ))}
        </div>
      </div>

      {/* Connectors into the three frames. */}
      <svg
        viewBox="0 0 300 60"
        preserveAspectRatio="none"
        className="h-10 w-full sm:h-12"
      >
        <defs>
          <linearGradient id="cx-forge-wire" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="rgb(var(--brand-blue-rgb))"
              stopOpacity="0.8"
            />
            <stop
              offset="100%"
              stopColor="rgb(var(--brand-magenta-rgb))"
              stopOpacity="0.35"
            />
          </linearGradient>
        </defs>
        {[50, 150, 250].map((x) => (
          <path
            key={x}
            data-wire
            d={`M 150 0 C 150 34, ${x} 26, ${x} 58`}
            fill="none"
            stroke="url(#cx-forge-wire)"
            strokeWidth="1.75"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* The three formats, at their real ratios. */}
      <ul className="grid grid-cols-3 items-start gap-2.5 sm:gap-4">
        {FRAMES.map((frame) => (
          <li
            key={frame.channel}
            data-frame
            className="overflow-hidden rounded-panel border border-line bg-surface p-2 shadow-soft sm:p-2.5"
          >
            <div className="flex items-center gap-1.5">
              <BrandGlyph name={frame.channel} className="size-3 shrink-0" />
              <span className="truncate text-[0.5625rem] font-medium uppercase tracking-[0.1em] text-muted">
                {frame.label}
              </span>
            </div>

            {/* The artwork well, at this channel's ratio. */}
            <div
              className={cn(
                "relative mt-1.5 overflow-hidden rounded-card bg-surface-sunk",
                frame.ratio,
              )}
            >
              <div data-art className="absolute inset-0">
                <CreativeArt kind={frame.art} />
              </div>
              <span
                data-sheen
                className="absolute inset-y-0 -left-1/3 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)]"
              />
            </div>

            {/* The caption, writing itself under the artwork. */}
            <div className="mt-1.5 space-y-1">
              <span
                data-line
                className="block h-1 w-full rounded-full bg-surface-sunk"
              />
              <span
                data-line
                className="block h-1 w-2/3 rounded-full bg-surface-sunk"
              />
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-center text-[0.6875rem] text-muted">
        One brief, three formats, generated together
      </p>
    </div>
  );
}
