import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageCta } from "@/components/page/PageCta";
import { PageFaq } from "@/components/page/PageFaq";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArtCardGrid } from "@/components/studio/ArtCardGrid";
import { InputStack } from "@/components/studio/InputStack";
import { ModelPanel } from "@/components/studio/ModelPanel";
import { InsetHero } from "@/components/studio/InsetHero";
import { Annotation, CompareTable, Segment } from "@/components/studio/Segment";
import { ROUTES } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, buildGraph } from "@/lib/schema";

/* Title, meta and H1 are taken verbatim from the page’s keyword brief,
   so the built page matches what was signed off in the content package. */
const TITLE = "AI Brand Voice Model for On-Brand Campaigns | CampaignX";
const DESCRIPTION =
  "CampaignX learns your brand voice from your own material, then writes every channel in it. Approve the result before anything goes live.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.brandVoice.href,
});

const schema = buildGraph(
  {
    path: ROUTES.brandVoice.href,
    name: "AI Brand Voice: Campaigns That Sound Like You, Not Like AI",
    description: DESCRIPTION,
  },
  [
    breadcrumbSchema([
      { name: "Features", href: ROUTES.productIndex.href },
      { name: "Brand Voice", href: ROUTES.brandVoice.href },
    ]),
  ],
);

const INPUT_ROWS = [
  {
    label: "What you give it",
    left: "A paragraph describing your tone",
    right: "Pages you have already written and edited",
  },
  {
    label: "What it learns",
    left: "Three adjectives every brand would pick",
    right: "Vocabulary, sentence length, register, what you avoid",
  },
  {
    label: "First draft",
    left: "Competent, anonymous, needs rewriting",
    right: "In your register before anyone edits it",
  },
  {
    label: "Over time",
    left: "Static — it learned once",
    right: "Every approval correction feeds back in",
  },
];

const VOICE_ROWS = [
  {
    label: "Instagram",
    left: "Emoji, stacked hashtags, “don’t miss out”",
    right: "Two weeks only — the spring picks are back",
  },
  {
    label: "LinkedIn",
    left: "“Thrilled to announce”, “unparalleled value”",
    right: "An argument for why the offer works this way",
  },
  {
    label: "Email",
    left: "Preview text repeats the subject line",
    right: "Preview continues the subject as one thought",
  },
  {
    label: "SMS",
    left: "ALL CAPS alert with two calls to action",
    right: "One line, one action, sounds like a person",
  },
];

const CHANNEL_CARDS = [
  {
    art: "instagram" as const,
    title: "Instagram",
    body: "The caption carries the idea in a sentence or two and the visual does the rest. Your brand model decides how direct that sentence is and whether it opens with the offer or the reason behind it.",
    spec: "Feed and story formats · caption written with the image",
  },
  {
    art: "facebook" as const,
    title: "Facebook",
    body: "Written for how people read on Facebook rather than pasted over from LinkedIn. Slightly longer than the Instagram caption, slightly plainer than the LinkedIn post.",
    spec: "Feed post · copy and creative generated together",
  },
  {
    art: "linkedin" as const,
    title: "LinkedIn",
    body: "The one surface with room to make an argument. A considered register without the corporate filler that register usually attracts — because it learned yours, not a generic professional one.",
    spec: "Long-form post · your vocabulary, not stock phrasing",
  },
  {
    art: "x" as const,
    title: "X",
    body: "Tight enough for the format with the point intact. This is where a weak draft shows fastest: there is no room for a warm-up line, so the first clause has to be the idea.",
    spec: "Single post · written to the character budget",
  },
  {
    art: "google" as const,
    title: "Google Business",
    body: "Plain, local and specific, which is what a business listing rewards. No campaign language, no slogan — what is on, who it is for, and when it ends.",
    spec: "Listing update · local phrasing, no marketing register",
  },
  {
    art: "email" as const,
    title: "Email",
    body: "Subject line and preview text written as a pair, because together they are all a subscriber sees before deciding. The body makes the case at email length and ends on one clear action.",
    spec: "Subject · preview · body · artwork",
  },
  {
    art: "sms" as const,
    title: "SMS",
    body: "The hardest format to sound human in and the one most worth getting right. Too formal reads like a bank alert; too casual could be anyone.",
    spec: "One message · one action · held for approval",
  },
  {
    art: "webhook" as const,
    title: "Webhooks",
    body: "Everything else in your stack. As the campaign publishes, webhooks push its events to the tools your team already relies on, so CampaignX does not replace your CRM or analytics.",
    spec: "Campaign events · sent as the campaign goes live",
  },
];

