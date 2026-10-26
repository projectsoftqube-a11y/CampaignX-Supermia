"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Custom per-channel artwork.
 *
 * Each channel gets its own drawing of what the output actually looks
 * like on that surface — a phone feed for Instagram, an inbox row for
 * email, a bubble for SMS — rather than a logo on a card. They are
 * drawn here as SVG instead of shipped as images for three reasons:
 * they stay crisp at any size, they inherit the page's own tokens so
 * light and dark grounds both work, and nothing is downloaded.
 *
 * All of it is decorative: every use sits beside a real text label, so
 * the root carries `aria-hidden`.
 *
 * Gradients need document-unique ids — the same art can appear more than
 * once on a page, and duplicate ids make every later copy reference the
 * first one's def. `useId` gives a stable value that matches between the
 * server and client renders; its colons are stripped because they break
 * `url(#…)` references in some browsers.
 */

export type ChannelArtName =
  | "instagram"
  | "facebook"
  | "linkedin"
  | "x"
  | "google"
  | "email"
  | "sms"
  | "webhook";

interface ChannelArtProps {
  name: ChannelArtName;
  className?: string;
}

export function ChannelArt({ name, className }: ChannelArtProps) {
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

type Draw = (g: (s: string) => string) => React.ReactNode;

/* Shared primitives, so every drawing shares one visual language:
   hairline strokes on the page border colour, brand gradient only where
   the eye should land, and 4px corner radii throughout. */
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
  /** Ambient animation class, from animations.css. */
  anim?: string;
  /** Seconds of offset, so a stack of bars writes in sequence. */
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
          ? ({
              "--d": `${delay}s`,
              transformBox: "fill-box",
            } as React.CSSProperties)
          : undefined
      }
    />
  );
}

