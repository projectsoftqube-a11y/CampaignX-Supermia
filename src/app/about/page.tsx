import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { PageCta } from "@/components/page/PageCta";
import { StatBand } from "@/components/page/StatBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { OriginArt } from "@/components/studio/OriginArt";
import { ROUTES } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, buildGraph } from "@/lib/schema";

const TITLE = "About CampaignX | Built by SuperMIA";
const DESCRIPTION =
  "CampaignX is the AI campaign agent built by SuperMIA to give marketing teams their time back. Meet the product, the team behind it and how to reach us.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.about.href,
});

const schema = buildGraph(
  { path: ROUTES.about.href, name: TITLE, description: DESCRIPTION },
  [breadcrumbSchema([{ name: "About", href: ROUTES.about.href }])],
);

/**
 * The position the product takes, stated in three parts. These are
 * arguments rather than features: the feature pages cover what it
 * does, and repeating them here would make the page a second home
 * page.
 */
const POSITION = [
  {
    index: "01",
    title: "The work is reformatting, not thinking",
    body: "Most of the distance between an idea and a live campaign is spent turning one message into five, each in a different shape and a different length. The thinking happened in the brief. Everything after it is production, and production is what a machine should carry.",
  },
  {
    index: "02",
    title: "A brand voice has to be learned, not described",
    body: "Three adjectives in a document do not make a writer sound like you. A model built from material you have already published does, because it has seen how you actually write rather than how you describe the way you write.",
  },
  {
    index: "03",
    title: "Nothing goes out without a person saying yes",
    body: "Anything published under your name is your reputation, not a draft. A named approver signs off every asset before it ships. That is the default, it cannot be switched off, and it is the reason the rest of the product can move quickly.",
  },
] as const;

/** Facts, each one verifiable rather than asserted. */
const FACTS = [
  { label: "Product", value: "CampaignX" },
  { label: "Built by", value: "SuperMIA" },
  { label: "Operated by", value: "Botfinity Inc." },
  { label: "Based in", value: "Grapevine, Texas" },
] as const;

