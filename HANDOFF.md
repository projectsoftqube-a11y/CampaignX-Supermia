# CampaignX build handoff

**Built:** 26 Oct 2026 · Against the content package `campaignx.supermia.ai` (v1, 22 Oct 2026)

What was built, what still needs a decision from SuperMIA, and what is deliberately not on the site yet.

---

## 1. What shipped

### Technical SEO (SEO audit, Section 1)

| Audit # | Issue | Status |
|---|---|---|
| 1 | CRITICAL — canonical/og pointed at `campaignx.ai`, a different site | **Fixed.** `src/config/site.ts` and `.env.example` now default to `https://campaignx.supermia.ai`. Every page emits a self-referencing canonical. |
| 2 | CRITICAL — 7 unverified testimonials on a Beta product | **Removed** from the homepage. The `Testimonials` component is still in the repo with a comment explaining why it is unmounted. |
| 4 | CRITICAL — app host indexable | **Not actionable in this repo.** `app.campaignx.supermia.ai` must serve `X-Robots-Tag: noindex, nofollow`. Deployment task — see §3. |
| 5 | HIGH — "nine channels" but seven named | **Fixed.** All copy now says seven channels plus webhooks. |
| 6 | HIGH — H1 with a typo, no keyword | Inner pages use the H1 from each brief. Homepage H1 unchanged — see §4. |
| 7 | HIGH — title/meta weak | **Fixed** sitewide. Titles and metas are taken verbatim from each page's keyword brief. |
| 8 | HIGH — anchor-only menu, no sign-up or demo | **Fixed.** Page-based menu with four dropdowns, Pricing, Log in, Book a demo and Start free. |
| 9 | HIGH — robots/sitemap/llms 4xx | **Fixed.** Now served from the app: `app/robots.ts`, `app/sitemap.ts`, `app/llms.txt/route.ts`. |
| 10 | HIGH — no structured data | **Fixed.** Organization, WebSite, SoftwareApplication, WebPage and BreadcrumbList on every page; VideoObject on the homepage; FAQPage on `/faq` only. |
| 11 | HIGH — `twitter:site` may not be ours | **Changed** to `@supermia_ai` pending confirmation (Q2). |
| 12 | HIGH — "100% private" / "24/7 optimising" | **Fixed.** Replaced with the precise statement from the Fact Sheet. |
| 16 | HIGH — brochure PDF has wrong facts | **Left live as instructed.** Still shows "9 platforms" and MIA branding — see §3. |

### Footer

Rebuilt. The old grid declared four columns and was handed six once the
navigation became page-based, so the last two wrapped into an orphan row
and sat stranded below the first. It is now a masthead (logo, line, both
CTAs), one row of five columns, and a baseline. The directory sizes
itself from the navigation, so adding a section cannot break it again.

### Pages (28 routes, up from 3)

All 29 planned URLs are now either live or intentionally deferred:

- **Core:** `/`
- **Section indexes (3):** `/features`, `/channels`, `/use-cases` — these also give breadcrumbs a real parent
- **Product (5):** brand-voice, ai-creative, multi-channel-publishing, approvals, campaign-analytics
- **Channels (3):** social-media, email, sms
- **Use cases (4):** small-business, agencies, marketing-teams, founders
- **Company:** `/pricing`, `/about`
- **Resources:** `/faq`, `/blog`, 3 blog category pages
- **Legal:** `/privacy`, `/terms` (pre-existing)
- **Deferred:** the 6 blog posts and `/templates/campaign-brief-template` — see §4

### Verified after build

- 25 URLs in `sitemap.xml`, all `live` pages, no 404s advertised.
- 32 unique internal links crawled across 25 pages: **all return 200**. The Navigation Spec rule that nothing in the menu may link to a 404 holds.
- Every canonical is self-referencing on `campaignx.supermia.ai`.
- `FAQPage` markup appears on `/faq` and nowhere else.
- No banned phrase from the Fact Sheet's "Never say" list appears in any user-visible copy.
- `tsc --noEmit` and `eslint` both pass.

---

## 2. Design and animation

**The homepage hero is untouched.** `src/components/hero/` was not modified.
`PageHero` is a separate component used only on inner pages.

### Storytelling structure

Product, channel and use-case pages are built as a three-beat arc rather
than a stack of feature cards:

1. **Tension** — a dark band stating the problem as a scene, with a
   pull-quote. The pull-quotes come from the Fact Sheet's working
   pain-point phrases and are **never** presented as customer quotes,
   because none of them are.
2. **Turn** — the warm band carrying the brand light: what changes.
3. **Resolution** — what the week looks like afterwards.

### Components

