"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { BrandGlyph } from "@/components/ui/BrandGlyph";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { withHighlight } from "@/components/ui/Highlight";
import { primaryCta } from "@/config/navigation";
import {
  CX_EASE,
  T,
  gsap,
  prefersReducedMotion,
  registerStudio,
} from "@/lib/animations/studio";
import type { BreadcrumbStep } from "@/lib/schema";
import type { PlatformName } from "@/types/content";
import { cn } from "@/lib/utils";

export interface PageOpeningProps {
  kicker: string;
  /** Plain heading text. */
  title: string;
  /** One word in `title` set in the highlight face, as the homepage does. */
  highlight?: string;
  intro: string;
  /**
   * Kept for the page's BreadcrumbList schema, which PageShell builds
   * from the same array. No visible trail is rendered: the header menu
   * already shows where the page sits, and the trail sat awkwardly
   * under the floating header.
   */
  breadcrumbs?: readonly BreadcrumbStep[];
  /** Types itself into the card, exactly like the homepage prompt. */
  brief: string;
  /** Three short proof facts under the fan. */
  facts?: readonly { label: string; value: string }[];
  /** Which channels the connectors run to. Three fits the width. */
  channels?: readonly PlatformName[];
  cta?: { label: string; href: string };
}

const CHANNEL_LABELS: Record<PlatformName, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  x: "X",
  google: "Google Business",
  email: "Email",
  sms: "SMS",
};

const DEFAULT_CHANNELS: readonly PlatformName[] = [
  "instagram",
  "email",
  "linkedin",
];

/**
 * The inner-page opening, in the homepage's own language.
 *
 * Earlier attempts put inner pages on a dark full-bleed stage. That read
 * as a different site: the homepage is light cream, a dot field, centred
 * display type with one word in the highlight face, a white prompt card,
 * and curved connectors running down into device mocks. This opening is
 * built from the same parts, so an inner page looks like the next page of
 * the same site rather than a different one.
 *
 * What it keeps from the homepage: the cream ground and dot field, the
 * centred composition, the highlight face on one word, the white card
 * with a typed brief, and connectors curving out of the card's base.
 *
 * What it changes, because this is a section page and not the landing
 * page: it is shorter, it carries a breadcrumb and an eyebrow, the card
 * is a brief rather than a working prompt, and the connectors end in
 * compact channel chips instead of full device mocks — the page below has
 * the real detail, so the opening only has to establish the idea.
 */
