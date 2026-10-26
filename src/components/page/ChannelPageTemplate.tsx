import { CampaignMarquee } from "@/components/page/CampaignMarquee";
import { ChannelConstellation } from "@/components/page/ChannelConstellation";
import { FeatureGrid } from "@/components/page/FeatureGrid";
import { PageFaq } from "@/components/page/PageFaq";
import { PageSection } from "@/components/page/PageSection";
import { PageShell } from "@/components/page/PageShell";
import { ProseSection } from "@/components/page/ProseSection";
import { ShowcaseSplit } from "@/components/page/ShowcaseSplit";
import { StatBand } from "@/components/page/StatBand";
import { StoryBeat } from "@/components/page/StoryBeat";
import { CHANNEL_LINKS, type ChannelPage } from "@/config/pages/channels";
import { ROUTES } from "@/config/routes";

interface ChannelPageTemplateProps {
  page: ChannelPage;
  path: string;
  /** Breadcrumb label for the channel, e.g. "Social Media". */
  crumb: string;
}

/**
 * Hero artwork and the in-page demo differ per channel: social and SMS
 * show the Instagram capture, email shows the email one. Keyed here rather
 * than in the content config, because these are presentation choices
 * rather than copy.
 */
const MASTHEAD = {
  social: {
    index: "01",
    brief: "Announce the spring range across every social account.",
    facts: [
      { label: "Surfaces", value: "Five social" },
      { label: "Each one", value: "Its own format" },
      { label: "Scheduled", value: "One calendar" },
      { label: "Published", value: "Only on approval" },
    ],
  },
  email: {
    index: "02",
    brief: "Tell the list about the spring offer before it ends.",
    facts: [
      { label: "Written", value: "Subject to body" },
      { label: "Artwork", value: "Sized for the inbox" },
      { label: "Alongside", value: "Social and SMS" },
      { label: "Sent", value: "Only on approval" },
    ],
  },
  sms: {
    index: "03",
    brief: "Remind customers the offer closes on Friday.",
    facts: [
      { label: "Format", value: "160 characters" },
      { label: "Carries", value: "One action" },
      { label: "Voice", value: "Yours, not generic" },
      { label: "Sent", value: "Only on approval" },
    ],
  },
} as const;

const MEDIA = {
  social: {
    hero: "/images/how-03-channels.png",
    heroAlt: "A campaign laid out across Instagram, Facebook, LinkedIn, X and Google Business",
    video: "/videos/campaignx-instagram.mp4",
    videoLabel: "A CampaignX social post being generated",
    picks: [3, 6, 9, 12, 15, 18, 21, 24, 1, 4],
  },
  email: {
    hero: "/images/how-01-brief.png",
    heroAlt: "A campaign brief becoming a marketing email",
    video: "/videos/campaignx-email.mp4",
    videoLabel: "A CampaignX marketing email being generated",
    picks: [2, 5, 8, 11, 14, 17, 20, 23, 26, 6],
  },
  sms: {
    hero: "/images/how-02-brand.png",
    heroAlt: "An SMS written in the same brand voice as the rest of the campaign",
    video: "/videos/campaignx-instagram.mp4",
    videoLabel: "A CampaignX campaign being generated across channels",
    picks: [7, 10, 13, 16, 19, 22, 25, 3, 9, 12],
  },
} as const;

/**
 * The tension beat per channel: the specific way this channel usually
 * goes wrong. Written as a scene, not a bullet. The pull-quotes are the
 * Fact Sheet's working pain-point phrases, which are never presented as
 * customer quotes because none of them are.
 */
