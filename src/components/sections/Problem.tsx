"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { withHighlight } from "@/components/ui/Highlight";
import { SectionGlow } from "@/components/ui/SectionGlow";
import { problem } from "@/config/content";
import {
  gsap,
  registerGsap,
  prefersReducedMotion,
} from "@/lib/animations/gsap";
import { revealOnScroll } from "@/lib/animations/reveal";

const { stages, totals } = problem;

/**
 * How each tool card sits on the left field: a percentage offset and a small
 * rotation. Hand-placed rather than generated — the point is that the four
 * tools are scattered and unaligned, and a formula produces a pattern, which
 * is the opposite of what this has to say.
 */
const SCATTER = [
  { top: "2%", left: "4%", rotate: -3.2 },
  { top: "24%", left: "46%", rotate: 2.4 },
  { top: "52%", left: "8%", rotate: 1.8 },
  { top: "72%", left: "44%", rotate: -2.1 },
] as const;

/**
 * The problem.
 *
 * The page's first argument, and the one that earns everything below it:
 * without a stated problem, "one brief becomes a campaign" is a solution to
 * nothing.
 *
 * The two halves are drawn in opposing visual languages, because that
 * contrast is the argument. Left: four tool cards scattered at angles,
 * unaligned, joined by tangled connectors, each carrying the handoff it
 * leaks time into — they sit on the bare page with no surface of their own,
 * so they read as loose objects. Right: a single upright card, squared to
 * the grid, on its own lit surface. You read the difference before any label.
 *
 * Kept in the page's own light palette. The separation is carried by
 * surface, elevation and alignment rather than by inverting the section,
 * which is what the footer already does and would otherwise repeat.
 *
 * Everything is one grid on desktop and stacks on mobile, where the scatter
 * would only produce overlap.
 */
