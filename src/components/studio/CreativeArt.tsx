"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

export type CreativeArtKind = "product" | "offer" | "lifestyle" | "editorial";

interface CreativeArtProps {
  kind: CreativeArtKind;
  className?: string;
}

/**
 * Stand-in campaign artwork.
 *
 * The creative wells on this page were flat brand gradients, which read
 * as empty coloured rectangles rather than as generated visuals. These
 * draw something recognisable instead — a product shot, an offer card,
 * a lifestyle frame, an editorial layout — while staying obviously
 * schematic rather than pretending to be a photograph.
 *
 * The brand ramp still carries the colour, but it sits behind composed
 * shapes rather than filling the whole frame, so the difference between
 * the four is visible at a glance.
 *
 * Decorative: every use sits beside a real label, so the root is
 * `aria-hidden` and `preserveAspectRatio="none"` lets one drawing fill
 * whatever frame ratio the channel needs.
 */
export function CreativeArt({ kind, className }: CreativeArtProps) {
  const uid = `cx-art-${useId().replace(/:/g, "")}`;
  const g = (s: string) => `${uid}-${s}`;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn("size-full", className)}
    >
      <defs>
        <linearGradient id={g("sky")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgb(var(--brand-blue-rgb))" />
          <stop offset="55%" stopColor="rgb(var(--brand-violet-rgb))" />
          <stop offset="100%" stopColor="rgb(var(--brand-magenta-rgb))" />
        </linearGradient>
        <linearGradient id={g("warm")} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="rgb(var(--brand-magenta-rgb))" />
          <stop offset="100%" stopColor="rgb(var(--brand-violet-rgb))" />
        </linearGradient>
      </defs>

      {/* The ground. */}
      <rect width="100" height="100" fill={`url(#${g("sky")})`} />

      {kind === "product" ? (
        <>
          {/* A plinth with an object on it. */}
          <ellipse cx="50" cy="78" rx="30" ry="6" fill="rgba(0,0,0,0.16)" />
          <rect
            x="34"
            y="34"
            width="32"
            height="42"
            rx="5"
            fill="rgba(255,255,255,0.92)"
          />
          <rect
            x="40"
            y="42"
            width="20"
            height="4"
            rx="2"
            fill="rgba(0,0,0,0.12)"
          />
          <rect
            x="40"
            y="50"
            width="13"
            height="3"
            rx="1.5"
            fill="rgba(0,0,0,0.08)"
          />
          <circle cx="72" cy="24" r="8" fill="rgba(255,255,255,0.3)" />
        </>
      ) : null}

      {kind === "offer" ? (
        <>
          {/* A banner with a figure and a tag. */}
          <rect
            x="12"
            y="30"
            width="76"
            height="22"
            rx="4"
            fill="rgba(255,255,255,0.94)"
          />
          <rect
            x="18"
            y="36"
            width="34"
            height="5"
            rx="2.5"
            fill={`url(#${g("warm")})`}
          />
          <rect
            x="18"
            y="44"
            width="22"
            height="3"
            rx="1.5"
            fill="rgba(0,0,0,0.12)"
          />
          <rect
            x="62"
            y="35"
            width="20"
            height="12"
            rx="3"
            fill={`url(#${g("warm")})`}
          />
          <rect
            x="12"
            y="60"
            width="40"
            height="4"
            rx="2"
            fill="rgba(255,255,255,0.55)"
          />
          <rect
            x="12"
            y="69"
            width="28"
            height="4"
            rx="2"
            fill="rgba(255,255,255,0.35)"
          />
        </>
      ) : null}

      {kind === "lifestyle" ? (
        <>
          {/* A horizon, a sun and two figures. */}
          <circle cx="68" cy="26" r="11" fill="rgba(255,255,255,0.4)" />
          <path
            d="M0 70 C 18 58, 32 70, 50 64 C 68 58, 84 70, 100 62 L100 100 L0 100 Z"
            fill="rgba(255,255,255,0.22)"
          />
          <path
            d="M0 82 C 22 74, 40 84, 58 78 C 76 72, 88 82, 100 76 L100 100 L0 100 Z"
            fill="rgba(255,255,255,0.32)"
          />
          <circle cx="34" cy="60" r="5" fill="rgba(255,255,255,0.85)" />
          <rect
            x="31"
            y="65"
            width="6"
            height="12"
            rx="3"
            fill="rgba(255,255,255,0.85)"
          />
        </>
      ) : null}

      {kind === "editorial" ? (
        <>
          {/* A text-led layout with a pull image. */}
          <rect
            x="10"
            y="16"
            width="44"
            height="6"
            rx="3"
            fill="rgba(255,255,255,0.92)"
          />
          <rect
            x="10"
            y="27"
            width="32"
            height="4"
            rx="2"
            fill="rgba(255,255,255,0.6)"
          />
          <rect
            x="10"
            y="44"
            width="80"
            height="3"
            rx="1.5"
            fill="rgba(255,255,255,0.4)"
          />
          <rect
            x="10"
            y="52"
            width="74"
            height="3"
            rx="1.5"
            fill="rgba(255,255,255,0.4)"
          />
          <rect
            x="10"
            y="60"
            width="60"
            height="3"
            rx="1.5"
            fill="rgba(255,255,255,0.4)"
          />
          <rect
            x="10"
            y="74"
            width="26"
            height="9"
            rx="4.5"
            fill="rgba(255,255,255,0.92)"
          />
        </>
      ) : null}
    </svg>
  );
}
