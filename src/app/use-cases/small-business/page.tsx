import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { PageCta } from "@/components/page/PageCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { DayTimeline } from "@/components/studio/DayTimeline";
import { FaqPanel } from "@/components/studio/FaqPanel";
import { USE_CASE_PAGES } from "@/config/pages/use-cases";
import { ROUTES } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, buildGraph } from "@/lib/schema";

const PAGE = USE_CASE_PAGES.smallBusiness;
const PATH = ROUTES.smallBusiness.href;

export const metadata = pageMetadata({
  title: PAGE.metaTitle,
  description: PAGE.description,
  path: PATH,
});

const schema = buildGraph(
  { path: PATH, name: PAGE.title, description: PAGE.description },
  [
    breadcrumbSchema([
      { name: "Use Cases", href: ROUTES.useCasesIndex.href },
      { name: PAGE.crumb, href: PATH },
    ]),
  ],
);

/** Where to go next. */
const LINKS = [
  {
    title: "Brand voice",
    body: "The model that keeps every channel sounding like you.",
    href: ROUTES.brandVoice.href,
  },
  {
    title: "Approvals",
    body: "A named approver before anything is published.",
    href: ROUTES.approvals.href,
  },
  {
    title: "Pricing",
    body: "Free during Beta, on the Starter plan.",
    href: ROUTES.pricing.href,
  },
];

/**
 * Small Business.
 *
 * Built around elapsed time rather than features, because that is the
 * argument the page's own copy makes: a promotion that sat on a list
 * since the start of the month against a campaign written before the
 * shop opens. The channel and feature pages argue about output; this
 * one argues about a morning.
 *
 * `UseCasePageTemplate` is not used here — it owns a `PageShell` hero
 * and a fixed run of StoryBeat / FeatureGrid / StatBand bands, which
 * is the structure the other three use-case pages still share.
 */