export function PageOpening({
  kicker,
  title,
  highlight,
  intro,
  brief,
  facts,
  channels = DEFAULT_CHANNELS,
  cta,
}: PageOpeningProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerStudio();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const rise = root.querySelectorAll<HTMLElement>("[data-rise]");
      const card = root.querySelector<HTMLElement>("[data-card]");
      const text = root.querySelector<HTMLElement>("[data-type]");
      const caret = root.querySelector<HTMLElement>("[data-caret]");
      const wires = root.querySelectorAll<SVGPathElement>("[data-wire]");
      const chips = root.querySelectorAll<HTMLElement>("[data-chip]");

      if (prefersReducedMotion()) return;

      /* The markup ships finished, so a blocked script still leaves a
         readable opening. Clear it now the timeline will run. */
      if (text) text.textContent = "";
      gsap.set(chips, { opacity: 0, y: 14 });
      gsap.set(wires, { opacity: 0 });

      const blink = gsap.to(caret, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });

      const typed = { n: 0 };

      gsap
        .timeline({ defaults: { ease: CX_EASE.out }, delay: 0.15 })
        /* fromTo, not from: `from` leaves the element parked at its start
           state if the timeline is interrupted, which is how the card
           ended up invisible. fromTo always lands on an explicit end. */
        .fromTo(
          rise,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: T.md, stagger: 0.08 },
        )
        .fromTo(
          card,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: T.lg },
          "-=0.45",
        )
        .to(
          typed,
          {
            n: brief.length,
            duration: 1.1,
            ease: "none",
            onUpdate: () => {
              if (text) text.textContent = brief.slice(0, Math.round(typed.n));
            },
          },
          "-=0.5",
        )
        .add(() => blink.kill())
        .to(caret, { opacity: 0, duration: 0.2 })
        .fromTo(
          wires,
          { strokeDashoffset: 1, opacity: 1 },
          {
            strokeDashoffset: 0,
            duration: T.lg,
            stagger: 0.08,
            ease: CX_EASE.inOut,
          },
          "-=0.15",
        )
        .to(
          chips,
          { opacity: 1, y: 0, duration: T.md, stagger: 0.09 },
          "-=0.6",
        );
    }, root);

    return () => ctx.revert();
  }, [brief]);

  const action = cta ?? { label: primaryCta.label, href: primaryCta.href };
  const external = action.href.startsWith("http");
  const heading = highlight ? withHighlight(title, highlight) : title;

  return (
    <section className="relative isolate overflow-hidden pt-[calc(var(--header-offset)+3.25rem)] pb-4">
      {/* The homepage's own dot field and a single soft brand light, so
          the opening sits on the same material as the rest of the site. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="cx-dots absolute inset-0 opacity-60 [mask-image:radial-gradient(78%_70%_at_50%_18%,#000,transparent_76%)]" />
        <div className="absolute left-1/2 top-[-18rem] h-[36rem] w-[min(70rem,110vw)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(var(--brand-blue-rgb),0.1),rgba(138,43,226,0.05)_60%,transparent)]" />
      </div>

      <Container>
        <div ref={rootRef} className="flex flex-col items-center text-center">
          <div data-rise>
            <Eyebrow>{kicker}</Eyebrow>
          </div>

          <h1
            data-rise
            className="text-display mt-5 max-w-[18ch] text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.035em]"
          >
            {heading}
          </h1>

          <p
            data-rise
            className="mt-5 max-w-[56ch] text-[clamp(1rem,1.3vw,1.125rem)] leading-[1.65] text-muted"
          >
            {intro}
          </p>

          <div
            data-rise
            className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-3"
          >
            <Link
              href={action.href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={cn(
                "bg-brand shadow-brand group inline-flex h-12 items-center gap-2 rounded-pill pl-6 pr-5 text-[0.9375rem] font-medium text-white",
                "transition-[box-shadow,transform,filter] duration-200 ease-[var(--ease-out-soft)]",
                "hover:-translate-y-px hover:brightness-[1.07] hover:shadow-brand-hover",
              )}
            >
              {action.label}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>

            <span className="text-[0.8125rem] text-muted">
              Free during Beta. Nothing ships without your approval.
            </span>
          </div>

          {/* The brief card, as on the homepage: white, raised, centred. */}
          <div
            data-card
            className="mt-12 w-full max-w-[46rem] rounded-frame border border-line bg-surface px-6 py-5 text-left shadow-float sm:px-8 sm:py-6"
          >
            <p className="text-eyebrow text-muted">The brief</p>
            <p className="mt-2.5 min-h-[1.75rem] text-[1rem] leading-[1.6] text-foreground sm:text-[1.0625rem]">
              <span data-type>{brief}</span>
              <span
                data-caret
                className="bg-brand ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.18em] rounded-full"
              />
            </p>
          </div>

          {/* Connectors fanning out of the card's base into channel chips,
              the same gesture the homepage uses into its device mocks. */}
          <div className="relative w-full max-w-[46rem]">
            <svg
              aria-hidden="true"
              viewBox="0 0 600 90"
              preserveAspectRatio="none"
              className="h-[5.5rem] w-full"
            >
              <defs>
                <linearGradient id="cx-open-wire" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="rgb(var(--brand-blue-rgb))"
                    stopOpacity="0.75"
                  />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {channels.map((_, i) => {
                const span = 600 / channels.length;
                const x = span * (i + 0.5);
                return (
                  <path
                    key={i}
                    data-wire
                    d={`M 300 0 C 300 46, ${x} 40, ${x} 88`}
                    fill="none"
                    stroke="url(#cx-open-wire)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    pathLength={1}
                    style={{ strokeDasharray: 1 }}
                  />
                );
              })}
            </svg>

            <ul className="-mt-3 grid grid-flow-col justify-stretch gap-3">
              {channels.map((name) => (
                <li key={name} data-chip className="flex justify-center">
                  <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-3.5 py-2 shadow-soft">
                    <BrandGlyph name={name} className="size-4" />
                    <span className="whitespace-nowrap text-[0.8125rem] text-muted-strong">
                      {CHANNEL_LABELS[name]}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-5 text-[0.8125rem] text-muted">
            + Facebook, X, Google Business and SMS, from the same brief.
          </p>

          {facts?.length ? (
            <dl
              data-rise
              className="mt-10 grid w-full max-w-[46rem] grid-cols-1 gap-x-10 gap-y-5 border-t border-line pt-7 text-left sm:grid-cols-3"
            >
              {facts.slice(0, 3).map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
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
