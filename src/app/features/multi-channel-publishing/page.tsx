import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageCta } from "@/components/page/PageCta";
import { PageFaq } from "@/components/page/PageFaq";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArtCardGrid } from "@/components/studio/ArtCardGrid";
import { ChannelConstellation } from "@/components/page/ChannelConstellation";
import { InsetHero } from "@/components/studio/InsetHero";
import { ScheduleBoard } from "@/components/studio/ScheduleBoard";
import { Annotation, CompareTable, Segment } from "@/components/studio/Segment";
import { WebhookFlow } from "@/components/studio/WebhookFlow";
import { ROUTES } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, buildGraph } from "@/lib/schema";

/* Title, meta and H1 are taken verbatim from the page’s keyword brief,
   so the built page matches what was signed off in the content package. */
const TITLE = "Multi-Channel Marketing Platform | CampaignX";
const DESCRIPTION =
  "Publish one campaign to Instagram, Facebook, LinkedIn, Google Business, X, email and SMS, each formatted for its channel and scheduled from one calendar.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.multiChannel.href,
});

const schema = buildGraph(
  {
    path: ROUTES.multiChannel.href,
    name: "Multi-Channel Marketing: Publish One Campaign to Seven Channels",
    description: DESCRIPTION,
  },
  [
    breadcrumbSchema([
      { name: "Features", href: ROUTES.productIndex.href },
      { name: "Multi-Channel Publishing", href: ROUTES.multiChannel.href },
    ]),
  ],
);

const FORMAT_ROWS = [
  {
    label: "The copy",
    left: "One message pasted into every box",
    right: "Written for each channel from the same brief",
  },
  {
    label: "The creative",
    left: "One image, resized",
    right: "Composed for each frame",
  },
  {
    label: "The schedule",
    left: "Set separately in each tool",
    right: "One calendar for the whole campaign",
  },
  {
    label: "When one is wrong",
    left: "Fix it in that tool, hope the rest match",
    right: "Regenerate that channel, the rest stay put",
  },
];

const STACK_ROWS = [
  {
    label: "Your CRM",
    left: "Replace it, migrate the data",
    right: "Keep it — webhooks send the events",
  },
  {
    label: "Your analytics",
    left: "Replace it, lose the history",
    right: "Keep it — CampaignX reports on its own campaigns",
  },
  {
    label: "Your scheduler",
    left: "Run two schedules in parallel",
    right: "One calendar, or connect your own via webhook",
  },
];

const CHANNEL_CARDS = [
  {
    art: "instagram" as const,
    title: "Instagram",
    body: "Feed and story formats with captions written for the platform. The creative is composed for 4:5 and 9:16 rather than cropped down from a landscape hero.",
    spec: "Feed and story · published and scheduled",
  },
  {
    art: "facebook" as const,
    title: "Facebook",
    body: "Posts that carry the campaign without reading like a reprint of the LinkedIn one. Slightly longer, slightly plainer, same idea underneath.",
    spec: "Feed post · published and scheduled",
  },
  {
    art: "linkedin" as const,
    title: "LinkedIn",
    body: "A more considered register with room to make an argument, which is what that feed rewards — without sliding into corporate filler.",
    spec: "Long-form post · published and scheduled",
  },
  {
    art: "x" as const,
    title: "X",
    body: "Copy tight enough for the character budget with the point intact. There is no room for a warm-up line, so the first clause has to be the idea.",
    spec: "Single post · published and scheduled",
  },
  {
    art: "google" as const,
    title: "Google Business",
    body: "Plain, local and specific updates suited to a business listing. No campaign language and no slogan — what is on, who it is for, when it ends.",
    spec: "Listing update · published and scheduled",
  },
  {
    art: "email" as const,
    title: "Email",
    body: "Subject line, preview text, body and artwork produced as one piece, then sent on the campaign calendar alongside everything else.",
    spec: "Campaign email · sent on schedule",
  },
  {
    art: "sms" as const,
    title: "SMS",
    body: "Short messages that match the campaign without sounding clipped, timed as part of the sequence rather than as a separate job someone remembers.",
    spec: "One message · sent on schedule",
  },
  {
    art: "webhook" as const,
    title: "Webhooks",
    body: "Everything else in your stack. As the campaign publishes, webhooks push its events to the tools your team already relies on.",
    spec: "Campaign events · sent as it goes live",
  },
];

