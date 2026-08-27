"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { withHighlight } from "@/components/ui/Highlight";
import { howItWorks } from "@/config/content";
import {
  gsap,
  registerGsap,
  prefersReducedMotion,
  ScrollTrigger,
} from "@/lib/animations/gsap";
import { revealOnScroll } from "@/lib/animations/reveal";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const STEPS = howItWorks.steps;

/**
 * How it works — a pinned, scroll-driven sequence.
 *
 * The section pins while the page scrolls through it, and the four steps
 * cross-fade in place rather than stacking down the page. Scroll position
 * *is* progress through the process, which is the whole idea: one gesture,
 * four states, no scrolling past three-quarters of the content to find the
 * end of the story.
 *
 * A progress rail on the left tracks which step is active. Under reduced
 * motion (and before hydration) the pin is skipped entirely and all four
 * steps render as a plain stacked list, so nothing is hidden or unreachable.
 */
export function HowItWorks() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    registerGsap();

    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      /* The heading carries data-animate="reveal", and the CSS in
         animations.css hides those until GSAP reveals them. This has to run
         on every path, not just the reduced-motion one — skipping it leaves
         the heading at opacity 0 permanently. */
      revealOnScroll(root, { stagger: 0.1, start: "top 80%" });

      if (prefersReducedMotion()) return;

      const stage = root.querySelector<HTMLElement>("[data-how-stage]");
      if (!stage) return;

      /* One viewport of scroll per step, so each gets equal dwell time. */
      const trigger = ScrollTriggerFor(stage, STEPS.length, setActive);
      return () => trigger?.kill();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id={SECTION_IDS.how}
      aria-labelledby="how-heading"
      /* The band is painted by the gradient below rather than by a flat
         background, so the cream fades in and out instead of starting on a
         hard line. The colour itself is sampled from the illustrations, and
         has to stay: it is what stops each one showing a pale rectangle
         where its own ground meets the page. */
      className="relative isolate py-[110px]"
    >
      {/* The band. Solid through the middle where the artwork sits, fading
          to the page colour at both ends. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,var(--background),var(--surface-warm)_14%,var(--surface-warm)_86%,var(--background))]"
      />

      <Container>
        <div ref={rootRef}>
          {/* Heading */}
          <div className="mx-auto flex max-w-[64rem] flex-col items-center gap-5 text-center">
            <Eyebrow data-animate="reveal">{howItWorks.eyebrow}</Eyebrow>

            <h2
              id="how-heading"
              data-animate="reveal"
              className="text-display max-w-[52rem] text-balance text-[clamp(2rem,4.4vw,3.75rem)]"
            >
              {withHighlight(howItWorks.heading, howItWorks.headingHighlight)}
            </h2>

            <p
              data-animate="reveal"
              className="max-w-[60ch] text-balance text-[1.0625rem] leading-relaxed text-muted"
            >
              {howItWorks.supporting}
            </p>
          </div>

          {/* Both layouts are rendered and CSS chooses between them, rather
              than React state: swapping in an effect costs a second render
              pass, and it would also mean the server HTML never contains the
              real content. The stacked list is the source of truth for
              reduced-motion users and for anything reading the markup. */}
          <div className="motion-reduce:hidden">
            <PinnedSequence active={active} />
          </div>
          <div className="hidden motion-reduce:block">
            <StackedSteps />
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Builds the pin. Extracted so the effect above stays readable. */
function ScrollTriggerFor(
  stage: HTMLElement,
  count: number,
  onChange: (index: number) => void,
) {
  return ScrollTrigger.create({
    trigger: stage,
    start: "center center",
    end: () => `+=${window.innerHeight * (count - 1)}`,
    pin: true,
    pinSpacing: true,
    scrub: true,
    onUpdate: (self) => {
      /* Split the scrubbed progress into equal bands, one per step. */
      const index = Math.min(count - 1, Math.floor(self.progress * count));
      onChange(index);
    },
  });
}

/**
 * The pinned stage: rail, copy and artwork, all cross-fading in place.
 *
 * Height is fixed rather than derived from content. While pinned the stage
 * fills the viewport, so a height that changed with each step's copy would
 * shift the artwork every time the step advanced.
 */
