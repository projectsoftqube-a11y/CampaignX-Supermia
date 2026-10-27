import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { PageCta } from "@/components/page/PageCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqPanel } from "@/components/studio/FaqPanel";
import { MessageMeter } from "@/components/studio/MessageMeter";
import { StageExplorer } from "@/components/studio/StageExplorer";
import { CHANNEL_LINKS, CHANNEL_PAGES } from "@/config/pages/channels";
import { ROUTES } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, buildGraph } from "@/lib/schema";

const PAGE = CHANNEL_PAGES.sms;
const PATH = ROUTES.sms.href;

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
      { name: "SMS", href: PATH },
    ]),
  ],
);

/**
 * As on the email page, one answer still carries a `[CONFIRM with
 * SuperMIA]` marker — here, whether customers connect their own Twilio
 * account. It is a launch blocker tracked in HANDOFF.md. The answer is
 * withheld from the visible list rather than guessed at, because
 * publishing an unverified claim about how sending works would be
 * worse than publishing nothing.
 */
const VISIBLE_FAQS = PAGE.faqs.filter(
  (faq) => !faq.answer.includes("[CONFIRM"),
);

const STAGES = [
  {
    tag: "Voice",
    title: "The limit is a voice problem",
    body: [
      "Trimming a paragraph to fit a text message is easy. Making those characters sound like a company rather than a system notification is not.",
      "Too formal and it reads like a bank alert; too casual and it could be from anyone. This is the format where a generic model is most obvious, because there is nowhere for a weak line to hide.",
    ],
    figures: [
      { value: "160", label: "Characters" },
      { value: "0", label: "Places to hide" },
    ],
    limit:
      "CampaignX writes SMS from the same brand model as the rest of the campaign, built from material you have already written.",
  },
  {
    tag: "Action",
    title: "One message, one action",
    body: [
      "A text with two requests in it gets neither. Each message carries the campaign's single next step, stated plainly, with the link that step needs and nothing competing with it.",
      "Because the SMS comes from the same brief as the email and the posts, that action is the same action across all of them. Someone who gets the text and later opens the email should recognise one campaign, not two unrelated messages that happen to share a sender.",
    ],
    figures: [
      { value: "1", label: "Ask per message" },
      { value: "1", label: "Campaign, every channel" },
    ],
  },
  {
    tag: "Timing",
    title: "Scheduled with everything else",
    body: [
      "The text is not a separate job someone has to remember on the day. It sits on the same campaign calendar as the posts and the email, so the message meant to arrive on day three arrives on day three.",
      "Timing matters more here than anywhere else in the campaign, because SMS reaches people on their phone whether or not they were thinking about you. That is also exactly why the approval step is not optional.",
    ],
    rows: [
      { term: "Calendar", detail: "The same one as every other channel" },
      { term: "Sequence", detail: "Positioned in the campaign, not bolted on" },
      { term: "Separate job", detail: "None to remember" },
    ],
  },
  {
    tag: "Consent",
    title: "Approval, consent and who is responsible",
    body: [
      "Nothing sends without a named approver. You read the message as it will arrive, beside the rest of the campaign, and it goes out on your word.",
      "Messaging compliance, including consent and opt-out handling, is yours to meet. CampaignX does not send anything you have not approved, and it does not send anything at all until a person has released it.",
    ],
    figures: [
      { value: "1", label: "Named approver" },
      { value: "0", label: "Sends before sign-off" },
    ],
    limit:
      "You remain responsible for following each connected platform's terms. That is set out in the CampaignX terms.",
  },
];

/**
 * The obligations that stay with the sender.
 *
 * SMS is the one channel on this site with real legal weight behind
 * it, and the honest thing is to state plainly which parts CampaignX
 * does not take on. Softening this would be the wrong kind of
 * marketing copy.
 */
