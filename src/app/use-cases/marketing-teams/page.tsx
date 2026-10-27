import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { PageCta } from "@/components/page/PageCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { HandoffMap } from "@/components/studio/HandoffMap";
import { FaqPanel } from "@/components/studio/FaqPanel";
import { USE_CASE_PAGES } from "@/config/pages/use-cases";
import { ROUTES } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, buildGraph } from "@/lib/schema";

const PAGE = USE_CASE_PAGES.marketingTeams;
const PATH = ROUTES.marketingTeams.href;

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

const LINKS = [
  {
    title: "Approvals",
    body: "Sign-off as a step inside the campaign, not an email thread.",
    href: ROUTES.approvals.href,
  },
  {
    title: "Campaign analytics",
    body: "Reporting against the campaign rather than per platform.",
    href: ROUTES.analytics.href,
  },
  {
    title: "Multi-channel publishing",
    body: "Every channel and one calendar.",
    href: ROUTES.multiChannel.href,
  },
];

/**
 * Marketing Teams.
 *
 * A team's complaint is structural rather than about speed or
 * isolation: the work itself is fine, but it lives in four systems
 * that do not talk, and every boundary between them is a handoff
 * where the campaign waits. So the page leads with the four tools
 * drawn as separate boxes with the gaps between them named, against
 * the same stages collapsed into one surface.
 */
export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <main id="main">
        {/* ------------------------------------------------------------
            Hero.
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
            <div className="mx-auto max-w-[46rem] text-center">
              <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-3 py-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
                <span className="bg-brand size-1.5 rounded-full" />
                {PAGE.eyebrow}
              </span>

              <h1 className="text-display mt-5 text-[clamp(2rem,4.4vw,3.25rem)] font-medium leading-[1.04] tracking-[-0.035em]">
                The handoffs cost more
                <span className="block text-muted">than the work</span>
              </h1>

              <p className="mt-5 text-[1.125rem] leading-[1.65] text-foreground">
                {PAGE.story.tension.body}
              </p>

              <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                {PAGE.intro}
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-2.5">
                <Link
                  href={ROUTES.pricing.href}
                  className="bg-brand shadow-brand inline-flex h-11 items-center rounded-pill px-5 text-[0.9375rem] font-medium text-white transition-[box-shadow,transform,filter] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:brightness-[1.07] hover:shadow-brand-hover"
                >
                  Start free in Beta
                </Link>
                <Link
                  href={ROUTES.multiChannel.href}
                  className="inline-flex h-11 items-center rounded-pill border border-line bg-surface px-5 text-[0.9375rem] text-muted-strong transition-colors duration-200 hover:border-accent-line hover:text-accent"
                >
                  How publishing works
                </Link>
              </div>
            </div>

            {/* The demonstration, full width: three workspaces need the
                room, and this is the page's whole case. */}
            <div className="mt-10">
              <HandoffMap />
            </div>

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
            What the handoffs cost, and what changes.
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
                Where the time goes
              </p>
              <h2 className="text-display mt-3 text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white">
                {PAGE.problem.intro}
              </h2>
            </div>

            <div className="mt-9 grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-white/50">
                  What it costs today
                </p>
                <ul className="mt-5 space-y-5">
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

              <div>
                <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-accent">
                  What changes
                </p>
                <ul className="mt-5 space-y-5">
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
            A launch, end to end.
            ------------------------------------------------------------ */}
        <section className="relative py-[clamp(2.75rem,4.5vw,4rem)]">
          <Container>
            <div className="grid gap-9 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
              <div className="lg:sticky lg:top-24 lg:self-start">
                <p className="text-eyebrow">In practice</p>
                <h2 className="text-display mt-3 text-[clamp(1.625rem,3vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                  A weekly cadence that is actually weekly
                </h2>
                <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                  {PAGE.practice.intro} The same four stages every
                  week, with nothing retyped between them.
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

        {/* ------------------------------------------------------------
            The turn and the resolution.
            ------------------------------------------------------------ */}
        <section className="relative bg-surface-soft py-[clamp(2.75rem,4.5vw,4rem)]">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-display text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-[1.12] tracking-[-0.025em]">
                  {PAGE.story.turn.heading}
                </h2>
                <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                  {PAGE.story.turn.body}
                </p>
                {PAGE.story.turn.pullquote ? (
                  <p className="mt-5 border-l-2 border-accent pl-4 text-[1.0625rem] font-medium leading-snug text-foreground">
                    {PAGE.story.turn.pullquote}
                  </p>
                ) : null}
              </div>

              <div className="lg:border-l lg:border-line lg:pl-16">
                <h2 className="text-display text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-[1.12] tracking-[-0.025em]">
                  {PAGE.story.resolution.heading}
                </h2>
                <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                  {PAGE.story.resolution.body}
                </p>
                <p className="mt-5 border-t border-line pt-5 text-[0.9375rem] leading-relaxed text-muted">
                  Nothing here needs a new tool. It needs the four you already use to stop being four.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <FaqPanel
          heading="Team questions, answered plainly"
          intro="What teams ask before moving a campaign cycle onto it."
          items={PAGE.faqs}
          links={LINKS}
          note="Keep your CRM and your analytics. Webhooks send campaign data to the rest of your stack."
        />

        <PageCta />
      </main>

      <Footer />
    </>
  );
}
