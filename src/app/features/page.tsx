import { FeatureGrid } from "@/components/page/FeatureGrid";
import { PageSection } from "@/components/page/PageSection";
import { PageShell } from "@/components/page/PageShell";
import { ChannelConstellation } from "@/components/page/ChannelConstellation";
import { CampaignMarquee } from "@/components/page/CampaignMarquee";
import { StatBand } from "@/components/page/StatBand";
import { ROUTES, routesInSection } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";

const TITLE = "Product: Brand Voice, Creative and Publishing | CampaignX";
const DESCRIPTION =
  "Everything CampaignX does between a one-sentence brief and a published campaign: brand voice, AI creative, multi-channel publishing, approvals and reporting.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.productIndex.href,
});

export default function ProductIndexPage() {
  const features = routesInSection("product");

  return (
    <PageShell
      path={ROUTES.productIndex.href}
      description={DESCRIPTION}
      eyebrow="Features"
      title="One Brief In, a Complete Campaign Out"
      intro="CampaignX covers the whole span between the sentence you write and the campaign that publishes. These are the parts that do the work."
      masthead={{
        index: "01",
        brief: "Spring offer, two weeks, for existing customers.",
        facts: [
          { label: "Input", value: "One sentence" },
          { label: "Output", value: "Seven channels" },
          { label: "First campaign", value: "~10 minutes" },
          { label: "Published", value: "Only on approval" },
        ],
      }}
      breadcrumbs={[{ name: "Features", href: ROUTES.productIndex.href }]}
    >
      <PageSection
        eyebrow="Features"
        heading="Everything CampaignX does"
        intro="Five parts of one product, not five products."
      >
        <FeatureGrid
          items={features.map((route) => ({
            title: route.label,
            body: route.description ?? "",
            href: route.href,
          }))}
        />
      </PageSection>

      <StatBand
        stats={[
          { value: "1", label: "Brief to write", note: "A sentence is enough to start." },
          { value: "7", label: "Channels published", note: "Plus webhooks for other tools." },
          { value: "~10 min", label: "To a first campaign", note: "A trusted brand model takes about an afternoon." },
          { value: "0", label: "Posts without approval", note: "A named approver signs off first." },
        ]}
      />

      <ChannelConstellation
        eyebrow="Where it goes"
        heading="The channels a campaign publishes to"
        intro="Instagram, Facebook, LinkedIn, Google Business, X, email and SMS, plus webhooks for anything else in your stack."
      />

      <PageSection
        tone="warm"
        eyebrow="By channel"
        heading="Read about a channel"
        intro="What CampaignX writes for each one, and how it is approved before it sends."
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
        heading="What CampaignX produces"
        intro="Creative generated with its copy, from one brief, approved before publishing."
        picks={[1, 5, 9, 13, 17, 21, 25, 2, 6, 10]}
      />
    </PageShell>
  );
}
