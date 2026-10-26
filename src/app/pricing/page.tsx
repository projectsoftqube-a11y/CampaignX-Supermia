import { FeatureGrid } from "@/components/page/FeatureGrid";
import { PageFaq } from "@/components/page/PageFaq";
import { PageSection } from "@/components/page/PageSection";
import { PageShell } from "@/components/page/PageShell";
import { ChannelConstellation } from "@/components/page/ChannelConstellation";
import { StatBand } from "@/components/page/StatBand";
import { Pricing } from "@/components/sections/Pricing";
import { ROUTES } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";

const TITLE = "CampaignX Pricing: Free During Beta, Team and Enterprise";
const DESCRIPTION =
  "CampaignX is free during Beta. Compare Starter, Team and Enterprise plans: channels, brand model, approvals, reporting, seats and security controls.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.pricing.href,
});

/* The plan cards come from the billing API, so this page renders per
   request for the same reason the homepage does. */
export const dynamic = "force-dynamic";

const INCLUDED = [
  {
    title: "One brief, seven channels",
    body: "Instagram, Facebook, LinkedIn, Google Business, X, email and SMS, plus webhooks, on every plan.",
    href: ROUTES.multiChannel.href,
  },
  {
    title: "Your brand voice",
    body: "A brand model learned from your own material, so the first draft already sounds like you.",
    href: ROUTES.brandVoice.href,
  },
  {
    title: "Review before anything ships",
    body: "Nothing sends without a named approver, on any plan.",
    href: ROUTES.approvals.href,
  },
];

const FAQS = [
  {
    question: "Is CampaignX free?",
    answer:
      "CampaignX is free during Beta on the Starter plan, which includes full Beta access, all channel outputs, the brand voice model and community support. Pricing after Beta has not been published yet.",
  },
  {
    question: "What does the Team plan add?",
    answer:
      "The Team plan, currently in Early Access, adds unlimited campaigns, the full brand model with approvals, the performance loop and reporting, and unlimited seats. Like Starter, it covers all channels.",
  },
  {
    question: "What does Enterprise include?",
    answer:
      "Enterprise includes everything in Team, plus SSO/SAML and SCIM, a choice of data residency, audit export and retention controls, and a named support contact. Pricing is custom.",
  },
  {
    question: "What happens when Beta ends?",
    answer:
      "Pricing after Beta has not been published yet. Starter is free for the duration of the Beta.",
  },
];

export default function PricingPage() {
  return (
    <PageShell
      path={ROUTES.pricing.href}
      description={DESCRIPTION}
      eyebrow="Pricing"
      title="CampaignX Pricing: Free During Beta"
      intro="Starter is free during Beta and includes every channel output and the brand voice model. Team adds unlimited campaigns, unlimited seats, reporting and the full brand model with approvals, and is in Early Access. Enterprise adds SSO, a choice of data residency and a named support contact, at a custom price."
      masthead={{
        index: "06",
        brief: "Try a first campaign before committing to anything.",
        facts: [
          { label: "Starter", value: "Free during Beta" },
          { label: "Team", value: "Early Access" },
          { label: "Enterprise", value: "Custom" },
          { label: "Every plan", value: "All seven channels" },
        ],
      }}
      breadcrumbs={[{ name: "Pricing", href: ROUTES.pricing.href }]}
    >
      {/* The same component the homepage uses, so the two can never show
          different prices. No Offer or price markup is emitted anywhere on
          this page: the content package forbids it until final prices are
          public. */}
      <Pricing />

      <PageSection
        tone="warm"
        eyebrow="Every plan"
        heading="What every plan includes"
        intro="Whichever plan you are on, a campaign is built from one brief, written in your brand voice, and reviewed by you before it goes out."
      >
        <FeatureGrid items={INCLUDED} />
      </PageSection>

      <ChannelConstellation
        eyebrow="On every plan"
        heading="Seven channels, whichever plan you are on"
        intro="Channel coverage is not the thing the plans differ on. Starter publishes to the same seven channels as Enterprise."
      />

      <StatBand
        stats={[
          { value: "Free", label: "Starter during Beta", note: "Full Beta access and the brand voice model." },
          { value: "7", label: "Channels on every plan", note: "Plus webhooks for other tools." },
          { value: "0", label: "Posts without approval", note: "On every plan." },
          { value: "Custom", label: "Enterprise", note: "SSO/SAML, SCIM, data residency, audit export." },
        ]}
      />

      <PageSection
        eyebrow="Questions"
        heading="Pricing FAQs"
        intro="More on channels, approvals and data handling on the FAQ page."
      >
        <PageFaq items={FAQS} />
      </PageSection>
    </PageShell>
  );
}
