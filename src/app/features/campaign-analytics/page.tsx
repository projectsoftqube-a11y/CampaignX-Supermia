import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MetricPanel } from "@/components/page/MetricPanel";
import { PageCta } from "@/components/page/PageCta";
import { PageFaq } from "@/components/page/PageFaq";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArtCardGrid } from "@/components/studio/ArtCardGrid";
import { InsetHero } from "@/components/studio/InsetHero";
import { Annotation, CompareTable, Segment } from "@/components/studio/Segment";
import { ROUTES } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, buildGraph } from "@/lib/schema";

/* Title, meta and H1 are taken verbatim from the page's keyword brief,
   so the built page matches what was signed off in the content package. */
const TITLE = "Marketing Campaign Analytics and Reporting | CampaignX";
const DESCRIPTION =
  "See how each campaign performs across every channel it published to in one report, and let what worked shape the brief for your next one.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.analytics.href,
});

const schema = buildGraph(
  {
    path: ROUTES.analytics.href,
    name: "Marketing Campaign Analytics That Feed Your Next Campaign",
    description: DESCRIPTION,
  },
  [
    breadcrumbSchema([
      { name: "Features", href: ROUTES.productIndex.href },
      { name: "Campaign Analytics", href: ROUTES.analytics.href },
    ]),
  ],
);

/* Segment 02: six dashboards against one report. */
const REPORT_ROWS = [
  {
    label: "Where results live",
    left: "One dashboard per platform",
    right: "One report per campaign, every channel in it",
  },
  {
    label: "Comparing channels",
    left: "Six definitions of engagement",
    right: "The same measures, side by side",
  },
  {
    label: "Building the report",
    left: "An afternoon of copy-paste",
    right: "Written as the campaign runs",
  },
  {
    label: "What happens next",
    left: "A slide nobody reopens",
    right: "The next brief starts from it",
  },
];

/* Segment 03: what lands in the report. */
const TRACKED_CARDS = [
  {
    art: "instagram" as const,
    title: "Reach, per channel",
    body: "How many people the campaign reached on each channel it published to, counted the same way across all of them so the numbers can sit in one column.",
    spec: "Per campaign · per channel",
  },
  {
    art: "email" as const,
    title: "Engagement, per channel",
    body: "How people responded — in one place rather than six dashboards with six different definitions of what a response is.",
    spec: "Per campaign · per channel",
  },
  {
    art: "google" as const,
    title: "Which channels carried it",
    body: "Which surfaces did the work for this audience and which added little, so the next brief can weight them differently rather than publishing everywhere out of habit.",
    spec: "Comparison · across channels",
  },
];

/* Segment 03 footnote: what the report deliberately does not do. */
const NOT_REPORTED = [
  "Paid ad spend, because CampaignX does not buy advertising",
  "Attribution and revenue, which stay in your analytics platform",
  "Anything published outside CampaignX",
];

const FAQS = [
  {
    question: "Do I lose my analytics tool?",
    answer:
      "No. Keep your existing analytics. CampaignX reports on the campaigns it publishes, and webhooks can send campaign data to the rest of your stack.",
  },
  {
    question: "What does CampaignX report on?",
    answer:
      "Reach and engagement for each campaign across the channels it published to, in one report rather than one per platform.",
  },
  {
    question: "Is reporting on every plan?",
    answer:
      "Analytics history runs from 7 days to a custom range, depending on the plan. Pricing sets out what each one includes.",
  },
  {
    question: "Does CampaignX report on paid ad spend?",
    answer:
      "No. CampaignX does not buy or manage paid advertising, so there is no ad spend to report on.",
  },
];

/* Segment 04: how to read a report without over-reading it. The page
   has to be useful about measurement while staying inside the claim
   rules, so this is written as guidance rather than as promises. */
const READING = [
  {
    term: "Compare like with like",
    detail:
      "A story frame and a subject line are not competing for the same attention, so a low number on one channel is not automatically a failure. Read each surface against its own previous campaigns before reading it against the others.",
  },
  {
    term: "Give it more than one run",
    detail:
      "A single campaign is an anecdote. The loop gets useful somewhere around the third or fourth, once there is a pattern to see rather than a single data point to over-interpret.",
  },
  {
    term: "Watch what you corrected",
    detail:
      "The edits made at approval are a signal in their own right. A channel you rewrite every time is telling you something the engagement numbers will not.",
  },
  {
    term: "Keep your own analytics",
    detail:
      "CampaignX reports on what it published. Attribution, revenue and everything downstream of the click stay where they already live.",
  },
];

const TOTAL = 6;

/**
 * Campaign Analytics.
 *
 * Rebuilt on the Brand Voice frame: inset hero, then five numbered
 * segments. The previous version was `PageShell` with a `StoryBeat`,
 * a `StatBand` and two near-identical `FeatureGrid` sections, one of
 * which carried a heading ("What CampaignX tracks") that did not match
 * the cards underneath it.
 *
 * Results language stays hedged throughout: no marketing tool can
 * promise an outcome, and the report mock is labelled as an
 * illustration rather than customer data.
 */