export default function AboutPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <main id="main">
        {/* ------------------------------------------------------------
            Masthead. The claim, and the facts behind it side by side,
            so the page opens with something checkable rather than an
            adjective.
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
            <div className="grid min-w-0 items-center gap-10 [&>*]:min-w-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
              <div>
                <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-3 py-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
                  <span className="bg-brand size-1.5 rounded-full" />
                  About
                </span>

                <h1 className="text-display mt-5 text-[clamp(1.875rem,4vw,2.875rem)] font-medium leading-[1.05] tracking-[-0.035em]">
                  One brief should not cost
                  <span className="block text-muted">three weeks</span>
                </h1>

                <p className="mt-5 max-w-[34rem] text-[1.0625rem] leading-[1.7] text-foreground">
                  CampaignX is the AI campaign agent built by SuperMIA to
                  give marketing teams their time back. One brief becomes a
                  complete, on-brand campaign across seven channels — and
                  nothing ships until a person approves it.
                </p>

                <dl className="mt-7 grid gap-x-8 gap-y-4 border-t border-line pt-5 sm:grid-cols-2">
                  {FACTS.map((fact) => (
                    <div key={fact.label}>
                      <dt className="font-mono text-[0.875rem] uppercase tracking-[0.08em] text-muted">
                        {fact.label}
                      </dt>
                      <dd className="mt-1 text-[0.9375rem] font-medium text-foreground">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <OriginArt className="overflow-hidden rounded-frame border border-line bg-[linear-gradient(170deg,var(--surface-soft),var(--surface))] px-5 py-6" />
            </div>
          </Container>
        </section>

        {/* ------------------------------------------------------------
            What the product believes. Numbered, because they build on
            each other rather than sitting as three equal features.
            ------------------------------------------------------------ */}
        <section className="relative py-[clamp(2.5rem,4vw,3.5rem)]">
          <Container>
            <div className="max-w-[42rem]">
              <p className="text-eyebrow">Why it exists</p>
              <h2 className="text-display mt-3 text-[clamp(1.625rem,3vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                Three things we think are true
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                Campaigns are rarely hard to imagine. They are hard to
                assemble, and almost everything the product does follows
                from that.
              </p>
            </div>

            <ol className="mt-9 grid gap-4 lg:grid-cols-3">
              {POSITION.map((item) => (
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

        <StatBand
          stats={[
            {
              value: "7",
              label: "Channels from one brief",
              note: "Plus webhooks for other tools.",
            },
            {
              value: "~10 min",
              label: "To a first campaign",
              note: "A trusted brand model takes about an afternoon.",
            },
            {
              value: "0",
              label: "Published without sign-off",
              note: "A named approver signs off every time.",
            },
            {
              value: "2026",
              label: "Built by SuperMIA",
              note: "Operated by Botfinity Inc., Grapevine, Texas.",
            },
          ]}
        />

        {/* ------------------------------------------------------------
            Who makes it. Two companies, stated plainly, because the
            terms and the privacy policy name both and a visitor
            checking one against the other should find them agreeing.
            ------------------------------------------------------------ */}
        <section className="relative py-[clamp(2.5rem,4vw,3.5rem)]">
          <Container>
            <div className="grid min-w-0 gap-10 [&>*]:min-w-0 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="text-eyebrow">Who builds it</p>
                <h2 className="text-display mt-3 text-[clamp(1.625rem,3vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                  Built by SuperMIA
                </h2>
                <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                  CampaignX is made by SuperMIA, a conversational AI
                  platform, and operated by Botfinity Inc. The same company
                  is named in the CampaignX terms and privacy policy.
                </p>
              </div>

              <ul className="space-y-px overflow-hidden rounded-frame border border-line bg-line">
                <li className="bg-surface p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-display text-[1.125rem] font-medium leading-snug">
                      SuperMIA
                    </h3>
                    <a
                      href="https://supermia.ai/"
                      className="inline-flex items-center gap-1 font-mono text-[0.875rem] uppercase tracking-[0.08em] text-accent transition-colors duration-200 hover:text-accent-hover"
                    >
                      supermia.ai
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    </a>
                  </div>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted-strong">
                    The AI platform CampaignX is built on. SuperMIA builds
                    voice and chat agents for industries including
                    healthcare, hospitality, real estate and education;
                    CampaignX applies the same work to marketing campaigns.
                  </p>
                </li>

                <li className="bg-surface p-6">
                  <h3 className="text-display text-[1.125rem] font-medium leading-snug">
                    Botfinity Inc.
                  </h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted-strong">
                    The operating company, at 2451 W Grapevine Mills Cir
                    #547, Grapevine, TX 76051. It is the company named in
                    the terms and the privacy policy.
                  </p>
                  <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                    <Link
                      href={ROUTES.terms.href}
                      className="font-mono text-[0.875rem] uppercase tracking-[0.08em] text-accent transition-colors duration-200 hover:text-accent-hover"
                    >
                      Terms
                    </Link>
                    <Link
                      href={ROUTES.privacy.href}
                      className="font-mono text-[0.875rem] uppercase tracking-[0.08em] text-accent transition-colors duration-200 hover:text-accent-hover"
                    >
                      Privacy
                    </Link>
                  </p>
                </li>

                <li className="bg-surface p-6">
                  <h3 className="text-display text-[1.125rem] font-medium leading-snug">
                    How your data is handled
                  </h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted-strong">
                    Which processors are used, how long material is kept and
                    what is and is not used for training are all set out in
                    the privacy policy, and answered in plainer language in
                    the FAQ.
                  </p>
                  <p className="mt-3">
                    <Link
                      href={ROUTES.faq.href}
                      className="inline-flex items-center gap-1 font-mono text-[0.875rem] uppercase tracking-[0.08em] text-accent transition-colors duration-200 hover:text-accent-hover"
                    >
                      Read the FAQ
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    </Link>
                  </p>
                </li>
              </ul>
            </div>
          </Container>
        </section>

        {/* ------------------------------------------------------------
            Contact.
            ------------------------------------------------------------ */}
        <section className="relative bg-surface-soft py-[clamp(2.5rem,4vw,3.5rem)]">
          <Container>
            <div className="grid min-w-0 items-center gap-8 [&>*]:min-w-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
              <div>
                <p className="text-eyebrow">Contact</p>
                <h2 className="text-display mt-3 text-[clamp(1.5rem,2.6vw,1.875rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                  Talk to the team
                </h2>
                <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                  The quickest way to reach us is by email. Questions about
                  how the product handles your material are answered in the
                  FAQ first.
                </p>
              </div>

              <ul className="grid gap-4 sm:grid-cols-2">
                <li className="rounded-frame border border-line bg-surface p-5">
                  <p className="font-mono text-[0.875rem] uppercase tracking-[0.08em] text-muted">
                    Email
                  </p>
                  <Link
                    href="mailto:hello@supermia.ai"
                    className="text-display mt-2 block text-[1.0625rem] font-medium leading-snug transition-colors duration-200 hover:text-accent"
                  >
                    hello@supermia.ai
                  </Link>
                </li>
                <li className="rounded-frame border border-line bg-surface p-5">
                  <p className="font-mono text-[0.875rem] uppercase tracking-[0.08em] text-muted">
                    Address
                  </p>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-strong">
                    2451 W Grapevine Mills Cir #547
                    <br />
                    Grapevine, TX 76051
                    <br />
                    United States
                  </p>
                </li>
              </ul>
            </div>
          </Container>
        </section>

        <PageCta />
      </main>

      <Footer />
    </>
  );
}