const ART: Record<ChannelArtName, Draw> = {
  /* A post being composed: the image is already there, a caption line
     writes itself in, then a like lands and the count ticks. */
  instagram: (g) => (
    <>
      <rect
        x="74"
        y="10"
        width="72"
        height="120"
        rx="12"
        fill="var(--surface)"
        stroke={LINE}
      />
      <circle cx="90" cy="18" r="3" fill={SOFT} />
      <Bar x={98} y={16} w={22} />

      {/* The image, with a highlight crossing it. */}
      <g className="cx-art-glintwrap">
        <rect
          x="82"
          y="26"
          width="56"
          height="56"
          rx="6"
          fill={`url(#${g("brand")})`}
        />
        <rect
          x="82"
          y="26"
          width="14"
          height="56"
          fill="rgba(255,255,255,0.28)"
          className="cx-art-glint"
          style={{ transformBox: "fill-box" } as React.CSSProperties}
        />
      </g>

      {/* Caption: first line is always there, second writes in. */}
      <Bar x={82} y={90} w={52} />
      <Bar x={82} y={98} w={38} anim="cx-act-write" delay={0.2} />

      {/* A like landing, and the count nudging. */}
      <path
        d="M85 113c0-2 1.6-3.4 3.4-3.4 1 0 2 .5 2.6 1.3.6-.8 1.6-1.3 2.6-1.3 1.8 0 3.4 1.4 3.4 3.4 0 3.2-6 6.6-6 6.6s-6-3.4-6-6.6z"
        fill={`url(#${g("brand")})`}
        className="cx-act-react"
      />
      <Bar x={102} y={113} w={14} h={4} anim="cx-act-count" />
      <circle cx="110" cy="134" r="2" fill={SOFT} />
    </>
  ),

  /* A feed post with reactions arriving one at a time. */
  facebook: (g) => (
    <>
      <rect
        x="30"
        y="22"
        width="160"
        height="96"
        rx="10"
        fill="var(--surface)"
        stroke={LINE}
      />
      <circle cx="46" cy="38" r="7" fill={`url(#${g("fade")})`} stroke={SOFT} />
      <Bar x={58} y={34} w={46} />
      <Bar x={58} y={42} w={28} />

      <g className="cx-art-glintwrap">
        <rect
          x="42"
          y="54"
          width="136"
          height="38"
          rx="6"
          fill={`url(#${g("brand")})`}
          opacity="0.9"
        />
        <rect
          x="42"
          y="54"
          width="22"
          height="38"
          fill="rgba(255,255,255,0.22)"
          className="cx-art-glint"
          style={{ transformBox: "fill-box" } as React.CSSProperties}
        />
      </g>

      {/* The reaction row is always present; a third one lands. */}
      <circle cx="48" cy="103" r="5" fill={`url(#${g("brand")})`} />
      <circle cx="58" cy="103" r="5" fill={SOFT} />
      <circle
        cx="68"
        cy="103"
        r="5"
        fill={`url(#${g("brand")})`}
        className="cx-act-react"
      />
      <Bar x={80} y={101} w={22} anim="cx-act-count" />
    </>
  ),

  /* A long-form post with a new paragraph being written. */
  linkedin: (g) => (
    <>
      <rect
        x="40"
        y="14"
        width="140"
        height="112"
        rx="10"
        fill="var(--surface)"
        stroke={LINE}
      />
      <rect x="52" y="26" width="10" height="10" rx="2" fill={`url(#${g("brand")})`} />
      <Bar x={68} y={27} w={44} />
      <Bar x={68} y={35} w={30} />

      {/* Three settled lines, then one still being written. */}
      <Bar x={52} y={52} w={116} />
      <Bar x={52} y={62} w={110} />
      <Bar x={52} y={72} w={118} />
      <Bar x={52} y={82} w={74} anim="cx-act-write" delay={0.3} />
      <rect
        x="128"
        y="81"
        width="1.5"
        height="6"
        rx="0.75"
        fill={`url(#${g("brand")})`}
        className="cx-art-caret"
      />

      <rect
        x="52"
        y="98"
        width="42"
        height="14"
        rx="7"
        fill={`url(#${g("fade")})`}
        stroke={SOFT}
      />
    </>
  ),

  /* A short post, with the character budget filling as it is written. */
  x: (g) => (
    <>
      <rect
        x="34"
        y="34"
        width="152"
        height="72"
        rx="10"
        fill="var(--surface)"
        stroke={LINE}
      />
      <circle cx="50" cy="50" r="6" fill={`url(#${g("fade")})`} stroke={SOFT} />
      <Bar x={62} y={47} w={38} />

      <Bar x={50} y={64} w={120} />
      <Bar x={50} y={74} w={86} anim="cx-act-write" delay={0.25} />

      {/* The budget bar tracks the line being written. */}
      <rect x="50" y="88" width="56" height="6" rx="3" fill={SOFT} />
      <rect
        x="50"
        y="88"
        width="56"
        height="6"
        rx="3"
        fill={`url(#${g("brand")})`}
        className="cx-act-schedule"
        style={{ "--d": "0.25s" } as React.CSSProperties}
      />
      <circle cx="166" cy="91" r="4" fill={`url(#${g("brand")})`} className="cx-art-pulse" />
    </>
  ),

  /* A listing update going live: the pin sits, the status flips. */
  google: (g) => (
    <>
      <rect
        x="34"
        y="40"
        width="152"
        height="72"
        rx="10"
        fill="var(--surface)"
        stroke={LINE}
      />
      <g className="cx-art-settle" style={{ transformBox: "fill-box" } as React.CSSProperties}>
        <path
          d="M110 14c-9 0-16 7-16 16 0 11 16 26 16 26s16-15 16-26c0-9-7-16-16-16z"
          fill={`url(#${g("brand")})`}
        />
        <circle cx="110" cy="30" r="5.5" fill="var(--surface)" />
      </g>

      <Bar x={48} y={58} w={60} />
      <Bar x={48} y={68} w={104} />
      <Bar x={48} y={78} w={88} anim="cx-act-write" delay={0.4} />

      {/* Status flips from scheduled to live. */}
      <g className="cx-act-status-out">
        <rect x="48" y="92" width="34" height="8" rx="4" fill={SOFT} />
      </g>
      <g className="cx-act-status">
        <rect x="48" y="92" width="34" height="8" rx="4" fill={`url(#${g("brand")})`} />
      </g>
    </>
  ),

  /* An email being assembled: subject, body, then the send button. */
  email: (g) => (
    <>
      <rect
        x="26"
        y="20"
        width="168"
        height="100"
        rx="10"
        fill="var(--surface)"
        stroke={LINE}
      />
      <rect x="26" y="20" width="168" height="26" rx="10" fill={`url(#${g("fade")})`} />
      <Bar x={40} y={29} w={74} h={5} fill={LINE} />
      <Bar x={40} y={38} w={48} />

      <g className="cx-art-glintwrap">
        <rect
          x="40"
          y="58"
          width="140"
          height="26"
          rx="5"
          fill={`url(#${g("brand")})`}
          opacity="0.9"
        />
        <rect
          x="40"
          y="58"
          width="20"
          height="26"
          fill="rgba(255,255,255,0.24)"
          className="cx-art-glint"
          style={{ transformBox: "fill-box" } as React.CSSProperties}
        />
      </g>

      <Bar x={40} y={92} w={120} />
      <Bar x={40} y={101} w={92} anim="cx-act-write" delay={0.35} />

      <rect
        x="146"
        y="96"
        width="34"
        height="12"
        rx="6"
        fill={`url(#${g("brand")})`}
        className="cx-art-settle"
        style={{ "--d": "0.6s", transformBox: "fill-box" } as React.CSSProperties}
      />
    </>
  ),

  /* A thread: one message settled, a reply being sent. */
  sms: (g) => (
    <>
      <rect
        x="70"
        y="8"
        width="80"
        height="124"
        rx="14"
        fill="var(--surface)"
        stroke={LINE}
      />
      <rect x="96" y="14" width="28" height="4" rx="2" fill={SOFT} />

      {/* The settled outgoing message. */}
      <path
        d="M82 36a7 7 0 0 1 7-7h41a7 7 0 0 1 7 7v16a7 7 0 0 1-7 7H97l-9 8v-8h-6a7 7 0 0 1-7-7z"
        fill={`url(#${g("brand")})`}
      />
      <Bar x={89} y={39} w={38} h={3.5} fill="rgba(255,255,255,0.85)" />
      <Bar x={89} y={46} w={26} h={3.5} fill="rgba(255,255,255,0.6)" />

      {/* The reply arriving. */}
      <g className="cx-act-send" style={{ "--d": "0.4s" } as React.CSSProperties}>
        <rect x="82" y="72" width="58" height="22" rx="7" fill={SOFT} />
        <Bar x={89} y={78} w={32} h={3.5} fill="var(--surface)" />
        <Bar x={89} y={85} w={20} h={3.5} fill="var(--surface)" />
      </g>

      {/* The compose row, with a live caret. */}
      <rect x="82" y="106" width="56" height="12" rx="6" fill="var(--surface)" stroke={SOFT} />
      <rect
        x="88"
        y="109"
        width="1.5"
        height="6"
        rx="0.75"
        fill={`url(#${g("brand")})`}
        className="cx-art-caret"
      />
    </>
  ),

  /* Two systems with a packet running between them. */
  webhook: (g) => (
    <>
      <rect x="26" y="48" width="58" height="44" rx="9" fill="var(--surface)" stroke={LINE} />
      <rect x="136" y="48" width="58" height="44" rx="9" fill="var(--surface)" stroke={LINE} />
      <Bar x={38} y={62} w={34} />
      <Bar x={38} y={72} w={22} />
      <Bar x={148} y={62} w={34} />
      <Bar x={148} y={72} w={22} anim="cx-act-write" delay={0.9} />

      <path
        d="M84 70h52"
        stroke={`url(#${g("brand")})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="5 5"
      />
      {/* The packet, travelling the wire on a loop. */}
      <circle
        r="3.2"
        fill={`url(#${g("brand")})`}
        className="cx-art-travel"
        style={{ offsetPath: "path('M84 70h52')" } as React.CSSProperties}
      />
      <circle cx="110" cy="70" r="7" fill={`url(#${g("brand")})`} />
      <circle cx="110" cy="70" r="2.5" fill="var(--surface)" className="cx-art-pulse" />
    </>
  ),
};
