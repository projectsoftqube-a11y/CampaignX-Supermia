import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { PageCta } from "@/components/page/PageCta";
import { ChannelConstellation } from "@/components/page/ChannelConstellation";
import { JsonLd } from "@/components/seo/JsonLd";
import { BrandGlyph } from "@/components/ui/BrandGlyph";
import { ROUTES } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, buildGraph } from "@/lib/schema";
import type { PlatformName } from "@/types/content";

const TITLE = "Marketing Channels CampaignX Publishes To | CampaignX";
const DESCRIPTION =
  "One brief becomes a campaign for Instagram, Facebook, LinkedIn, Google Business, X, email and SMS, each written for its own format and approved before it sends.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.channelsIndex.href,
});

const schema = buildGraph(
  {
    path: ROUTES.channelsIndex.href,
    name: "Seven Channels, One Brief, One Brand Voice",
    description: DESCRIPTION,
  },
  [breadcrumbSchema([{ name: "Channels", href: ROUTES.channelsIndex.href }])],
);

/**
 * The three channel pages, each with enough detail to choose between.
 *
 * The previous index gave every channel a title and one line in a
 * card grid, which is a list of links rather than an index: a reader
 * could not tell what was on the other side of any of them. Each
 * entry now carries the surfaces it covers, what the channel actually
 * produces, and the constraint that makes it its own problem.
 */
const CHANNELS: readonly {
  href: string;
  label: string;
  lead: string;
  platforms: readonly PlatformName[];
  produces: readonly string[];
  /** The thing that makes this channel hard, in a few words. */
  problem: string;
}[] = [
  {
    href: ROUTES.social.href,
    label: "Social media",
    lead: "Five surfaces that look similar and read nothing alike. Each post is written for its own feed rather than resized from one caption.",
    platforms: ["instagram", "facebook", "linkedin", "x", "google"],
    produces: [
      "Feed and story copy with matching creative",
      "A professional register for LinkedIn",
      "A thread that survives the character limit",
      "Local updates suited to a listing",
    ],
    problem: "Five formats, one idea",
  },
  {
    href: ROUTES.email.href,
    label: "Email",
    lead: "One artefact built in layers. The subject and preview are written as a pair, the body at email length, and the artwork alongside the copy.",
    platforms: ["email"],
    produces: [
      "Subject line and preview text, written together",
      "Body copy with one clear call to action",
      "Artwork generated with the words",
      "A named approver before it sends",
    ],
    problem: "Parts written together, not in sequence",
  },
  {
    href: ROUTES.sms.href,
    label: "SMS",
    lead: "The shortest format and the least forgiving. Fitting the limit is easy; sounding like a company rather than a system alert is the hard part.",
    platforms: ["sms"],
    produces: [
      "A message inside one segment",
      "One action, stated plainly",
      "Scheduled on the campaign calendar",
      "Held until someone releases it",
    ],
    problem: "A voice problem, not a length problem",
  },
];

/** What is true of every channel, stated once rather than three times. */
const SHARED = [
  {
    term: "One brief behind all of them",
    detail:
      "You describe the campaign once. Every channel is written from that brief and the same brand model, so a person who follows you in two places sees one campaign rather than two.",
  },
  {
    term: "One calendar",
    detail:
      "The whole campaign is scheduled in one place rather than in a separate tool per platform, so the message meant to land on day three lands on day three.",
  },
  {
    term: "One approver",
    detail:
      "Nothing publishes or schedules on any channel until a named person signs off. Not a shared inbox, and not a setting that can be left on.",
  },
  {
    term: "Webhooks for the rest",
    detail:
      "Campaign events reach your CRM, your analytics and anything else in your stack as the campaign publishes. CampaignX reports on what it sent; your own tools keep doing everything else.",
  },
];

