import { FeatureGrid } from "@/components/page/FeatureGrid";
import { PageFaq } from "@/components/page/PageFaq";
import { PageSection } from "@/components/page/PageSection";
import { PageShell } from "@/components/page/PageShell";
import { StoryBeat } from "@/components/page/StoryBeat";
import { ShowcaseSplit } from "@/components/page/ShowcaseSplit";
import { StatBand } from "@/components/page/StatBand";
import { StepSequence } from "@/components/page/StepSequence";
import { ROUTES } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";

const TITLE = "Content Approval Workflow for Marketing Teams | CampaignX";
const DESCRIPTION =
  "In CampaignX nothing sends without a named approver. Edit any asset, regenerate one channel or rewrite the brief before you approve.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.approvals.href,
});

const STEPS = [
  {
    marker: "The campaign is built",
    title: "Every channel, ready to read",
    body: "Copy and creative for all seven channels are produced together and laid out in one place, so you review a campaign rather than a queue of fragments.",
  },
  {
    marker: "A named approver",
    title: "One person has to say yes",
    body: "Approval is attached to a named person, not a shared inbox. Nothing sends without it, on any channel.",
  },
  {
    marker: "Change what is wrong",
    title: "Edit, regenerate or rewrite",
    body: "Fix a line by hand, regenerate a single channel, or rewrite the brief and run the whole campaign again.",
  },
  {
    marker: "It ships",
    title: "Published on your word",
    body: "Once approved, the campaign publishes and schedules to the connected platforms, and reporting starts.",
  },
];

const CONTROLS = [
  {
    kicker: "Smallest change",
    title: "Edit any asset",
    body: "Change a word or a whole paragraph. The rest of the campaign stays as it was.",
  },
  {
    kicker: "One channel",
    title: "Regenerate a channel",
    body: "If the SMS misses but the emails are right, regenerate only the SMS.",
  },
  {
    kicker: "Start again",
    title: "Rewrite the brief",
    body: "If the whole direction is wrong, change the brief and rebuild the campaign from it.",
  },
];

const FAQS = [
  {
    question: "What if the output is wrong?",
    answer:
      "Edit the asset, regenerate that one channel, or rewrite the brief and run the campaign again. Nothing has been published at that point, because nothing sends without a named approver.",
  },
  {
    question: "Can CampaignX post something we have not approved?",
    answer:
      "No. A named approver has to sign off before anything is published or scheduled, on every channel.",
  },
  {
    question: "How do approvals work for agencies with clients?",
    answer:
      "Each client brand has its own workspace and its own brand model, so the right person approves the right campaigns and one brand voice never reaches another.",
  },
  {
    question: "Is the approval step on every plan?",
    answer:
      "The full brand model with approvals is listed on the Team plan. Pricing sets out what each plan includes.",
  },
];

export default function ApprovalsPage() {
  return (
    <PageShell
      path={ROUTES.approvals.href}
      description={DESCRIPTION}
      eyebrow="Approvals"
      title="Content Approval Workflow: Nothing Ships Without Your Sign-Off"
      intro="CampaignX has a content approval workflow built in. A named approver reviews the whole campaign, and nothing publishes until they say so."
      masthead={{
        index: "04",
        brief: "Announce the partnership on Thursday morning.",
        facts: [
          { label: "Approver", value: "A named person" },
          { label: "Without sign-off", value: "Nothing sends" },
          { label: "Corrections", value: "Edit, regenerate, rewrite" },
          { label: "Reviewed", value: "As it will publish" },
        ],
      }}
      breadcrumbs={[
        { name: "Features", href: ROUTES.productIndex.href },
        { name: "Approvals", href: ROUTES.approvals.href },
      ]}
    >
      <StoryBeat
        beat="tension"
        eyebrow="Before"
        heading="Who approved this post?"
        body="Something went out under the company name that nobody quite remembers signing off. The approval lived in a thread, the thread had four people in it, and none of them were the one who pressed publish."
        pullquote="Who approved this post?"
        media={{ src: "/images/gallery/campaign-11.webp", alt: "" }}
        caption="Already published"
      />

      <StepSequence
        eyebrow="The workflow"
        heading="How approvals work"
        intro="The marketing approval process, in four steps."
        steps={STEPS}
      
        media={[
          { src: "/images/how-01-brief.png", alt: "" },
          { src: "/images/how-02-brand.png", alt: "" },
          { src: "/images/how-03-channels.png", alt: "" },
          { src: "/images/how-04-learn.png", alt: "" },
        ]}
      />

      <PageSection
        tone="warm"
        eyebrow="Your options"
        heading="Edit, regenerate or rewrite"
        intro="Three sizes of correction, so a single bad line does not mean starting the campaign again."
      >
        <FeatureGrid items={CONTROLS} />
      </PageSection>

      <StatBand
        stats={[
          { value: "1", label: "Named approver", note: "A person, not a shared inbox." },
          { value: "0", label: "Posts without sign-off", note: "On every channel, every time." },
          { value: "3", label: "Ways to correct it", note: "Edit, regenerate a channel, or rewrite the brief." },
          { value: "7", label: "Channels reviewed together", note: "You approve the campaign, not fragments." },
        ]}
      />

      <ShowcaseSplit
        side="left"
        eyebrow="What you review"
        heading="The campaign as it will publish"
        intro="Approving a caption without its image tells you very little. Copy and creative are reviewed together, in the format they will actually go out in."
        points={[
          "Every channel in one view",
          "Edit in place, or regenerate one channel",
          "Nothing sends until you release it",
        ]}
        media={{
          kind: "video",
          src: "/videos/campaignx-instagram.mp4",
          label: "Reviewing a CampaignX Instagram post before approval",
        }}
      />

      <PageSection
        eyebrow="Agencies"
        heading="Approvals for agencies and clients"
        intro="Running campaigns for several brands means several approvers, and no room for one client's content reaching another."
      >
        <FeatureGrid
          items={[
            {
              title: "A workspace per client",
              body: "Separate brand models, separate campaigns, separate approvals.",
              href: ROUTES.agencies.href,
            },
            {
              title: "The brand voice stays put",
              body: "Each workspace's brand model is built from that client's own material.",
              href: ROUTES.brandVoice.href,
            },
            {
              title: "Show the work before it ships",
              body: "The approval view is the campaign as it will publish, not a summary of it.",
            },
          ]}
        />
      </PageSection>

      <PageSection
        eyebrow="Questions"
        heading="Approval FAQs"
        intro="More on plans, channels and data on the FAQ page."
      >
        <PageFaq items={FAQS} />
      </PageSection>
    </PageShell>
  );
}
