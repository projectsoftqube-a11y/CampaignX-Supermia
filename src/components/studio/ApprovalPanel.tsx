"use client";

import { useEffect, useRef } from "react";
import { Check, Pencil, RotateCcw } from "lucide-react";
import { BrandGlyph } from "@/components/ui/BrandGlyph";
import {
  CX_EASE,
  T,
  gsap,
  prefersReducedMotion,
  registerStudio,
} from "@/lib/animations/studio";
import type { PlatformName } from "@/types/content";
import { cn } from "@/lib/utils";

interface ApprovalPanelProps {
  className?: string;
}

/**
 * A campaign waiting on a named approver.
 *
 * The claim this page makes is that nothing publishes until one named
 * person says so, and that a wrong line can be fixed three ways. Both
 * are states, not statements, so the panel plays them: the reviewer
 * works down the campaign, one asset at a time, and each is either
 * approved or sent back to be regenerated.
 *
 * The approver's name sits on the panel throughout, because "a person,
 * not a shared inbox" is the distinction the section is drawing. The
 * publish button stays disabled and visibly counts how many assets are
 * still outstanding, so the gate reads as a gate.
 */

const ASSETS: readonly {
  channel: PlatformName;
  label: string;
  excerpt: string;
  /** This one comes back for a regenerate, to show the correction path. */
  reject?: boolean;
}[] = [
  {
    channel: "instagram",
    label: "Instagram",
    excerpt: "Two weeks only — here's what's new inside.",
  },
  {
    channel: "linkedin",
    label: "LinkedIn",
    excerpt: "We're running something for the people already with us.",
  },
  {
    channel: "sms",
    label: "SMS",
    excerpt: "SPRING OFFER!! Don't miss out!!",
    reject: true,
  },
  {
    channel: "email",
    label: "Email",
    excerpt: "Your spring offer is ready",
  },
];

