import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageCta } from "@/components/page/PageCta";
import { PageFaq } from "@/components/page/PageFaq";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArtCardGrid } from "@/components/studio/ArtCardGrid";
import { BrandMatch } from "@/components/studio/BrandMatch";
import { CreativeForge } from "@/components/studio/CreativeForge";
import { InsetHero } from "@/components/studio/InsetHero";
import { Annotation, CompareTable, Segment } from "@/components/studio/Segment";
import { ROUTES } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, buildGraph } from "@/lib/schema";

/* Title, meta and H1 are taken verbatim from the page’s keyword brief,
   so the built page matches what was signed off in the content package. */
const TITLE = "AI Marketing Visuals for Every Campaign | CampaignX";
const DESCRIPTION =
  "Every CampaignX campaign ships with visuals made for each channel and matched to your brand, ready to review next to the copy.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.aiCreative.href,
});

const schema = buildGraph(
  {
    path: ROUTES.aiCreative.href,
    name: "AI Marketing Visuals That Match Your Brand",
    description: DESCRIPTION,
  },
  [
    breadcrumbSchema([
      { name: "Features", href: ROUTES.productIndex.href },
      { name: "AI Creative", href: ROUTES.aiCreative.href },
    ]),
  ],
);

const FORMAT_ROWS = [
  {
    label: "Instagram",
    left: "A landscape image cropped to square",
    right: "Composed for 4:5, with the subject where it survives the crop",
  },
  {
    label: "Email",
    left: "The same image, letterboxed",
    right: "Sized for the inbox and paired with the subject line",
  },
  {
    label: "Story",
    left: "Upscaled and padded to fit",
    right: "Full-height, legible at arm’s length",
  },
  {
    label: "Google Business",
    left: "Campaign hero reused",
    right: "Plain and specific, which is what a listing rewards",
  },
];

const BRAND_ROWS = [
  {
    label: "Colour",
    left: "Whatever the model defaults to",
    right: "Drawn from your palette",
  },
  {
    label: "Subject",
    left: "Generic stock composition",
    right: "Built around the line it sits beside",
  },
  {
    label: "When it misses",
    left: "Regenerate the whole campaign",
    right: "Regenerate that one asset",
  },
];

const CHANNEL_CARDS = [
  {
    art: "instagram" as const,
    title: "Instagram",
    body: "Square and vertical frames built for the feed, not a landscape image cropped until it fits. The subject sits where it will still read after the crop.",
    spec: "4:5 and 9:16 · composed, not cropped",
  },
  {
    art: "facebook" as const,
    title: "Facebook",
    body: "A wider frame than Instagram and a plainer composition, because the surrounding feed is busier and the post has to hold its own against it.",
    spec: "Feed image · generated with the caption",
  },
  {
    art: "linkedin" as const,
    title: "LinkedIn",
    body: "Visuals that carry a point rather than decorate one. This is the surface where a stock photograph is most obviously a stock photograph.",
    spec: "Post image · restrained, on-brand",
  },
  {
    art: "x" as const,
    title: "X",
    body: "Images that still work small, because that is how most people will see them. Detail that disappears at thumbnail size is detail wasted.",
    spec: "Inline image · legible at small sizes",
  },
  {
    art: "google" as const,
    title: "Google Business",
    body: "Clear, plain imagery suited to a listing rather than a campaign hero. No slogan over the top, nothing that needs context to read.",
    spec: "Listing photo · plain and specific",
  },
  {
    art: "email" as const,
    title: "Email",
    body: "Artwork sized for the inbox and generated alongside the copy it belongs to, so the image is about the line it sits next to.",
    spec: "Header image · matched to the subject line",
  },
  {
    art: "sms" as const,
    title: "SMS",
    body: "Where an image earns its place in a text, it is built for a phone screen first — and left out entirely where it would only add weight.",
    spec: "Optional · phone-first, or none at all",
  },
  {
    art: "webhook" as const,
    title: "Your own assets",
    body: "Replace any generated visual with your own before approval. The campaign carries it through to publishing exactly as the generated one would have been.",
    spec: "Swap at review · nothing is locked",
  },
];

const FAQS = [
  {
    question: "Will the images look generic?",
    answer:
      "Creative is generated against your brand model and alongside the campaign copy rather than from the brief alone. You review every asset before it ships, and you can regenerate any single channel that misses.",
  },
  {
    question: "Do I need a designer to use this?",
    answer:
      "No. Visuals ship with every campaign. If you have a designer, they can replace or edit any asset before approval.",
  },
  {
    question: "Can I edit a visual after it is generated?",
    answer:
      "Yes. Any asset can be edited or regenerated before approval, and nothing sends without a named approver.",
  },
  {
    question: "Does CampaignX buy or manage paid ads?",
    answer:
      "No. CampaignX writes, designs, publishes and reports on campaigns across its seven channels. It does not buy or manage paid advertising.",
  },
  {
    question: "What if we already have brand assets?",
    answer:
      "Use them. Any generated visual can be swapped for your own at the review step, and the campaign carries it through to publishing unchanged.",
  },
];

const TOTAL = 5;