function PinnedSequence({ active }: { active: number }) {
  return (
    <div
      data-how-stage
      className="mt-14 flex min-h-[34rem] flex-col justify-center gap-10 sm:mt-16 lg:grid lg:min-h-[38rem] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-12"
    >
      {/* Left: copy on the open page — no card, no shadow.
          Structure comes from a single vertical accent rule and consistent
          left alignment instead of a surface, so the column still holds
          together against the artwork without competing with it. */}
      <div className="relative border-l-2 border-line pl-7 sm:pl-9">
        {/* The rule's lit portion tracks progress through the steps. */}
        <span
          aria-hidden="true"
          className="bg-brand absolute -left-0.5 top-0 w-0.5 rounded-full transition-[height] duration-700 ease-[var(--ease-out-soft)]"
          style={{ height: `${((active + 1) / STEPS.length) * 100}%` }}
        />
        {/* Copy. All four are stacked in the same box; only the active one
            is visible, so the card never changes height as steps swap. */}
        <div className="relative min-h-[21rem]">
          {STEPS.map((step, i) => (
            <div
              key={step.step}
              aria-hidden={i !== active}
              className={cn(
                "flex flex-col transition-all duration-500 ease-[var(--ease-out-soft)]",
                i === active
                  ? "relative opacity-100 blur-0"
                  : "pointer-events-none absolute inset-0 translate-y-3 opacity-0 blur-[3px]",
              )}
            >
              <h3 className="text-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15]">
                {step.title}
              </h3>

              <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted">
                {step.description}
              </p>

              {/* The figure and its takeaway on one baseline.

                  The number and its unit sit together as a single phrase —
                  "1 sentence", "9 channels" — rather than stacking the label
                  under the figure, which read as two unrelated fragments.
                  The takeaway follows on the same line at reading size, so
                  the whole thing scans as one sentence. */}
              <p className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-display text-brand text-[clamp(2.25rem,3.6vw,3rem)] leading-none">
                  {step.stat.value}
                </span>
                <span className="text-display text-[1.125rem] text-muted-strong">
                  {step.stat.label}
                </span>
                <span
                  aria-hidden="true"
                  className="mx-1 h-4 w-px self-center bg-line-strong"
                />
                <span className="text-[1rem] leading-relaxed text-muted-strong">
                  {step.takeaway}
                </span>
              </p>

              {/* Proof points, on a rule rather than in chips. Pills made
                  three short phrases look like navigation; a single ruled
                  row keeps them as supporting detail. */}
              <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5">
                {step.points.map((point) => (
                  <li
                    key={point}
                    className="inline-flex items-center gap-2 text-[0.875rem] text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="bg-brand block size-1 shrink-0 rounded-full"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>


      {/* Right: the artwork, cross-fading between steps.
          A soft tinted ground sits behind it: the illustrations are on a
          warm off-white that is very close to the page, so without a
          backdrop the whole column reads as empty space. */}
      <div className="relative mx-auto aspect-square w-full max-w-[30rem] lg:max-w-none">
        {STEPS.map((step, i) =>
          step.image ? (
            <StepArtwork
              key={step.step}
              src={step.image}
              alt=""
              active={i === active}
              priority={i === 0}
            />
          ) : null,
        )}
      </div>
    </div>
  );
}

/**
 * One piece of step artwork.
 *
 * The illustrations are rendered on a warm off-white ground that is close
 * to the page background but not identical, so they are masked at the edges
 * rather than dropped into a card — a hard rectangle would show the seam.
 */
function StepArtwork({
  src,
  alt,
  active,
  priority,
}: {
  src: string;
  alt: string;
  active: boolean;
  priority: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 transition-all duration-700 ease-[var(--ease-out-soft)]",
        active
          ? "scale-100 opacity-100 blur-0"
          : "pointer-events-none scale-[0.97] opacity-0 blur-[6px]",
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={1254}
        height={1254}
        sizes="(min-width: 1024px) 680px, 100vw"
        priority={priority}
        className="h-full w-full object-contain"
      />
    </div>
  );
}

/**
 * The no-JS and reduced-motion layout: every step as a plain stacked row,
 * nothing hidden behind an interaction.
 */
function StackedSteps() {
  return (
    <ol className="mt-16 flex flex-col gap-16 sm:mt-20 sm:gap-20">
      {STEPS.map((step, index) => (
        <li
          key={step.step}
          data-animate="reveal"
          className={cn(
            "grid items-center gap-8 lg:grid-cols-2 lg:gap-16",
            index % 2 === 1 && "lg:[&>*:first-child]:order-2",
          )}
        >
          <div className="flex flex-col gap-3.5">
            <span className="text-eyebrow text-accent">{step.step}</span>

            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-display text-brand text-[clamp(2.25rem,3.6vw,3rem)] leading-none">
                {step.stat.value}
              </span>
              <span className="text-display text-[1.125rem] text-muted-strong">
                {step.stat.label}
              </span>
              <span
                aria-hidden="true"
                className="mx-1 h-4 w-px self-center bg-line-strong"
              />
              <span className="text-[1rem] leading-relaxed text-muted-strong">
                {step.takeaway}
              </span>
            </p>

            <h3 className="text-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15]">
              {step.title}
            </h3>

            <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted">
              {step.description}
            </p>

            <ul className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5">
              {step.points.map((point) => (
                <li
                  key={point}
                  className="inline-flex items-center gap-2 text-[0.875rem] text-muted"
                >
                  <span
                    aria-hidden="true"
                    className="bg-brand block size-1 shrink-0 rounded-full"
                  />
                  {point}
                </li>
              ))}
            </ul>

          </div>

          {step.image ? (
            <Image
              src={step.image}
              alt=""
              width={1254}
              height={1254}
              sizes="(min-width: 1024px) 680px, 100vw"
              className="h-auto w-full"
            />
          ) : null}
        </li>
      ))}
    </ol>
  );
}
