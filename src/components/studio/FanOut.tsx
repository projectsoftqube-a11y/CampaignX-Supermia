"use client";

import { useEffect, useRef } from "react";
import { BrandGlyph } from "@/components/ui/BrandGlyph";
import {
  CX_EASE,
  T,
  gsap,
  prefersReducedMotion,
  registerStudio,
} from "@/lib/animations/studio";
import type { PlatformName } from "@/types/content";
import { cn } from "@/lib/utils";

interface FanOutProps {
  /** Types itself into the brief field. One short sentence. */
  brief: string;
  className?: string;
}

/**
 * One brief fanning out into seven channel drafts.
 *
 * Coded rather than a render: it animates, stays sharp at any size,
 * reads the page's own tokens so light and dark both work, and costs
 * nothing to download. The 1.4MB PNG this replaces showed the same idea
 * frozen.
 *
 * Construction:
 *   - The brief types itself into a raised input, then the arrow button
 *     pulses once as if pressed.
 *   - Seven curves draw outward from a single origin beneath it. The
 *     geometry is computed from the channel count, so the fan re-spaces
 *     itself rather than being hand-placed.
 *   - Each card lands as its curve completes, carrying a real platform
 *     mark and a line of that channel's copy.
 *   - A packet then travels one curve at a time, continuously, so the
 *     piece stays alive after the intro settles.
 */

const CHANNELS: readonly {
  name: PlatformName;
  label: string;
  line: string;
}[] = [
  { name: "instagram", label: "Instagram", line: "Spring picks are back" },
  { name: "facebook", label: "Facebook", line: "Two weeks only" },
  { name: "linkedin", label: "LinkedIn", line: "Why existing customers" },
  { name: "email", label: "Email", line: "Your spring list is ready" },
  { name: "x", label: "X", line: "Back in your size" },
  { name: "google", label: "Google Business", line: "Spring offer, 2 weeks" },
  { name: "sms", label: "SMS", line: "Here if you want them" },
];

/* The SVG is a fixed coordinate space; the wrapper is responsive and the
   cards are positioned over it in percentages. */
const VB_W = 1200;
const VB_H = 300;
const ORIGIN_X = VB_W / 2;

/** Where each card's connector lands, as a percentage of the width. */
function landing(index: number, total: number) {
  const span = 100 / total;
  return span * (index + 0.5);
}

/**
 * One connector, from the origin down to `x`.
 *
 * With an odd channel count the middle card sits directly beneath the
 * origin, and a straight vertical line there reads as the fan's stem
 * rather than as that channel's own connector — the Email curve simply
 * disappeared. Every curve now carries a minimum lateral offset in its
 * control points, so the centre one bows visibly like the rest.
 */
function spoke(x: number): string {
  const dx = x - ORIGIN_X;
  const side = dx === 0 ? 1 : Math.sign(dx);
  /* A floor on the bow keeps the centre curve from going straight. */
  const bow = Math.max(Math.abs(dx) * 0.22, VB_W * 0.035) * side;
  return [
    `M ${ORIGIN_X} 0`,
    `C ${ORIGIN_X + bow} ${VB_H * 0.42},`,
    `${x - bow * 0.6} ${VB_H * 0.58},`,
    `${x} ${VB_H}`,
  ].join(" ");
}

