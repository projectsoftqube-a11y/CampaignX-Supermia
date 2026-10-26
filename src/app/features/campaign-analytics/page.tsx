import { FeatureGrid } from "@/components/page/FeatureGrid";
import { MetricPanel } from "@/components/page/MetricPanel";
import { PageFaq } from "@/components/page/PageFaq";
import { PageSection } from "@/components/page/PageSection";
import { PageShell } from "@/components/page/PageShell";
import { StoryBeat } from "@/components/page/StoryBeat";
import { StatBand } from "@/components/page/StatBand";
import { ROUTES } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";

const TITLE = "Marketing Campaign Analytics and Reporting | CampaignX";
const DESCRIPTION =
  "See how each campaign performs across channels in one report, and let what worked shape your next brief.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.analytics.href,
});

const TRACKED = [
  {
    kicker: "Per campaign",
    title: "Reach",
    body: "How many people the campaign reached on each channel it published to.",
  },
  {
    kicker: "Per campaign",
    title: "Engagement",
    body: "How people responded, channel by channel, in one place rather than six dashboards.",
  },
  {
    kicker: "Per channel",
    title: "Channel comparison",
    body: "Which channels carried the campaign and which added little, for this audience.",
  },
];

const LOOP = [
  {
    title: "What worked goes back in",
    body: "Results feed the performance loop, so the next campaign starts from evidence rather than a blank page.",
  },
  {
    title: "The brief gets better",
    body: "Over time the model has your campaigns and their outcomes to work from, not just your brand voice.",
  },
  {
    title: "Your own tools still apply",
    body: "CampaignX reports on its campaigns; your analytics platform keeps doing everything else.",
  },
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
      "The performance loop and reporting are listed on the Team plan. Pricing sets out what each plan includes.",
  },
  {
    question: "Does CampaignX report on paid ad spend?",
    answer:
      "No. CampaignX does not buy or manage paid advertising, so there is no ad spend to report on.",
  },
];

export default function AnalyticsPage() {
  return (
    <PageShell
      path={ROUTES.analytics.href}
      description={DESCRIPTION}
      eyebrow="Campaign Analytics"
      title="Marketing Campaign Analytics That Feed Your Next Campaign"
      intro="One report per campaign across every channel it published to, and a performance loop that carries what worked into the next brief."
      masthead={{
        index: "05",
        brief: "Re-engage customers who stopped buying this quarter.",
        facts: [
          { label: "Report", value: "One per campaign" },
          { label: "Measures", value: "Reach and engagement" },
          { label: "Feeds", value: "The next brief" },
          { label: "Ad spend", value: "None to reconcile" },
        ],
      }}
      breadcrumbs={[
        { name: "Features", href: ROUTES.productIndex.href },
        { name: "Campaign Analytics", href: ROUTES.analytics.href },
      ]}
    >
      <StoryBeat
        beat="tension"
        eyebrow="Before"
        heading="The campaign ran. Then what?"
        body="Six platforms, six dashboards, six different definitions of engagement. Pulling them into one slide takes an afternoon, and by the time it is done the next campaign has already been briefed from a blank page."
        pullquote="We never find out what worked."
        media={{ src: "/images/gallery/campaign-19.webp", alt: "" }}
        caption="Six dashboards"
      />

      <MetricPanel
        eyebrow="Reporting"
        heading="One report across channels"
        intro="A campaign that ran on six channels should not need six dashboards to understand. Every channel the campaign published to, in one view."
      />

      <PageSection
        tone="warm"
        eyebrow="Reporting"
        heading="What lands in the report"
        intro="Three things per campaign, tied to the campaign that produced them."
      >
        <FeatureGrid items={TRACKED} />
      </PageSection>

      <StatBand
        stats={[
          { value: "1", label: "Report per campaign", note: "Not one per platform." },
          { value: "7", label: "Channels covered", note: "Everything the campaign published to." },
          { value: "0", label: "Ad spend to reconcile", note: "CampaignX does not buy ads." },
          { value: "Next", label: "Brief starts here", note: "Results feed the performance loop." },
        ]}
      />

      <PageSection
        eyebrow="Measured"
        heading="What CampaignX tracks"
        intro="Reach and engagement per channel, tied to the campaign that produced them. Results language stays hedged here on purpose: no marketing tool can promise an outcome."
      >
        <FeatureGrid items={LOOP} />
      </PageSection>

      <PageSection
        eyebrow="The loop"
        heading="Results that shape the next brief"
        intro="Most reporting ends in a slide. This ends in the next campaign."
      >
        <FeatureGrid
          items={[
            {
              title: "Start from what performed",
              body: "The next brief begins with the channels and angles that worked last time.",
            },
            {
              title: "Your brand model improves",
              body: "Corrections you made at approval are part of what the model learns.",
              href: ROUTES.brandVoice.href,
            },
            {
              title: "Publish again in minutes",
              body: "The loop is only useful if acting on it is quick.",
              href: ROUTES.multiChannel.href,
            },
          ]}
        />
      </PageSection>

      <PageSection
        eyebrow="Questions"
        heading="Analytics FAQs"
        intro="More on plans and channels on the FAQ page."
      >
        <PageFaq items={FAQS} />
      </PageSection>
    </PageShell>
  );
}
