"use client";

import { useId, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Small cover art for a post card, one drawing per post.
 *
 * `TopicArt` draws a category at 220x140, which is right for a feature
 * panel and far too much for a card header. These are 200x72 — a band
 * across the top of the card — and each one draws what its own post is
 * about rather than the category it sits in, so six cards in a grid do
 * not show the same three pictures twice.
 *
 * Same conventions as the other artwork here: theme tokens for every
 * colour, the ambient classes from animations.css doing the motion off
 * the main thread, and `useId` namespacing so several on one page do
 * not collide on gradient ids.
 */

export type PostArtName =
  "brief" | "voice" | "channels" | "calendar" | "message" | "compare";

const LINE = "var(--border-strong)";
const SOFT = "var(--border)";
const INK = "var(--ink)";

/** Shared frame. One viewBox so every drawing lines up card to card. */
function Frame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 72"
      role="presentation"
      aria-hidden="true"
      className={cn("h-[4.5rem] w-full", className)}
    >
      {children}
    </svg>
  );
}

function Bar({
  x,
  y,
  w,
  h = 3,
  fill = SOFT,
  anim,
  delay = 0,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  fill?: string;
  anim?: string;
  delay?: number;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={1.5}
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

/** A brief being filled in: questions answered one after another. */
function BriefArt() {
  return (
    <Frame>
      <rect
        x={54}
        y={8}
        width={92}
        height={56}
        rx={4}
        fill="var(--surface)"
        stroke={SOFT}
      />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx={64} cy={20 + i * 12} r={2.5} fill={LINE} />
          <Bar
            x={72}
            y={18.5 + i * 12}
            w={i === 3 ? 34 : 60}
            anim="cx-act-write"
            delay={i * 0.45}
          />
        </g>
      ))}
    </Frame>
  );
}

/** Brand voice: one line, three surfaces, same register. */
function VoiceArt() {
  const id = useId();
  return (
    <Frame>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgb(var(--brand-blue-rgb))" />
          <stop offset="100%" stopColor="rgb(var(--brand-magenta-rgb))" />
        </linearGradient>
      </defs>

      <rect
        x={16}
        y={30}
        width={38}
        height={12}
        rx={6}
        fill={`url(#${id}-g)`}
      />

      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path
            d={`M58 36 C 72 36, 72 ${18 + i * 18}, 86 ${18 + i * 18}`}
            fill="none"
            stroke={SOFT}
          />
          <rect
            x={88}
            y={12 + i * 18}
            width={96}
            height={12}
            rx={3}
            fill="var(--surface)"
            stroke={SOFT}
          />
          <Bar
            x={94}
            y={16.5 + i * 18}
            w={50 + i * 14}
            anim="cx-art-glint"
            delay={i * 0.5}
          />
        </g>
      ))}
    </Frame>
  );
}

/** One brief becoming several channels. */
function ChannelsArt() {
  return (
    <Frame>
      <rect
        x={10}
        y={26}
        width={36}
        height={20}
        rx={4}
        fill="var(--surface)"
        stroke={LINE}
      />
      <Bar x={16} y={32} w={24} fill={LINE} />
      <Bar x={16} y={38} w={16} />

      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <path
            d={`M46 36 C 68 36, 68 ${12 + i * 16}, 90 ${12 + i * 16}`}
            fill="none"
            stroke={SOFT}
          />
          <circle
            cx={90}
            cy={12 + i * 16}
            r={3}
            fill="rgb(var(--brand-blue-rgb))"
            className="cx-art-pulse"
            style={{ "--d": `${i * 0.4}s` } as CSSProperties}
          />
          <rect
            x={98}
            y={6 + i * 16}
            width={88}
            height={12}
            rx={3}
            fill="var(--surface)"
            stroke={SOFT}
          />
          <Bar x={104} y={10.5 + i * 16} w={40 + i * 10} />
        </g>
      ))}
    </Frame>
  );
}

/** A month of posts, filling week by week. */
function CalendarArt() {
  const cols = 10;
  const rows = 3;
  return (
    <Frame>
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const filled = (r * cols + c) % 3 === 0;
          return (
            <rect
              key={`${r}-${c}`}
              x={14 + c * 18}
              y={12 + r * 18}
              width={13}
              height={13}
              rx={2.5}
              fill={filled ? "rgb(var(--brand-blue-rgb))" : "var(--surface)"}
              stroke={filled ? "transparent" : SOFT}
              className={filled ? "cx-art-pulse" : undefined}
              style={
                filled
                  ? ({ "--d": `${(r * cols + c) * 0.08}s` } as CSSProperties)
                  : undefined
              }
            />
          );
        }),
      )}
    </Frame>
  );
}

/** A short message arriving on a phone. */
function MessageArt() {
  return (
    <Frame>
      <rect
        x={66}
        y={6}
        width={68}
        height={60}
        rx={8}
        fill="var(--surface)"
        stroke={LINE}
      />
      <rect x={88} y={10} width={24} height={3} rx={1.5} fill={SOFT} />

      <rect
        x={74}
        y={22}
        width={52}
        height={16}
        rx={5}
        fill={INK}
        className="cx-act-send"
      />
      <Bar x={80} y={27} w={30} fill="rgba(255,255,255,0.75)" />
      <Bar x={80} y={32} w={20} fill="rgba(255,255,255,0.4)" />

      <rect
        x={74}
        y={44}
        width={38}
        height={12}
        rx={5}
        fill="var(--surface-soft)"
        stroke={SOFT}
        className="cx-act-react"
        style={{ "--d": "0.8s" } as CSSProperties}
      />
      <Bar x={80} y={48.5} w={22} />
    </Frame>
  );
}

/** Five categories, weighed against each other. */
function CompareArt() {
  const heights = [18, 34, 26, 44, 30];
  return (
    <Frame>
      <line x1={14} y1={60} x2={186} y2={60} stroke={SOFT} />
      {heights.map((h, i) => (
        <g key={i}>
          <rect
            x={22 + i * 34}
            y={60 - h}
            width={20}
            height={h}
            rx={3}
            fill={i === 3 ? "rgb(var(--brand-blue-rgb))" : "var(--surface)"}
            stroke={i === 3 ? "transparent" : LINE}
            className="cx-art-settle"
            style={
              {
                "--d": `${i * 0.25}s`,
                transformBox: "fill-box",
                transformOrigin: "bottom",
              } as CSSProperties
            }
          />
          <circle cx={32 + i * 34} cy={66} r={1.5} fill={SOFT} />
        </g>
      ))}
    </Frame>
  );
}

const ART: Record<PostArtName, () => React.ReactElement> = {
  brief: BriefArt,
  voice: VoiceArt,
  channels: ChannelsArt,
  calendar: CalendarArt,
  message: MessageArt,
  compare: CompareArt,
};

export function PostCardArt({
  name,
  className,
}: {
  name: PostArtName;
  className?: string;
}) {
  const Art = ART[name];
  return (
    <div className={cn("relative", className)}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(75%_75%_at_50%_45%,#000,transparent_80%)]"
      />
      <div className="relative">
        <Art />
      </div>
    </div>
  );
}
