"use client";

import { useEffect, useRef, useState } from "react";
import {
  CX_EASE,
  T,
  gsap,
  prefersReducedMotion,
  registerStudio,
} from "@/lib/animations/studio";
import { cn } from "@/lib/utils";

/**
 * The same campaign, written three ways inside one character budget.
 *
 * Social argues difference across surfaces; email argues layers built
 * together. SMS argues something narrower and sharper: the limit is a
 * *voice* problem, not a length problem. All three versions below fit
 * — the bad ones are not too long, they are too anonymous.
 *
 * So the meter is the point. Each draft is typed out against a live
 * character count, and the counter is never the thing that fails: what
 * changes between drafts is register. A reader who only looks at the
 * numbers sees three passes; a reader who reads them sees why two of
 * them are wrong.
 *
 * The phone frame is deliberate. SMS is the one channel that arrives
 * on a lock screen, which is also the argument for the approval gate
 * this page makes further down.
 */

interface Draft {
  tag: string;
  verdict: string;
  /** Why this version fails, or why it works. */
  note: string;
  body: string;
  tone: "weak" | "weak-2" | "good";
}

const DRAFTS: readonly Draft[] = [
  {
    tag: "Generic model",
    verdict: "Reads like a system alert",
    note: "Fits the limit and sounds like every automated message the reader already ignores.",
    body: "NOTICE: Spring promotional offer now active for existing account holders. Valid 14 days. Terms apply.",
    tone: "weak",
  },
  {
    tag: "Over-corrected",
    verdict: "Could be from anyone",
    note: "Casual enough to be human, generic enough to belong to any brand with a discount.",
    body: "Hey! 🌸 Big spring news just for you!! Don't miss out — 2 weeks only!! Tap here 👉",
    tone: "weak-2",
  },
  {
    tag: "Your brand model",
    verdict: "Yours, and inside the limit",
    note: "Same budget, same offer. The register comes from copy you have already approved.",
    body: "Spring offer, two weeks, just for you. Reply STOP to opt out.",
    tone: "good",
  },
];

/** The single-segment GSM budget most teams write against. */
const LIMIT = 160;

export function MessageMeter() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);
  const [held, setHeld] = useState(false);

  const draft = DRAFTS[active];

  /* Type the active draft out. The count has to climb with the text
     for the meter to mean anything.

     The reveal is tracked as a character count rather than by writing
     the string into state on every tick: setting state straight from
     an effect body is a render-phase update, and the one-line version
     of this tripped `react-hooks/set-state-in-effect`. */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 2;
      setShown(Math.min(i, draft.body.length));
      if (i >= draft.body.length) window.clearInterval(id);
    }, 24);
    /* Reset on cleanup rather than on entry, so the only state write
       outside the interval happens as the previous draft tears down. */
    return () => {
      window.clearInterval(id);
      setShown(0);
    };
  }, [draft]);

  /* Cycle until the reader picks one. */
  useEffect(() => {
    if (held || prefersReducedMotion()) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % DRAFTS.length),
      5200,
    );
    return () => window.clearInterval(id);
  }, [held]);

  useEffect(() => {
    registerStudio();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const panes = root.querySelectorAll<HTMLElement>("[data-pane]");
      if (prefersReducedMotion()) {
        gsap.set(panes, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        panes,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: T.md,
          stagger: 0.1,
          ease: CX_EASE.out,
          scrollTrigger: { trigger: root, start: "top 80%", once: true },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  /* Reduced motion gets the finished message with no typing pass,
     which is a render-time decision rather than stored state. */
  const typed = prefersReducedMotion()
    ? draft.body
    : draft.body.slice(0, shown);
  const used = typed.length;
  const pct = Math.min((used / LIMIT) * 100, 100);
  const good = draft.tone === "good";

  return (
    <div
      ref={rootRef}
      className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-10"
    >
      {/* The drafts, as the control. */}
      <ol data-pane className="space-y-1.5">
        {DRAFTS.map((d, i) => {
          const on = i === active;
          return (
            <li key={d.tag}>
              <button
                type="button"
                onClick={() => {
                  setActive(i);
                  setHeld(true);
                }}
                aria-current={on ? "true" : undefined}
                className={cn(
                  "flex w-full gap-3 rounded-panel border p-3.5 text-left transition-[border-color,background-color] duration-300",
                  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  on
                    ? d.tone === "good"
                      ? "border-accent-line bg-accent-soft"
                      : "border-line-strong bg-surface-soft"
                    : "border-line bg-surface hover:border-line-strong",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                    on && d.tone === "good"
                      ? "border-accent bg-accent"
                      : on
                        ? "border-line-strong bg-surface"
                        : "border-line-strong",
                  )}
                >
                  {on && d.tone === "good" ? (
                    <svg viewBox="0 0 24 24" className="size-2.5" fill="none">
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="#fff"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}
                </span>

                <span className="min-w-0">
                  <span className="flex flex-wrap items-baseline gap-x-2">
                    <span
                      className={cn(
                        "text-[0.875rem] font-medium leading-snug transition-colors duration-300",
                        on && d.tone === "good"
                          ? "text-accent"
                          : "text-foreground",
                      )}
                    >
                      {d.tag}
                    </span>
                    <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
                      {d.body.length} chars
                    </span>
                  </span>
                  <span className="mt-1 block text-[0.875rem] leading-relaxed text-muted-strong">
                    {d.note}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* The phone, and the meter. */}
      <div data-pane>
        <div className="mx-auto max-w-[19rem] overflow-hidden rounded-[1.5rem] border border-line bg-surface p-2.5 shadow-float">
          <div className="rounded-[1.1rem] bg-surface-soft p-3.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                Your brand
              </span>
              <span className="font-mono text-[0.6875rem] text-muted">
                now
              </span>
            </div>

            {/* The message bubble. */}
            <div
              className={cn(
                "mt-2.5 min-h-[5.5rem] rounded-[0.9rem] rounded-tl-[0.3rem] border p-3 transition-colors duration-500",
                good
                  ? "border-accent-line bg-surface"
                  : "border-line bg-surface",
              )}
            >
              <p className="text-[0.875rem] leading-[1.55] text-foreground">
                {typed}
                <span
                  aria-hidden="true"
                  className={cn(
                    "ml-px inline-block h-3.5 w-px translate-y-0.5 bg-accent",
                    used < draft.body.length
                      ? "animate-pulse"
                      : "opacity-0",
                  )}
                />
              </p>
            </div>

            {/* The meter. Never the thing that fails. */}
            <div className="mt-3">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
                  One segment
                </span>
                <span className="font-mono text-[0.6875rem] tabular-nums text-muted">
                  {String(used).padStart(3, "0")}/{LIMIT}
                </span>
              </div>
              <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-surface-sunk">
                <span
                  className={cn(
                    "block h-full rounded-full transition-[width,background-color] duration-150",
                    good ? "bg-brand" : "bg-line-strong",
                  )}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* The verdict, under the phone. */}
        <p
          className={cn(
            "mt-3 text-center text-[0.875rem] font-medium transition-colors duration-300",
            good ? "text-accent" : "text-muted",
          )}
        >
          {draft.verdict}
        </p>
        <p className="mt-1 text-center text-[0.875rem] text-muted">
          All three fit. Only one sounds like you.
        </p>
      </div>
    </div>
  );
}
