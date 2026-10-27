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
 * Three weeks against one morning.
 *
 * This page's argument is not about features, it is about elapsed
 * time: a promotion that sat on a list since the start of the month
 * against a campaign written before the shop opens. Both halves are
 * in the copy already, but prose cannot show a duration — the reader
 * has to hold "three weeks" and "ten minutes" in their head and do
 * the comparison themselves.
 *
 * So the two are drawn on the same axis. The old way is a long bar of
 * mostly waiting, broken into stages that are each someone else's
 * queue; the new way is four marks inside a single morning. The point
 * lands because the bars are the same width and one of them is nearly
 * empty.
 *
 * The scale is honest about being illustrative: "three weeks" is the
 * page's own description of the old way, not a measured benchmark,
 * and the panel says so.
 */

interface Span {
  label: string;
  detail: string;
  /** Share of the bar, as a percentage. */
  width: number;
  waiting?: boolean;
}

const BEFORE: readonly Span[] = [
  { label: "On the list", detail: "Behind whatever is on fire", width: 34, waiting: true },
  { label: "Writing", detail: "Retyped for each channel", width: 16 },
  { label: "Waiting on visuals", detail: "Or going out as plain text", width: 28, waiting: true },
  { label: "Scheduling", detail: "One platform at a time", width: 14 },
  { label: "Live", detail: "", width: 8 },
];

const AFTER: readonly { time: string; title: string; detail: string }[] = [
  {
    time: "09:00",
    title: "Write the brief",
    detail: "One sentence: a spring offer, two weeks, for existing customers.",
  },
  {
    time: "09:10",
    title: "Read the campaign",
    detail: "Posts, an email and an SMS, each with artwork, all in your voice.",
  },
  {
    time: "09:25",
    title: "Fix the two things that are wrong",
    detail: "Edit the SMS, regenerate one visual, leave the rest.",
  },
  {
    time: "09:30",
    title: "Approve — it schedules itself",
    detail: "The campaign publishes across the fortnight.",
  },
];

export function DayTimeline() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mark, setMark] = useState(-1);

  useEffect(() => {
    registerStudio();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const panes = root.querySelectorAll<HTMLElement>("[data-pane]");
      const bars = root.querySelectorAll<HTMLElement>("[data-span]");

      if (prefersReducedMotion()) {
        gsap.set([...panes, ...bars], { opacity: 1, y: 0, scaleX: 1 });
        return;
      }

      gsap
        .timeline({
          scrollTrigger: { trigger: root, start: "top 78%", once: true },
        })
        .fromTo(
          panes,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: T.md, stagger: 0.12, ease: CX_EASE.out },
        )
        .fromTo(
          bars,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.5, stagger: 0.07, ease: CX_EASE.out },
          "-=0.3",
        );
    }, root);

    return () => ctx.revert();
  }, []);

  /* Walk the morning so the right-hand column has the same sense of
     elapsed time the left one gets from its bar. */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(
      () => setMark((m) => (m + 1) % (AFTER.length + 2)),
      1400,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <div ref={rootRef} className="grid gap-5 lg:grid-cols-2 lg:gap-8">
      {/* The old way. */}
      <div
        data-pane
        className="flex flex-col rounded-frame border border-line bg-surface p-5 sm:p-6"
      >
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
            Doing it yourself
          </p>
          <p className="text-display text-[1.25rem] font-medium leading-none text-muted">
            ~3 weeks
          </p>
        </div>

        {/* One bar, mostly waiting. */}
        <div className="mt-5 flex h-2.5 gap-px overflow-hidden rounded-full">
          {BEFORE.map((s) => (
            <span
              key={s.label}
              data-span
              style={{ width: `${s.width}%` }}
              className={cn(
                "h-full",
                s.waiting
                  ? "bg-[repeating-linear-gradient(45deg,var(--border-strong)_0_4px,transparent_4px_8px)]"
                  : "bg-line-strong",
              )}
            />
          ))}
        </div>

        <ul className="mt-5 flex-1 space-y-2.5">
          {BEFORE.filter((s) => s.detail).map((s) => (
            <li key={s.label} className="flex items-baseline gap-3">
              <span
                aria-hidden="true"
                className={cn(
                  "mt-1.5 size-1.5 shrink-0 rounded-full",
                  s.waiting ? "bg-line-strong" : "bg-muted",
                )}
              />
              <span className="min-w-0">
                <span className="text-[0.875rem] font-medium leading-snug text-foreground">
                  {s.label}
                </span>
                <span className="ml-2 text-[0.875rem] leading-snug text-muted">
                  {s.detail}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-5 border-t border-line pt-4 text-[0.875rem] leading-relaxed text-muted">
          Most of it is not work. It is waiting for a slot, a visual, or
          a free evening.
        </p>
      </div>

      {/* The new way. */}
      <div
        data-pane
        className="relative flex flex-col overflow-hidden rounded-frame border border-accent-line bg-surface p-5 shadow-float sm:p-6"
      >
        <span
          aria-hidden="true"
          className="bg-brand absolute inset-x-0 top-0 h-[2px]"
        />

        <div className="flex items-baseline justify-between gap-4">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-accent">
            With CampaignX
          </p>
          <p className="text-display text-[1.25rem] font-medium leading-none text-foreground">
            One morning
          </p>
        </div>

        {/* The same axis, almost entirely empty. */}
        <div className="mt-5 flex h-2.5 overflow-hidden rounded-full bg-surface-sunk">
          <span
            data-span
            className="bg-brand h-full rounded-full"
            style={{ width: "7%" }}
          />
        </div>

        <ol className="mt-5 flex-1 space-y-3">
          {AFTER.map((row, i) => {
            const on = mark >= i;
            return (
              <li key={row.time} className="flex gap-3.5">
                <span
                  className={cn(
                    "mt-0.5 shrink-0 font-mono text-[0.6875rem] tabular-nums transition-colors duration-300",
                    on ? "text-accent" : "text-muted/50",
                  )}
                >
                  {row.time}
                </span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      "block text-[0.875rem] font-medium leading-snug transition-colors duration-300",
                      on ? "text-foreground" : "text-muted/60",
                    )}
                  >
                    {row.title}
                  </span>
                  <span className="mt-0.5 block text-[0.875rem] leading-snug text-muted">
                    {row.detail}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>

        <p className="mt-5 border-t border-line pt-4 text-[0.875rem] leading-relaxed text-muted-strong">
          The waiting is what goes. The deciding is still yours.
        </p>
      </div>

      <p className="text-[0.875rem] leading-relaxed text-muted lg:col-span-2">
        An illustration of the two routes, not a measured benchmark. Ten
        minutes to a first campaign is the figure CampaignX quotes; the
        three weeks is how long a promotion tends to sit when nobody has
        time to start it.
      </p>
    </div>
  );
}
