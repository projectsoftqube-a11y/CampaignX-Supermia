"use client";

import { useEffect, useRef } from "react";
import { FileText, Lock } from "lucide-react";
import {
  CX_EASE,
  T,
  gsap,
  prefersReducedMotion,
  registerStudio,
} from "@/lib/animations/studio";
import { cn } from "@/lib/utils";

interface ModelPanelProps {
  className?: string;
}

/**
 * Source documents feeding a brand model.
 *
 * Coded rather than rendered, so the sliders actually move: each one
 * travels to its value as the panel enters, which is the whole point of
 * showing a brand model as a set of dials. A still render of the same
 * diagram cannot say "this is derived from your material" as clearly as
 * watching the values arrive.
 *
 * The three connectors draw from the documents into the panel first, so
 * the order of events reads correctly: material in, model out.
 */

const TRAITS = [
  { label: "Warm", value: 72 },
  { label: "Direct", value: 84 },
  { label: "Playful", value: 38 },
  { label: "Formal", value: 26 },
] as const;

const SOURCES = ["Your website", "Tone guidelines", "A past campaign"];

export function ModelPanel({ className }: ModelPanelProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerStudio();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const docs = root.querySelectorAll<HTMLElement>("[data-doc]");
      const wires = root.querySelectorAll<SVGPathElement>("[data-wire]");
      const panel = root.querySelector<HTMLElement>("[data-panel]");
      const fills = root.querySelectorAll<HTMLElement>("[data-fill]");
      const knobs = root.querySelectorAll<HTMLElement>("[data-knob]");
      const lock = root.querySelector<HTMLElement>("[data-lock]");

      if (prefersReducedMotion()) return;

      gsap.set(docs, { opacity: 0, x: -16 });
      gsap.set(panel, { opacity: 0, y: 18 });
      gsap.set(wires, { drawSVG: "0% 0%" });
      gsap.set(fills, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(knobs, { opacity: 0, scale: 0.6 });

      const tl = gsap.timeline({
        defaults: { ease: CX_EASE.out },
        scrollTrigger: { trigger: root, start: "top 84%", once: true },
      });

      tl.to(docs, { opacity: 1, x: 0, duration: T.md, stagger: 0.1 })
        .to(wires, { drawSVG: "0% 100%", duration: T.lg, stagger: 0.08 }, "-=0.3")
        .to(panel, { opacity: 1, y: 0, duration: T.lg }, "-=0.6")
        /* The dials settle to their values, which is the moment the
           model exists. */
        .to(
          fills,
          { scaleX: 1, duration: T.lg, stagger: 0.09, ease: CX_EASE.inOut },
          "-=0.4",
        )
        .to(
          knobs,
          {
            opacity: 1,
            scale: 1,
            duration: T.sm,
            stagger: 0.09,
            ease: CX_EASE.spring,
          },
          "<0.15",
        )
        .from(lock, { opacity: 0, scale: 0.6, duration: T.sm }, "-=0.2");

      /* A slow breath on the panel, so it does not freeze once settled. */
      gsap.to(panel, {
        y: -5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn("relative select-none", className)}
    >
      <div className="grid gap-4 sm:grid-cols-[minmax(0,0.72fr)_3.5rem_minmax(0,1.28fr)] sm:items-center sm:gap-0 lg:grid-cols-[minmax(0,0.72fr)_4.5rem_minmax(0,1.28fr)]">
        {/* Source documents */}
        <ul className="flex flex-col gap-2 sm:gap-2.5">
          {SOURCES.map((source) => (
            <li
              key={source}
              data-doc
              className="flex items-center gap-2.5 rounded-card border border-line bg-surface p-2.5 shadow-soft"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-[0.4rem] bg-surface-soft">
                <FileText
                  aria-hidden="true"
                  className="size-3.5 text-muted"
                  strokeWidth={1.75}
                />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[0.6875rem] text-muted-strong">
                  {source}
                </span>
                <span className="mt-1 block h-1 w-10 rounded-full bg-surface-sunk" />
              </span>
            </li>
          ))}
        </ul>

        {/* Connectors */}
        <svg
          viewBox="0 0 100 160"
          preserveAspectRatio="none"
          className="hidden h-[9rem] w-full sm:block"
        >
          <defs>
            <linearGradient id="cx-model-wire" x1="0" y1="0" x2="1" y2="0">
              <stop
                offset="0%"
                stopColor="rgb(var(--brand-blue-rgb))"
                stopOpacity="0.75"
              />
              <stop
                offset="100%"
                stopColor="rgb(var(--brand-violet-rgb))"
                stopOpacity="0.4"
              />
            </linearGradient>
          </defs>
          {[26, 80, 134].map((y) => (
            <path
              key={y}
              data-wire
              d={`M 2 ${y} C 46 ${y}, 54 80, 98 80`}
              fill="none"
              stroke="url(#cx-model-wire)"
              strokeWidth="1.75"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {/* The model */}
        <div
          data-panel
          className="rounded-panel border border-line bg-surface p-4 shadow-float sm:p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-foreground">
              Brand voice
            </p>
            <span
              data-lock
              className="flex size-6 items-center justify-center rounded-full bg-accent-soft"
            >
              <Lock
                aria-hidden="true"
                className="size-3 text-accent"
                strokeWidth={2}
              />
            </span>
          </div>

          <ul className="mt-4 space-y-3">
            {TRAITS.map((trait) => (
              <li key={trait.label} className="flex items-center gap-3">
                <span className="w-12 shrink-0 text-[0.625rem] uppercase tracking-[0.08em] text-muted sm:w-14 sm:text-[0.6875rem]">
                  {trait.label}
                </span>

                <span className="relative h-1.5 flex-1 rounded-full bg-surface-sunk">
                  <span
                    data-fill
                    style={{ width: `${trait.value}%` }}
                    className="bg-brand absolute inset-y-0 left-0 rounded-full"
                  />
                  <span
                    data-knob
                    style={{ left: `calc(${trait.value}% - 0.375rem)` }}
                    className="bg-brand absolute top-1/2 size-3 -translate-y-1/2 rounded-full ring-2 ring-[var(--surface)]"
                  />
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-4 border-t border-line pt-3 text-[0.625rem] text-muted">
            Private to your workspace
          </p>
        </div>
      </div>
    </div>
  );
}
