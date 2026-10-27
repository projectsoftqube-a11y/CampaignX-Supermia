import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { PageCta } from "@/components/page/PageCta";
import { FaqPanel } from "@/components/studio/FaqPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { Pricing } from "@/components/sections/Pricing";
import { PlanComparison } from "@/components/sections/PlanComparison";
import { ROUTES } from "@/config/routes";
import { getLivePlans } from "@/lib/billing";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, buildGraph } from "@/lib/schema";

const TITLE = "CampaignX Pricing: Free, Essentials, Premium and Custom";
const DESCRIPTION =
  "Compare CampaignX plans: workspaces, connected accounts, AI campaigns, scheduled posts and analytics history. Start on the free plan, no card required.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.pricing.href,
});

/* The plan cards come from the billing API, so this page renders per
   request for the same reason the homepage does. */
export const dynamic = "force-dynamic";

const schema = buildGraph(
  { path: ROUTES.pricing.href, name: TITLE, description: DESCRIPTION },
  [breadcrumbSchema([{ name: "Pricing", href: ROUTES.pricing.href }])],
);

/**
 * How to choose, in the terms people actually choose on. The plans
 * differ on volume, not capability, so the question is never "which
 * features do I need" but "how much am I running".
 */
const CHOOSE = [
  {
    index: "01",
    title: "How many brands?",
    body: "One workspace holds one brand voice. A freelancer with a single brand needs one; an agency running six clients needs a plan whose workspace count covers them.",
  },
  {
    index: "02",
    title: "How many campaigns a month?",
    body: "AI campaigns are the ones built from a brief. Manual campaigns are unlimited on every plan, so the figure that matters is how often you start from a sentence rather than from scratch.",
  },
  {
    index: "03",
    title: "How far back do you need to look?",
    body: "Analytics history is the clearest difference between the paid plans. A monthly report needs more than a week of it; a quarterly review needs more than a month.",
  },
] as const;

/* Answers that are true whichever plan the reader is on. Nothing here
   quotes a figure: prices and limits live in the cards and the table,
   which read them from the API, so an answer cannot go stale. */
const FAQS = [
  {
    question: "Is there a free plan?",
    answer:
      "Yes. The Free plan costs nothing and needs no card. It includes one workspace, three connected accounts and a set number of AI campaigns a month, with unlimited manual campaigns. The exact limits are in the comparison table above.",
  },
  {
    question: "What is the difference between an AI campaign and a manual one?",
    answer:
      "An AI campaign is generated from a brief: you write a sentence about what you are promoting and CampaignX plans it, writes it in your brand voice and formats it for each channel. A manual campaign is one you build yourself using the same publishing and approval tools. Manual campaigns are unlimited on every plan.",
  },
  {
    question: "What is a workspace?",
    answer:
      "A workspace holds one brand: its voice model, its connected accounts and its campaigns. Agencies and anyone running more than one brand need a workspace for each, which is the main reason to move up a plan.",
  },
  {
    question: "Do cheaper plans publish to fewer channels?",
    answer:
      "No. Every plan publishes to the same channels and holds every asset for approval. X (Twitter) campaigns are the one exception: they are not included on the Free plan. What the paid plans change is volume, reporting history and how many brands you can run.",
  },
  {
    question: "Can I pay yearly?",
    answer:
      "Yes, and it costs less per month than paying monthly. The saving is shown on the monthly and annual switch above, and the yearly total appears on each card when the annual view is selected.",
  },
  {
    question: "Does anything publish without my approval?",
    answer:
      "No, on any plan. Every asset is held until a named approver releases it. That is the default and it cannot be switched off.",
  },
  {
    question: "What if I need more than the Custom plan lists?",
    answer:
      "Custom is a contact-sales tier: the workspace count, campaign volume, analytics range and invoicing are all arranged for the organisation rather than picked from a list. Contact sales from the Custom card and the terms are set against what you actually run.",
  },
];

