import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { PageCta } from "@/components/page/PageCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqPanel } from "@/components/studio/FaqPanel";
import { InboxBuild } from "@/components/studio/InboxBuild";
import { StageExplorer } from "@/components/studio/StageExplorer";
import { CHANNEL_LINKS, CHANNEL_PAGES } from "@/config/pages/channels";
import { ROUTES } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, buildGraph } from "@/lib/schema";

const PAGE = CHANNEL_PAGES.email;
const PATH = ROUTES.email.href;

export const metadata = pageMetadata({
  title: PAGE.metaTitle,
  description: PAGE.description,
  path: PATH,
});

const schema = buildGraph(
  { path: PATH, name: PAGE.title, description: PAGE.description },
  [
    breadcrumbSchema([
      { name: "Channels", href: ROUTES.channelsIndex.href },
      { name: "Email", href: PATH },
    ]),
  ],
);

/**
 * One answer in the source data still carries a `[CONFIRM with
 * SuperMIA]` marker (whether customers bring their own SMTP provider).
 * It is a launch blocker tracked in HANDOFF.md, and an unresolved
 * placeholder must never reach a visitor, so it is filtered out of the
 * visible list here rather than edited away — the question still needs
 * answering, and deleting the data would hide that.
 */
const VISIBLE_FAQS = PAGE.faqs.filter(
  (faq) => !faq.answer.includes("[CONFIRM"),
);

/**
 * The four build stages, in the order the parts are produced.
 *
 * Email's long-form copy is four chapters of two dense paragraphs. As
 * on the social page, it reads better as stages than as an essay: the
 * hard facts are lifted out as figures and each stage states its own
 * limit.
 */
const STAGES = [
  {
    tag: "Open",
    title: "Subject and preview, written as a pair",
    body: [
      "Most tools treat preview text as a field someone fills in at the end, or leaves empty so the inbox shows the first line of the body.",
      "Together they are the whole of what a subscriber sees before deciding whether to open. CampaignX writes them as one unit, so the preview carries the detail the subject had no room for instead of repeating it.",
    ],
    figures: [
      { value: "2", label: "Written together" },
      { value: "1", label: "Decision they drive" },
    ],
  },
  {
    tag: "Body",
    title: "Email length, not caption length",
    body: [
      "The body makes the campaign's argument at email length — written for someone who opened something deliberately and will read a few paragraphs if they are worth reading.",
      "It ends in one clear thing to do, rather than three competing links. Register, sentence length and vocabulary come from copy you have already approved, which is what keeps it from reading like every other campaign email that week.",
    ],
    figures: [
      { value: "1", label: "Call to action" },
      { value: "0", label: "Captions reused" },
    ],
    limit:
      "An email written from the brief alone comes out competent and anonymous. This one is written from the brief and your brand model.",
  },
  {
    tag: "Art",
    title: "Artwork generated with the words",
    body: [
      "Every campaign ships with visuals matched to your brand, and the email's artwork is produced alongside its copy rather than sourced afterwards.",
      "That is the difference between an image that illustrates the line beside it and a stock photograph chosen because it was the right shape. If a visual misses, regenerate that one asset and leave the rest of the campaign alone.",
    ],
    rows: [
      { term: "Generated", detail: "With the copy, from the same brief" },
      { term: "Matched", detail: "To your brand, not a stock library" },
      { term: "Regenerate", detail: "One asset, leaving the rest alone" },
    ],
  },
  {
    tag: "Send",
    title: "Nothing sends without a named approver",
    body: [
      "You read the email beside the rest of the campaign, as it will actually arrive, and it goes out on your word rather than on a schedule nobody reviewed.",
      "Keep your CRM and your analytics. Webhooks push campaign events to the rest of your stack as the campaign publishes.",
    ],
    figures: [
      { value: "1", label: "Named approver" },
      { value: "0", label: "Sends before sign-off" },
    ],
    limit:
      "CampaignX is not trying to replace the systems your customer data lives in.",
  },
];

/**
 * What the subject/preview pair looks like done badly and done well.
 *
 * The page's sharpest claim is that these two are written together, so
 * it is worth showing rather than only asserting. Both columns are
 * illustrations of the pattern, not output from a real campaign.
 */
