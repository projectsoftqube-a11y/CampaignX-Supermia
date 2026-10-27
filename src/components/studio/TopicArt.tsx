"use client";

import { useId, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Cover art for the blog, one drawing per category.
 *
 * The posts are not written yet, so there are no hero images and no
 * stock photography to fall back on — and a grid of grey placeholder
 * rectangles would say nothing about what is coming. These draw the
 * subject instead: a brief being written, a week of scheduled posts,
 * a message arriving.
 *
 * Built on the same conventions as `ChannelArt`: one 220x140 viewBox,
 * surfaces and borders from the theme tokens, and the ambient classes
 * from animations.css doing the motion so nothing runs on the main
 * thread. Every id is namespaced with `useId`, because several of
 * these render on one page and duplicate gradient ids would make the
 * later ones reference the first one's definition.
 */

export type TopicArtName = "campaign-strategy" | "social-media" | "email-sms";

const LINE = "var(--border-strong)";
const SOFT = "var(--border)";

function Bar({
  x,
  y,
  w,
  h = 4,
  fill = SOFT,
  rx = 2,
  anim,
  delay = 0,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  fill?: string;
  rx?: number;
  anim?: string;
  delay?: number;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={rx}
      fill={fill}
      className={anim}
      style={
        anim
          ? ({ "--d": `${delay}s`, transformBox: "fill-box" } as CSSProperties)
          : undefined
      }
    />
  );
}

type Draw = (g: (s: string) => string) => ReactNode;

const ART: Record<TopicArtName, Draw> = {
  /* A brief being written, then fanning into three channel stubs:
     the subject of the strategy posts is the input, not the output. */
  "campaign-strategy": (g) => (
    <>
      <rect
        x="26"
        y="16"
        width="168"
        height="54"
        rx="10"
        fill="var(--surface)"
        stroke={LINE}
      />
      <Bar x={38} y={28} w={30} h={3} fill={`url(#${g("brand")})`} />

      {/* The brief types itself in. */}
      <Bar x={38} y={40} w={132} anim="cx-act-write" delay={0} />
      <Bar x={38} y={50} w={96} anim="cx-act-write" delay={0.5} />
      <rect
        x={138}
        y={49}
        width="1.5"
        height="7"
        rx="0.75"
        fill="rgb(var(--brand-blue-rgb))"
        className="cx-art-caret"
      />

      {/* It splits. */}
      {[62, 110, 158].map((x, i) => (
        <path
          key={x}
          d={`M 110 70 C 110 84, ${x} 82, ${x} 96`}
          stroke={`url(#${g("brand")})`}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
          className="cx-art-travel"
          style={{ "--d": `${i * 0.25}s` } as CSSProperties}
        />
      ))}

      {[62, 110, 158].map((x, i) => (
        <g key={x}>
          <rect
            x={x - 26}
            y="96"
            width="52"
            height="30"
            rx="7"
            fill="var(--surface)"
            stroke={SOFT}
          />
          <Bar
            x={x - 16}
            y={106}
            w={32}
            anim="cx-act-status"
            delay={i * 0.3}
          />
          <Bar x={x - 16} y={114} w={20} />
        </g>
      ))}
    </>
  ),

  /* A week of scheduled posts, with the playhead moving across it. */
  "social-media": (g) => (
    <>
      <rect
        x="18"
        y="18"
        width="184"
        height="104"
        rx="10"
        fill="var(--surface)"
        stroke={LINE}
      />
      <Bar x={30} y={30} w={34} h={3} fill={`url(#${g("brand")})`} />

      {/* Day columns. */}
      {Array.from({ length: 7 }, (_, i) => 30 + i * 23).map((x) => (
        <line
          key={x}
          x1={x + 18}
          y1="42"
          x2={x + 18}
          y2="112"
          stroke={SOFT}
          strokeWidth="1"
        />
      ))}

      {/* Scheduled blocks, filling in turn. */}
      {[
        { x: 32, y: 50, w: 18 },
        { x: 78, y: 50, w: 18 },
        { x: 55, y: 66, w: 18 },
        { x: 124, y: 66, w: 18 },
        { x: 101, y: 82, w: 18 },
        { x: 147, y: 82, w: 18 },
        { x: 170, y: 50, w: 18 },
      ].map((b, i) => (
        <rect
          key={`${b.x}-${b.y}`}
          x={b.x}
          y={b.y}
          width={b.w}
          height="10"
          rx="3"
          fill={`url(#${g("fade")})`}
          stroke={`url(#${g("brand")})`}
          strokeWidth="1"
          className="cx-act-schedule"
          style={
            { "--d": `${i * 0.3}s`, transformBox: "fill-box" } as CSSProperties
          }
        />
      ))}

      {/* The playhead. */}
      <line
        x1="48"
        y1="42"
        x2="48"
        y2="112"
        stroke="rgb(var(--brand-blue-rgb))"
        strokeWidth="1.5"
        className="cx-art-travel"
      />
    </>
  ),

  /* A message arriving: the direct channels, where the thing lands on
     a device rather than in a feed. */
  "email-sms": (g) => (
    <>
      {/* The envelope behind. */}
      <rect
        x="24"
        y="30"
        width="104"
        height="70"
        rx="8"
        fill="var(--surface)"
        stroke={LINE}
      />
      <path
        d="M 24 38 L 76 70 L 128 38"
        stroke={SOFT}
        strokeWidth="1.5"
        fill="none"
      />
      <Bar x={36} y={78} w={44} anim="cx-act-write" delay={0.2} />
      <Bar x={36} y={86} w={28} />

      {/* The phone in front. */}
      <rect
        x="134"
        y="16"
        width="62"
        height="108"
        rx="12"
        fill="var(--surface)"
        stroke={LINE}
      />
      <rect x="156" y="22" width="18" height="3" rx="1.5" fill={SOFT} />

      {/* The message lands. */}
      <g className="cx-act-send">
        <rect
          x="142"
          y="36"
          width="46"
          height="26"
          rx="7"
          fill={`url(#${g("fade")})`}
          stroke={`url(#${g("brand")})`}
          strokeWidth="1"
        />
        <Bar x={149} y={44} w={30} />
        <Bar x={149} y={52} w={20} />
      </g>

      {/* A reply, a beat later. */}
      <g className="cx-act-send" style={{ "--d": "1.4s" } as CSSProperties}>
        <rect
          x="142"
          y="70"
          width="46"
          height="20"
          rx="7"
          fill="var(--surface-soft)"
          stroke={SOFT}
        />
        <Bar x={149} y={78} w={24} />
      </g>

      {/* The unread badge. */}
      <circle
        cx="190"
        cy="24"
        r="5"
        fill="rgb(var(--brand-blue-rgb))"
        className="cx-art-pulse"
      />
    </>
  ),
};

interface TopicArtProps {
  name: TopicArtName;
  className?: string;
}

export function TopicArt({ name, className }: TopicArtProps) {
  const uid = `cx-${useId().replace(/:/g, "")}`;
  const g = (suffix: string) => `${uid}-${suffix}`;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 140"
      className={cn("h-auto w-full", className)}
      fill="none"
    >
      <defs>
        <linearGradient id={g("brand")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgb(var(--brand-blue-rgb))" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id={g("fade")} x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            stopColor="rgb(var(--brand-blue-rgb))"
            stopOpacity="0.16"
          />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      {ART[name](g)}
    </svg>
  );
}
