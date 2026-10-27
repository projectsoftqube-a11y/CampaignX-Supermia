"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/layout/Container";
import { BrandGlyph } from "@/components/ui/BrandGlyph";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionGlow } from "@/components/ui/SectionGlow";
import {
  DURATION,
  EASE,
  gsap,
  prefersReducedMotion,
  registerGsap,
} from "@/lib/animations/gsap";
import type { PlatformName } from "@/types/content";
import { cn } from "@/lib/utils";

interface ChannelConstellationProps {
  heading: string;
  eyebrow?: string;
  intro?: string;
  /** Highlight one channel, e.g. on its own channel page. */
  focus?: PlatformName;
  /** Render only the diagram, for use inside a `Segment`. */
  bare?: boolean;
}

/**
 * One brief dispatching to seven channels.
 *
 * A single panel: the brief at the top, then the seven channels it
 * produces as rows beneath it. Each row carries the format, the limit
 * that channel imposes, and the opening line of the draft itself —
 * which is the point of the section, since the claim is that the seven
 * outputs differ rather than being one caption pasted seven times.
 *
 * Earlier versions drew the relationship: a radial ring of nodes, then
 * a spine with connectors fanning to each row. Both were dropped. The
 * ring left the four corners of its square empty and its centre card
 * collided with the side nodes; the fan drew seven lines toward column
 * positions that do not exist, because the rows below it are a stacked
 * list. Containment in one bordered panel says "these came from that"
 * without any lines at all.
 *
 * The dispatch is a loop, not a one-shot reveal: one row publishes at
 * a time, the counter and progress bar advance, and after the seventh
 * the run resets — so the section always shows the product working.
 *
 * Everything here is decorative except the channel names and drafts,
 * which are real text under every mark.
 */

const CHANNELS: readonly { name: PlatformName; label: string }[] = [
  { name: "instagram", label: "Instagram" },
  { name: "facebook", label: "Facebook" },
  { name: "linkedin", label: "LinkedIn" },
  { name: "google", label: "Google Business" },
  { name: "x", label: "X" },
  { name: "email", label: "Email" },
  { name: "sms", label: "SMS" },
];

/**
 * What each channel actually gets back.
 *
 * `format` is the artefact, `spec` the constraint that channel imposes,
 * and `line` the opening of the draft itself. Showing the real copy is
 * the difference between a list of channel names and a board that looks
 * like seven different drafts — which is the claim this section makes.
 */
const DRAFTS: Record<
  PlatformName,
  { format: string; spec: string; line: string }
> = {
  instagram: {
    format: "Carousel",
    spec: "4 slides",
    line: "Two weeks only — here's what's new inside.",
  },
  facebook: {
    format: "Link post",
    spec: "1 image",
    line: "Our spring offer is open to existing customers.",
  },
  linkedin: {
    format: "Text post",
    spec: "no link",
    line: "We're running something for the people already with us.",
  },
  google: {
    format: "Offer post",
    spec: "14 days",
    line: "Spring offer — ends in two weeks.",
  },
  x: {
    format: "Thread",
    spec: "3 posts",
    line: "Spring offer's live. Existing customers, this one's yours.",
  },
  email: {
    format: "Email",
    spec: "subject + body",
    line: "Your spring offer is ready",
  },
  sms: {
    format: "SMS",
    spec: "148 chars",
    line: "Spring offer, 2 weeks, just for you. Reply STOP to opt out.",
  },
};