const RESPONSIBILITIES = [
  {
    term: "Consent to message",
    detail:
      "Collecting and recording opt-in from the people you text is yours. CampaignX writes and schedules the message; it does not establish that someone agreed to receive it.",
  },
  {
    term: "Opt-out handling",
    detail:
      "Honouring STOP and equivalent replies is a requirement of the networks and the law in most places. That obligation sits with you and your sending account.",
  },
  {
    term: "Platform terms",
    detail:
      "Each connected platform's terms and rate limits still apply to what you send through it, exactly as they would if you sent it by hand.",
  },
  {
    term: "Review before release",
    detail:
      "You are responsible for reviewing and approving everything before it is published. The approval gate is how that happens, and it cannot be skipped.",
  },
];

const SIBLINGS = [
  {
    channel: "Social",
    detail: "Five platform-native posts",
    href: ROUTES.social.href,
  },
  {
    channel: "Email",
    detail: "Subject line through artwork",
    href: ROUTES.email.href,
  },
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
            Hero. The meter carries the argument: all three drafts fit,
            only one sounds like the brand.
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
                  160 characters.
                  <span className="block text-muted">
                    Still unmistakably you.
                  </span>
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

              <MessageMeter />
            </div>
          </Container>
        </section>

        {/* Written beside the rest of the campaign. */}
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

        <StageExplorer
          eyebrow="What it takes"
          heading="What good SMS marketing actually requires"
          stages={STAGES}
        />

        {/* ------------------------------------------------------------
            Responsibility. A dark band, because this is the part of
            the page a reader must not skim.
            ------------------------------------------------------------ */}
        <section className="relative isolate overflow-x-clip bg-ink py-[clamp(3rem,5vw,4.5rem)] text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute inset-0 [background:radial-gradient(60%_60%_at_8%_0%,rgba(var(--brand-blue-rgb),0.24),transparent_62%)]" />
            <div className="absolute inset-0 [background:radial-gradient(55%_55%_at_94%_100%,rgba(var(--brand-magenta-rgb),0.18),transparent_64%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(var(--brand-blue-rgb),0.5),rgba(var(--brand-magenta-rgb),0.35),transparent)]" />
          </div>

          <Container>
            <div className="grid gap-9 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
              <div className="lg:sticky lg:top-24 lg:self-start">
                <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-white/50">
                  Who is responsible
                </p>
                <h2 className="text-display mt-3 text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white">
                  What stays with you
                </h2>
                <p className="mt-4 text-[1.0625rem] leading-[1.7] text-white/70">
                  SMS reaches people on their phone, and it carries
                  obligations the other channels do not. Being precise
                  about which of those CampaignX does not take on matters
                  more than sounding reassuring.
                </p>

                <Link
                  href={ROUTES.terms.href}
                  className="mt-6 inline-flex items-center gap-1.5 rounded-pill border border-white/20 px-4 py-2 text-[0.875rem] font-medium text-white transition-colors duration-200 hover:border-white/40 hover:bg-white/5"
                >
                  Read the terms
                </Link>
              </div>

              <ol className="grid gap-px overflow-hidden rounded-frame bg-white/10 sm:grid-cols-2">
                {RESPONSIBILITIES.map((row, i) => (
                  <li key={row.term} className="bg-ink-lift p-5 sm:p-6">
                    <span className="font-mono text-[0.6875rem] tabular-nums text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2.5 text-[1rem] font-medium leading-snug text-white">
                      {row.term}
                    </h3>
                    <p className="mt-2 text-[0.875rem] leading-relaxed text-white/60">
                      {row.detail}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </section>

        <FaqPanel
          heading="SMS campaigns, answered plainly"
          intro="What teams ask before letting a campaign reach someone's phone."
          items={VISIBLE_FAQS}
          links={CHANNEL_LINKS}
          note="Social and email have their own channel pages, and webhooks carry campaign events to anything else in your stack."
        />

        <PageCta />
      </main>

      <Footer />
    </>
  );
}