export function FanOut({ brief, className }: FanOutProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerStudio();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const text = root.querySelector<HTMLElement>("[data-type]");
      const caret = root.querySelector<HTMLElement>("[data-caret]");
      const button = root.querySelector<HTMLElement>("[data-go]");
      const curves = root.querySelectorAll<SVGPathElement>("[data-curve]");
      const cards = root.querySelectorAll<HTMLElement>("[data-card]");
      const packet = root.querySelector<SVGCircleElement>("[data-packet]");

      if (prefersReducedMotion()) return;

      /* The markup ships finished so a blocked script still shows a
         readable diagram. Clear it now the timeline will run. */
      if (text) text.textContent = "";
      gsap.set(cards, { opacity: 0, y: 18, scale: 0.96 });
      gsap.set(curves, { drawSVG: "0% 0%" });

      const blink = gsap.to(caret, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });

      const typed = { n: 0 };

      gsap
        .timeline({
          defaults: { ease: CX_EASE.out },
          scrollTrigger: { trigger: root, start: "top 86%", once: true },
        })
        .to(typed, {
          n: brief.length,
          duration: 1.2,
          ease: "none",
          onUpdate: () => {
            if (text) text.textContent = brief.slice(0, Math.round(typed.n));
          },
        })
        .add(() => blink.kill())
        .to(caret, { opacity: 0, duration: 0.18 })
        /* The button reacts, as if the brief had been submitted. */
        .to(button, { scale: 0.9, duration: 0.12 })
        .to(button, { scale: 1, duration: 0.3, ease: CX_EASE.spring })
        .to(
          curves,
          { drawSVG: "0% 100%", duration: T.lg, stagger: 0.06 },
          "-=0.15",
        )
        .to(
          cards,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: T.md,
            stagger: 0.07,
            ease: CX_EASE.spring,
          },
          "-=0.75",
        );

      /* One packet, cycling the curves in turn. A packet per curve all
         running at once reads as noise; one moving line reads as flow. */
      if (packet && curves.length > 0) {
        const state = { t: 0 };
        let index = 0;

        gsap.to(state, {
          t: 1,
          duration: 1.4,
          repeat: -1,
          repeatDelay: 0.45,
          delay: 3.2,
          ease: "power1.inOut",
          onRepeat: () => {
            index = (index + 1) % curves.length;
          },
          onUpdate: () => {
            const path = curves[index];
            if (!path) return;
            const point = path.getPointAtLength(
              path.getTotalLength() * state.t,
            );
            packet.setAttribute("cx", String(point.x));
            packet.setAttribute("cy", String(point.y));
            packet.setAttribute(
              "opacity",
              String(Math.sin(state.t * Math.PI) * 0.95),
            );
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, [brief]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn("relative select-none", className)}
    >
      {/* The brief */}
      <div className="mx-auto w-full sm:w-[min(34rem,92%)]">
        <div className="flex items-center gap-2 rounded-pill border border-line bg-surface py-2.5 pl-4 pr-2 shadow-float sm:gap-3 sm:pl-6 sm:pr-2.5">
          <p className="min-w-0 flex-1 truncate text-[0.875rem] text-foreground sm:text-[1rem]">
            <span data-type>{brief}</span>
            <span
              data-caret
              className="bg-brand ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] rounded-full"
            />
          </p>
          <span
            data-go
            className="bg-brand flex size-8 shrink-0 items-center justify-center rounded-full text-white sm:size-9"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none">
              <path
                d="M5 12h13M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* The fan */}
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
        className="h-[4.5rem] w-full sm:h-[7rem] lg:h-[9rem]"
      >
        <defs>
          <linearGradient id="cx-fan" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="rgb(var(--brand-blue-rgb))"
              stopOpacity="0.85"
            />
            <stop
              offset="100%"
              stopColor="rgb(var(--brand-purple-rgb))"
              stopOpacity="0.3"
            />
          </linearGradient>
          <radialGradient id="cx-fan-packet">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop
              offset="100%"
              stopColor="rgb(var(--brand-blue-rgb))"
              stopOpacity="0"
            />
          </radialGradient>
        </defs>

        {CHANNELS.map((channel, i) => {
          const x = (landing(i, CHANNELS.length) / 100) * VB_W;
          return (
            <path
              key={channel.name}
              data-curve
              d={spoke(x)}
              fill="none"
              stroke="url(#cx-fan)"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}

        <circle data-packet r="7" fill="url(#cx-fan-packet)" opacity="0" />
      </svg>

      {/* The drafts */}
      <ul className="grid grid-cols-2 gap-2 min-[400px]:grid-cols-3 sm:grid-cols-4 sm:gap-2.5 lg:grid-cols-7">
        {CHANNELS.map((channel) => (
          <li
            key={channel.name}
            data-card
            className="rounded-card border border-line bg-surface p-2.5 shadow-soft sm:p-3"
          >
            <span className="flex items-center gap-1.5">
              <BrandGlyph name={channel.name} className="size-3.5 shrink-0" />
              <span className="truncate text-[0.875rem] font-medium text-muted-strong">
                {channel.label}
              </span>
            </span>
            <span className="mt-1.5 block truncate text-[0.875rem] leading-snug text-muted">
              {channel.line}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