export default function AnalyticsPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <main id="main">
        <InsetHero
          tag="Campaign Analytics"
          title="Marketing Campaign Analytics That *Feed Your Next* Campaign"
          intro="One report per campaign across every channel it published to, and a performance loop that carries what worked into the next brief."
          demoLabel="Watch the 2-minute demo"
          brief="Re-engage customers who stopped buying this quarter."
          facts={[
            { label: "Report", value: "One per campaign" },
            { label: "Measures", value: "Reach and engagement" },
            { label: "Ad spend", value: "None to reconcile" },
          ]}
        />

        {/* 01 — the report itself. The mock carries the right column. */}
        <Segment
          seg="01"
          label="The report"
          step={1}
          total={TOTAL}
          tone="tint"
          heading="One report, every channel"
        >
          <div className="grid min-w-0 items-start gap-x-8 gap-y-5 [&>*]:min-w-0 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
            <div>
              <p className="text-[1.125rem] leading-[1.65] text-foreground">
                A campaign that ran on six channels should not need six
                dashboards to understand.
              </p>
              <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                Every channel the campaign published to appears in one
                report, measured the same way — so the comparison between
                them is a comparison, not an exercise in reconciling four
                definitions of engagement.
              </p>

              <ul className="mt-7 space-y-2.5">
                {[
                  "Reach and engagement, per channel",
                  "The same measures across every surface",
                  "Tied to the campaign that produced them",
                  "No paid ad spend to reconcile",
                ].map((item) => (
                  <li
                    key={item}
                    className="relative pl-5 text-[0.9375rem] leading-relaxed text-muted-strong before:absolute before:left-0 before:top-[0.6875rem] before:size-1.5 before:rounded-full before:bg-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-7 border-t border-line pt-5 text-[0.875rem] leading-relaxed text-muted">
                Reporting and the performance loop are listed on the Team
                plan.{" "}
                <Link
                  href={ROUTES.pricing.href}
                  className="text-accent underline underline-offset-2"
                >
                  Pricing
                </Link>{" "}
                sets out what each plan includes.
              </p>
            </div>

            <MetricPanel heading="" bare />
          </div>
        </Segment>

        {/* 02 — the contrast. */}
        <Segment
          seg="02"
          label="Side by side"
          step={2}
          total={TOTAL}
          heading="Six dashboards, or one report"
        >
          <p className="max-w-[46rem] text-[1.0625rem] leading-[1.7] text-muted-strong">
            The problem with per-platform reporting is not that the numbers
            are missing. It is that nobody has the afternoon it takes to put
            them in the same place.
          </p>

          <div className="mt-9 grid min-w-0 items-start gap-x-8 gap-y-5 [&>*]:min-w-0 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-12">
            <CompareTable
              tone="light"
              question="After the campaign runs"
              left="Platform dashboards"
              right="A CampaignX report"
              rows={REPORT_ROWS}
            />

            <Annotation tag="On results">
              <p>
                CampaignX reports what happened — reach and engagement for
                the campaigns it published. It does not forecast outcomes,
                and no marketing tool can promise them.
              </p>
              <p className="mt-3.5">
                Your own analytics platform keeps doing everything else;
                webhooks can send campaign data to it.
              </p>
            </Annotation>
          </div>
        </Segment>

        {/* 03 — what lands in the report. */}
        <Segment
          seg="03"
          label="Measured"
          step={3}
          total={TOTAL}
          tone="warm"
          heading="What lands in|the report"
        >
          <p className="max-w-[52rem] text-[1.0625rem] leading-[1.7] text-muted-strong">
            Three things per campaign, each tied to the campaign that
            produced them rather than floating in a platform dashboard with
            no brief attached.
          </p>

          <div className="mt-9">
            <ArtCardGrid kicker="" heading="" cards={TRACKED_CARDS} bare />
          </div>

          {/* Stating the boundary is more useful than implying it, and
              it keeps the page inside the claim rules. */}
          <div className="mt-9 rounded-panel border border-line bg-surface p-5 sm:p-6">
            <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
              What it does not report on
            </p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-3 sm:gap-6">
              {NOT_REPORTED.map((item) => (
                <li
                  key={item}
                  className="relative pl-5 text-[0.875rem] leading-relaxed text-muted-strong before:absolute before:left-0 before:top-[0.5625rem] before:h-px before:w-2.5 before:bg-line-strong"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Segment>

        {/* 04 — how to read it. Guidance rather than promises: the
            claim rules forbid presenting an outcome as guaranteed, and
            a reporting page that says nothing about interpretation is
            less useful than one that does. */}
        <Segment
          seg="04"
          label="Reading it"
          step={4}
          total={TOTAL}
          heading="How to read a campaign report"
        >
          <div className="grid min-w-0 items-start gap-x-8 gap-y-5 [&>*]:min-w-0 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
            <div>
              <p className="text-[1.125rem] leading-[1.65] text-foreground">
                A report is only worth having if it changes what you do
                next. Most do not, because they are read for reassurance
                rather than for direction.
              </p>
              <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                Four habits make the difference between a number you note
                and a number you act on.
              </p>
            </div>

            <dl className="divide-y divide-line overflow-hidden rounded-panel border border-line bg-surface">
              {READING.map((row, i) => (
                <div key={row.term} className="flex gap-4 p-5">
                  <span className="text-display w-5 shrink-0 text-[0.6875rem] tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <dt className="text-[0.9375rem] font-medium leading-snug text-foreground">
                      {row.term}
                    </dt>
                    <dd className="mt-1.5 text-[0.875rem] leading-relaxed text-muted-strong">
                      {row.detail}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </Segment>

        {/* 05 — the loop. */}
        <Segment
          seg="05"
          label="The loop"
          step={5}
          total={TOTAL}
          heading="Results that shape the next brief"
        >
          <div className="grid min-w-0 items-start gap-x-8 gap-y-5 [&>*]:min-w-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
            <div>
              <p className="text-[1.125rem] leading-[1.65] text-foreground">
                Most reporting ends in a slide. This ends in the next
                campaign.
              </p>
              <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                What performed goes back into the performance loop, so the
                following brief starts from evidence rather than a blank
                page. Over time the model has your campaigns and their
                outcomes to work from, not only your brand voice.
              </p>
            </div>

            <ul className="space-y-3">
              {[
                {
                  title: "Start from what performed",
                  body: "The next brief begins with the channels and angles that worked last time, rather than from nothing.",
                },
                {
                  title: "Your brand model improves",
                  body: "Corrections you made at approval are part of what the model learns.",
                  href: ROUTES.brandVoice.href,
                },
                {
                  title: "Publish again in minutes",
                  body: "A loop is only useful if acting on it is quick.",
                  href: ROUTES.multiChannel.href,
                },
              ].map((item) => {
                const body = (
                  <>
                    <span className="block text-[0.9375rem] font-medium leading-snug text-foreground">
                      {item.title}
                    </span>
                    <span className="mt-1.5 block text-[0.875rem] leading-relaxed text-muted-strong">
                      {item.body}
                    </span>
                  </>
                );
                return (
                  <li key={item.title}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="block rounded-panel border border-line bg-surface p-4 transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:border-accent-line hover:shadow-soft"
                      >
                        {body}
                      </Link>
                    ) : (
                      <div className="rounded-panel border border-line bg-surface p-4">
                        {body}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </Segment>

        {/* 06 — objections. */}
        <Segment
          seg="06"
          label="Questions"
          step={6}
          total={TOTAL}
          tone="warm"
          heading="Analytics, answered plainly"
        >
          <div className="overflow-hidden rounded-frame border border-line bg-surface">
            <div className="grid lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
              <div className="flex flex-col justify-between gap-8 border-b border-line bg-surface-soft p-5 sm:p-8 lg:border-b-0 lg:border-r lg:p-9">
                <div>
                  <p className="text-[1.0625rem] leading-[1.7] text-muted-strong">
                    These four decide whether reporting here replaces
                    anything you already run, or simply sits beside it.
                  </p>

                  <ul className="mt-7 space-y-3">
                    {[
                      "Whether it replaces your analytics tool",
                      "What is actually reported on",
                      "Which plans include reporting",
                      "Paid advertising and ad spend",
                    ].map((topic, i) => (
                      <li
                        key={topic}
                        className="flex items-baseline gap-3 text-[0.875rem] leading-snug text-muted-strong"
                      >
                        <span className="text-display w-4 shrink-0 text-[0.6875rem] tabular-nums text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-line pt-6">
                  <p className="text-[0.875rem] leading-relaxed text-muted">
                    The{" "}
                    <Link
                      href={ROUTES.faq.href}
                      className="text-accent underline underline-offset-2"
                    >
                      FAQ page
                    </Link>{" "}
                    covers pricing, every channel and each processor.
                  </p>
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {[
                      { label: "Pricing", href: ROUTES.pricing.href },
                      { label: "Approvals", href: ROUTES.approvals.href },
                      { label: "Channels", href: ROUTES.channelsIndex.href },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="rounded-pill border border-line bg-surface px-3 py-1.5 text-[0.875rem] text-muted-strong transition-colors duration-200 hover:border-accent-line hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-8 lg:p-9">
                <PageFaq items={FAQS} />
              </div>
            </div>
          </div>
        </Segment>

        <PageCta />
      </main>

      <Footer />
    </>
  );
}
