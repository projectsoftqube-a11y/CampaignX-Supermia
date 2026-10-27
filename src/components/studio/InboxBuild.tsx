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
 * An email assembling itself, part by part.
 *
 * The social page's argument is about *difference across surfaces*, so
 * it shows five posts side by side. Email is the opposite shape: one
 * artefact, built in layers, where the interesting claim is that the
 * parts are written together rather than one after another.
 *
 * So this draws the two views a subscriber actually meets — the inbox
 * row first, then the open email — and builds each part in sequence
 * with its origin named. The subject and preview highlight as a pair,
 * because "written together" is the sharpest thing this page says and
 * a static mock cannot make that point.
 *
 * The parts list doubles as the control: each row is a step, and the
 * preview reflects whichever is selected.
 */

type PartId = "subject" | "body" | "art" | "cta";

interface Part {
  id: PartId;
  label: string;
  note: string;
}

const PARTS: readonly Part[] = [
  {
    id: "subject",
    label: "Subject + preview",
    note: "Written as a pair. The preview is the second half of the subject line, not a field filled in at the end.",
  },
  {
    id: "body",
    label: "Body copy",
    note: "The campaign's argument at email length, in your brand voice — not the social caption with more words around it.",
  },
  {
    id: "art",
    label: "Artwork",
    note: "Generated alongside the copy and matched to your brand, so the image illustrates the line it sits beside.",
  },
  {
    id: "cta",
    label: "One call to action",
    note: "The email ends in one clear thing to do, rather than three competing links.",
  },
];

/** How far through the build each part is revealed. */
const ORDER: Record<PartId, number> = {
  subject: 0,
  body: 1,
  art: 2,
  cta: 3,
};

