"use client";

import { useEffect, useRef } from "react";
import {
  CX_EASE,
  T,
  gsap,
  prefersReducedMotion,
  registerStudio,
} from "@/lib/animations/studio";

/**
 * Four tools and the gaps between them, against one workspace.
 *
 * Each use-case page argues a different thing. Small business argues
 * about elapsed time; agencies about isolation between clients. A
 * marketing team's complaint is structural: the work is fine, but it
 * lives in four systems that do not talk, and every boundary between
 * them is a handoff where the campaign waits.
 *
 * An earlier version put the two states behind a toggle, which was
 * wrong twice over. The comparison *is* the argument, so hiding half
 * of it behind a click makes the reader do the work; and a single
 * column stretched across the band left every tool row as two words
 * against a long empty strip.
 *
 * Both states now sit side by side in bounded columns. The left is
 * broken into separate cards with the handoffs drawn and named in the
 * gaps between them; the right is one unbroken surface with the same
 * stages and no seams. The shape carries the point before the labels
 * are read.
 */

interface Stage {
  tool: string;
  stage: string;
  /** What happens crossing into the next tool. */
  gap?: string;
}

const SPLIT: readonly Stage[] = [
  { tool: "Docs", stage: "The brief", gap: "Retyped into the copy tool" },
  { tool: "Copy tool", stage: "Writing", gap: "Sent to design as a comment" },
  { tool: "Design file", stage: "Creative", gap: "Exported, then uploaded" },
  { tool: "Scheduler", stage: "Publishing" },
];

const JOINED: readonly { stage: string; detail: string }[] = [
  { stage: "The brief", detail: "One sentence, agreed in the room" },
  { stage: "Writing", detail: "Every channel, in the agreed voice" },
  { stage: "Creative", detail: "Generated with the copy beside it" },
  { stage: "Approval", detail: "A named person, inside the campaign" },
  { stage: "Publishing", detail: "One calendar, reporting against it" },
];

export function HandoffMap() {
  const rootRef = useRef<HTMLDivElement>(null);

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
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: T.md,
          stagger: 0.12,
          ease: CX_EASE.out,
          scrollTrigger: { trigger: root, start: "top 80%", once: true },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8"
    >
      {/* Four tools: separate cards, with the handoffs in the gaps. */}
      <div data-pane className="flex flex-col">
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
            Four tools
          </p>
          <p className="font-mono text-[0.875rem] uppercase tracking-[0.1em] text-muted">
            3 handoffs
          </p>
        </div>

        <ol className="mt-4 flex-1">
          {SPLIT.map((s) => (
            <li key={s.tool}>
              <div className="flex items-center gap-3 rounded-panel border border-line bg-surface px-4 py-3">
                <span
                  aria-hidden="true"
                  className="flex size-6 shrink-0 items-center justify-center rounded-[0.3rem] border border-line bg-surface-soft font-mono text-[0.875rem] text-muted"
                >
                  {s.tool.slice(0, 1)}
                </span>
                <span className="text-[0.9375rem] font-medium leading-snug text-foreground">
                  {s.tool}
                </span>
                <span className="ml-auto text-[0.875rem] leading-snug text-muted">
                  {s.stage}
                </span>
              </div>

              {/* The gap is the cost, so it is drawn, not described. */}
              {s.gap ? (
                <div className="flex items-center gap-3 py-2.5 pl-4">
                  <span
                    aria-hidden="true"
                    className="h-6 w-px shrink-0 border-l border-dashed border-line-strong"
                  />
                  <span className="text-[0.875rem] leading-snug text-muted">
                    {s.gap}
                  </span>
                </div>
              ) : null}
            </li>
          ))}
        </ol>

        <p className="mt-auto border-t border-line pt-4 text-[0.875rem] leading-relaxed text-muted">
          Nobody sees the whole campaign at once. Reviewing it means
          opening every tab and trusting they match.
        </p>
      </div>

      {/* One workspace: the same stages, no seams. */}
      <div data-pane className="flex flex-col">
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-accent">
            One workspace
          </p>
          <p className="font-mono text-[0.875rem] uppercase tracking-[0.1em] text-muted">
            No handoffs
          </p>
        </div>

        <div className="relative mt-4 overflow-hidden rounded-frame border border-accent-line bg-surface shadow-float">
          <span
            aria-hidden="true"
            className="bg-brand absolute inset-x-0 top-0 h-[2px]"
          />

          <ol className="divide-y divide-line">
            {JOINED.map((row, i) => (
              <li key={row.stage} className="flex items-center gap-3 px-4 py-3.5">
                <span className="bg-accent-soft flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[0.875rem] tabular-nums text-accent">
                  {i + 1}
                </span>
                <span className="text-[0.9375rem] font-medium leading-snug text-foreground">
                  {row.stage}
                </span>
                <span className="ml-auto min-w-0 truncate text-right text-[0.875rem] leading-snug text-muted">
                  {row.detail}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-auto border-t border-line pt-4 text-[0.875rem] leading-relaxed text-muted-strong">
          Change the brief and the campaign rebuilds, instead of five
          people updating five documents.
        </p>
      </div>
    </div>
  );
}
