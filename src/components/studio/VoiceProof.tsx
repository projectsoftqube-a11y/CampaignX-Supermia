"use client";

import { useEffect, useRef } from "react";
import { FileText } from "lucide-react";
import {
  CX_EASE,
  T,
  gsap,
  prefersReducedMotion,
  registerStudio,
} from "@/lib/animations/studio";

/**
 * A generic draft against one written from the founder's own material.
 *
 * This page's objection is specific and quotable: "copy that sounds
 * like AI, so it never ships". That is a claim about register, not
 * speed, and the only honest answer is to show both drafts and let
 * the reader hear the difference.
 *
 * An earlier version set the two as independent columns, each with
 * its own stack of parts. That broke the comparison: the left column
 * had a "trained on" strip where the right had source pills, so the
 * two drafts started at different heights and the eye had nothing to
 * read across. Here the pair sits in one frame with shared rows —
 * what it read, what it wrote, what it costs you — so every claim on
 * the left has its answer directly opposite.
 *
 * Both drafts are illustrations of the pattern, labelled as such.
 */

const SOURCES = ["Your site", "A launch post", "The changelog"];

const GENERIC = [
  "We're thrilled to announce an exciting new feature!",
  "This game-changing update will revolutionise how you work. Don't miss out — try it today!",
];

const LEARNED = [
  "Scheduling is live. You can queue a campaign for a date instead of remembering to press publish.",
  "It took longer than we wanted. It works now, and it is on every plan.",
];

export function VoiceProof() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerStudio();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const frame = root.querySelector<HTMLElement>("[data-frame]");
      const docs = root.querySelectorAll<HTMLElement>("[data-doc]");

      if (prefersReducedMotion()) {
        gsap.set([frame, ...docs].filter(Boolean), { opacity: 1, y: 0, x: 0 });
        return;
      }

      gsap
        .timeline({
          scrollTrigger: { trigger: root, start: "top 80%", once: true },
        })
        .fromTo(
          frame,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: T.md, ease: CX_EASE.out },
        )
        .fromTo(
          docs,
          { opacity: 0, x: -8 },
          {
            opacity: 1,
            x: 0,
            duration: T.sm,
            stagger: 0.07,
            ease: CX_EASE.out,
          },
          "-=0.3",
        );
    }, root);

    return () => ctx.revert();
  }, []);

  /* Shared row grid. Both halves use it, so every row lines up across
     the divide no matter how the copy wraps. */
  const row = "grid sm:grid-cols-2";
  const cell = "p-5 sm:p-6";
  const divide = "sm:border-l sm:border-line";

  return (
    <div ref={rootRef}>
      <div
        data-frame
        className="overflow-hidden rounded-frame border border-line bg-surface shadow-float"
      >
        {/* Heads. */}
        <div className={`${row} border-b border-line bg-surface-soft`}>
          <div className="flex items-baseline justify-between gap-3 px-5 py-3 sm:px-6">
            <span className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
              A generic model
            </span>
            <span className="font-mono text-[0.875rem] uppercase tracking-[0.1em] text-muted">
              Rewrite
            </span>
          </div>
          <div
            className={`flex items-baseline justify-between gap-3 border-t border-line px-5 py-3 sm:border-t-0 sm:border-l sm:px-6`}
          >
            <span className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-accent">
              Your brand model
            </span>
            <span className="font-mono text-[0.875rem] uppercase tracking-[0.1em] text-muted">
              Edit
            </span>
          </div>
        </div>

        {/* Row 1 — what it read. */}
        <div className={`${row} border-b border-line`}>
          <div className={cell}>
            <p className="font-mono text-[0.875rem] uppercase tracking-[0.1em] text-muted">
              What it read
            </p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
              Everyone&apos;s marketing copy. Nothing of yours.
            </p>
          </div>

          <div className={`${cell} border-t border-line sm:border-t-0 ${divide}`}>
            <p className="font-mono text-[0.875rem] uppercase tracking-[0.1em] text-muted">
              What it read
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {SOURCES.map((src) => (
                <li
                  key={src}
                  data-doc
                  className="flex items-center gap-2 rounded-pill border border-line bg-surface-soft px-3 py-1.5 text-[0.875rem] text-muted-strong"
                >
                  <FileText
                    aria-hidden="true"
                    className="size-3.5 shrink-0 text-muted"
                    strokeWidth={1.75}
                  />
                  {src}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Row 2 — the drafts. The band the whole thing exists for, so
            it carries the most room. */}
        <div className={`${row} border-b border-line`}>
          <div className={cell}>
            <p className="font-mono text-[0.875rem] uppercase tracking-[0.1em] text-muted">
              Same announcement
            </p>
            <div className="mt-3 space-y-3">
              {GENERIC.map((line) => (
                <p
                  key={line.slice(0, 24)}
                  className="text-[1rem] leading-[1.7] text-muted"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div
            className={`relative ${cell} border-t border-line bg-accent-soft/30 sm:border-t-0 ${divide}`}
          >
            <span
              aria-hidden="true"
              className="bg-brand absolute inset-y-0 left-0 w-[2px]"
            />
            <p className="font-mono text-[0.875rem] uppercase tracking-[0.1em] text-accent">
              Same announcement
            </p>
            <div className="mt-3 space-y-3">
              {LEARNED.map((line) => (
                <p
                  key={line.slice(0, 24)}
                  className="text-[1rem] leading-[1.7] text-foreground"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3 — what it costs you. */}
        <div className={row}>
          <div className={`${cell} bg-surface-soft`}>
            <p className="text-[0.9375rem] leading-relaxed text-muted">
              Competent, anonymous, and nothing you would have said. So
              it gets rewritten, or quietly dropped.
            </p>
          </div>
          <div
            className={`${cell} border-t border-line bg-surface-soft sm:border-t-0 ${divide}`}
          >
            <p className="text-[0.9375rem] leading-relaxed text-muted-strong">
              Your register from the first draft. The only edit left is
              the technical claim nobody else would catch.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-3 text-[0.875rem] leading-relaxed text-muted">
        Illustrations of the difference a brand model makes, not output
        from a specific customer campaign.
      </p>
    </div>
  );
}