const FAQS = [
  {
    question: "Will it sound like AI?",
    answer:
      "It is trained on your own material rather than a generic model of how marketing copy sounds, and you approve every asset before it ships. If a line does not sound like you, edit it or regenerate that channel.",
  },
  {
    question: "How long does the brand model take to build?",
    answer:
      "A first campaign takes about ten minutes. A brand model you trust usually takes about one afternoon of giving it material and correcting what comes back.",
  },
  {
    question: "Do you train your models on our data?",
    answer:
      "Your data is not used to train shared models or pooled with other customers’ data. The terms do allow anonymized patterns to be used to improve the service.",
  },
  {
    question: "Can we have more than one brand voice?",
    answer:
      "Agencies and teams running several brands keep a separate brand model per workspace, so one client’s voice never bleeds into another’s.",
  },
  {
    question: "What if the model gets our voice wrong?",
    answer:
      "Edit the asset, regenerate that one channel, or rewrite the brief and run the campaign again. Nothing has been published at that point, because nothing sends without a named approver, and the correction feeds back into the model.",
  },
];

const TOTAL = 5;

/**
 * Brand Voice.
 *
 * Built as one numbered document rather than a stack of sections: an
 * inset hero card, then five segments that each carry their own layout
 * inside a shared frame. The segment bar gives a long page a visible
 * spine, which is what the previous version — a run of headings with
 * no sequence — was missing.
 *
 * `PageShell` is deliberately not used here: it owns a hero this page
 * replaces, and the segment frame supplies the rest of the chrome.
 */