export default async function PricingPage() {
  /* Read once here for the comparison table. `getLivePlans` is called
     again inside `Pricing`; both calls share the same request cache,
     and the table simply does not render if the API is unreachable —
     an outline plan has no real limits to compare. */
  const plans = await getLivePlans();

  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <main id="main">
        {/* The page opens straight on the cards: someone who navigates
            to /pricing has already decided what they want to see, and
            a masthead above them is one screen between the reader and
            the answer. The section carries the page's h1 for that
            reason. Figures come from the billing API, so this page and
            the homepage can never disagree. */}
        <Pricing isPageHeading />

        {/* Every limit, side by side, from the API's structured fields. */}
        {plans ? <PlanComparison plans={plans} /> : null}

        {/* ------------------------------------------------------------
            How to choose. Three questions, in the order people
            actually ask them.
            ------------------------------------------------------------ */}
        <section className="relative py-[clamp(2.5rem,4vw,3.5rem)]">
          <Container>
            <div className="max-w-[42rem]">
              <p className="text-eyebrow">How to choose</p>
              <h2 className="text-display mt-3 text-[clamp(1.625rem,3vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                Three questions decide it
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                You are not choosing between feature sets. You are
                choosing how much room you need.
              </p>
            </div>

            <ol className="mt-9 grid gap-4 lg:grid-cols-3">
              {CHOOSE.map((item) => (
                <li
                  key={item.index}
                  className="flex flex-col rounded-frame border border-line bg-surface p-6 transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-accent-line hover:shadow-float"
                >
                  <span className="font-mono text-[0.875rem] tabular-nums text-accent">
                    {item.index}
                  </span>
                  <h3 className="text-display mt-3 text-[1.125rem] font-medium leading-snug tracking-[-0.015em]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-strong">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* ------------------------------------------------------------
            What never changes, whichever plan you are on.
            ------------------------------------------------------------ */}
        <section className="relative bg-surface-soft py-[clamp(2.5rem,4vw,3.5rem)]">
          <Container>
            <div className="grid min-w-0 gap-10 [&>*]:min-w-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="text-eyebrow">On every plan</p>
                <h2 className="text-display mt-3 text-[clamp(1.625rem,3vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                  What the price never changes
                </h2>
                <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                  These are not upsells. They are how the product works,
                  on the free plan and the custom one alike.
                </p>
              </div>

              <ul className="space-y-px overflow-hidden rounded-frame border border-line bg-line">
                {[
                  {
                    title: "One brief, every channel",
                    body: "Instagram, Facebook, LinkedIn, Google Business, X, email and SMS, plus webhooks for anything else you run. Channel coverage is not a paid tier.",
                    href: ROUTES.multiChannel.href,
                    cta: "How publishing works",
                  },
                  {
                    title: "Your brand voice, learned",
                    body: "A model built from material you have already published, so the first draft sounds like you rather than like a tool.",
                    href: ROUTES.brandVoice.href,
                    cta: "How the voice model works",
                  },
                  {
                    title: "Nothing ships without a person",
                    body: "Every asset is held until a named approver releases it. It is the default on every plan and it cannot be switched off.",
                    href: ROUTES.approvals.href,
                    cta: "How approvals work",
                  },
                ].map((item) => (
                  <li key={item.title} className="bg-surface p-6">
                    <h3 className="text-display text-[1.125rem] font-medium leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted-strong">
                      {item.body}
                    </p>
                    <p className="mt-3">
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1 font-mono text-[0.875rem] uppercase tracking-[0.08em] text-accent transition-colors duration-200 hover:text-accent-hover"
                      >
                        {item.cta}
                        <ArrowUpRight aria-hidden="true" className="size-3.5" />
                      </Link>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        {/* Questions a price raises. `FaqPanel` rather than a section
            assembled here: it already puts the heading in a left rail
            so a short question does not strand its marker at the far
            right of an empty row, and it owns the reveal trigger that
            `PageFaq` rows depend on. Reusing it also keeps one FAQ
            design across the site. */}
        <FaqPanel
          heading="Pricing questions"
          intro="What the plans do and do not change, before you pick one. Channels, approvals and data handling are covered in full on the FAQ page."
          items={FAQS}
          links={[
            {
              title: "Full FAQ",
              body: "Channels, brand voice, approvals and data handling.",
              href: ROUTES.faq.href,
            },
            {
              title: "How approvals work",
              body: "Why nothing publishes without a named approver.",
              href: ROUTES.approvals.href,
            },
            {
              title: "What gets published",
              body: "The channels every plan writes for.",
              href: ROUTES.multiChannel.href,
            },
          ]}
          note="Plan limits shown on this page come from the CampaignX billing API, so the figures here are the ones that apply today."
        />

        <PageCta />
      </main>

      <Footer />
    </>
  );
}
