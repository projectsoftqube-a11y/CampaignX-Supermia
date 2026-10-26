import { CampaignMarquee } from "@/components/page/CampaignMarquee";
import { FeatureGrid } from "@/components/page/FeatureGrid";
import { PageFaq } from "@/components/page/PageFaq";
import { PageSection } from "@/components/page/PageSection";
import { PageShell } from "@/components/page/PageShell";
import { ShowcaseSplit } from "@/components/page/ShowcaseSplit";
import { StatBand } from "@/components/page/StatBand";
import { StepSequence } from "@/components/page/StepSequence";
import { StoryBeat } from "@/components/page/StoryBeat";
import type { UseCasePage } from "@/config/pages/use-cases";
import { ROUTES } from "@/config/routes";

interface UseCasePageTemplateProps {
  page: UseCasePage;
  path: string;
}

const MASTHEAD = {
  smallBusiness: {
    index: "01",
    brief: "Spring offer, two weeks, for our regulars.",
    facts: [
      { label: "Team needed", value: "None" },
      { label: "First campaign", value: "~10 minutes" },
      { label: "Designer", value: "Not required" },
      { label: "Published", value: "Only on approval" },
    ],
  },
  agencies: {
    index: "02",
    brief: "Launch the client's new range this Thursday.",
    facts: [
      { label: "Per client", value: "Its own workspace" },
      { label: "Brand models", value: "Never shared" },
      { label: "Approvals", value: "A named person" },
      { label: "Seats", value: "Unlimited on Team" },
    ],
  },
  marketingTeams: {
    index: "03",
    brief: "Run the Q2 campaign across every channel.",
    facts: [
      { label: "Handoffs", value: "None" },
      { label: "The brief", value: "Drives everything" },
      { label: "Review", value: "One view" },
      { label: "Reporting", value: "Per campaign" },
    ],
  },
  founders: {
    index: "04",
    brief: "Announce the new feature to everyone who signed up.",
    facts: [
      { label: "Marketing hire", value: "Not yet needed" },
      { label: "Your input", value: "One sentence" },
      { label: "Voice", value: "Learned from you" },
      { label: "Approver", value: "You" },
    ],
  },
} as const;

/** Hero artwork per audience, so four pages do not open identically. */
const HERO = {
  smallBusiness: {
    src: "/images/how-01-brief.png",
    alt: "A small business owner turning one brief into a full campaign",
    picks: [1, 5, 9, 13, 17, 21, 25, 3, 7, 11],
    tension: "/images/gallery/campaign-05.webp",
    tensionCaption: "Still on the list",
    turn: "/images/how-01-brief.png",
    resolution: "/images/how-03-channels.png",
  },
  agencies: {
    src: "/images/how-02-brand.png",
    alt: "Separate brand models for several agency clients",
    picks: [2, 6, 10, 14, 18, 22, 26, 4, 8, 12],
    tension: "/images/gallery/campaign-14.webp",
    tensionCaption: "Five brands, one week",
    turn: "/images/how-02-brand.png",
    resolution: "/images/how-04-learn.png",
  },
  marketingTeams: {
    src: "/images/how-03-channels.png",
    alt: "A marketing team reviewing one campaign across every channel",
    picks: [3, 7, 11, 15, 19, 23, 1, 5, 9, 13],
    tension: "/images/gallery/campaign-18.webp",
    tensionCaption: "Four tools, five tabs",
    turn: "/images/how-01-brief.png",
    resolution: "/images/how-03-channels.png",
  },
  founders: {
    src: "/images/how-04-learn.png",
    alt: "A founder shipping a campaign and seeing what worked",
    picks: [4, 8, 12, 16, 20, 24, 2, 6, 10, 14],
    tension: "/images/gallery/campaign-22.webp",
    tensionCaption: "Between two other jobs",
    turn: "/images/how-02-brand.png",
    resolution: "/images/how-04-learn.png",
  },
} as const;

/**
 * The four use-case pages share one outline from their briefs, so they
 * share a template. The worked example is rendered as a pinned sequence:
 * these pages are the ones where a reader is deciding whether the product
 * fits their situation, and a step-by-step is the most direct answer.
 */
export function UseCasePageTemplate({ page, path }: UseCasePageTemplateProps) {
  const hero = HERO[page.key];

  return (
    <PageShell
      path={path}
      description={page.description}
      eyebrow={page.eyebrow}
      title={page.title}
      intro={page.intro}
      highlights={page.highlights}
      masthead={MASTHEAD[page.key]}
      breadcrumbs={[
        { name: "Use Cases", href: ROUTES.useCasesIndex.href },
        { name: page.crumb, href: path },
      ]}
    >
      <StoryBeat
        beat="tension"
        eyebrow="Before"
        heading={page.story.tension.heading}
        body={page.story.tension.body}
        pullquote={page.story.tension.pullquote}
        media={{ src: hero.tension, alt: "" }}
        caption={hero.tensionCaption}
      />

      <PageSection
        eyebrow="The problem"
        heading="Where the time actually goes"
        intro={page.problem.intro}
      >
        <FeatureGrid items={page.problem.points} />
      </PageSection>

      <StoryBeat
        beat="turn"
        eyebrow="The turn"
        heading={page.story.turn.heading}
        body={page.story.turn.body}
        pullquote={page.story.turn.pullquote}
        media={{ src: hero.turn, alt: "" }}
      />

      <PageSection
        eyebrow="The answer"
        heading="How CampaignX helps"
        intro={page.helps.intro}
      >
        <FeatureGrid items={page.helps.points} />
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
        eyebrow="What comes back"
        heading="A campaign, not a draft to finish"
        intro="Copy and creative for every channel, in your brand voice, ready to read and correct rather than ready to start from."
        points={[
          "Written for each channel's own format",
          "Visuals generated with the words",
          "Edit, regenerate one channel, or rewrite the brief",
        ]}
        media={{
          kind: "video",
          src: "/videos/campaignx-email.mp4",
          label: "A CampaignX campaign being generated from one brief",
        }}
      />

      <StepSequence
        eyebrow="In practice"
        heading="A campaign in practice"
        intro={page.practice.intro}
        steps={page.practice.steps}
      
        media={[
          { src: "/images/how-01-brief.png", alt: "" },
          { src: "/images/how-02-brand.png", alt: "" },
          { src: "/images/how-03-channels.png", alt: "" },
          { src: "/images/how-04-learn.png", alt: "" },
        ]}
      />

      <StoryBeat
        beat="resolution"
        eyebrow="After"
        heading={page.story.resolution.heading}
        body={page.story.resolution.body}
        pullquote={page.story.resolution.pullquote}
        media={{ src: hero.resolution, alt: "" }}
      />

      <CampaignMarquee
        eyebrow="Output"
        heading="Campaigns built this way"
        intro="Creative generated with its copy, from one brief, approved before it shipped."
        picks={hero.picks}
      />

      <PageSection
        eyebrow="Questions"
        heading="FAQs"
        intro="More on pricing, channels and data handling on the FAQ page."
      >
        <PageFaq items={page.faqs} />
      </PageSection>
    </PageShell>
  );
}
