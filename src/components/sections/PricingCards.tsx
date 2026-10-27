import Link from "next/link";
import { Check, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { withHighlight } from "@/components/ui/Highlight";
import { SectionGlow } from "@/components/ui/SectionGlow";
import { ContactSalesButton } from "@/components/sections/ContactSalesButton";
import type { LivePlan } from "@/lib/billing";
import { cn } from "@/lib/utils";

/** Shared CTA styling so the link and button variants look identical. */
const ctaClass =
  "mt-6 inline-flex h-12 w-full shrink-0 items-center justify-center rounded-pill px-6 text-[0.9375rem] font-medium transition-[background-color,border-color,box-shadow,transform,filter] duration-200 ease-[var(--ease-out-soft)]";

function ctaVariant(featured: boolean): string {
  return featured
    ? "bg-brand shadow-brand text-white hover:-translate-y-px hover:brightness-[1.07] hover:shadow-brand-hover"
    : "border border-line bg-surface text-foreground hover:border-line-strong hover:bg-white";
}

interface Props {
  plans: readonly LivePlan[];
  eyebrow: string;
  heading: string;
  headingHighlight: string;
  supporting: readonly string[];
  /**
   * The sign-up URL. The plan slug is appended here as `?plan=<slug>`
   * rather than being passed in as a function, because a function prop
   * cannot cross the server/client boundary.
   */
  signupUrl: string;
  /** True when these are outline plans shown because the API was down. */
  isFallback?: boolean;
  /** Render the heading as the page's h1 rather than an h2. */
  isPageHeading?: boolean;
}

/** Sign-up link for a plan, carrying the slug so the app can preselect it. */
function planHref(base: string, slug: string): string {
  if (!slug) return base;
  const separator = base.includes("?") ? "&" : "?";
  return `${base}${separator}plan=${encodeURIComponent(slug)}`;
}

/**
 * The pricing cards.
 *
 * Server-rendered: there is no billing switch, so there is no state to
 * hydrate. Everything shown is handed over already formatted by
 * `getLivePlans`, so every figure comes from the billing API and no
 * price is written into the page. Where a plan is cheaper paid yearly,
 * that rate appears as a line under the monthly figure rather than as
 * a second price behind a toggle.
 */
export function PricingCards({
  plans,
  eyebrow,
  heading,
  headingHighlight,
  supporting,
  signupUrl,
  isFallback = false,
  isPageHeading = false,
}: Props) {
  const Heading = isPageHeading ? "h1" : "h2";

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className={cn(
        "relative isolate pb-[clamp(3rem,5vw,4.5rem)]",
        /* On /pricing this is the first thing on the page, so it has to
           clear the fixed header itself. As a mid-page section it just
           needs its own breathing room. */
        isPageHeading
          ? "pt-[calc(var(--header-offset)+2.75rem)] sm:pt-[calc(var(--header-offset)+3.75rem)]"
          : "pt-[clamp(3rem,5vw,4.5rem)]",
      )}
    >
      <SectionGlow position="right" />

      <Container width="wide">
        <div className="mx-auto flex max-w-[64rem] flex-col items-center gap-5 text-center">
          <Eyebrow>{eyebrow}</Eyebrow>

          <Heading
            id="pricing-heading"
            className="text-display max-w-[52rem] text-balance text-[clamp(2rem,4.4vw,3.75rem)]"
          >
            {withHighlight(heading, headingHighlight)}
          </Heading>

          <p className="text-[1.0625rem] leading-relaxed text-muted">
            {supporting.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>

          {isFallback ? (
            <p className="mt-1 max-w-[36rem] rounded-frame border border-dashed border-line-strong px-4 py-3 text-[0.9375rem] leading-relaxed text-muted">
              Live pricing is briefly unavailable, so these are plan
              outlines rather than current figures. Open the app for the
              prices that apply today.
            </p>
          ) : null}
        </div>

        <ul className="mt-12 grid items-stretch gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => {
            /* Monthly only. The API also returns a cheaper annual rate,
               but the page shows one figure per plan so a reader is
               never comparing two numbers at once. */
            const figure = plan.price;

            return (
              <li
                key={plan.id}
                className={cn(
                  "relative flex h-full flex-col rounded-frame border p-7 transition-[transform,box-shadow,border-color] duration-200 ease-[var(--ease-out-soft)] sm:p-8",
                  plan.featured
                    ? "border-accent-line bg-surface shadow-float lg:-translate-y-3"
                    : "border-line bg-surface hover:-translate-y-1 hover:border-line-strong hover:shadow-float",
                )}
              >
                {plan.featured ? (
                  <span className="bg-brand shadow-brand absolute -top-3 left-7 rounded-pill px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-white">
                    Most teams
                  </span>
                ) : null}

                {/* Header. Fixed height so the price row starts on the
                    same line across cards whose summaries differ. */}
                <div className="min-h-[5.5rem]">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-display text-[1.25rem]">{plan.name}</h3>
                    {plan.isCustom ? (
                      <span className="rounded-pill border border-accent-line px-2.5 py-1 text-[0.875rem] font-medium text-accent">
                        Sales
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                    {plan.summary}
                  </p>
                </div>

                {/* Price. Fixed height so every CTA lines up, whether
                    the figure is "$30" or wraps like "Flexible Pricing". */}
                <div className="flex min-h-[5.5rem] flex-col justify-center border-t border-line pt-6">
                  <p className="flex items-baseline gap-2">
                    <span className="text-display text-[clamp(2rem,3vw,2.5rem)] leading-[1.1]">
                      {figure}
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

                  {/* The annual rate, stated as a line rather than a
                      second price, so the saving is visible without
                      making the reader switch views to find it. */}
                  {plan.annualSavingPct > 0 && plan.priceAnnual ? (
                    <p className="mt-1.5 text-[0.875rem] text-muted">
                      {plan.priceAnnual}/mo billed yearly · save{" "}
                      {plan.annualSavingPct}%
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
                    href={planHref(signupUrl, plan.id)}
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
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
