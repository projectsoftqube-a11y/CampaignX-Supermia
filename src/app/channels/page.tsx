import { CampaignMarquee } from "@/components/page/CampaignMarquee";
import { ChannelConstellation } from "@/components/page/ChannelConstellation";
import { FeatureGrid } from "@/components/page/FeatureGrid";
import { PageSection } from "@/components/page/PageSection";
import { PageShell } from "@/components/page/PageShell";
import { StatBand } from "@/components/page/StatBand";
import { ROUTES, routesInSection } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";

const TITLE = "Marketing Channels CampaignX Publishes To | CampaignX";
const DESCRIPTION =
  "One brief becomes a campaign for Instagram, Facebook, LinkedIn, Google Business, X, email and SMS, each written for its own format and approved before it sends.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.channelsIndex.href,
});

export default function ChannelsIndexPage() {
  return (
    <PageShell
      path={ROUTES.channelsIndex.href}
      description={DESCRIPTION}
      eyebrow="Channels"
      title="Seven Channels, One Brief, One Brand Voice"
      intro="A campaign is not one message posted seven times. Each channel gets copy and creative built for how people actually read there, from the same brief and the same brand model."
      masthead={{
        index: "02",
        brief: "Announce the new range everywhere our customers are.",
        facts: [
          { label: "Social", value: "Five surfaces" },
          { label: "Direct", value: "Email and SMS" },
          { label: "Everything else", value: "Webhooks" },
          { label: "Calendar", value: "One for all of it" },
        ],
      }}
      breadcrumbs={[{ name: "Channels", href: ROUTES.channelsIndex.href }]}
    >
      <ChannelConstellation
        eyebrow="Coverage"
        heading="Where a CampaignX campaign goes"
        intro="Named, not estimated. These are the channels a campaign publishes to today."
      />

      <StatBand
        stats={[
          { value: "7", label: "Channels published", note: "Plus webhooks for other tools." },
          { value: "1", label: "Brief behind them", note: "Written once, formatted seven ways." },
          { value: "1", label: "Calendar", note: "The whole campaign scheduled in one place." },
          { value: "0", label: "Sends without approval", note: "A named approver signs off first." },
        ]}
      />

      <PageSection
        tone="warm"
        eyebrow="By channel"
        heading="Read about a channel"
        intro="What CampaignX writes for each one, how it stays consistent with the rest of the campaign, and how it is approved."
      >
        <FeatureGrid
          items={routesInSection("channels").map((route) => ({
            title: route.label,
            body: route.description ?? "",
            href: route.href,
          }))}
        />
      </PageSection>

      <CampaignMarquee
        eyebrow="Output"
        heading="Creative from across the channels"
        intro="Generated with the copy it belongs to, and approved before publishing."
        picks={[2, 7, 12, 17, 22, 26, 5, 10, 15, 20]}
      />
    </PageShell>
  );
}