const PAIR_ROWS = [
  {
    label: "Subject",
    weak: "Spring Offer — Don't Miss Out!",
    strong: "Your spring offer is ready",
  },
  {
    label: "Preview",
    weak: "(empty — the inbox shows the first line of the body)",
    strong: "Two weeks, for customers already with us.",
  },
  {
    label: "What the reader learns",
    weak: "That something is on offer, and that it is urgent",
    strong: "What it is, how long it runs, and that it is for them",
  },
  {
    label: "Written",
    weak: "Subject first, preview filled in at the end",
    strong: "Together, as one unit",
  },
];

/**
 * Practical notes that do not belong in the stage walkthrough but that
 * a team evaluating the channel will want answered.
 */
const PRACTICAL = [
  {
    term: "Deliverability",
    detail:
      "CampaignX writes and schedules the campaign. Sender reputation, authentication records and list hygiene stay with the sending platform and your own domain setup, as they would with any tool.",
  },
  {
    term: "Your list stays yours",
    detail:
      "Subscriber data lives where it already lives. CampaignX does not import or own your list, and your material is scoped to your workspace rather than pooled with other customers' data.",
  },
  {
    term: "One email, not a sequence",
    detail:
      "A campaign produces the email for that campaign. Long-running lifecycle automation and drip sequences are a different job, handled by the platform you already use for them.",
  },
  {
    term: "Reporting",
    detail:
      "Reach and engagement for the email sit in the same campaign report as the social posts and the SMS, rather than in a separate dashboard.",
  },
];