export function ApprovalPanel({ className }: ApprovalPanelProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerStudio();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const rows = root.querySelectorAll<HTMLElement>("[data-asset]");
      const panel = root.querySelector<HTMLElement>("[data-panel]");
      const remaining = root.querySelector<HTMLElement>("[data-remaining]");
      const gate = root.querySelector<HTMLElement>("[data-gate]");

      const setRemaining = (n: number) => {
        if (remaining) remaining.textContent = String(n);
        /* The gate only opens when nothing is outstanding. */
        if (gate) gate.setAttribute("data-ready", n === 0 ? "true" : "false");
      };

      if (prefersReducedMotion()) {
        gsap.set([panel, ...rows].filter(Boolean), { opacity: 1, y: 0 });
        rows.forEach((r) => r.setAttribute("data-state", "approved"));
        setRemaining(0);
        return;
      }

      gsap
        .timeline({
          scrollTrigger: { trigger: root, start: "top 78%", once: true },
        })
        .fromTo(
          panel,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: T.md, ease: CX_EASE.out },
        )
        .fromTo(
          rows,
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: T.sm,
            stagger: 0.07,
            ease: CX_EASE.out,
          },
          "-=0.25",
        );

      /* The review pass. One asset at a time: the reviewer lands on it,
         then it is approved — or, for the SMS, sent back and rewritten
         before it passes. The loop restarts so the panel is always
         mid-review rather than sitting on a finished state. */
      const run = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.6,
        delay: 1,
        scrollTrigger: { trigger: root, start: "top 78%" },
        onRepeat: () => {
          rows.forEach((r) => r.setAttribute("data-state", "waiting"));
          setRemaining(ASSETS.length);
        },
      });

      ASSETS.forEach((asset, i) => {
        const row = rows[i];
        if (!row) return;

        run
          .add(() => row.setAttribute("data-state", "reviewing"))
          .to({}, { duration: 0.5 });

        if (asset.reject) {
          /* Sent back, then regenerated, then approved: the three-step
             correction the copy beside this panel describes. */
          run
            .add(() => row.setAttribute("data-state", "rejected"))
            .to({}, { duration: 0.7 })
            .add(() => row.setAttribute("data-state", "regenerating"))
            .to({}, { duration: 0.8 });
        }

        run
          .add(() => {
            row.setAttribute("data-state", "approved");
            setRemaining(ASSETS.length - (i + 1));
          })
          .to({}, { duration: 0.45 });
      });

      /* A beat on the open gate before the loop resets. */
      run.to({}, { duration: 0.9 });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn("relative select-none", className)}
    >
      <div
        data-panel
        className="overflow-hidden rounded-panel border border-line bg-surface shadow-float"
      >
        {/* Who is reviewing. Named, because that is the point. */}
        <div className="flex items-center gap-2.5 border-b border-line bg-surface-soft px-3.5 py-2.5">
          <span className="bg-brand flex size-6 shrink-0 items-center justify-center rounded-full text-[0.875rem] font-semibold text-white">
            RK
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[0.875rem] font-medium leading-tight text-foreground">
              Rhea Kapoor
            </span>
            <span className="block truncate text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
              Approver
            </span>
          </span>
          <span className="ml-auto shrink-0 rounded-[0.25rem] bg-surface px-1.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
            <span data-remaining>4</span> to review
          </span>
        </div>

        {/* The assets. */}
        <ul className="divide-y divide-line">
          {ASSETS.map((asset) => (
            <li
              key={asset.channel}
              data-asset
              data-state="waiting"
              className={cn(
                "group relative px-3.5 py-2.5 transition-colors duration-300",
                "data-[state=reviewing]:bg-surface-soft",
              )}
            >
              {/* A brand rule on the row being read. */}
              <span
                aria-hidden="true"
                className="bg-brand absolute inset-y-0 left-0 w-0 transition-[width] duration-300 group-data-[state=reviewing]:w-[2px] group-data-[state=rejected]:w-[2px] group-data-[state=regenerating]:w-[2px]"
              />

              <div className="flex items-center gap-2.5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-[0.4rem] border border-line bg-surface-soft">
                  <BrandGlyph name={asset.channel} className="size-3.5" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.875rem] font-medium leading-tight text-foreground">
                    {asset.label}
                  </span>
                  <span className="mt-0.5 block truncate text-[0.875rem] leading-tight text-muted">
                    {/* The rejected line is replaced once regenerated,
                        so the fix is visible rather than implied. */}
                    <span className="group-data-[state=regenerating]:hidden group-data-[state=approved]:hidden">
                      {asset.excerpt}
                    </span>
                    {asset.reject ? (
                      <span className="hidden group-data-[state=regenerating]:inline group-data-[state=approved]:inline">
                        Spring offer, two weeks, just for you.
                      </span>
                    ) : (
                      <span className="hidden group-data-[state=regenerating]:inline group-data-[state=approved]:inline">
                        {asset.excerpt}
                      </span>
                    )}
                  </span>
                </span>

                {/* State. Exactly one of these shows at a time. */}
                <span className="shrink-0">
                  <span className="block size-4 rounded-full border border-dashed border-line-strong group-data-[state=reviewing]:hidden group-data-[state=rejected]:hidden group-data-[state=regenerating]:hidden group-data-[state=approved]:hidden" />

                  <span className="hidden font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted group-data-[state=reviewing]:inline">
                    Reading
                  </span>

                  <span className="hidden items-center gap-1 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-foreground group-data-[state=rejected]:inline-flex">
                    <Pencil aria-hidden="true" className="size-2.5" />
                    Sent back
                  </span>

                  <span className="hidden items-center gap-1 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-accent group-data-[state=regenerating]:inline-flex">
                    <RotateCcw aria-hidden="true" className="size-2.5" />
                    Rewritten
                  </span>

                  <span className="bg-brand hidden size-4 items-center justify-center rounded-full text-white group-data-[state=approved]:flex">
                    <Check
                      aria-hidden="true"
                      className="size-2.5"
                      strokeWidth={3.5}
                    />
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* The gate. Disabled until every asset has been approved. */}
        <div
          data-gate
          data-ready="false"
          className="group/gate flex items-center gap-2 border-t border-line bg-surface-soft px-3.5 py-2.5"
        >
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
            Nothing sends without approval
          </span>
          {/* `bg-brand` is a utility, not a variable, so the ready
              state swaps the whole class rather than a gradient var. */}
          <span
            className={cn(
              "ml-auto rounded-pill px-3 py-1.5 text-[0.875rem] font-medium transition-[background-color,color,box-shadow] duration-300",
              "bg-surface-sunk text-muted",
              "group-data-[ready=true]/gate:bg-accent group-data-[ready=true]/gate:text-white group-data-[ready=true]/gate:shadow-brand",
            )}
          >
            Publish campaign
          </span>
        </div>
      </div>
    </div>
  );
}
