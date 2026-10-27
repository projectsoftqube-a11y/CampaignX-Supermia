"use client";

import { type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * The gap the product exists to close, drawn.
 *
 * The about page was arguing "campaigns are hard to assemble" in three
 * text cards, which is the one claim on the page that a picture makes
 * better than a sentence: the left column is the work a person does
 * once, the right is the same message rewritten for every surface, and
 * the distance between them is the product.
 *
 * Same conventions as the other artwork here — one viewBox, theme
 * tokens for colour, ambient classes from animations.css so the motion
 * stays off the main thread.
 */

const LINE = "var(--border-strong)";
const SOFT = "var(--border)";

/** The five surfaces the same message has to be rewritten for. */
const SURFACES = [
  "Instagram",
  "LinkedIn",
  "Facebook",
  "Email",
  "SMS",
] as const;

export function OriginArt({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(75%_75%_at_50%_45%,#000,transparent_80%)]"
      />

      <svg
        viewBox="0 0 320 180"
        role="presentation"
        aria-hidden="true"
        className="relative h-auto w-full"
      >
        {/* The idea: written once. */}
        <rect
          x={8}
          y={66}
          width={86}
          height={48}
          rx={6}
          fill="var(--surface)"
          stroke={LINE}
        />
        <rect x={18} y={78} width={52} height={4} rx={2} fill={LINE} />
        <rect
          x={18}
          y={88}
          width={66}
          height={4}
          rx={2}
          fill={SOFT}
          className="cx-act-write"
          style={{ "--d": "0.2s" } as CSSProperties}
        />
        <rect
          x={18}
          y={98}
          width={38}
          height={4}
          rx={2}
          fill={SOFT}
          className="cx-act-write"
          style={{ "--d": "0.5s" } as CSSProperties}
        />

        {/* The five surfaces it has to become. */}
        {SURFACES.map((label, i) => {
          const y = 14 + i * 32;
          return (
            <g key={label}>
              <path
                d={`M94 90 C 150 90, 150 ${y + 11}, 206 ${y + 11}`}
                fill="none"
                stroke={SOFT}
              />
              <circle
                cx={206}
                cy={y + 11}
                r={3}
                fill="rgb(var(--brand-blue-rgb))"
                className="cx-art-pulse"
                style={{ "--d": `${i * 0.35}s` } as CSSProperties}
              />
              <rect
                x={214}
                y={y}
                width={98}
                height={22}
                rx={5}
                fill="var(--surface)"
                stroke={SOFT}
              />
              <text
                x={224}
                y={y + 14}
                fill="var(--muted)"
                style={{
                  font: "500 9px var(--font-sans, system-ui)",
                  letterSpacing: "0.02em",
                }}
              >
                {label}
              </text>
              <rect
                x={282}
                y={y + 8}
                width={22}
                height={5}
                rx={2.5}
                fill={SOFT}
                className="cx-art-glint"
                style={{ "--d": `${i * 0.4}s` } as CSSProperties}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
