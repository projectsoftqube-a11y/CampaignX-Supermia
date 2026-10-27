"use client";

import { useEffect, useRef, useState } from "react";
import { Lock } from "lucide-react";
import {
  CX_EASE,
  T,
  gsap,
  prefersReducedMotion,
  registerStudio,
} from "@/lib/animations/studio";
import { cn } from "@/lib/utils";

/**
 * Three client workspaces, and nothing crossing between them.
 *
 * The small-business page argues about time; this one argues about
 * separation. An agency's objection is not "can it write" — it is
 * "will client A's voice turn up in client B's campaign", and that is
 * a claim about isolation, which prose can only assert.
 *
 * So the workspaces are drawn as actual workspaces. Switching between
 * them changes the brand model, the approver and the draft, all at
 * once, and the panel states plainly that nothing is shared. Seeing
 * three genuinely different registers come out of the same product is
 * the argument.
 *
 * All three are in the DOM; only the selected one is shown.
 */

interface Workspace {
  id: string;
  client: string;
  sector: string;
  /** Two initials for the approver chip. */
  approver: string;
  approverName: string;
  /** The register, as a few dials. */
  traits: readonly { label: string; value: number }[];
  /** The opening line that model produces for the same kind of brief. */
  draft: string;
}

const WORKSPACES: readonly Workspace[] = [
  {
    id: "northfield",
    client: "Northfield Law",
    sector: "Professional services",
    approver: "RK",
    approverName: "Rhea Kapoor",
    traits: [
      { label: "Formal", value: 86 },
      { label: "Direct", value: 64 },
      { label: "Warm", value: 32 },
    ],
    draft:
      "Our spring review is open to existing clients. Two weeks, by appointment.",
  },
  {
    id: "harbour",
    client: "Harbour Coffee",
    sector: "Hospitality",
    approver: "DM",
    approverName: "Dan Mercer",
    traits: [
      { label: "Formal", value: 18 },
      { label: "Direct", value: 72 },
      { label: "Warm", value: 88 },
    ],
    draft:
      "Spring blend's back for two weeks, and regulars get first pour.",
  },
  {
    id: "vantage",
    client: "Vantage Fitness",
    sector: "Health and fitness",
    approver: "SO",
    approverName: "Sam Obi",
    traits: [
      { label: "Formal", value: 30 },
      { label: "Direct", value: 92 },
      { label: "Warm", value: 58 },
    ],
    draft: "Two weeks. Member rates on every spring programme. Book it.",
  },
];

export function ClientSwitcher() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

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
          stagger: 0.1,
          ease: CX_EASE.out,
          scrollTrigger: { trigger: root, start: "top 80%", once: true },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  /* Animate the dials on every switch: the whole point is that the
     model changes, not just the name at the top. */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = panelRef.current;
    if (!el) return;
    const bars = el.querySelectorAll<HTMLElement>("[data-dial]");
    const tween = gsap.fromTo(
      bars,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: CX_EASE.out,
        transformOrigin: "left center",
      },
    );
    return () => {
      tween.kill();
    };
  }, [active]);

  return (
    <div ref={rootRef} className="grid gap-5 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-8">
      {/* The workspace list. */}
      <div data-pane>
        <p className="font-mono text-[0.875rem] uppercase tracking-[0.1em] text-muted">
          Workspaces
        </p>

        <ul className="mt-3 space-y-1.5">
          {WORKSPACES.map((w, i) => {
            const on = i === active;
            return (
              <li key={w.id}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={on ? "true" : undefined}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-panel border p-3 text-left transition-[border-color,background-color] duration-300",
                    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                    on
                      ? "border-accent-line bg-accent-soft"
                      : "border-line bg-surface hover:border-line-strong",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-[0.4rem] text-[0.875rem] font-semibold transition-colors duration-300",
                      on
                        ? "bg-accent text-white"
                        : "bg-surface-soft text-muted",
                    )}
                  >
                    {w.client.slice(0, 1)}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        "block truncate text-[0.9375rem] font-medium leading-tight transition-colors duration-300",
                        on ? "text-accent" : "text-foreground",
                      )}
                    >
                      {w.client}
                    </span>
                    <span className="mt-0.5 block truncate text-[0.875rem] leading-tight text-muted">
                      {w.sector}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* The isolation claim, stated where it is being demonstrated. */}
        <p className="mt-4 flex items-start gap-2.5 rounded-panel border border-line bg-surface-soft p-3.5 text-[0.875rem] leading-relaxed text-muted-strong">
          <Lock
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-muted"
            strokeWidth={1.75}
          />
          Brand models are per workspace. Nothing is shared between
          clients, and your data is not pooled with other customers&apos;
          data.
        </p>
      </div>

      {/* The workspaces. All three stay in the DOM so every register
          and draft is real text; only the selected one is shown. */}
      <div data-pane ref={panelRef}>
        {WORKSPACES.map((ws, wi) => (
        <div
          key={ws.id}
          hidden={wi !== active}
          className="overflow-hidden rounded-frame border border-line bg-surface shadow-float"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line bg-surface-soft px-4 py-3">
            <span className="text-[0.9375rem] font-semibold text-foreground">
              {ws.client}
            </span>
            <span className="rounded-[0.25rem] bg-surface px-2 py-0.5 font-mono text-[0.875rem] uppercase tracking-[0.06em] text-muted">
              Own brand model
            </span>
            <span className="ml-auto flex items-center gap-2">
              <span className="bg-brand flex size-6 items-center justify-center rounded-full text-[0.875rem] font-semibold text-white">
                {ws.approver}
              </span>
              <span className="text-[0.875rem] text-muted">
                {ws.approverName}
              </span>
            </span>
          </div>

          <div className="grid gap-6 p-4 sm:grid-cols-2 sm:gap-8 sm:p-5">
            {/* The register, as dials. */}
            <div>
              <p className="font-mono text-[0.875rem] uppercase tracking-[0.1em] text-muted">
                Learned register
              </p>
              <ul className="mt-3 space-y-3">
                {ws.traits.map((t) => (
                  <li key={t.label}>
                    <div className="flex items-baseline justify-between">
                      <span className="text-[0.875rem] text-muted-strong">
                        {t.label}
                      </span>
                      <span className="font-mono text-[0.875rem] tabular-nums text-muted">
                        {t.value}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-sunk">
                      <span
                        data-dial
                        style={{ width: `${t.value}%` }}
                        className="bg-brand block h-full origin-left rounded-full"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* What that model writes. */}
            <div>
              <p className="font-mono text-[0.875rem] uppercase tracking-[0.1em] text-muted">
                Same brief, their voice
              </p>
              <p className="mt-3 rounded-panel border border-line bg-surface-soft p-3.5 text-[0.9375rem] leading-[1.6] text-foreground">
                {ws.draft}
              </p>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-muted">
                Brief: a spring offer, two weeks, for existing customers.
              </p>
            </div>
          </div>

          <p className="border-t border-line bg-surface-soft px-4 py-2.5 font-mono text-[0.875rem] uppercase tracking-[0.1em] text-muted">
            Held for {ws.approverName} to approve
          </p>
        </div>
        ))}

        <p className="mt-3 text-[0.875rem] text-muted">
          Illustrative workspaces, not real customers.
        </p>
      </div>
    </div>
  );
}