const FAQS = [
  {
    question: "Do I still need my scheduler?",
    answer:
      "You can keep the tools you already use. CampaignX publishes and schedules to connected platforms directly, and webhooks send the campaign to anything else in your stack.",
  },
  {
    question: "Which channels does CampaignX publish to?",
    answer:
      "Instagram, Facebook, LinkedIn, Google Business, X, email and SMS, plus webhooks for other tools. That is seven channels in total.",
  },
  {
    question: "Will the same post go out everywhere?",
    answer:
      "No. Each channel gets copy and creative built for that channel’s format rather than one asset resized. The campaign stays consistent; the formats differ.",
  },
  {
    question: "Can CampaignX publish without us approving first?",
    answer:
      "No. Nothing sends without a named approver, on any channel.",
  },
  {
    question: "How do I connect my accounts?",
    answer:
      "You connect each account through that platform’s own sign-in screen. CampaignX stores the access it needs to publish and to read post metrics, and each platform’s own terms and rate limits still apply.",
  },
];

const TOTAL = 5;

/**
 * Multi-Channel Publishing.
 *
 * Same structure as the other feature pages: an inset hero, then five
 * numbered segments inside a shared frame, each with its own layout and
 * its own animated visual.
 *
 * `PageShell` is deliberately not used: it owns a hero this page
 * replaces, and the segment frame supplies the rest of the chrome.
 */
