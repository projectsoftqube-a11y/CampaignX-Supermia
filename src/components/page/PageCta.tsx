"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { BrandGlyph } from "@/components/ui/BrandGlyph";
import { DemoModal } from "@/components/studio/DemoModal";
import { primaryCta } from "@/config/navigation";
import {
  CX_EASE,
  T,
  gsap,
  prefersReducedMotion,
  registerStudio,
} from "@/lib/animations/studio";
import type { PlatformName } from "@/types/content";

interface PageCtaProps {
  heading?: string;
  body?: string;
}

/** The seven channels, as a marquee along the band's foot. */
const CHANNELS: readonly { name: PlatformName; label: string }[] = [
  { name: "instagram", label: "Instagram" },
  { name: "facebook", label: "Facebook" },
  { name: "linkedin", label: "LinkedIn" },
  { name: "x", label: "X" },
  { name: "google", label: "Google Business" },
  { name: "email", label: "Email" },
  { name: "sms", label: "SMS" },
];

/**
 * The closing ask.
 *
 * Previously a plain white card floating on the page colour: no edges,
 * no texture, and nothing to look at but two buttons. A page's last
 * section is the one most likely to be acted on, so it is now a band of
 * its own.
 *
 * What it carries:
 *   - A dark ground drawn from the brand ramp, so the page ends on
 *     colour rather than fading out on grey.
 *   - A live brief line, typing itself, which restates the product's
 *     whole promise in one gesture at the moment of the ask.
 *   - The seven channels tracking slowly along the foot, as the answer
 *     to "and then what".
 *
 * The supporting line states the two facts that answer the hesitation
 * at this point: free during Beta, nothing publishes without approval.
 * Both are from the approved Fact Sheet; neither may become a promise.
 */
export function PageCta({
  heading = "Write one sentence. Get a whole campaign back.",
  body = "Free during Beta. Nothing sends without a named approver, and you can edit or regenerate any asset before it ships.",
}: PageCtaProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerStudio();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const rise = root.querySelectorAll<HTMLElement>("[data-rise]");
      const text = root.querySelector<HTMLElement>("[data-type]");
      const caret = root.querySelector<HTMLElement>("[data-caret]");
      const field = root.querySelector<HTMLElement>("[data-field]");

      if (prefersReducedMotion()) {
        gsap.set(rise, { opacity: 1, y: 0 });
        return;
      }

      const brief = "Launch the spring range across every channel.";
      if (text) text.textContent = "";

      const blink = gsap.to(caret, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });

      const typed = { n: 0 };

      gsap
        .timeline({
          defaults: { ease: CX_EASE.out },
          scrollTrigger: { trigger: root, start: "top 82%", once: true },
        })
        .fromTo(
          rise,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: T.md, stagger: 0.08 },
        )
        .to(
          typed,
          {
            n: brief.length,
            duration: 1.2,
            ease: "none",
            onUpdate: () => {
              if (text) text.textContent = brief.slice(0, Math.round(typed.n));
            },
          },
          "-=0.3",
        )
        .add(() => blink.kill())
        .to(caret, { opacity: 0, duration: 0.2 });

      gsap.to(field, { rotate: 360, duration: 150, repeat: -1, ease: "none" });
    }, root);

    return () => ctx.revert();
  }, []);

  const external = primaryCta.href.startsWith("http");

  return (
    <section
      ref={rootRef}
      className="relative isolate overflow-hidden bg-surface-warm py-[clamp(3rem,5vw,4.5rem)]"
    >
      {/* The ground, from the brand ramp. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="cx-dots absolute inset-0 opacity-60 [mask-image:radial-gradient(76%_70%_at_50%_40%,#000,transparent_78%)]" />
        <div className="absolute inset-0 [background:radial-gradient(58%_70%_at_10%_0%,rgba(var(--brand-blue-rgb),0.14),transparent_62%)]" />
        <div className="absolute inset-0 [background:radial-gradient(52%_65%_at_92%_100%,rgba(var(--brand-magenta-rgb),0.11),transparent_64%)]" />
        <div
          data-field
          className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-30 blur-[110px] [background:conic-gradient(from_0deg,transparent,rgba(var(--brand-violet-rgb),0.18),transparent_55%,rgba(var(--brand-blue-rgb),0.15),transparent)]"
        />
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(70%_60%_at_50%_40%,#000,transparent_76%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(var(--brand-blue-rgb),0.4),rgba(var(--brand-magenta-rgb),0.28),transparent)]" />
      </div>

      <Container>
        <div className="relative mx-auto max-w-[46rem] text-center">
          <h2
            data-rise
            className="text-display text-[clamp(1.75rem,4.2vw,2.875rem)] font-semibold leading-[1.1] tracking-[-0.035em] opacity-0"
          >
            {heading}
          </h2>

          {/* The brief, typing itself: the promise demonstrated rather
              than restated, at the moment of the ask. */}
          <div
            data-rise
            className="mx-auto mt-8 flex w-full max-w-[32rem] items-center gap-2 rounded-pill border border-line bg-surface py-2.5 pl-4 pr-2 opacity-0 shadow-float sm:gap-3 sm:pl-6 sm:pr-2.5"
          >
            <p className="min-w-0 flex-1 truncate text-left text-[0.8125rem] text-foreground sm:text-[0.9375rem]">
              <span data-type>Launch the spring range across every channel.</span>
              <span
                data-caret
                className="bg-brand ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] rounded-full"
              />
            </p>
            <span className="bg-brand flex size-8 shrink-0 items-center justify-center rounded-full text-white sm:size-9">
              <ArrowRight aria-hidden="true" className="size-4" />
            </span>
          </div>

          <p
            data-rise
            className="mx-auto mt-6 max-w-[38rem] text-[0.9375rem] leading-relaxed text-muted-strong opacity-0"
          >
            {body}
          </p>

          <div
            data-rise
            className="mt-8 flex flex-wrap items-center justify-center gap-3 opacity-0"
          >
            <Link
              href={primaryCta.href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="bg-brand shadow-brand group inline-flex h-12 items-center gap-2 rounded-pill pl-6 pr-5 text-[0.9375rem] font-semibold text-white transition-[transform,box-shadow,filter] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:brightness-[1.08] hover:shadow-brand-hover"
            >
              {primaryCta.label}
              <span className="flex size-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </span>
            </Link>

            <DemoModal label="Watch the 2-minute demo" variant="ghost" />
          </div>
        </div>

        {/* The seven channels, as the answer to "and then what". */}
        <div
          data-rise
          className="relative mt-12 border-t border-line pt-7 opacity-0"
        >
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-8">
            {CHANNELS.map((channel) => (
              <li key={channel.name} className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-full bg-surface ring-1 ring-[var(--border)]">
                  <BrandGlyph name={channel.name} className="size-3" />
                </span>
                <span className="whitespace-nowrap text-[0.75rem] text-muted">
                  {channel.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