const STORY = {
  social: {
    heading: "The same post, five times, slightly worse each time",
    body: "You write it for Instagram. Then you paste it into LinkedIn and soften it. Then into X, where it no longer fits. By Google Business nobody is proof-reading, and the campaign that was one idea has become five tired variations of it.",
    pullquote: "One idea, nine rewrites.",
    art: "/images/gallery/campaign-09.webp",
    caption: "Posted, eventually",
  },
  email: {
    heading: "The email that gets written last",
    body: "The social posts go out on time. The email waits for someone to find an hour for the subject line, the body and an image that is not a stretched banner — and by the time it sends, the campaign it belonged to has already moved on.",
    pullquote: "No time to make the visuals.",
    art: "/images/gallery/campaign-16.webp",
    caption: "Still a draft",
  },
  sms: {
    heading: "The hardest 160 characters in the campaign",
    body: "SMS lands on someone's lock screen, which is exactly why it gets put off. Too formal and it reads like a bank alert; too casual and it does not sound like the company at all.",
    pullquote: "Copy that sounds like AI.",
    art: "/images/gallery/campaign-21.webp",
    caption: "Sent to a phone",
  },
} as const;

/**
 * The three channel pages share one outline (their briefs specify the same
 * four H2s), so they share one template. Anything that differs between them
 * lives in `config/pages/channels.ts`.
 *
 * The FAQ list is rendered without FAQPage markup on purpose: that markup
 * belongs to /faq alone.
 */
export function ChannelPageTemplate({
  page,
  path,
  crumb,
}: ChannelPageTemplateProps) {
  const media = MEDIA[page.key];
  const story = STORY[page.key];

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
        { name: "Channels", href: ROUTES.channelsIndex.href },
        { name: crumb, href: path },
      ]}
    >
      <StoryBeat
        beat="tension"
        eyebrow="Before"
        heading={story.heading}
        body={story.body}
        pullquote={story.pullquote}
        media={{ src: story.art, alt: "" }}
        caption={story.caption}
      />

      <PageSection
        eyebrow="Output"
        heading="What CampaignX writes for this channel"
        intro="Written for the format, not adapted to it after the fact."
      >
        {/* A three-item list in two columns leaves an orphan card and a
            visible hole beside it; three columns divides it evenly. */}
        <FeatureGrid
          items={page.writes}
          columns={page.writes.length % 2 === 0 ? 2 : 3}
        />
      </PageSection>

      <ShowcaseSplit
        tone="warm"
        side="left"
        eyebrow="See it"
        heading="Written from the brief, in your voice"
        intro={page.consistency.intro}
        points={[
          "Produced with every other channel, from one brief",
          "Your brand model decides how it sounds",
          "Approved by a named person before it ships",
        ]}
        media={{
          kind: "video",
          src: media.video,
          label: media.videoLabel,
        }}
      />

      <ProseSection
        heading={page.prose.heading}
        eyebrow="In depth"
        intro={page.prose.intro}
        blocks={page.prose.blocks}
        aside={page.prose.aside}
      />

      <ChannelConstellation
        eyebrow="One campaign"
        heading={page.consistency.heading}
        intro="This channel is one output of the same brief. The others are produced at the same time, from the same brand model."
        focus={page.key === "social" ? "instagram" : page.key}
      />

      <StatBand
        stats={[
          { value: "1", label: "Brief behind it", note: "The same one every channel works from." },
          { value: "7", label: "Channels in the campaign", note: "Plus webhooks for other tools." },
          { value: "0", label: "Sends without approval", note: "A named approver signs off first." },
          { value: "Yours", label: "The voice throughout", note: "Learned from your own material." },
        ]}
      />

      <PageSection
        eyebrow="Alongside"
        heading="The rest of the campaign"
        intro="Everything this channel is produced with."
      >
        <FeatureGrid items={CHANNEL_LINKS} />
      </PageSection>

      <CampaignMarquee
        eyebrow="Output"
        heading="Campaigns that shipped this way"
        intro="Creative generated with the copy, approved before publishing."
        picks={media.picks}
      />

      <PageSection
        eyebrow="Control"
        heading={page.publish.heading}
        intro={page.publish.intro}
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