export default function MultiChannelPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <main id="main">
        <InsetHero
          tag="Multi-Channel Publishing"
          title="Publish One Campaign to *Seven Channels*"
          intro="One brief becomes a campaign for Instagram, Facebook, LinkedIn, Google Business, X, email and SMS — each formatted for its channel and scheduled from one calendar."
          demoLabel="Watch the 2-minute demo"
          brief="Launch the spring range across every channel."
          facts={[
            { label: "Channels", value: "Seven, plus webhooks" },
            { label: "Calendar", value: "One for the campaign" },
            { label: "Published", value: "Only on approval" },
          ]}
        />

        {/* 01 — coverage, as the constellation. */}
        <Segment
          seg="01"
          label="Coverage"
          step={1}
          total={TOTAL}
          tone="tint"
          heading="Seven channels from one brief"
        >
          {/* Copy left, panel right — the same two-column shape the
              other feature pages use. The previous full-width rail
              stretched seven rows across the whole band, which read as
              a dashboard table rather than a section. */}
          {/* Top-aligned, not centred: the copy column is much shorter
              than the panel beside it, so centring it pushed the first
              paragraph down and opened a gap under the heading. */}
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
            <div>
              <p className="text-[1.125rem] leading-[1.65] text-foreground">
                Named, not estimated. These are the channels a CampaignX
                campaign publishes to today.
              </p>
              <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                One brief goes in. Seven channel-native drafts come back —
                each written to the format and limits of the channel it is
                going to, not one caption pasted seven times.
              </p>

              <ul className="mt-7 space-y-2.5">
                {[
                  "Instagram, Facebook, LinkedIn and X for social",
                  "Google Business for the local listing",
                  "Email and SMS for people who already know you",
                  "Webhooks for anything else in your stack",
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
                Every draft waits for your approval before it publishes.
              </p>
            </div>

            <ChannelConstellation eyebrow="" heading="" bare />
          </div>
        </Segment>

        {/* 02 — formatted per channel. */}
        <Segment
          seg="02"
          label="Per channel"
          step={2}
          total={TOTAL}
          heading="Formatted for each channel, not resized"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
            <div>
              <p className="text-[1.0625rem] leading-[1.7] text-muted-strong">
                Publishing to multiple social media platforms is easy. Doing it
                without the campaign reading as one message pasted seven times
                is the part most tools leave to you.
              </p>
              <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                Each surface has its own constraints — a character budget, a
                reading posture, an expectation about how direct to be. The
                brand voice underneath stays constant; the formats do not.
              </p>
              <div className="mt-7">
                <Annotation tag="Worth knowing">
                  The same brand model writes every channel, so a
                  cross-channel campaign reads as one idea rather than seven
                  unrelated posts. See{" "}
                  <Link
                    href={ROUTES.brandVoice.href}
                    className="text-accent underline underline-offset-2"
                  >
                    brand voice
                  </Link>
                  .
                </Annotation>
              </div>
            </div>

            <CompareTable
              tone="light"
              question="One asset reused vs. built per channel"
              left="Reused"
              right="Built per channel"
              rows={FORMAT_ROWS}
            />
          </div>
        </Segment>

        {/* 03 — the calendar. */}
        <Segment
          seg="03"
          label="Scheduling"
          step={3}
          total={TOTAL}
          tone="warm"
          heading="Social media scheduling from one calendar"
        >
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-14">
            <div>
              <p className="text-[1.125rem] leading-[1.65] text-foreground">
                A campaign that runs on six channels should not need six
                schedules to keep straight.
              </p>
              <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                Once your named approver signs off, CampaignX publishes and
                schedules to every connected platform from one view — so you
                can see the whole fortnight at once rather than reconstructing
                it from six tabs.
              </p>

              <ul className="mt-7 space-y-2.5">
                {[
                  "Every channel on one timeline",
                  "Scheduled once, published on the day",
                  "Each platform’s own rate limits still apply",
                  "Nothing sends before approval",
                ].map((item) => (
                  <li
                    key={item}
                    className="relative pl-5 text-[0.9375rem] leading-relaxed text-muted-strong before:absolute before:left-0 before:top-[0.6875rem] before:size-1.5 before:rounded-full before:bg-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <ScheduleBoard />
          </div>
        </Segment>

        {/* 04 — webhooks and the rest of the stack. */}
        <Segment
          seg="04"
          label="Your stack"
          step={4}
          total={TOTAL}
          heading="Connect other tools with webhooks"
        >
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
            <WebhookFlow />

            <div>
              <p className="text-[1.0625rem] leading-[1.7] text-muted-strong">
                CampaignX is not trying to replace the systems your customer
                data already lives in. It publishes the campaign, then tells
                the rest of your stack that it did.
              </p>

              <div className="mt-8">
                <CompareTable
                  tone="light"
                  question="Replacing your stack vs. connecting to it"
                  left="Replace"
                  right="Connect"
                  rows={STACK_ROWS}
                />
              </div>
            </div>
          </div>
        </Segment>

        {/* 05 — per-channel detail, then objections. */}
        <Segment
          seg="05"
          label="Every channel"
          step={5}
          total={TOTAL}
          tone="warm"
          heading="What each channel actually gets"
        >
          <p className="max-w-[52rem] text-[1.0625rem] leading-[1.7] text-muted-strong">
            Seven surfaces, seven sets of constraints, one campaign
            underneath.
          </p>

          <div className="mt-9">
            <ArtCardGrid kicker="" heading="" cards={CHANNEL_CARDS} bare />
          </div>

          <div className="mt-12 overflow-hidden rounded-frame border border-line bg-surface">
            <div className="grid lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
              <div className="flex flex-col justify-between gap-8 border-b border-line bg-surface-soft p-5 sm:p-8 lg:border-b-0 lg:border-r lg:p-9">
                <div>
                  <p className="text-[1.0625rem] leading-[1.7] text-muted-strong">
                    These five decide whether a team moves its publishing into
                    one place or keeps running six tools in parallel.
                  </p>

                  <ul className="mt-7 space-y-3">
                    {[
                      "Whether you keep your scheduler",
                      "Which channels are covered",
                      "Whether posts are duplicates",
                      "Publishing without approval",
                      "Connecting your accounts",
                    ].map((topic, i) => (
                      <li
                        key={topic}
                        className="flex items-baseline gap-3 text-[0.875rem] leading-snug text-muted-strong"
                      >
                        <span className="text-display w-4 shrink-0 text-[0.75rem] tabular-nums text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-line pt-6">
                  <p className="text-[0.8125rem] leading-relaxed text-muted">
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
                      { label: "Brand Voice", href: ROUTES.brandVoice.href },
                      { label: "Approvals", href: ROUTES.approvals.href },
                      { label: "Analytics", href: ROUTES.analytics.href },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="rounded-pill border border-line bg-surface px-3 py-1.5 text-[0.8125rem] text-muted-strong transition-colors duration-200 hover:border-accent-line hover:text-accent"
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