export function Problem() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();

    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      /* Runs on every path: the CSS in animations.css keeps
         [data-animate="reveal"] hidden until GSAP clears it, so skipping it
         on the motion path leaves the section invisible. */
      revealOnScroll(root, { stagger: 0.08, start: "top 78%" });

      if (prefersReducedMotion()) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-tool]", root);
      const wires = gsap.utils.toArray<SVGPathElement>("[data-wire]", root);

      /* The tool cards drop in out of order, which is the point — they are
         not a sequence, they are four things that accumulated. */
      if (cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 26, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: { each: 0.09, from: "random" },
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 70%", once: true },
          },
        );
      }

      /* The tangle draws itself between them. */
      wires.forEach((wire, index) => {
        const length = wire.getTotalLength();
        gsap.set(wire, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(wire, {
          strokeDashoffset: 0,
          duration: 1.1,
          delay: 0.35 + index * 0.12,
          ease: "power2.inOut",
          scrollTrigger: { trigger: root, start: "top 70%", once: true },
        });
      });

      /* The answer arrives last, and arrives in order — top to bottom, one
         clean sequence. The contrast with the left side's `from: "random"`
         is deliberate: same cards, same entrance, opposite character. */
      const steps = gsap.utils.toArray<HTMLElement>(
        "[data-workstep], [data-worktotal]",
        root,
      );
      if (steps.length) {
        gsap.fromTo(
          steps,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            delay: 0.45,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 70%", once: true },
          },
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="relative isolate pt-[90px] sm:pt-[110px]"
    >
      <SectionGlow position="right" />

      <Container>
        <div ref={rootRef}>
          {/* Heading */}
          <div className="mx-auto flex max-w-[64rem] flex-col items-center gap-5 text-center">
            <Eyebrow data-animate="reveal">{problem.eyebrow}</Eyebrow>

            <h2
              id="problem-heading"
              data-animate="reveal"
              className="text-display max-w-[52rem] text-balance text-[clamp(2rem,4.4vw,3.75rem)]"
            >
              {withHighlight(problem.heading, problem.headingHighlight)}
            </h2>

            <p
              data-animate="reveal"
              className="text-[1.0625rem] leading-relaxed text-muted"
            >
              {problem.supporting.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>

          {/* ------------------------------------------------------------
              The split.
              ------------------------------------------------------------ */}
          <div className="mt-16 grid gap-12 sm:mt-20 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:items-stretch lg:gap-10 xl:gap-14">
            {/* ---------------- Left: the mess ---------------- */}
            <div data-animate="reveal" className="flex flex-col">
              <SideHeader
                label={problem.beforeLabel}
                title={problem.beforeTitle}
                tone="dim"
              />

              {/* Desktop: a scatter field. The cards are absolutely placed
                  so they can sit at angles and overlap the connectors. */}
              <div className="relative mt-8 hidden h-[560px] lg:block">
                {/* The tangle, behind the cards. Drawn in viewBox units that
                    map onto the field, so the wires meet the card corners at
                    any width. */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full overflow-visible"
                >
                  {/* Each path runs from one card toward the next. They
                      deliberately cross: four tools with three handoffs
                      between them is not a straight line in practice. */}
                  {[
                    "M22 14 C46 20 30 32 58 34",
                    "M62 44 C40 52 44 56 24 62",
                    "M30 72 C52 70 44 78 58 82",
                  ].map((d) => (
                    <path
                      key={d}
                      data-wire
                      d={d}
                      fill="none"
                      stroke="var(--border-strong)"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeDasharray="0"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </svg>

                <ol className="contents">
                  {stages.map((stage, index) => (
                    <li
                      key={stage.role}
                      data-tool
                      style={{
                        top: SCATTER[index].top,
                        left: SCATTER[index].left,
                        rotate: `${SCATTER[index].rotate}deg`,
                      }}
                      className="absolute w-[52%] max-w-[290px]"
                    >
                      <ToolCard stage={stage} index={index} />
                    </li>
                  ))}
                </ol>
              </div>

              {/* Mobile: the same cards, upright and stacked. A scatter on a
                  narrow screen is just overlap. */}
              <ol className="mt-8 flex flex-col gap-4 lg:hidden">
                {stages.map((stage, index) => (
                  <li key={stage.role}>
                    <ToolCard stage={stage} index={index} />
                  </li>
                ))}
              </ol>

              {/* The bill for the left-hand side. */}
              <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line pt-6 lg:mt-auto">
                <span className="text-display text-[clamp(2.5rem,4.5vw,3.5rem)] leading-none text-muted-strong">
                  {totals.before.value}
                </span>
                <span className="text-display text-[1.125rem] text-muted">
                  {totals.before.unit}
                </span>
                <span className="text-[0.875rem] text-muted">
                  {totals.before.note}
                </span>
              </div>
            </div>

            {/* ---------------- Right: the answer ---------------- */}
            <div data-animate="reveal" className="flex flex-col">
              <SideHeader
                label={problem.afterLabel}
                title={problem.afterTitle}
                tone="brand"
              />

              {/* Clean, open vertical workspace — no nested outer box */}
              <div
                data-workspace
                className="relative mt-8 flex flex-1 flex-col justify-between"
              >
                {/* The stage cards, with a brand gradient spine threaded behind their nodes */}
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="bg-brand pointer-events-none absolute top-8 bottom-8 left-[31px] w-px opacity-25 sm:left-[35px]"
                  />
                  <ol className="flex flex-col gap-3">
                    {stages.map((stage, index) => (
                      <li key={stage.role} data-workstep>
                        <CleanStageCard stage={stage} index={index} />
                      </li>
                    ))}
                  </ol>
                </div>

                {/* The payoff total card — elevated surface card */}
                <div
                  data-worktotal
                  className="group relative mt-5 overflow-hidden rounded-panel bg-brand p-6 shadow-brand transition-transform duration-300 hover:scale-[1.01]"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-1/2 -right-1/4 block size-[80%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.35),transparent)]"
                  />

                  <div className="relative flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-display text-[clamp(2.5rem,4vw,3.25rem)] font-bold leading-none text-white">
                      {totals.after.value}
                    </span>
                    <span className="text-display text-[1.125rem] font-medium text-white/90">
                      {totals.after.unit}
                    </span>
                    <span className="text-[0.875rem] text-white/75 sm:ml-auto">
                      {totals.after.note}
                    </span>
                  </div>
                </div>

                {/* The closing punchline */}
                <p
                  data-worktotal
                  className="text-display mt-6 text-balance text-[clamp(1.125rem,1.6vw,1.375rem)] leading-[1.35]"
                >
                  {problem.punchline}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** The label and title above each half. */
function SideHeader({
  label,
  title,
  tone,
}: {
  label: string;
  title: string;
  tone: "dim" | "brand";
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className={
            tone === "brand"
              ? "bg-brand block size-2 rounded-full"
              : "block size-2 rounded-full bg-muted/30"
          }
        />
        <span
          className={
            tone === "brand" ? "text-eyebrow text-accent" : "text-eyebrow"
          }
        >
          {label}
        </span>
      </span>

      <h3
        className={
          tone === "brand"
            ? "text-display text-[clamp(1.25rem,1.9vw,1.5rem)] leading-[1.25]"
            : "text-display text-[clamp(1.25rem,1.9vw,1.5rem)] leading-[1.25] text-muted-strong"
        }
      >
        {title}
      </h3>
    </div>
  );
}

/**
 * One stage, done in CampaignX.
 * Clean, elegant card on the open page background, aligned along a single spine.
 */
function CleanStageCard({
  stage,
  index,
}: {
  stage: (typeof stages)[number];
  index: number;
}) {
  return (
    <div className="relative flex items-center gap-4 rounded-panel border border-line bg-surface p-4 shadow-soft transition-all duration-300 hover:-translate-y-px hover:border-accent-line hover:shadow-raise sm:p-5">
      {/* The node on the spine */}
      <span
        aria-hidden="true"
        className="bg-brand relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full text-[0.625rem] font-semibold text-white shadow-brand"
      >
        0{index + 1}
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-display truncate text-[1.0625rem] font-semibold">
          {stage.role}
        </span>
        <span className="text-[0.8125rem] leading-snug text-muted">
          {stage.instead}
        </span>
      </span>

      <span className="text-display text-brand shrink-0 text-[1.25rem] font-bold leading-none">
        {stage.time}
      </span>
    </div>
  );
}

/**
 * One stage, done in CampaignX (original light version — kept for reference).
 */
function StageCard({
  stage,
  index,
}: {
  stage: (typeof stages)[number];
  index: number;
}) {
  return (
    <div className="relative flex items-center gap-4 rounded-panel border border-line bg-surface p-4 shadow-soft transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-px hover:border-accent-line hover:shadow-raise sm:p-5">
      <span
        aria-hidden="true"
        className="bg-brand relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full text-[0.625rem] font-semibold text-white shadow-brand"
      >
        0{index + 1}
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-display truncate text-[1.0625rem]">
          {stage.role}
        </span>
        <span className="text-[0.8125rem] leading-snug text-muted">
          {stage.instead}
        </span>
      </span>

      <span className="text-display text-brand shrink-0 text-[1.25rem] leading-none">
        {stage.time}
      </span>
    </div>
  );
}

/**
 * One tool, and what it costs.
 *
 * Deliberately a quiet card: a flat sunk surface, a hairline border and no
 * elevation. It has to look like something lying on the page rather than a
 * designed panel, so the lifted stack opposite reads as the upgrade.
 */
function ToolCard({
  stage,
  index,
}: {
  stage: (typeof stages)[number];
  index: number;
}) {
  return (
    <div className="relative rounded-panel border border-line bg-surface-soft/80 p-5 shadow-xs backdrop-blur-[2px] transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <span className="flex flex-col gap-1">
          <span
            aria-hidden="true"
            className="text-[0.625rem] tabular-nums text-muted/45"
          >
            0{index + 1}
          </span>
          <span className="text-display text-[1.0625rem] text-muted-strong">
            {stage.role}
          </span>
          <span className="text-[0.8125rem] text-muted">in {stage.tool}</span>
        </span>

        <span className="text-display shrink-0 text-[1.375rem] leading-none text-muted-strong">
          {stage.days}
        </span>
      </div>

      <p className="mt-4 border-t border-line pt-3.5 text-[0.8125rem] leading-snug text-muted line-through decoration-muted/25">
        {stage.loss}
      </p>

      {/* The handoff out of this tool, where the time actually goes. */}
      {stage.handoff ? (
        <p className="mt-3 flex items-center gap-2 text-[0.75rem] text-muted">
          <span
            aria-hidden="true"
            className="flex size-4 shrink-0 items-center justify-center rounded-full border border-line-strong"
          >
            <svg viewBox="0 0 24 24" className="size-2" fill="none">
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          then {stage.handoff.toLowerCase()}
        </p>
      ) : null}
    </div>
  );
}
