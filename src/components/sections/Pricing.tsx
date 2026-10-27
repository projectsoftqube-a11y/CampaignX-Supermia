import Link from "next/link";
import { Check, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { withHighlight } from "@/components/ui/Highlight";
import { SectionGlow } from "@/components/ui/SectionGlow";
import { pricing } from "@/config/content";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { getLivePlans } from "@/lib/billing";
import { ContactSalesButton } from "@/components/sections/ContactSalesButton";

/** Shared CTA styling so the link and button variants look identical. */
const ctaClass =
  "mt-6 inline-flex h-12 w-full shrink-0 items-center justify-center rounded-pill px-6 text-[0.9375rem] font-medium transition-[background-color,border-color,box-shadow,transform,filter] duration-200 ease-[var(--ease-out-soft)]";

function ctaVariant(featured: boolean): string {
  return featured
    ? "bg-brand shadow-brand text-white hover:-translate-y-px hover:brightness-[1.07] hover:shadow-brand-hover"
    : "border border-line bg-surface text-foreground hover:border-line-strong hover:bg-white";
}

/**
 * Sign-up link for a plan, carrying the slug through as `?plan=<slug>` so the
 * app can preselect it.
 */
function planHref(slug: string): string {
  const base = siteConfig.signupUrl;
  if (!slug) return base;
  const separator = base.includes("?") ? "&" : "?";
  return `${base}${separator}plan=${encodeURIComponent(slug)}`;
}

/**
 * Pricing.
 *
 * Sits directly before the FAQ, which handles the objections a price tends
 * to raise.
 *
 * Plans come from the billing API when `BILLING_API_BASE_URL` is configured,
 * and fall back to the static figures in content config otherwise, so the
 * section renders even if the API is unreachable.
 *
 * Server-rendered: no billing toggle, so there is no state to hydrate. If a
 * monthly/annual switch is added later this becomes a client component.
 */
export async function Pricing() {
  const plans = await getLivePlans();

  // No plans means the API is unreachable or returned nothing usable. Render
  // nothing rather than showing stale or invented prices.
  if (!plans || plans.length === 0) return null;

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative isolate py-[90px]"
    >
      <SectionGlow position="right" />

      <Container width="wide">
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

          <ul className="mt-16 grid items-stretch gap-5 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <li
                key={plan.id}
                data-animate="reveal"
                className={cn(
                  "relative flex h-full flex-col rounded-frame border p-7 transition-[transform,box-shadow,border-color] duration-200 ease-[var(--ease-out-soft)] sm:p-8",
                  plan.featured
                    ? "border-accent-line bg-surface shadow-float lg:-translate-y-3"
                    : "border-line bg-surface hover:-translate-y-1 hover:border-line-strong hover:shadow-float",
                )}
              >
                {plan.featured ? (
                  <span className="bg-brand shadow-brand absolute -top-3 left-7 rounded-pill px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] text-white uppercase">
                    Most teams
                  </span>
                ) : null}

                {/* Header. Fixed height so the price row starts on the same
                    line across cards whose summaries differ in length. */}
                <div className="min-h-[5.5rem]">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-display text-[1.25rem]">{plan.name}</h3>
                    {plan.isCustom ? (
                      <span className="rounded-pill border border-accent-line px-2.5 py-1 text-[0.875rem] font-medium text-accent">
                        Enterprise
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                    {plan.summary}
                  </p>
                </div>

                {/* Price. Fixed height so every CTA lines up, whether the
                    figure is "$30" or wraps like "Flexible Pricing". */}
                <div className="flex min-h-[4.75rem] flex-col justify-center border-t border-line pt-6">
                  <p className="flex items-baseline gap-2">
                    <span className="text-display text-[clamp(2rem,3vw,2.5rem)] leading-[1.1]">
                      {plan.price}
                    </span>
                    {plan.priceNote ? (
                      <span className="text-[0.9375rem] text-muted">
                        {plan.priceNote}
                      </span>
                    ) : null}
                  </p>
                  {plan.priceCaption ? (
                    <p className="mt-1.5 text-[0.875rem] text-muted">
                      {plan.priceCaption}
                    </p>
                  ) : null}
                </div>

                {plan.isCustom ? (
                  <ContactSalesButton
                    label={plan.cta}
                    className={cn(ctaClass, ctaVariant(plan.featured))}
                  />
                ) : (
                  <Link
                    href={planHref(plan.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(ctaClass, ctaVariant(plan.featured))}
                  >
                    {plan.cta}
                  </Link>
                )}

                <ul className="mt-7 flex flex-col gap-3 border-t border-line pt-7">
                  {plan.points.map(({ label, included }) => (
                    <li
                      key={label}
                      className={cn(
                        "flex items-start gap-3 text-[0.9375rem] leading-relaxed",
                        included ? "text-muted-strong" : "text-muted",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                          included ? "bg-brand-soft" : "bg-line",
                        )}
                      >
                        {included ? (
                          <Check
                            className="size-3 text-accent"
                            strokeWidth={2.5}
                          />
                        ) : (
                          <X className="size-3 text-muted" strokeWidth={2.5} />
                        )}
                      </span>
                      <span className="sr-only">
                        {included ? "Included:" : "Not included:"}
                      </span>
                      {label}
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