export function InboxBuild() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [held, setHeld] = useState(false);

  /* Build through the parts on its own until the reader takes over. */
  useEffect(() => {
    if (held || prefersReducedMotion()) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % (PARTS.length + 1)),
      2400,
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

  /* A part is "in" once the build has reached it. `step` runs one past
     the last part so the finished state holds for a beat. */
  const has = (id: PartId) => step > ORDER[id];
  const active = (id: PartId) => step === ORDER[id] + 1;

  return (
    <div ref={rootRef} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
      {/* The parts list, which is also the control. */}
      <ol data-pane className="space-y-1.5">
        {PARTS.map((part, i) => {
          const on = step === i + 1;
          const done = step > i + 1;
          return (
            <li key={part.id}>
              <button
                type="button"
                onClick={() => {
                  setStep(i + 1);
                  setHeld(true);
                }}
                aria-current={on ? "step" : undefined}
                className={cn(
                  "flex w-full gap-3 rounded-panel border p-3.5 text-left transition-[border-color,background-color] duration-300",
                  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  on
                    ? "border-accent-line bg-accent-soft"
                    : "border-line bg-surface hover:border-line-strong",
                )}
              >
                <span
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-full font-mono text-[0.6875rem] tabular-nums transition-colors duration-300",
                    on
                      ? "bg-accent text-white"
                      : done
                        ? "bg-accent-soft text-accent"
                        : "bg-surface-sunk text-muted",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0">
                  <span
                    className={cn(
                      "block text-[0.875rem] font-medium leading-snug transition-colors duration-300",
                      on ? "text-accent" : "text-foreground",
                    )}
                  >
                    {part.label}
                  </span>
                  <span className="mt-1 block text-[0.875rem] leading-relaxed text-muted-strong">
                    {part.note}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* The two views a subscriber meets. */}
      <div data-pane className="space-y-3">
        {/* 1. The inbox row — all most people ever see. */}
        <div
          className={cn(
            "overflow-hidden rounded-panel border bg-surface transition-[border-color,box-shadow] duration-400",
            active("subject")
              ? "border-accent-line shadow-brand"
              : "border-line shadow-soft",
          )}
        >
          <p className="border-b border-line bg-surface-soft px-3.5 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
            In the inbox
          </p>

          <div className="flex gap-3 p-3.5">
            <span className="bg-brand flex size-8 shrink-0 items-center justify-center rounded-full text-[0.875rem] font-semibold text-white">
              YB
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <span className="truncate text-[0.875rem] font-medium text-foreground">
                  Your brand
                </span>
                <span className="shrink-0 font-mono text-[0.6875rem] text-muted">
                  09:14
                </span>
              </div>

              {/* Subject and preview, highlighted together. */}
              <p
                className={cn(
                  "mt-0.5 truncate text-[0.875rem] font-medium transition-colors duration-300",
                  has("subject") ? "text-foreground" : "text-muted/40",
                )}
              >
                {has("subject") ? "Your spring offer is ready" : "Subject line"}
              </p>
              <p
                className={cn(
                  "truncate text-[0.875rem] transition-colors duration-300",
                  has("subject") ? "text-muted-strong" : "text-muted/40",
                )}
              >
                {has("subject")
                  ? "Two weeks, for customers already with us."
                  : "Preview text"}
              </p>
            </div>
          </div>

          {active("subject") ? (
            <p className="border-t border-accent-line bg-accent-soft px-3.5 py-1.5 text-[0.875rem] font-medium text-accent">
              Written as one pair
            </p>
          ) : null}
        </div>

        {/* 2. The open email. */}
        <div
          className={cn(
            "overflow-hidden rounded-panel border bg-surface shadow-soft transition-[border-color] duration-400",
            active("body") || active("art") || active("cta")
              ? "border-accent-line"
              : "border-line",
          )}
        >
          <p className="border-b border-line bg-surface-soft px-3.5 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
            Opened
          </p>

          <div className="space-y-3 p-3.5">
            {/* Artwork. */}
            <div
              className={cn(
                "relative aspect-[16/7] overflow-hidden rounded-[0.4rem] border transition-all duration-500",
                has("art")
                  ? "border-line bg-[linear-gradient(135deg,rgba(var(--brand-blue-rgb),0.16),rgba(var(--brand-magenta-rgb),0.12))]"
                  : "border-dashed border-line-strong bg-surface-soft",
              )}
            >
              {has("art") ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(var(--brand-blue-rgb),0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--brand-blue-rgb),0.12)_1px,transparent_1px)] [background-size:18px_18px]"
                />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted/60">
                  Artwork
                </span>
              )}
            </div>

            {/* Body copy. */}
            {has("body") ? (
              <div className="space-y-2">
                <p className="text-[0.875rem] leading-[1.6] text-foreground">
                  For the next two weeks our spring rates are open to
                  customers already with us — no new-customer-only pricing,
                  no catch.
                </p>
                <p className="text-[0.875rem] leading-[1.6] text-muted-strong">
                  It runs until the 14th, in store and online.
                </p>
              </div>
            ) : (
              <div className="space-y-2" aria-hidden="true">
                {[100, 92, 68].map((w) => (
                  <span
                    key={w}
                    className="block h-2 rounded-full bg-surface-sunk"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
            )}

            {/* The single call to action. */}
            <div className="pt-1">
              {has("cta") ? (
                <span className="bg-brand inline-flex items-center rounded-[0.35rem] px-3.5 py-2 text-[0.875rem] font-medium text-white">
                  See the offer
                </span>
              ) : (
                <span
                  aria-hidden="true"
                  className="inline-flex h-8 w-28 items-center rounded-[0.35rem] border border-dashed border-line-strong"
                />
              )}
            </div>
          </div>
        </div>

        <p className="text-center font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
          {step === 0
            ? "One brief"
            : step > PARTS.length
              ? "Ready for approval"
              : `Part ${String(step).padStart(2, "0")} of ${String(PARTS.length).padStart(2, "0")}`}
        </p>
      </div>
    </div>
  );
}