export function ChannelConstellation({
  heading,
  eyebrow,
  intro,
  focus,
  bare = false,
}: ChannelConstellationProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const nodes = root.querySelectorAll<HTMLElement>("[data-node]");
      const hub = root.querySelector<HTMLElement>("[data-hub]");
      const count = root.querySelector<HTMLElement>("[data-count]");
      const progress = root.querySelector<HTMLElement>("[data-progress]");
      const pulse = root.querySelector<HTMLElement>("[data-pulse]");

      const markSent = (i: number) => {
        nodes[i]?.setAttribute("data-sent", "true");
        if (count) count.textContent = String(i + 1);
        if (progress) {
          gsap.to(progress, {
            width: `${((i + 1) / CHANNELS.length) * 100}%`,
            duration: 0.4,
            ease: EASE.out,
          });
        }
      };

      if (prefersReducedMotion()) {
        /* Show the finished state rather than a half-drawn diagram, so
           the section still reads as complete without motion. */
        gsap.set([...nodes, hub].filter(Boolean), { opacity: 1, x: 0, y: 0 });
        nodes.forEach((n, i) => {
          n.setAttribute("data-sent", "true");
          if (count) count.textContent = String(i + 1);
        });
        if (progress) gsap.set(progress, { width: "100%" });
        return;
      }

      /* The live dot on the console, running the whole time. */
      if (pulse) {
        gsap.to(pulse, {
          scale: 2.4,
          opacity: 0,
          duration: 1.6,
          repeat: -1,
          ease: "sine.out",
          transformOrigin: "50% 50%",
        });
      }

      /* Entrance: the panel, then the rows arriving. */
      gsap
        .timeline({
          scrollTrigger: { trigger: root, start: "top 75%", once: true },
        })
        .fromTo(
          hub,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: DURATION.base, ease: EASE.out },
        )
        .fromTo(
          nodes,
          { opacity: 0, x: -8 },
          {
            opacity: 1,
            x: 0,
            duration: DURATION.base,
            stagger: 0.06,
            ease: EASE.out,
          },
          "-=0.4",
        );

      /* The dispatch loop: one channel publishes at a time, then the
         run resets. Each row holds for a beat after it lands so the
         draft can be read before the run moves on. */
      const run = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.4,
        delay: 1.1,
        scrollTrigger: { trigger: root, start: "top 75%" },
        onRepeat: () => {
          nodes.forEach((n) => n.removeAttribute("data-sent"));
          if (count) count.textContent = "0";
          if (progress) gsap.set(progress, { width: 0 });
        },
      });

      CHANNELS.forEach((_, i) => {
        run.add(() => markSent(i)).to({}, { duration: 0.46 });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const diagram = (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="relative mx-auto w-full max-w-[26rem] select-none lg:max-w-[30rem]"
    >
      {/* One panel, not a full-width table. The brief sits at the top,
          the fan carries it down, and the channels stack below — so the
          whole thing is a single object sized to a column, the way the
          panels on the other feature pages are. */}
      <div
        data-hub
        className="relative overflow-hidden rounded-panel border border-line bg-surface shadow-float"
      >
        <span
          aria-hidden="true"
          className="bg-brand absolute inset-x-0 top-0 z-10 h-[2px]"
        />

        {/* Console bar. */}
        <div className="flex items-center gap-2 border-b border-line bg-surface-soft px-4 py-3">
          <span className="relative flex size-1.5">
            <span className="bg-brand absolute inset-0 rounded-full" />
            <span
              data-pulse
              className="bg-brand absolute inset-0 rounded-full"
            />
          </span>
          <span className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted/70">
            Dispatching
          </span>
          <span className="ml-auto font-mono text-[0.6875rem] tabular-nums text-muted">
            <span data-count>0</span>/7
          </span>
        </div>

        {/* The brief. */}
        <div className="px-4 pb-4 pt-3.5">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted/70">
            The brief
          </p>
          <p className="mt-2 text-[0.875rem] font-medium leading-snug text-foreground">
            Spring offer, two weeks, for existing customers.
          </p>

          <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-surface-sunk">
            <span
              data-progress
              className="bg-brand block h-full w-0 rounded-full"
            />
          </div>
        </div>

        {/* A labelled seam instead of drawn connectors. It states the
            relationship the fan was trying to illustrate, and unlike
            the fan it stays true at any panel width. */}
        <div className="flex items-center gap-2 border-y border-line bg-surface-soft px-4 py-2">
          <span className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted/70">
            Becomes
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-line" />
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted/70">
            7 drafts
          </span>
        </div>

        {/* The channels. */}
        <ul className="divide-y divide-line">
          {CHANNELS.map((channel) => {
            const isFocus = focus === channel.name;
            const draft = DRAFTS[channel.name];
            return (
              <li
                key={channel.name}
                data-node
                className={cn(
                  "group relative overflow-hidden transition-colors duration-400",
                  isFocus && "bg-accent-soft/40",
                )}
              >
                {/* The row washes brand as it publishes. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-[linear-gradient(to_right,rgba(var(--brand-blue-rgb),0.09),transparent)] transition-[width] duration-700 ease-[var(--ease-out-soft)] group-data-[sent]:w-full"
                />

                <div className="relative flex items-center gap-3 px-4 py-3">
                  <span
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-[0.4rem] border border-line bg-surface-soft",
                      "transition-colors duration-300",
                      "group-data-[sent]:border-accent-line group-data-[sent]:bg-accent-soft",
                    )}
                  >
                    <BrandGlyph name={channel.name} className="size-3.5" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-[0.875rem] font-semibold leading-tight text-foreground">
                        {channel.label}
                      </span>
                      <span className="shrink-0 rounded-[0.25rem] bg-surface-soft px-1.5 py-0.5 font-mono text-[0.6875rem] leading-none text-muted/80">
                        {draft.spec}
                      </span>
                    </span>
                    <span className="mt-1 block truncate text-[0.875rem] leading-snug text-muted">
                      {draft.line}
                    </span>
                  </span>

                  {/* A tick on publish. The word "published" on every
                      row was seven repetitions of the same label. */}
                  <span className="shrink-0">
                    <span className="block size-4 rounded-full border border-dashed border-line-strong group-data-[sent]:hidden" />
                    <span className="bg-brand hidden size-4 items-center justify-center rounded-full text-white group-data-[sent]:flex">
                      <svg viewBox="0 0 24 24" className="size-2.5" fill="none">
                        <path
                          d="M5 13l4 4L19 7"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        {/* The seam above already says "becomes 7 drafts", so the
            footer carries the one fact it does not: what reaches the
            systems CampaignX is not. */}
        <p className="flex items-center justify-between border-t border-line bg-surface-soft px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted/70">
          <span>Approve before publish</span>
          <span>+ webhooks</span>
        </p>
      </div>
    </div>
  );

  if (bare) return diagram;

  return (
    <section className="relative isolate py-[clamp(3.25rem,5.5vw,5rem)]">
      <SectionGlow position="center" />

      <Container>
        <div className="max-w-[46rem]">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h2 className="text-display mt-4 text-[clamp(1.75rem,3.4vw,2.6rem)] font-medium leading-[1.12] tracking-[-0.03em]">
            {heading}
          </h2>
          {intro ? (
            <p className="mt-4 max-w-[40rem] text-[1.0625rem] leading-relaxed text-muted-strong">
              {intro}
            </p>
          ) : null}
        </div>

        <div className="mt-10">{diagram}</div>
      </Container>
    </section>
  );
}
