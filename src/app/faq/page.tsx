import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { PageCta } from "@/components/page/PageCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqDirectory } from "@/components/studio/FaqDirectory";
import { ALL_FAQS, FAQ_GROUPS } from "@/config/pages/faq";
import { ROUTES } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, buildGraph, faqPageSchema } from "@/lib/schema";

const TITLE = "CampaignX FAQ: How It Works, Pricing and Your Data";
const DESCRIPTION =
  "CampaignX FAQ: which channels it publishes to, how it learns your brand voice, how approvals work, what Beta pricing includes and how your data is handled.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.faq.href,
});

/* The only FAQPage markup on the subdomain. Every answer it describes is
   rendered below in the HTML on first load, which is what the markup is
   allowed to claim. */
const schema = buildGraph(
  {
    path: ROUTES.faq.href,
    name: "CampaignX FAQ: Channels, Brand Voice, Approvals, Pricing and Data",
    description: DESCRIPTION,
  },
  [
    breadcrumbSchema([{ name: "FAQ", href: ROUTES.faq.href }]),
    faqPageSchema(ALL_FAQS),
  ],
);

/** The four facts most people arrive wanting, before any question. */
const FACTS = [
  { k: "Channels", v: "Seven, plus webhooks" },
  { k: "First campaign", v: "About ten minutes" },
  { k: "Approval", v: "Always required" },
  { k: "Your data", v: "Not used to train shared models" },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <main id="main">
        {/* ------------------------------------------------------------
            Hero. Short on purpose: nobody arrives at an FAQ to read an
            introduction, so the answers start as early as possible.
            ------------------------------------------------------------ */}
        <section className="relative isolate overflow-x-clip bg-surface-soft pb-[clamp(2rem,3.5vw,3rem)] pt-[calc(var(--header-offset)+3.75rem)] sm:pt-[calc(var(--header-offset)+5rem)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="cx-dots absolute inset-0 opacity-50 [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent_75%)]" />
            <div className="absolute -top-[18%] left-1/2 h-[26rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(var(--brand-blue-rgb),0.12),transparent)]" />
          </div>

          <Container>
            <div className="grid min-w-0 items-end gap-8 [&>*]:min-w-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
              <div>
                <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-3 py-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
                  <span className="bg-brand size-1.5 rounded-full" />
                  FAQ
                </span>

                <h1 className="text-display mt-5 text-[clamp(2rem,4.2vw,3rem)] font-medium leading-[1.04] tracking-[-0.035em]">
                  Answered plainly,
                  <span className="block text-muted">including the limits</span>
                </h1>

                <p className="mt-5 text-[1.0625rem] leading-[1.7] text-muted-strong">
                  CampaignX is an AI marketing agent built by SuperMIA and
                  operated by Botfinity Inc. This page covers how it
                  works, what it does not do, and how your data is
                  handled.
                </p>
              </div>

              {/* The four answers most people came for. */}
              <dl className="grid gap-px overflow-hidden rounded-frame border border-line bg-line sm:grid-cols-2">
                {FACTS.map((f) => (
                  <div key={f.k} className="bg-surface p-4 sm:p-5">
                    <dt className="font-mono text-[0.875rem] uppercase tracking-[0.1em] text-muted">
                      {f.k}
                    </dt>
                    <dd className="mt-1.5 text-[1rem] font-medium leading-snug text-foreground">
                      {f.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Container>
        </section>

        <FaqDirectory groups={FAQ_GROUPS} />

        {/* ------------------------------------------------------------
            Where to go when the answer is a whole page.
            ------------------------------------------------------------ */}
        <section className="relative bg-surface-soft py-[clamp(2.5rem,4vw,3.5rem)]">
          <Container>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h2 className="text-display text-[clamp(1.375rem,2.4vw,1.75rem)] font-medium leading-snug tracking-[-0.02em]">
                Still looking?
              </h2>
              <p className="text-[0.9375rem] text-muted">
                Some answers are a page rather than a paragraph.
              </p>
            </div>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Pricing",
                  body: "What each plan includes.",
                  href: ROUTES.pricing.href,
                },
                {
                  title: "Channels",
                  body: "Every surface a campaign reaches.",
                  href: ROUTES.channelsIndex.href,
                },
                {
                  title: "Approvals",
                  body: "How sign-off actually works.",
                  href: ROUTES.approvals.href,
                },
                {
                  title: "Privacy",
                  body: "Processors and your choices.",
                  href: ROUTES.privacy.href,
                },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex h-full flex-col rounded-panel border border-line bg-surface p-4 transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:border-accent-line hover:shadow-soft"
                  >
                    <span className="text-[0.9375rem] font-medium leading-snug text-foreground">
                      {link.title}
                    </span>
                    <span className="mt-1.5 text-[0.875rem] leading-relaxed text-muted-strong">
                      {link.body}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <PageCta />
      </main>

      <Footer />
    </>
  );
}