export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <main id="main">
        {/* ------------------------------------------------------------
            Hero. The tension is the headline, not a section further
            down: the reader recognises it or they are not the reader.
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
            <div className="grid min-w-0 items-start gap-x-14 gap-y-10 [&>*]:min-w-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              {/* Copy. */}
              <div>
                <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-3 py-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
                  <span className="bg-brand size-1.5 rounded-full" />
                  {PAGE.eyebrow}
                </span>

                <h1 className="text-display mt-5 text-[clamp(2rem,4.4vw,3.25rem)] font-medium leading-[1.04] tracking-[-0.035em]">
                  The campaign that never
                  <span className="block text-muted">quite got written</span>
                </h1>

                <p className="mt-5 text-[1.125rem] leading-[1.65] text-foreground">
                  {PAGE.story.tension.body}
                </p>

                <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                  {PAGE.intro}
                </p>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  <Link
                    href={ROUTES.pricing.href}
                    className="bg-brand shadow-brand inline-flex h-11 items-center rounded-pill px-5 text-[0.9375rem] font-medium text-white transition-[box-shadow,transform,filter] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:brightness-[1.07] hover:shadow-brand-hover"
                  >
                    Start free in Beta
                  </Link>
                  <Link
                    href={ROUTES.channelsIndex.href}
                    className="inline-flex h-11 items-center rounded-pill border border-line bg-surface px-5 text-[0.9375rem] text-muted-strong transition-colors duration-200 hover:border-accent-line hover:text-accent"
                  >
                    See the channels
                  </Link>
                </div>
              </div>

              {/* The before and after, as two stacked artefacts. The
                  note alone left the column half empty and made the
                  problem the last word; pairing it with what replaces
                  it is the actual claim. */}
              <div aria-hidden="true" className="space-y-3">
                {/* Before: the note that never became a campaign. */}
                <div className="overflow-hidden rounded-panel border border-line bg-surface shadow-soft">
                  <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-soft px-4 py-2.5">
                    <span className="font-mono text-[0.875rem] uppercase tracking-[0.1em] text-muted">
                      Notes
                    </span>
                    <span className="font-mono text-[0.875rem] text-muted/70">
                      11 weeks ago
                    </span>
                  </div>

                  <div className="p-4">
                    <p className="text-[1.0625rem] font-medium leading-snug text-foreground">
                      Spring promo — post about it?
                    </p>
                    <ul className="mt-3 space-y-2">
                      {[
                        "write something for insta",
                        "email the regulars",
                        "ask someone re: the photo",
                      ].map((line) => (
                        <li
                          key={line}
                          className="flex items-start gap-2.5 text-[0.9375rem] leading-snug text-muted"
                        >
                          <span className="mt-[0.3rem] size-3.5 shrink-0 rounded-[0.2rem] border border-line-strong" />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* The turn. */}
                <div className="flex items-center gap-3 px-1">
                  <span className="h-px flex-1 bg-line" />
                  <span className="font-mono text-[0.875rem] uppercase tracking-[0.1em] text-accent">
                    One sentence later
                  </span>
                  <span className="h-px flex-1 bg-line" />
                </div>

                {/* After: the campaign it becomes. */}
                <div className="relative overflow-hidden rounded-panel border border-accent-line bg-surface shadow-float">
                  <span className="bg-brand absolute inset-x-0 top-0 h-[2px]" />

                  <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-soft px-4 py-2.5">
                    <span className="font-mono text-[0.875rem] uppercase tracking-[0.1em] text-accent">
                      Campaign — ready
                    </span>
                    <span className="font-mono text-[0.875rem] text-muted">
                      10 min
                    </span>
                  </div>

                  <ul className="divide-y divide-line">
                    {[
                      { ch: "Instagram", d: "Carousel + artwork" },
                      { ch: "Email", d: "Subject, body and image" },
                      { ch: "SMS", d: "One message, one action" },
                    ].map((row) => (
                      <li
                        key={row.ch}
                        className="flex items-center gap-3 px-4 py-2.5"
                      >
                        <span className="bg-brand flex size-4 shrink-0 items-center justify-center rounded-full text-white">
                          <svg viewBox="0 0 24 24" className="size-2.5" fill="none">
                            <path
                              d="M5 13l4 4L19 7"
                              stroke="currentColor"
                              strokeWidth="4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span className="text-[0.9375rem] font-medium text-foreground">
                          {row.ch}
                        </span>
                        <span className="ml-auto text-[0.875rem] text-muted">
                          {row.d}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="border-t border-line bg-surface-soft px-4 py-2.5 font-mono text-[0.875rem] uppercase tracking-[0.1em] text-muted">
                    Waiting on your approval
                  </p>
                </div>
              </div>
            </div>

            {/* The highlights, as a full-width strip under both
                columns: three items in a two-up grid wrapped 2+1 and
                left a hole beside the third. */}
            <dl className="mt-10 grid gap-x-10 gap-y-6 border-t border-line pt-7 sm:grid-cols-3">
              {PAGE.highlights.map((item, i) => (
                <div key={item}>
                  <dt className="font-mono text-[0.875rem] uppercase tracking-[0.1em] text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </dt>
                  <dd className="mt-1.5 text-[1.25rem] font-medium leading-snug tracking-[-0.01em] text-foreground">
                    {item}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>

        {/* ------------------------------------------------------------
            The whole argument, on one axis.
            ------------------------------------------------------------ */}
        <section className="relative py-[clamp(2.75rem,4.5vw,4rem)]">
          <Container>
            <div className="max-w-[44rem]">
              <p className="text-eyebrow">Where the time goes</p>
              <h2 className="text-display mt-3 text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.03em]">
                Three weeks, or one morning
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                {PAGE.problem.intro} Most of the three weeks is not work
                at all — it is a promotion waiting behind whatever was
                more urgent that day.
              </p>
            </div>

            <div className="mt-9">
              <DayTimeline />
            </div>
          </Container>
        </section>

        {/* ------------------------------------------------------------
            What actually gets in the way, and what changes.
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
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              {/* The blockers. */}
              <div>
                <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-white/50">
                  What gets in the way
                </p>
                <ul className="mt-6 space-y-5">
                  {PAGE.problem.points.map((point) => (
                    <li
                      key={point.title}
                      className="border-l-2 border-white/15 pl-4"
                    >
                      <p className="text-[1rem] font-medium leading-snug text-white">
                        {point.title}
                      </p>
                      <p className="mt-1.5 text-[0.875rem] leading-relaxed text-white/55">
                        {point.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What changes. */}
              <div>
                <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-accent">
                  What changes
                </p>
                <ul className="mt-6 space-y-5">
                  {PAGE.helps.points.map((point) => (
                    <li
                      key={point.title}
                      className="border-l-2 border-accent pl-4"
                    >
                      <p className="text-[1rem] font-medium leading-snug text-white">
                        {point.title}
                      </p>
                      <p className="mt-1.5 text-[0.875rem] leading-relaxed text-white/70">
                        {point.body}
                      </p>
                    </li>
                  ))}
                </ul>

                <p className="mt-7 border-t border-white/12 pt-5 text-[0.9375rem] leading-relaxed text-white/70">
                  {PAGE.helps.intro}
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ------------------------------------------------------------
            The turn and the resolution, as a short read.
            ------------------------------------------------------------ */}
        <section className="relative py-[clamp(2.75rem,4.5vw,4rem)]">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
              <div>
                <h2 className="text-display text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-[1.12] tracking-[-0.025em]">
                  {PAGE.story.turn.heading}
                </h2>
                <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                  {PAGE.story.turn.body}
                </p>
              </div>

              <div className="lg:border-l lg:border-line lg:pl-16">
                <h2 className="text-display text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-[1.12] tracking-[-0.025em]">
                  {PAGE.story.resolution.heading}
                </h2>
                <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                  {PAGE.story.resolution.body}
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ------------------------------------------------------------
            The worked example from the page data. It was dropped when
            this page moved off the template, and it is the most
            concrete thing on it.
            ------------------------------------------------------------ */}
        <section className="relative bg-surface-soft py-[clamp(2.75rem,4.5vw,4rem)]">
          <Container>
            <div className="grid gap-9 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
              <div className="lg:sticky lg:top-24 lg:self-start">
                <p className="text-eyebrow">In practice</p>
                <h2 className="text-display mt-3 text-[clamp(1.625rem,3vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                  A seasonal promotion, start to finish
                </h2>
                <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                  {PAGE.practice.intro} Nothing here needs a designer, a
                  scheduling tool or a free evening — only the decisions
                  that were always yours to make.
                </p>
              </div>

              <ol className="space-y-px overflow-hidden rounded-frame border border-line bg-line">
                {PAGE.practice.steps.map((step, i) => (
                  <li key={step.title} className="bg-surface p-5 sm:p-6">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-mono text-[0.875rem] tabular-nums text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="rounded-[0.25rem] bg-surface-soft px-2 py-0.5 font-mono text-[0.875rem] uppercase tracking-[0.06em] text-muted">
                        {step.marker}
                      </span>
                    </div>
                    <h3 className="mt-2.5 text-[1.0625rem] font-medium leading-snug text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted-strong">
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </section>

        <FaqPanel
          heading="Small business marketing, answered plainly"
          intro="What owners ask before writing the first brief."
          items={PAGE.faqs}
          links={LINKS}
          note="Every plan publishes to the same seven channels. Starter is free during Beta."
        />

        <PageCta />
      </main>

      <Footer />
    </>
  );
}