/**
 * AI Creative.
 *
 * Same structure as Brand Voice: an inset hero, then five numbered
 * segments inside a shared frame, each carrying its own layout and its
 * own animated visual.
 *
 * `PageShell` is deliberately not used here: it owns a hero this page
 * replaces, and the segment frame supplies the rest of the chrome.
 */
export default function AiCreativePage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <main id="main">
        <InsetHero
          tag="AI Creative"
          title="AI Marketing Visuals That *Match Your Brand*"
          intro="Every campaign ships with visuals built for each channel and matched to your brand, generated alongside the copy so the two belong together."
          demoLabel="Watch the 2-minute demo"
          brief="Spring offer, two weeks, for existing customers."
          facts={[
            { label: "Ships with", value: "Every campaign" },
            { label: "Built for", value: "Each channel format" },
            { label: "Any asset", value: "Regenerate alone" },
          ]}
        />

        {/* 01 — one brief, three formats, made together. */}
        <Segment
          seg="01"
          label="The basics"
          step={1}
          total={TOTAL}
          tone="tint"
          heading="Visuals made for each channel"
        >
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-14">
            <div>
              <p className="text-[1.125rem] leading-[1.65] text-foreground">
                One asset resized seven times is still one asset. Each surface
                has its own shape, its own reading distance and its own idea of
                what counts as legible.
              </p>
              <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                So the creative is composed per channel rather than cropped to
                fit, and it is generated at the same moment as the copy it sits
                beside — which is why the image is about that line rather than
                decorating it.
              </p>

              <ul className="mt-7 space-y-2.5">
                {[
                  "Composed for the frame, not cropped into it",
                  "Generated with the copy, from the same brief",
                  "Drawn from your palette, not a default one",
                  "Any single asset can be regenerated alone",
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
                Visuals ship with every campaign, on every plan. See{" "}
                <Link
                  href={ROUTES.pricing.href}
                  className="text-accent underline underline-offset-2"
                >
                  pricing
                </Link>{" "}
                for what each plan includes.
              </p>
            </div>

            <CreativeForge />
          </div>
        </Segment>

        {/* 02 — cropped vs composed. */}
        <Segment
          seg="02"
          label="Per channel"
          step={2}
          total={TOTAL}
          heading="Composed for the frame, not cropped into it"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
            <div>
              <p className="text-[1.0625rem] leading-[1.7] text-muted-strong">
                The difference between a resized image and a composed one shows
                fastest at the edges: a subject that sat comfortably in a
                landscape frame is halfway out of a vertical one.
              </p>
              <div className="mt-7">
                <Annotation tag="Note">
                  Illustrative of how formats differ, not output from a
                  specific customer campaign.
                </Annotation>
              </div>
            </div>

            <CompareTable
              tone="light"
              question="Resized vs. composed"
              left="One asset, resized"
              right="Built for the format"
              rows={FORMAT_ROWS}
            />
          </div>
        </Segment>

        {/* 03 — matched to your brand, and regenerating one asset. */}
        <Segment
          seg="03"
          label="On brand"
          step={3}
          total={TOTAL}
          tone="warm"
          heading="Matched to your brand, and yours to change"
        >
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
            <BrandMatch />

            <div>
              <p className="text-[1.0625rem] leading-[1.7] text-muted-strong">
                The same brand model that learns how you write carries how you
                look: your colours, the weight of your compositions, how much
                space you leave around a subject.
              </p>
              <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                And if one visual misses, you regenerate that one. The rest of
                the campaign is untouched, which is the difference between a
                correction and starting again.
              </p>

              <div className="mt-8">
                <CompareTable
                  tone="light"
                  question="Generic creative vs. on-brand creative"
                  left="Generic"
                  right="On brand"
                  rows={BRAND_ROWS}
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
          heading="What each surface actually gets"
        >
          <p className="max-w-[52rem] text-[1.0625rem] leading-[1.7] text-muted-strong">
            Seven channels, seven sets of constraints. The brand underneath
            stays constant; the composition does not.
          </p>

          <div className="mt-9">
            <ArtCardGrid kicker="" heading="" cards={CHANNEL_CARDS} bare />
          </div>
        </Segment>

        {/* 05 — objections. */}
        <Segment
          seg="05"
          label="Questions"
          step={5}
          total={TOTAL}
          tone="warm"
          heading="AI creative, answered plainly"
        >
          <div className="overflow-hidden rounded-frame border border-line bg-surface">
            <div className="grid lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
              <div className="flex flex-col justify-between gap-8 border-b border-line bg-surface-soft p-5 sm:p-8 lg:border-b-0 lg:border-r lg:p-9">
                <div>
                  <p className="text-[1.0625rem] leading-[1.7] text-muted-strong">
                    These five decide whether a team trusts generated creative
                    or keeps briefing a designer for every campaign.
                  </p>

                  <ul className="mt-7 space-y-3">
                    {[
                      "Whether the output looks generic",
                      "Working without a designer",
                      "Editing an asset after it is made",
                      "Whether paid ads are included",
                      "Using your own brand assets",
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
                      { label: "Brand Voice", href: ROUTES.brandVoice.href },
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
