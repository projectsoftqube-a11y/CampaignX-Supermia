import Link from "next/link";
import { FeatureGrid } from "@/components/page/FeatureGrid";
import { PageSection } from "@/components/page/PageSection";
import { PageShell } from "@/components/page/PageShell";
import { CampaignMarquee } from "@/components/page/CampaignMarquee";
import { StatBand } from "@/components/page/StatBand";
import { ROUTES } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";

const TITLE = "About CampaignX | Built by SuperMIA";
const DESCRIPTION =
  "CampaignX is the AI campaign agent built by SuperMIA to give marketing teams their time back. Meet the product, the team behind it and how to reach us.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.about.href,
});

const WHY = [
  {
    title: "Campaigns are hard to assemble, not hard to imagine",
    body: "A brief turns into a deck, the deck turns into copy for five channels, someone makes the visuals, someone else schedules it, and three weeks later it goes live.",
  },
  {
    title: "The same message, rewritten five times",
    body: "Most of the work between an idea and a live campaign is reformatting, not thinking. That is the part a machine should do.",
  },
  {
    title: "Approval is not optional",
    body: "Anything that publishes under your name needs a person to say yes first. That is built into the product rather than bolted on.",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      path={ROUTES.about.href}
      description={DESCRIPTION}
      eyebrow="About"
      title="About CampaignX"
      intro="CampaignX is the AI campaign agent built by SuperMIA to give marketing teams their time back. One brief becomes a complete, on-brand campaign, and nothing ships without your approval."
      masthead={{
        index: "07",
        brief: "Give marketing teams their time back.",
        facts: [
          { label: "Built by", value: "SuperMIA" },
          { label: "Operated by", value: "Botfinity Inc." },
          { label: "Based in", value: "Grapevine, Texas" },
          { label: "Contact", value: "hello@supermia.ai" },
        ],
      }}
      breadcrumbs={[{ name: "About", href: ROUTES.about.href }]}
    >
      <PageSection
        eyebrow="Why"
        heading="Why we built CampaignX"
        intro="Most campaigns are not hard to imagine. They are hard to assemble."
      >
        <FeatureGrid items={WHY} />
      </PageSection>

      <StatBand
        stats={[
          { value: "7", label: "Channels from one brief", note: "Plus webhooks for other tools." },
          { value: "~10 min", label: "To a first campaign", note: "A trusted brand model takes about an afternoon." },
          { value: "0", label: "Posts without approval", note: "A named approver signs off every time." },
          { value: "2026", label: "Built by SuperMIA", note: "Operated by Botfinity Inc., Grapevine, Texas." },
        ]}
      />

      <CampaignMarquee
        eyebrow="The work"
        heading="What comes out of it"
        intro="Campaigns built from a sentence, in a brand voice, approved by a person."
        picks={[1, 6, 11, 16, 21, 26, 4, 9, 14, 19]}
      />

      <PageSection
        tone="warm"
        eyebrow="Who"
        heading="Built by SuperMIA"
        intro="CampaignX is made by SuperMIA, a conversational AI platform, and operated by Botfinity Inc. The same company is named in the CampaignX terms and privacy policy."
      >
        <FeatureGrid
          items={[
            {
              title: "SuperMIA",
              body: "The AI platform CampaignX is built on. More about the product line on supermia.ai.",
              href: "https://supermia.ai/",
            },
            {
              title: "Botfinity Inc.",
              body: "The operating company, at 2451 W Grapevine Mills Cir #547, Grapevine, TX 76051.",
            },
            {
              title: "How your data is handled",
              body: "Processors, retention and training are all set out in the privacy policy and the FAQ.",
              href: ROUTES.faq.href,
            },
          ]}
        />
      </PageSection>

      <PageSection
        eyebrow="Contact"
        heading="Contact"
        intro="The quickest way to reach the team is by email."
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          <li data-animate="reveal" className="rounded-panel border border-line bg-surface p-6">
            <p className="text-eyebrow text-muted">Email</p>
            <Link
              href="mailto:hello@supermia.ai"
              className="text-display mt-2 block text-[1.1875rem] font-medium transition-colors hover:text-accent"
            >
              hello@supermia.ai
            </Link>
          </li>
          <li data-animate="reveal" className="rounded-panel border border-line bg-surface p-6">
            <p className="text-eyebrow text-muted">Address</p>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-strong">
              2451 W Grapevine Mills Cir #547
              <br />
              Grapevine, TX 76051, United States
            </p>
          </li>
        </ul>
      </PageSection>
    </PageShell>
  );
}