| Component | What it does |
|---|---|
| `StoryBeat` | One beat of the arc, with artwork and an optional pull-quote. |
| `PageHero` | Word-by-word heading rise, optional artwork panel. |
| `StepSequence` | Pinned, scroll-scrubbed sequence with a cross-fading artwork column. |
| `ChannelConstellation` | The seven channels radiating from one brief; SVG spokes draw on scroll. |
| `MetricPanel` | An illustrated campaign report with animated bars and real platform marks. |
| `CampaignMarquee` | Two rows of real campaign artwork drifting against the scroll. |
| `ShowcaseSplit` | Copy beside a product video or still, with a slight parallax. |
| `StatBand` | Dark band of counted-up figures, every one traceable to the Fact Sheet. |
| `FeatureGrid` | Cards with a cursor-tracking sheen. |
| `PageFaq` | Accordion animated on `grid-template-rows`. |

### Imagery

All artwork comes from assets already in the repo — 26 campaign images,
4 step illustrations and 2 product videos. **No third-party or stock
imagery was added**, so there is no new licensing to clear. If more is
wanted later, generate it or source it from a free licence and drop it
into `public/images/gallery/`; the marquee picks up new numbers
automatically.

The `MetricPanel` figures are an illustration of the report layout and
say so in a visible caption — presenting invented numbers as data would
breach the Fact Sheet's claim rules.

### Motion

Inner pages reuse the homepage's motion language rather than inventing a second one:

Every component above:
- Renders its content in the server HTML (readable with JS disabled).
- Collapses to a static layout under `prefers-reduced-motion`.
- Skips pinning below `lg`, so phones do not gain viewports of dead scroll.

---

## 3. Needs a decision or action from SuperMIA

These are blocking nothing, but each one is a known gap.

### Action required outside this repo

1. **`X-Robots-Tag: noindex, nofollow` on `app.campaignx.supermia.ai`** (audit #4). Cannot be set from this codebase. Without it the app may be indexed from inbound links.
2. **`NEXT_PUBLIC_SITE_URL`** must be set to `https://campaignx.supermia.ai` in the production environment. The code default is now correct, but an existing env var set to `campaignx.ai` would override it.
3. **Brochure PDF** (audit #16) — still linked from the homepage, as you asked. It says "9 platforms" and "goes live the same day", uses MIA branding, and includes an unrelated hiring line. Both the "9 platforms" claim and the branding contradict the rest of the site.

### Answers that change copy already on the site

| # | Question | Where it bites |
|---|---|---|
| Q1 | Is `campaignx.ai` yours? | If it is a planned move, the canonical strategy needs revisiting. If not, nothing further. |
| Q2 | Is `@campaignx` your X handle? | `twitter:site` is currently `@supermia_ai`. |
| Q3 | Beta (this site) or GA with 200 free credits (supermia.ai)? Which app do CTAs use? | Pricing and FAQ copy, and every CTA destination. |
| Q4 | What are the other two channels? | All copy says seven. If two more are confirmed, several pages change. |
| Q5 | Are the 7 testimonials real and consented? | They stay unmounted until this is answered. |
| Q7/Q12 | Do you train on customer data? The FAQ says no; terms 7.3 reserve anonymized patterns. | The FAQ and several pages state both facts precisely. Aligning the terms would let the copy be simpler. |
| Q13 | Does Starter include the named-approver workflow? | The approvals FAQ currently points at Pricing rather than answering directly. |
| Q17 | Do customers bring their own Twilio/SMTP? | Flagged inline on `/channels/email` and `/channels/sms`. |
| Q11 | Should "Book a demo" go to `supermia.ai/schedule-demo/`? | Currently points there. Noted in `config/navigation.ts`. |

Two answers are marked `[CONFIRM with SuperMIA]` **in the page copy itself**, on `/channels/email` and `/channels/sms`. Those two strings must be resolved before launch — search the repo for `[CONFIRM` to find them.

---

## 4. Deliberately not built

- **The 6 blog posts** and the campaign brief template. Only keyword briefs exist for these; writing them is a content task, not a build task. `/blog` and the category pages show an honest "coming soon" with the planned line-up rather than placeholder cards.
- **Offer / price JSON-LD.** The content package explicitly forbids it until final prices are public.
- **Review / AggregateRating markup.** Forbidden while testimonials are unverified.
- **Homepage H1 change** (audit #6). The homepage hero is an animated component with its own copy; changing its H1 to the recommended string is a content decision that affects the hero's visual rhythm. Flagged rather than done unilaterally.
- **Keyword validation.** Every keyword in the package is still `Pending Semrush` — no volume or difficulty has been measured. Rerun the list in audit §2.2 before investing further in Tier 2 pages.

---

## 5. Where things live

```
src/config/routes.ts          One registry for every URL. Drives the menu,
                              footer, sitemap and breadcrumbs. Flip `live`
                              to publish a page everywhere at once.
src/config/navigation.ts      Header, footer and mobile menus, built from routes.
src/config/pages/             Page content: channels, use-cases, faq, blog.
src/components/page/          The shared inner-page system.
src/lib/schema.ts             JSON-LD. FAQPage is /faq only.
src/lib/metadata.ts           Per-page title/meta/canonical.
HANDOFF.md                    This file.
```

To add a page: add it to `routes.ts`, write its content, create the route using `PageShell`. The menu, sitemap and breadcrumbs follow automatically.
