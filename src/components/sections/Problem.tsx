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

/** Shared column template, so the header, rows and totals stay aligned. */
const COLS =
  "lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.3fr)_minmax(0,1.1fr)]";

/**
 * The problem.
 *
 * The page's first argument, and the one that earns everything below it:
 * without a stated problem, "one brief becomes a campaign" is a solution to
 * nothing.
 *
 * Built as a row-per-stage comparison rather than two separate timelines.
 * Earlier versions put the before and after in different parts of the
 * section, which meant the reader had to hold four facts in their head to
 * make the comparison themselves. Here each row states one stage twice —
 * what it costs today, what it costs in CampaignX — so the contrast is read
 * rather than assembled.
 *
 * The bar on each row is the argument made to scale: it is sized to that
 * stage's share of the three weeks, so the cost is visible before it is
 * read.
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
      revealOnScroll(root, { stagger: 0.08, start: "top 80%" });

      if (prefersReducedMotion()) return;

      /* Each cost bar grows to its share of the three weeks, so the time
         accumulates rather than simply being present. */
      const bars = gsap.utils.toArray<HTMLElement>("[data-cost-bar]", root);
      bars.forEach((bar, i) => {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            delay: i * 0.08,
            ease: "power3.out",
            transformOrigin: "left center",
            scrollTrigger: { trigger: bar, start: "top 88%", once: true },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="relative isolate py-[90px]"
    >
      <SectionGlow position="left" />

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
              The comparison.

              Three columns on desktop: the stage, its cost today, its cost
              in CampaignX. On mobile each stage becomes a stacked block
              carrying its own labels, since three columns of real copy
              cannot survive a narrow screen.
              ------------------------------------------------------------ */}
          <div className="mt-16 sm:mt-20">
            {/* Column headers, desktop only. */}
            <div
              data-animate="reveal"
              className={`hidden items-end gap-8 border-b border-line pb-4 lg:grid ${COLS}`}
            >
              <span className="text-eyebrow text-muted/50">Stage</span>
              <span className="text-eyebrow text-muted/60">
                {problem.beforeLabel}
              </span>
              <span className="text-eyebrow text-accent">
                {problem.afterLabel}
              </span>
            </div>

            <ol className="flex flex-col">
              {stages.map((stage, index) => (
                <li
                  key={stage.role}
                  data-animate="reveal"
                  className={`grid gap-5 border-b border-line py-7 lg:items-center lg:gap-8 ${COLS}`}
                >
                  {/* Stage */}
                  <div className="flex items-baseline gap-3">
                    <span
                      aria-hidden="true"
                      className="text-[0.75rem] tabular-nums text-muted/40"
                    >
                      0{index + 1}
                    </span>
                    <span className="text-display text-[1.125rem]">
                      {stage.role}
                    </span>
                  </div>

                  {/* Today */}
                  <div className="flex flex-col gap-2.5">
                    <span className="text-eyebrow text-muted/50 lg:hidden">
                      {problem.beforeLabel}
                    </span>

                    <div className="flex items-baseline gap-3">
                      <span className="text-display w-[4.25rem] shrink-0 text-[1.375rem] text-muted-strong">
                        {stage.days}
                      </span>
                      <span className="text-[0.9375rem] text-muted">
                        in {stage.tool}
                      </span>
                    </div>

                    {/* Scaled to this stage's share of the three weeks. */}
                    <span
                      aria-hidden="true"
                      className="block h-1.5 overflow-hidden rounded-full bg-surface-sunk"
                      style={{
                        width: `${(parseInt(stage.days, 10) / 21) * 100}%`,
                      }}
                    >
                      <span
                        data-cost-bar
                        className="block h-full w-full origin-left rounded-full bg-muted/35"
                      />
                    </span>

                    <span className="text-[0.875rem] leading-relaxed text-muted line-through decoration-muted/30">
                      {stage.loss}
                    </span>
                  </div>

                  {/* With CampaignX */}
                  <div className="flex flex-col gap-2.5 lg:border-l lg:border-line lg:pl-8">
                    <span className="text-eyebrow text-accent lg:hidden">
                      {problem.afterLabel}
                    </span>

                    <span className="text-display text-brand text-[1.375rem]">
                      {stage.time}
                    </span>

                    <span className="text-[0.9375rem] leading-relaxed text-foreground">
                      {stage.instead}
                    </span>
                  </div>
                </li>
              ))}
            </ol>

            {/* The totals, on the same grid so each figure lands under the
                column it belongs to. */}
            <div
              data-animate="reveal"
              className={`grid gap-6 pt-8 lg:gap-8 ${COLS}`}
            >
              <span className="text-eyebrow text-muted/50 lg:self-center">
                Total
              </span>

              <p className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span className="text-display text-[clamp(2.5rem,5vw,4rem)] leading-none text-muted-strong">
                  {totals.before.value}
                </span>
                <span className="text-display text-[1.125rem] text-muted">
                  {totals.before.unit}
                </span>
                <span className="text-[0.875rem] text-muted/70">
                  {totals.before.note}
                </span>
              </p>

              <p className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 lg:border-l lg:border-line lg:pl-8">
                <span className="text-display text-brand text-[clamp(2.5rem,5vw,4rem)] leading-none">
                  {totals.after.value}
                </span>
                <span className="text-display text-[1.125rem] text-muted-strong">
                  {totals.after.unit}
                </span>
                <span className="text-[0.875rem] text-muted/70">
                  {totals.after.note}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
