"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { DemoModal } from "@/components/studio/DemoModal";
import { FanOut } from "@/components/studio/FanOut";
import { primaryCta } from "@/config/navigation";
import {
  CX_EASE,
  T,
  gsap,
  prefersReducedMotion,
  registerStudio,
  revealLines,
} from "@/lib/animations/studio";

export interface InsetHeroProps {
  /** Small pill above the heading, e.g. "BRAND VOICE". */
  tag: string;
  /**
   * The heading. Wrap a phrase in `*asterisks*` to mark it in the accent
   * colour with an underline.
   */
  title: string;
  intro: string;
  cta?: { label: string; href: string };
  /** Opens the demo video over the current page. */
  demoLabel?: string;
  /** Three short facts along the foot. */
  facts?: readonly { label: string; value: string }[];
  /** Typed into the brief field of the fan-out below the copy. */
  brief: string;
}

/**
 * The inner-page opening.
 *
 * Research note: the reference feature pages (Linear, Vercel, and the
 * SuperMIA product sites) put the type first and the product visual
 * beneath it at full width, rather than side by side. A wide visual
 * squeezed into a half-column loses the detail that earns it the space.
 *
 * So: centred copy on a textured light ground, then the fan-out below
 * it at full width — coded rather than rendered, so the brief types
 * itself, the curves draw, and the drafts land.
 */
export function InsetHero({
  tag,
  title,
  intro,
  cta,
  demoLabel,
  facts,
  brief,
}: InsetHeroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    registerStudio();
    const root = rootRef.current;
    const heading = titleRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const rise = root.querySelectorAll<HTMLElement>("[data-rise]");
      const frame = root.querySelector<HTMLElement>("[data-frame]");
      const field = root.querySelector<HTMLElement>("[data-field]");

      if (prefersReducedMotion()) {
        gsap.set([...rise, frame].filter(Boolean), {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      gsap
        .timeline({ defaults: { ease: CX_EASE.out }, delay: 0.15 })
        .fromTo(
          rise,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: T.md, stagger: 0.09 },
        )
        .fromTo(
          frame,
          { opacity: 0, y: 44, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: T.xl },
          "-=0.4",
        );

      if (heading) revealLines(heading, { delay: 0.2, stagger: 0.08 });

      /* The render drifts up a little as the page scrolls past it, so
         the band has depth rather than sliding as one plane. */
      gsap.to(frame, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: frame,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(field, { rotate: 360, duration: 170, repeat: -1, ease: "none" });
    }, root);

    return () => ctx.revert();
  }, []);

  const action = cta ?? { label: primaryCta.label, href: primaryCta.href };
  const external = action.href.startsWith("http");
  const parts = title.split(/(\*[^*]+\*)/g).filter(Boolean);

  return (
    <section
      ref={rootRef}
      className="relative isolate overflow-hidden pb-4 pt-[calc(var(--header-offset)+3.25rem)] sm:pt-[calc(var(--header-offset)+4.5rem)]"
    >
      {/* The ground. Light, textured, never flat. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="cx-dots absolute inset-0 opacity-70 [mask-image:radial-gradient(70%_58%_at_50%_22%,#000,transparent_76%)]" />
        <div className="absolute -left-[10%] -top-[22%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(var(--brand-blue-rgb),0.15),transparent)]" />
        <div className="absolute -right-[8%] -top-[14%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,rgba(var(--brand-magenta-rgb),0.11),transparent)]" />
        <div
          data-field
          className="absolute left-1/2 top-[22%] h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 opacity-25 blur-[100px] [background:conic-gradient(from_0deg,transparent,rgba(var(--brand-violet-rgb),0.24),transparent_54%,rgba(var(--brand-blue-rgb),0.2),transparent)]"
        />
      </div>

      <Container>
        <div className="mx-auto max-w-[52rem] text-center">
          <span
            data-rise
            className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-surface px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-strong opacity-0 shadow-soft"
          >
            <span className="bg-brand size-1.5 rounded-full" />
            {tag}
          </span>

          <h1
            ref={titleRef}
            className="text-display mt-6 text-[clamp(1.75rem,6.4vw,4rem)] font-semibold leading-[1.08] tracking-[-0.035em]"
          >
            {parts.map((part, i) =>
              part.startsWith("*") && part.endsWith("*") ? (
                <span
                  key={i}
                  className="text-accent underline decoration-accent/40 decoration-[3px] underline-offset-[0.18em]"
                >
                  {part.slice(1, -1)}
                </span>
              ) : (
                <span key={i}>{part}</span>
              ),
            )}
          </h1>

          <p
            data-rise
            className="mx-auto mt-6 max-w-[42rem] text-[1.0625rem] leading-[1.65] text-muted-strong opacity-0"
          >
            {intro}
          </p>

          <div
            data-rise
            className="mt-9 flex flex-wrap items-center justify-center gap-3 opacity-0"
          >
            <Link
              href={action.href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="bg-brand shadow-brand group inline-flex h-12 items-center gap-2 rounded-pill pl-6 pr-5 text-[0.9375rem] font-semibold text-white transition-[transform,box-shadow,filter] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:brightness-[1.08] hover:shadow-brand-hover"
            >
              {action.label}
              <span className="flex size-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </span>
            </Link>

            {demoLabel ? <DemoModal label={demoLabel} variant="ghost" /> : null}
          </div>
        </div>

        {/* The render, given its own band. */}
        <div data-frame className="relative mt-14 opacity-0">
          <div className="rounded-frame border border-line bg-surface px-3 py-6 shadow-cinema sm:px-8 sm:py-10">
            <FanOut brief={brief} />
          </div>

          {facts?.length ? (
            <dl className="mx-auto mt-9 grid max-w-[46rem] gap-x-10 gap-y-5 sm:grid-cols-3">
              {facts.slice(0, 3).map((fact) => (
                <div key={fact.label} className="text-center">
                  <dt className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
                    {fact.label}
                  </dt>
                  <dd className="text-display mt-1 text-[1rem] font-medium tracking-[-0.01em]">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
