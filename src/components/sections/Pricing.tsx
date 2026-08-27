import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { withHighlight } from "@/components/ui/Highlight";
import { SectionGlow } from "@/components/ui/SectionGlow";
import { pricing } from "@/config/content";
import { cn } from "@/lib/utils";

/**
 * Pricing.
 *
 * Sits directly before the FAQ, which handles the objections a price tends
 * to raise.
 *
 * The figures in content config are PLACEHOLDERS. This component reads plan
 * shape, price and features straight from there, so replacing them with
 * real commercial terms needs no change here.
 *
 * Server-rendered: no billing toggle, so there is no state to hydrate. If a
 * monthly/annual switch is added later this becomes a client component.
 */
export function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative isolate py-[90px]"
    >
      <SectionGlow position="right" />

      <Container>
        <Reveal stagger={0.08} start="top 80%">
          {/* Heading */}
          <div className="mx-auto flex max-w-[64rem] flex-col items-center gap-5 text-center">
            <Eyebrow data-animate="reveal">{pricing.eyebrow}</Eyebrow>

            <h2
              id="pricing-heading"
              data-animate="reveal"
              className="text-display max-w-[52rem] text-balance text-[clamp(2rem,4.4vw,3.75rem)]"
            >
              {withHighlight(pricing.heading, pricing.headingHighlight)}
            </h2>

            <p
              data-animate="reveal"
              className="text-[1.0625rem] leading-relaxed text-muted"
            >
              {pricing.supporting.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>

          <ul className="mt-16 grid gap-5 sm:mt-20 lg:grid-cols-3">
            {pricing.plans.map((plan) => (
              <li
                key={plan.name}
                data-animate="reveal"
                className={cn(
                  "relative flex flex-col rounded-frame border p-7 sm:p-8",
                  plan.featured
                    ? "border-accent-line bg-surface shadow-float"
                    : "border-line bg-surface/50",
                )}
              >
                {plan.featured ? (
                  <span className="bg-brand shadow-brand absolute -top-3 left-7 rounded-pill px-3 py-1 text-[0.625rem] font-semibold tracking-[0.12em] text-white uppercase">
                    Most teams
                  </span>
                ) : null}

                <h3 className="text-display text-[1.25rem]">{plan.name}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                  {plan.summary}
                </p>

                {/* Price. `monthly: null` is the contact-us tier, which
                    shows its note in place of a figure. */}
                <p className="mt-7 flex items-baseline gap-2">
                  {plan.monthly === null ? (
                    <span className="text-display text-[clamp(2rem,3.4vw,2.75rem)] leading-none">
                      {plan.priceNote}
                    </span>
                  ) : (
                    <>
                      <span className="text-display text-[clamp(2.5rem,4vw,3.25rem)] leading-none">
                        ${plan.monthly}
                      </span>
                      <span className="text-[0.9375rem] text-muted">
                        {plan.priceNote}
                      </span>
                    </>
                  )}
                </p>

                <Link
                  href="#start"
                  className={cn(
                    "mt-7 inline-flex h-12 items-center justify-center rounded-pill px-6 text-[0.9375rem] font-medium transition-[background-color,border-color,box-shadow,transform,filter] duration-200 ease-[var(--ease-out-soft)]",
                    plan.featured
                      ? "bg-brand shadow-brand text-white hover:-translate-y-px hover:brightness-[1.07] hover:shadow-brand-hover"
                      : "border border-line bg-surface text-foreground hover:border-line-strong hover:bg-white",
                  )}
                >
                  {plan.cta}
                </Link>

                <ul className="mt-7 flex flex-col gap-3 border-t border-line pt-7">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-muted-strong"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-soft"
                      >
                        <Check className="size-3 text-accent" strokeWidth={2.5} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