export default function ChannelsIndexPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <main id="main">
        {/* ------------------------------------------------------------
            Hero. The constellation carries the right column, so the
            coverage claim is visible before any copy about it.
            ------------------------------------------------------------ */}
        <section className="relative isolate overflow-x-clip bg-surface-soft pb-[clamp(2.5rem,4vw,3.5rem)] pt-[calc(var(--header-offset)+3.75rem)] sm:pt-[calc(var(--header-offset)+5rem)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="cx-dots absolute inset-0 opacity-50 [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent_75%)]" />
            <div className="absolute -top-[18%] left-1/2 h-[26rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(var(--brand-blue-rgb),0.12),transparent)]" />
          </div>

          <Container>
            <div className="grid min-w-0 items-center gap-10 [&>*]:min-w-0 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
              <div>
                <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-3 py-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
                  <span className="bg-brand size-1.5 rounded-full" />
                  Channels
                </span>

                <h1 className="text-display mt-5 text-[clamp(2rem,4.2vw,3.25rem)] font-medium leading-[1.04] tracking-[-0.035em]">
                  Seven channels.
                  <span className="block text-muted">One brief behind them.</span>
                </h1>

                <p className="mt-5 max-w-[34rem] text-[1.0625rem] leading-[1.7] text-muted-strong">
                  A campaign is not one message posted seven times. Each
                  channel gets copy and creative built for how people
                  actually read there, from the same brief and the same
                  brand model.
                </p>

                <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-6">
                  {[
                    { k: "Social", v: "Five surfaces" },
                    { k: "Direct", v: "Email and SMS" },
                    { k: "Everything else", v: "Webhooks" },
                  ].map((row) => (
                    <div key={row.k}>
                      <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                        {row.k}
                      </dt>
                      <dd className="mt-1 text-[0.875rem] font-medium leading-snug text-foreground">
                        {row.v}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  <Link
                    href={ROUTES.pricing.href}
                    className="bg-brand shadow-brand inline-flex h-11 items-center rounded-pill px-5 text-[0.9375rem] font-medium text-white transition-[box-shadow,transform,filter] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:brightness-[1.07] hover:shadow-brand-hover"
                  >
                    Get started
                  </Link>
                  <Link
                    href={ROUTES.multiChannel.href}
                    className="inline-flex h-11 items-center rounded-pill border border-line bg-surface px-5 text-[0.9375rem] text-muted-strong transition-colors duration-200 hover:border-accent-line hover:text-accent"
                  >
                    How publishing works
                  </Link>
                </div>
              </div>

              <ChannelConstellation eyebrow="" heading="" bare />
            </div>
          </Container>
        </section>

        {/* ------------------------------------------------------------
            The three channel pages, as real entries.
            ------------------------------------------------------------ */}
        <section className="relative py-[clamp(2.75rem,4.5vw,4rem)]">
          <Container>
            <div className="max-w-[44rem]">
              <p className="text-eyebrow">By channel</p>
              <h2 className="text-display mt-3 text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.03em]">
                Each one is its own problem
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                The brand voice underneath stays constant. What changes is
                the format, the length and what the reader is doing when
                the message arrives.
              </p>
            </div>

            <ul className="mt-9 space-y-3">
              {CHANNELS.map((channel) => (
                <li key={channel.href}>
                  <Link
                    href={channel.href}
                    className="group grid gap-6 rounded-frame border border-line bg-surface p-5 transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:border-accent-line hover:shadow-float sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        {channel.platforms.map((name) => (
                          <span
                            key={name}
                            className="flex size-8 items-center justify-center rounded-[0.4rem] border border-line bg-surface-soft transition-colors duration-300 group-hover:border-accent-line group-hover:bg-accent-soft"
                          >
                            <BrandGlyph name={name} className="size-4" />
                          </span>
                        ))}
                      </div>

                      <h3 className="text-display mt-4 flex items-center gap-2 text-[1.375rem] font-medium leading-snug tracking-[-0.02em]">
                        {channel.label}
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-4 shrink-0 text-muted transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                        />
                      </h3>

                      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted-strong">
                        {channel.lead}
                      </p>

                      <p className="mt-4 inline-flex rounded-[0.3rem] bg-surface-soft px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                        {channel.problem}
                      </p>
                    </div>

                    <div className="lg:border-l lg:border-line lg:pl-12">
                      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                        What it produces
                      </p>
                      <ul className="mt-3 space-y-2">
                        {channel.produces.map((item) => (
                          <li
                            key={item}
                            className="relative pl-5 text-[0.875rem] leading-relaxed text-muted-strong before:absolute before:left-0 before:top-[0.5625rem] before:size-1.5 before:rounded-full before:bg-accent"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* ------------------------------------------------------------
            What holds across all of them. A dark band, stated once.
            ------------------------------------------------------------ */}
        <section className="relative isolate overflow-x-clip bg-ink py-[clamp(3rem,5vw,4.5rem)] text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute inset-0 [background:radial-gradient(60%_60%_at_8%_0%,rgba(var(--brand-blue-rgb),0.26),transparent_62%)]" />
            <div className="absolute inset-0 [background:radial-gradient(55%_55%_at_94%_100%,rgba(var(--brand-magenta-rgb),0.2),transparent_64%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(var(--brand-blue-rgb),0.5),rgba(var(--brand-magenta-rgb),0.35),transparent)]" />
          </div>

          <Container>
            <div className="max-w-[44rem]">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-white/50">
                True of every channel
              </p>
              <h2 className="text-display mt-3 text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white">
                What does not change between them
              </h2>
            </div>

            <ol className="mt-9 grid gap-px overflow-hidden rounded-frame bg-white/10 sm:grid-cols-2">
              {SHARED.map((row, i) => (
                <li key={row.term} className="bg-ink-lift p-5 sm:p-6">
                  <span className="font-mono text-[0.6875rem] tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2.5 text-[1rem] font-medium leading-snug text-white">
                    {row.term}
                  </h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-white/60">
                    {row.detail}
                  </p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <PageCta />
      </main>

      <Footer />
    </>
  );
}
