"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  ScrollTrigger,
} from "@/lib/animations/gsap";
import { revealOnScroll } from "@/lib/animations/reveal";
import { cn } from "@/lib/utils";

export interface Step {
  title: string;
  body: string;
  /** Short label shown in the progress rail. */
  marker: string;
}

interface StepSequenceProps {
  heading: string;
  eyebrow?: string;
  intro?: string;
  steps: readonly Step[];
  id?: string;
  /**
   * Artwork shown beside the active step. Without it the pinned stage
   * leaves two-thirds of the viewport empty, which is what a pinned
   * section makes most obvious.
   */
  media?: readonly { src: string; alt: string }[];
}

/**
 * A pinned, scroll-driven sequence — the same mechanic as the homepage's
 * "How it works", reused so inner pages feel like the same site.
 *
 * The section pins and the steps cross-fade in place, so scroll position is
 * progress through the process rather than distance down a list.
 *
 * Three things keep it honest:
 *   - Below `lg` the pin is skipped. Pinning something `display:none` makes
 *     ScrollTrigger reserve scroll distance for content nobody can see,
 *     which adds several viewports of dead scroll on a phone.
 *   - Under reduced motion the pin is skipped too, and every step renders
 *     as a plain stacked list.
 *   - The stacked list is the server-rendered markup, so the content is
 *     present and readable before (and without) JavaScript.
 */
export function StepSequence({
  heading,
  eyebrow,
  intro,
  steps,
  id,
  media,
}: StepSequenceProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      revealOnScroll(root, { stagger: 0.1, start: "top 80%" });

      if (prefersReducedMotion()) return;
      if (!window.matchMedia("(min-width: 1024px)").matches) return;

      const stage = root.querySelector<HTMLElement>("[data-step-stage]");
      if (!stage) return;

      const trigger = ScrollTrigger.create({
        trigger: stage,
        start: "center center",
        end: () => `+=${window.innerHeight * (steps.length - 1) * 0.55}`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const index = Math.min(
            steps.length - 1,
            Math.floor(self.progress * steps.length),
          );
          setActive(index);
        },
      });

      return () => trigger.kill();
    }, root);

    return () => ctx.revert();
  }, [steps.length]);

  return (
    <section id={id} className="relative isolate py-[clamp(3.25rem,5.5vw,5rem)]">
      <Container>
        <div ref={rootRef}>
          <div className="max-w-[46rem]">
            {eyebrow ? <Eyebrow data-animate="reveal">{eyebrow}</Eyebrow> : null}
            <h2
              data-animate="reveal"
              className="text-display mt-4 text-[clamp(1.75rem,3.4vw,2.6rem)] font-medium leading-[1.12] tracking-[-0.03em]"
            >
              {heading}
            </h2>
            {intro ? (
              <p
                data-animate="reveal"
                className="mt-4 text-[1.0625rem] leading-relaxed text-muted-strong"
              >
                {intro}
              </p>
            ) : null}
          </div>

          {/* Desktop: pinned cross-fade stage.

              Three columns, not two. The copy alone left most of a pinned
              viewport empty — the artwork on the right is what makes the
              pin worth the scroll it costs. */}
          <div
            data-step-stage
            className={cn(
              "mt-10 hidden lg:grid lg:gap-10",
              media
                ? "lg:grid-cols-[13rem_minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center"
                : "lg:grid-cols-[14rem_1fr]",
            )}
          >
            {/* Progress rail */}
            <ol className="relative border-l border-line pl-6">
              {steps.map((step, index) => (
                <li key={step.title} className="relative py-3">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -left-[1.6875rem] top-1/2 h-6 w-[2px] -translate-y-1/2 rounded-full transition-colors duration-500",
                      index === active ? "bg-brand" : "bg-transparent",
                    )}
                  />
                  <span
                    className={cn(
                      "text-[0.9375rem] transition-colors duration-500",
                      index === active ? "text-foreground" : "text-muted/70",
                    )}
                  >
                    {step.marker}
                  </span>
                </li>
              ))}
            </ol>

            {/* Copy. Every step occupies the same grid cell, so the tallest
                sets the height and the rest overlay it — a fixed height
                either clipped a long step or left dead space under a
                short one. */}
            <div className="relative grid">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  aria-hidden={index !== active}
                  className={cn(
                    "col-start-1 row-start-1 transition-[opacity,transform] duration-700 ease-[var(--ease-out-soft)]",
                    index === active
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-3 opacity-0",
                  )}
                >
                  <p className="text-eyebrow text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-display mt-3 text-[clamp(1.5rem,2.6vw,2.125rem)] font-medium leading-tight tracking-[-0.025em]">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-[34rem] text-[1.0625rem] leading-relaxed text-muted-strong">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Artwork, cross-fading with the copy. */}
            {media ? (
              <div className="relative grid">
                {steps.map((step, index) => {
                  const art = media[index % media.length];
                  return (
                    <div
                      key={step.title}
                      aria-hidden="true"
                      className={cn(
                        "col-start-1 row-start-1 overflow-hidden rounded-frame border border-line bg-surface-soft shadow-float transition-[opacity,transform] duration-700 ease-[var(--ease-out-soft)]",
                        index === active
                          ? "scale-100 opacity-100"
                          : "pointer-events-none scale-[0.97] opacity-0",
                      )}
                    >
                      <Image
                        src={art.src}
                        alt=""
                        width={900}
                        height={900}
                        sizes="34vw"
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>

          {/* Mobile, and the no-JS / reduced-motion path. */}
          <ol className="mt-9 space-y-8 lg:hidden">
            {steps.map((step, index) => (
              <li key={step.title} data-animate="reveal">
                <p className="text-eyebrow text-muted">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="text-display mt-2 text-[1.375rem] font-medium leading-tight tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[1rem] leading-relaxed text-muted-strong">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
