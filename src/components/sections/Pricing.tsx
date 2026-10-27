import { PricingCards } from "@/components/sections/PricingCards";
import { pricing } from "@/config/content";
import { siteConfig } from "@/config/site";
import { getLivePlans, type LivePlan } from "@/lib/billing";

/**
 * Pricing.
 *
 * Sits directly before the FAQ, which handles the objections a price
 * tends to raise.
 *
 * Plans come from the billing API. If that call fails the section
 * previously returned null and vanished from the page entirely, taking
 * the heading and the CTAs with it — the static fallback in the content
 * config was documented but never actually used. It now renders those
 * outline plans instead, clearly labelled, so an outage costs the page
 * its figures rather than its whole pricing section.
 *
 * Figures are never written into the page: a fallback plan carries no
 * price at all rather than a stale one.
 */

/** Shape the static config plans into the same type the cards expect. */
function fallbackPlans(): LivePlan[] {
  return pricing.plans.map((plan) => ({
    id: plan.name.toLowerCase(),
    name: plan.name,
    summary: plan.summary,
    // No figure: an old price presented as current is worse than none.
    price: plan.priceNote,
    priceAnnual: plan.priceNote,
    priceNote: "",
    featured: plan.featured,
    isCustom: plan.name.toLowerCase() === "custom",
    isFree: plan.name.toLowerCase() === "free",
    annualSavingPct: 0,
    annualTotal: "",
    priceCaption: "",
    cta: plan.cta,
    points: plan.features.map((label) => ({ label, included: true })),
    limits: {
      workspaces: 0,
      connectedAccounts: 0,
      scheduledPosts: 0,
      aiCampaigns: 0,
      manualCampaigns: 0,
      xCampaigns: 0,
      xAllowed: false,
      analyticsEnabled: false,
      analyticsHistoryDays: 0,
      storageUncapped: false,
    },
  }));
}

export async function Pricing({
  isPageHeading = false,
}: {
  /**
   * True on /pricing, where this section opens the page and so owns
   * its h1. Elsewhere (the homepage) it is one section among many and
   * its heading is an h2.
   */
  isPageHeading?: boolean;
} = {}) {
  const live = await getLivePlans();
  const plans = live ?? fallbackPlans();

  return (
    <PricingCards
      plans={plans}
      eyebrow={pricing.eyebrow}
      heading={pricing.heading}
      headingHighlight={pricing.headingHighlight}
      supporting={pricing.supporting}
      signupUrl={siteConfig.signupUrl}
      isFallback={live === null}
      isPageHeading={isPageHeading}
    />
  );
}
