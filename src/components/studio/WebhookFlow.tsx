"use client";

import { useEffect, useRef } from "react";
import { Boxes, ChartNoAxesColumn, Database, Webhook } from "lucide-react";
import {
  CX_EASE,
  T,
  gsap,
  prefersReducedMotion,
  registerStudio,
} from "@/lib/animations/studio";
import { cn } from "@/lib/utils";

interface WebhookFlowProps {
  className?: string;
}

/**
 * Campaign events reaching the rest of the stack.
 *
 * The claim is that CampaignX does not replace your CRM or analytics:
 * it publishes, and then tells them. That is a flow, so it is drawn as
 * one — events leave the campaign, pass through the webhook, and
 * arrive at three systems that are explicitly *not* CampaignX.
 *
 * Packets travel the wires on a loop, one destination at a time, and
 * each destination lights as its packet lands. Sequential rather than
 * simultaneous: three packets moving at once reads as noise.
 */

const EVENTS = ["campaign.published", "post.scheduled", "report.ready"];

const TARGETS = [
  { icon: Database, label: "Your CRM", note: "Customer records" },
  { icon: ChartNoAxesColumn, label: "Your analytics", note: "Keep using it" },
  { icon: Boxes, label: "Anything else", note: "Via webhook" },
];

export function WebhookFlow({ className }: WebhookFlowProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerStudio();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const source = root.querySelector<HTMLElement>("[data-source]");
      const hub = root.querySelector<HTMLElement>("[data-hub]");
      const cards = root.querySelectorAll<HTMLElement>("[data-target]");
      const wires = root.querySelectorAll<SVGPathElement>("[data-wire]");
      const packet = root.querySelector<SVGCircleElement>("[data-packet]");
      const rows = root.querySelectorAll<HTMLElement>("[data-event]");

      if (prefersReducedMotion()) return;

      gsap.set(source, { opacity: 0, y: 14 });
      gsap.set(rows, { opacity: 0, x: -8 });
      gsap.set(hub, { opacity: 0, scale: 0.7 });
      gsap.set(cards, { opacity: 0, x: 14 });
      gsap.set(wires, { drawSVG: "0% 0%" });

      gsap
        .timeline({
          defaults: { ease: CX_EASE.out },
          scrollTrigger: { trigger: root, start: "top 84%", once: true },
        })
        .to(source, { opacity: 1, y: 0, duration: T.md })
        .to(rows, { opacity: 1, x: 0, duration: T.sm, stagger: 0.08 }, "-=0.25")
        .to(
          hub,
          { opacity: 1, scale: 1, duration: T.md, ease: CX_EASE.spring },
          "-=0.2",
        )
        .to(wires, { drawSVG: "0% 100%", duration: T.md, stagger: 0.08 }, "-=0.2")
        .to(cards, { opacity: 1, x: 0, duration: T.md, stagger: 0.09 }, "-=0.4");

      /* One packet at a time, cycling the three destinations. Each
         card lights as its packet arrives. */
      if (packet && wires.length > 0) {
        const state = { t: 0 };
        let index = 0;

        gsap.to(state, {
          t: 1,
          duration: 1.3,
          repeat: -1,
          repeatDelay: 0.7,
          delay: 2.4,
          ease: "power1.inOut",
          onRepeat: () => {
            cards[index]?.removeAttribute("data-lit");
            index = (index + 1) % wires.length;
          },
          onUpdate: () => {
            const path = wires[index];
            if (!path) return;
            const point = path.getPointAtLength(
              path.getTotalLength() * state.t,
            );
            packet.setAttribute("cx", String(point.x));
            packet.setAttribute("cy", String(point.y));
            packet.setAttribute(
              "opacity",
              String(Math.sin(state.t * Math.PI) * 0.95),
            );
            if (state.t > 0.9) cards[index]?.setAttribute("data-lit", "true");
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn("relative select-none", className)}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] items-center gap-0 sm:grid-cols-[minmax(0,1fr)_4.5rem_minmax(0,1fr)]">
        {/* The campaign, emitting events. */}
        <div
          data-source
          className="rounded-panel border border-line bg-surface p-3 shadow-soft sm:p-3.5"
        >
          <p className="text-[0.5625rem] font-medium uppercase tracking-[0.14em] text-muted">
            Campaign events
          </p>
          <ul className="mt-2.5 space-y-1.5">
            {EVENTS.map((event) => (
              <li
                key={event}
                data-event
                className="truncate rounded-[0.3rem] bg-surface-soft px-2 py-1 font-mono text-[0.625rem] text-muted-strong"
              >
                {event}
              </li>
            ))}
          </ul>
        </div>

        {/* The wires, through the hub. */}
        <div className="relative">
          <svg
            viewBox="0 0 100 160"
            preserveAspectRatio="none"
            className="h-[9rem] w-full"
          >
            <defs>
              <linearGradient id="cx-hook-wire" x1="0" y1="0" x2="1" y2="0">
                <stop
                  offset="0%"
                  stopColor="rgb(var(--brand-blue-rgb))"
                  stopOpacity="0.75"
                />
                <stop
                  offset="100%"
                  stopColor="rgb(var(--brand-magenta-rgb))"
                  stopOpacity="0.4"
                />
              </linearGradient>
              <radialGradient id="cx-hook-packet">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop
                  offset="100%"
                  stopColor="rgb(var(--brand-blue-rgb))"
                  stopOpacity="0"
                />
              </radialGradient>
            </defs>

            {[30, 80, 130].map((y) => (
              <path
                key={y}
                data-wire
                d={`M 2 80 C 40 80, 56 ${y}, 98 ${y}`}
                fill="none"
                stroke="url(#cx-hook-wire)"
                strokeWidth="1.75"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}

            <circle data-packet r="4" fill="url(#cx-hook-packet)" opacity="0" />
          </svg>

          {/* The webhook itself, at the junction. */}
          <span
            data-hub
            className="bg-brand absolute left-1/2 top-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-brand"
          >
            <Webhook aria-hidden="true" className="size-4" strokeWidth={2} />
          </span>
        </div>

        {/* The systems that are not CampaignX. */}
        <ul className="flex flex-col gap-2">
          {TARGETS.map((target) => {
            const Icon = target.icon;
            return (
              <li
                key={target.label}
                data-target
                className="group flex items-center gap-2.5 rounded-panel border border-line bg-surface p-2.5 shadow-soft transition-[border-color,box-shadow] duration-300 data-[lit]:border-accent-line data-[lit]:shadow-brand"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-[0.4rem] bg-surface-soft text-muted transition-colors duration-300 group-data-[lit]:bg-accent-soft group-data-[lit]:text-accent">
                  <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[0.6875rem] font-medium text-foreground">
                    {target.label}
                  </span>
                  <span className="block truncate text-[0.625rem] text-muted">
                    {target.note}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="mt-3 text-center text-[0.6875rem] text-muted">
        CampaignX publishes, then tells the rest of your stack
      </p>
    </div>
  );
}