export default function BrandVoicePage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <main id="main">
        <InsetHero
          tag="Brand Voice"
          title="AI Brand Voice: Campaigns That *Sound Like You*, Not Like AI"
          intro="CampaignX builds a brand model from material you have already written, then writes every channel of the campaign in it. You approve the result before anything is published."
          demoLabel="Watch the 2-minute demo"
          brief="Spring offer, two weeks, for existing customers."
          facts={[
            { label: "Learned from", value: "Your own material" },
            { label: "First campaign", value: "About ten minutes" },
            { label: "Published", value: "Only on approval" },
          ]}
        />

        {/* 01 — what it is. The brand-model render carries the
            right column; the copy stays short beside it. */}
        <Segment
          seg="01"
          label="The basics"
          step={1}
          total={TOTAL}
          tone="tint"
          heading="What an AI brand voice model is"
        >
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-14">
            <div>
              <p className="text-[1.125rem] leading-[1.65] text-foreground">
                Ask a team to describe their own voice and you get three
                adjectives every brand in the category would pick.
              </p>
              <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                So CampaignX does not ask. It reads what you have already
                written and derives the pattern — then writes every channel
                from it.
              </p>

              <ul className="mt-7 space-y-2.5">
                {[
                  "The words you use, and the ones you never do",
                  "How long your sentences run",
                  "How direct you are, and whether you hedge",
                  "Whether you open with the offer or the reason",
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
                The brand model belongs to your workspace and is never pooled
                with other customers&apos; data. The{" "}
                <Link
                  href={ROUTES.faq.href}
                  className="text-accent underline underline-offset-2"
                >
                  FAQ
                </Link>{" "}
                lists every processor involved.
              </p>
            </div>

            <ModelPanel />
          </div>
        </Segment>

        {/* 02 — the comparison. The render sits above the table, so
            the point lands before the detail. */}
        <Segment
          seg="02"
          label="Side by side"
          step={2}
          total={TOTAL}
          heading="The same brief, written two ways"
        >
          <div className="mx-auto max-w-[46rem] text-center">
            <p className="text-[1.0625rem] leading-[1.7] text-muted-strong">
              One is what a generic model produces from the brief. The other
              is what comes out once CampaignX has read your own material.
              The difference is rarely length — it is which words survive.
            </p>
          </div>


          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14">
            <CompareTable
              tone="light"
              question="Same brief, two ways"
              left="Generic model"
              right="Your brand model"
              rows={VOICE_ROWS}
            />

            <Annotation tag="Note">
              Illustrative examples of the difference a brand model makes,
              not output from a specific customer campaign.
            </Annotation>
          </div>
        </Segment>

        {/* 03 — what to feed it. */}
        <Segment
          seg="03"
          label="Inputs"
          step={3}
          total={TOTAL}
          tone="warm"
          heading="What to give it, and why it matters"
        >
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
            <InputStack />

            <div>
              <p className="text-[1.0625rem] leading-[1.7] text-muted-strong">
                Your website is the strongest signal: pages you have edited
                repeatedly are the clearest statement of how you sound,
                because every pass removed something that was not you.
              </p>
              <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                Guidelines help most where they say what to avoid. And one
                campaign you were genuinely happy with tells the model more
                than a page of adjectives, because it shows the voice doing a
                real job rather than describing itself.
              </p>

              <div className="mt-8">
                <CompareTable
                  tone="light"
                  question="Describing a voice vs. showing one"
                  left="Describing it"
                  right="Showing it"
                  rows={INPUT_ROWS}
                />
              </div>
            </div>
          </div>
        </Segment>

        {/* 04 — coverage. */}
        <Segment
          seg="04"
          label="Every channel"
          step={4}
          total={TOTAL}
          heading="One voice, seven| channel formats"
        >
          <p className="max-w-[52rem] text-[1.0625rem] leading-[1.7] text-muted-strong">
            An email is not a story frame with different margins, and a text
            is not a caption with the emoji removed. Each surface has its own
            constraints; the brand model underneath stays constant.
          </p>

          <div className="mt-9">
            <ArtCardGrid kicker="" heading="" cards={CHANNEL_CARDS} bare />
          </div>
        </Segment>

        {/* 05 — objections.

            One bordered panel rather than two loose columns: the
            previous version had a spec table on the left competing with
            the accordion on the right, both floating on the band with
            different ragged bottoms. Here the questions sit in a
            contained surface and the rail becomes a short index of what
            they cover, so the two read as one object. */}
        <Segment
          seg="05"
          label="Questions"
          step={5}
          total={TOTAL}
          tone="warm"
          heading="Brand voice, answered plainly"
        >
          <div className="overflow-hidden rounded-frame border border-line bg-surface">
            <div className="grid lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
              {/* The rail. A sunk panel, so the questions beside it read
                  as the primary surface. */}
              <div className="flex flex-col justify-between gap-8 border-b border-line bg-surface-soft p-5 sm:p-8 lg:border-b-0 lg:border-r lg:p-9">
                <div>
                  <p className="text-[1.0625rem] leading-[1.7] text-muted-strong">
                    These five decide whether a team adopts a brand model or
                    keeps rewriting drafts by hand.
                  </p>

                  <ul className="mt-7 space-y-3">
                    {[
                      "Whether the output sounds like you",
                      "How long setup actually takes",
                      "What happens to your data",
                      "Running more than one brand",
                      "Correcting the model when it misses",
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


                {/* The onward links, as a footer to the rail rather than
                    a card floating under it. */}
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
                      { label: "Pricing", href: ROUTES.pricing.href },
                      { label: "Approvals", href: ROUTES.approvals.href },
                      { label: "Channels", href: ROUTES.channelsIndex.href },
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

              {/* The questions. */}
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
