import { CampaignMarquee } from "@/components/page/CampaignMarquee";
import { FeatureGrid } from "@/components/page/FeatureGrid";
import { PageSection } from "@/components/page/PageSection";
import { PageShell } from "@/components/page/PageShell";
import { ShowcaseSplit } from "@/components/page/ShowcaseSplit";
import { StatBand } from "@/components/page/StatBand";
import { ROUTES, routesInSection } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";

const TITLE = "Who CampaignX Is For: Small Business, Agencies, Teams, Founders";
const DESCRIPTION =
  "CampaignX is built for small businesses, agencies, marketing teams and founders who need complete campaigns without assembling them by hand.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.useCasesIndex.href,
});

export default function UseCasesIndexPage() {
  return (
    <PageShell
      path={ROUTES.useCasesIndex.href}
      description={DESCRIPTION}
      eyebrow="Use Cases"
      title="Built for the People Who Actually Ship the Campaign"
      intro="Whether that is a founder between two other jobs, an agency running five brands, or a team losing days to handoffs — the input is the same sentence, and the output is a campaign you approve."
      masthead={{
        index: "03",
        brief: "Get this month's campaign out without a marketing team.",
        facts: [
          { label: "Small business", value: "No department needed" },
          { label: "Agencies", value: "A model per client" },
          { label: "Teams", value: "No handoffs" },
          { label: "Founders", value: "Ten minutes" },
        ],
      }}
      breadcrumbs={[{ name: "Use Cases", href: ROUTES.useCasesIndex.href }]}
    >
      <PageSection
        eyebrow="Audiences"
        heading="Find the version of this that matches you"
        intro="Same product, different problem being solved."
      >
        <FeatureGrid
          items={routesInSection("useCases").map((route) => ({
            title: route.label,
            body: route.description ?? "",
            href: route.href,
          }))}
          columns={2}
        />
      </PageSection>

      <StatBand
        stats={[
          { value: "1", label: "Brief to write", note: "A sentence about what you are promoting." },
          { value: "~10 min", label: "To a first campaign", note: "A trusted brand model takes about an afternoon." },
          { value: "7", label: "Channels covered", note: "Plus webhooks for anything else." },
          { value: "0", label: "Posts without approval", note: "A named approver signs off first." },
        ]}
      />

      <ShowcaseSplit
        side="left"
        eyebrow="What they share"
        heading="The assembly is the part that gets automated"
        intro="Nobody here is short of ideas. They are short of the hours between an idea and seven channels of finished, on-brand, approved work."
        points={[
          "Strategy, copy and creative from one brief",
          "Your brand voice, learned from your own material",
          "A named approver before anything is published",
        ]}
        media={{
          kind: "video",
          src: "/videos/campaignx-email.mp4",
          label: "A CampaignX campaign being generated from one brief",
        }}
      />

      <CampaignMarquee
        eyebrow="Output"
        heading="Campaigns these teams shipped"
        intro="Creative generated with its copy, approved before it went out."
        picks={[1, 4, 8, 12, 16, 20, 24, 3, 7, 11]}
      />
    </PageShell>
  );
}