/** What the email is written beside, for the consistency band. */
const SIBLINGS = [
  {
    channel: "Social",
    detail: "Five platform-native posts",
    href: ROUTES.social.href,
  },
  { channel: "SMS", detail: "One message inside the limit", href: ROUTES.sms.href },
  {
    channel: "Everything else",
    detail: "Webhooks to your stack",
    href: ROUTES.multiChannel.href,
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <main id="main">
        {/* ------------------------------------------------------------
            Hero. Copy left, the email building itself on the right.
            ------------------------------------------------------------ */}
        <section className="relative isolate overflow-x-clip bg-surface-soft pb-[clamp(2.5rem,4vw,3.5rem)] pt-[calc(var(--header-offset)+3.75rem)] sm:pt-[calc(var(--header-offset)+5rem)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="cx-dots absolute inset-0 opacity-50 [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent_75%)]" />
            <div className="absolute -top-[18%] left-1/2 h-[26rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(var(--brand-blue-rgb),0.12),transparent)]" />
          </div>

          <Container>
            <div className="grid min-w-0 items-center gap-10 [&>*]:min-w-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
              <div>
                <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-3 py-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
                  <span className="bg-brand size-1.5 rounded-full" />
                  {PAGE.eyebrow}
                </span>

                <h1 className="text-display mt-5 text-[clamp(2rem,4.2vw,3.25rem)] font-medium leading-[1.04] tracking-[-0.035em]">
                  Subject line to artwork,
                  <span className="block text-muted">written in one pass.</span>
                </h1>

                <p className="mt-5 max-w-[34rem] text-[1.0625rem] leading-[1.7] text-muted-strong">
                  {PAGE.intro}
                </p>

                <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-6">
                  {PAGE.highlights.map((item, i) => (
                    <div key={item}>
                      <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </dt>
                      <dd className="mt-1 text-[0.875rem] font-medium leading-snug text-foreground">
                        {item}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  <Link
                    href={ROUTES.pricing.href}
                    className="bg-brand shadow-brand inline-flex h-11 items-center rounded-pill px-5 text-[0.9375rem] font-medium text-white transition-[box-shadow,transform,filter] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:brightness-[1.07] hover:shadow-brand-hover"
                  >
                    Get started
                  </Link>
                  <Link
                    href={ROUTES.multiChannel.href}
                    className="inline-flex h-11 items-center rounded-pill border border-line bg-surface px-5 text-[0.9375rem] text-muted-strong transition-colors duration-200 hover:border-accent-line hover:text-accent"
                  >
                    All seven channels
                  </Link>
                </div>
              </div>

              <InboxBuild />
            </div>
          </Container>
        </section>

        {/* ------------------------------------------------------------
            Written beside the rest of the campaign. A short band, so
            the page is not two long sections back to back.
            ------------------------------------------------------------ */}
        <section className="relative py-[clamp(2.5rem,4vw,3.5rem)]">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
              <div>
                <h2 className="text-display text-[clamp(1.625rem,3vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                  {PAGE.consistency.heading}
                </h2>
                <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                  {PAGE.consistency.intro}
                </p>
              </div>

              <ul className="grid gap-px overflow-hidden rounded-frame border border-line bg-line sm:grid-cols-3">
                {SIBLINGS.map((s) => (
                  <li key={s.channel}>
                    <Link
                      href={s.href}
                      className="group flex h-full flex-col bg-surface p-5 transition-colors duration-300 hover:bg-surface-soft"
                    >
                      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-accent">
                        Same brief
                      </span>
                      <span className="mt-2 text-[0.9375rem] font-medium leading-snug text-foreground">
                        {s.channel}
                      </span>
                      <span className="mt-1.5 text-[0.875rem] leading-relaxed text-muted-strong">
                        {s.detail}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        {/* ------------------------------------------------------------
            The pair, shown rather than asserted. A dark band, so the
            page changes ground once between the two light halves.
            ------------------------------------------------------------ */}
        <section className="relative isolate overflow-x-clip bg-ink py-[clamp(3rem,5vw,4.5rem)] text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute inset-0 [background:radial-gradient(60%_60%_at_8%_0%,rgba(var(--brand-blue-rgb),0.26),transparent_62%)]" />
            <div className="absolute inset-0 [background:radial-gradient(55%_55%_at_94%_100%,rgba(var(--brand-magenta-rgb),0.2),transparent_64%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(var(--brand-blue-rgb),0.5),rgba(var(--brand-magenta-rgb),0.35),transparent)]" />
          </div>

          <Container>
            <div className="max-w-[44rem]">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-white/50">
                The opening
              </p>
              <h2 className="text-display mt-3 text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white">
                The preview is the second half of the subject line
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-[1.7] text-white/70">
                Treated as a separate field, it gets filled in last or
                left empty — and the inbox falls back to whatever the body
                happens to open with. Written as a pair, the two lines do
                one job between them.
              </p>
            </div>

            <div className="mt-9 overflow-hidden rounded-frame border border-white/12">
              <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.1fr)_minmax(0,1.1fr)] border-b border-white/12 bg-white/[0.04]">
                <span className="px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-white/40">
                  &nbsp;
                </span>
                <span className="px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-white/40">
                  Written separately
                </span>
                <span className="px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-accent">
                  Written as a pair
                </span>
              </div>

              {PAIR_ROWS.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.1fr)_minmax(0,1.1fr)] border-b border-white/8 last:border-0"
                >
                  <span className="px-4 py-4 text-[0.875rem] font-medium text-white">
                    {row.label}
                  </span>
                  <span className="px-4 py-4 text-[0.875rem] leading-snug text-white/45">
                    {row.weak}
                  </span>
                  <span className="px-4 py-4 text-[0.875rem] leading-snug text-white/85">
                    {row.strong}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-[0.875rem] text-white/40">
              Illustrations of the pattern, not output from a specific
              customer campaign.
            </p>
          </Container>
        </section>

        {/* The build, as four stages rather than an essay. */}
        <StageExplorer
          eyebrow="How it is written"
          heading="From one brief to an email ready to send"
          stages={STAGES}
        />

        {/* ------------------------------------------------------------
            Practical notes: the boundary questions a team asks before
            adopting a channel.
            ------------------------------------------------------------ */}
        <section className="relative py-[clamp(2.75rem,4.5vw,4rem)]">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
              <div className="lg:sticky lg:top-24 lg:self-start">
                <h2 className="text-display text-[clamp(1.625rem,3vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                  Where CampaignX stops
                </h2>
                <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
                  Email has more surrounding machinery than any other
                  channel. Being clear about which parts CampaignX does
                  not touch is more useful than implying it does
                  everything.
                </p>
              </div>

              <dl className="divide-y divide-line overflow-hidden rounded-frame border border-line bg-surface">
                {PRACTICAL.map((row) => (
                  <div key={row.term} className="p-5 sm:p-6">
                    <dt className="text-[0.9375rem] font-medium leading-snug text-foreground">
                      {row.term}
                    </dt>
                    <dd className="mt-2 text-[0.9375rem] leading-relaxed text-muted-strong">
                      {row.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Container>
        </section>

        <FaqPanel
          heading="Email campaigns, answered plainly"
          intro="What teams ask before they let a campaign reach the send step."
          items={VISIBLE_FAQS}
          links={CHANNEL_LINKS}
          note="Social and SMS have their own channel pages, and webhooks carry campaign events to anything else in your stack."
        />

        <PageCta />
      </main>

      <Footer />
    </>
  );
}
