/**
 * Every page on the subdomain, in one place.
 *
 * The sitemap, the header menu, the footer and the breadcrumb trail all read
 * from this list, so a URL can never appear in one and be missing from
 * another. The Navigation Spec is explicit that nothing in the menu may link
 * to a 404, which is what `live` enforces: flip a page to `live: true` on the
 * same commit that ships its route, and it joins the menu and the sitemap
 * together.
 *
 * `priority` and `changeFrequency` feed sitemap.xml only.
 */

export type RouteSection =
  | "core"
  | "product"
  | "channels"
  | "useCases"
  | "company"
  | "resources"
  | "legal";

/**
 * Icon key for the header dropdowns. A key rather than a component, so
 * this config stays free of JSX and can be imported anywhere.
 */
export type RouteIcon =
  | "voice"
  | "image"
  | "send"
  | "check"
  | "chart"
  | "social"
  | "mail"
  | "message"
  | "store"
  | "briefcase"
  | "users"
  | "rocket"
  | "help"
  | "book"
  | "info"
  | "tag";

export interface RouteEntry {
  /** Path with a leading slash and no trailing slash, matching the site convention. */
  href: string;
  /** Menu and breadcrumb label. */
  label: string;
  /** One line under the label in a dropdown. Omitted for legal and utility pages. */
  description?: string;
  section: RouteSection;
  /** Shown beside the label in the header dropdowns. */
  icon?: RouteIcon;
  /** False keeps the page out of the menu and the sitemap. */
  live: boolean;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
}

export const ROUTES = {
  home: {
    href: "/",
    label: "Home",
    section: "core",
    live: true,
    priority: 1,
    changeFrequency: "weekly",
  },

  /* Product -------------------------------------------------------------- */
  productIndex: {
    href: "/features",
    label: "Features",
    description: "Everything CampaignX does, feature by feature",
    section: "product",
    live: true,
    priority: 0.7,
    changeFrequency: "monthly",
  },
  brandVoice: {
    href: "/features/brand-voice",
    label: "Brand Voice",
    description: "Campaigns that sound like you, learned from your own material",
    icon: "voice",
    section: "product",
    live: true,
    priority: 0.8,
    changeFrequency: "monthly",
  },
  aiCreative: {
    href: "/features/ai-creative",
    label: "AI Creative",
    description: "Visuals made for each channel and matched to your brand",
    icon: "image",
    section: "product",
    live: true,
    priority: 0.8,
    changeFrequency: "monthly",
  },
  multiChannel: {
    href: "/features/multi-channel-publishing",
    label: "Multi-Channel Publishing",
    description: "One campaign, seven channels, one calendar",
    icon: "send",
    section: "product",
    live: true,
    priority: 0.8,
    changeFrequency: "monthly",
  },
  approvals: {
    href: "/features/approvals",
    label: "Approvals",
    description: "Nothing sends without a named approver",
    icon: "check",
    section: "product",
    live: true,
    priority: 0.8,
    changeFrequency: "monthly",
  },
  analytics: {
    href: "/features/campaign-analytics",
    label: "Campaign Analytics",
    description: "See what worked, and feed it into the next campaign",
    icon: "chart",
    section: "product",
    live: true,
    priority: 0.8,
    changeFrequency: "monthly",
  },

  /* Channels ------------------------------------------------------------- */
  channelsIndex: {
    href: "/channels",
    label: "Channels",
    description: "The seven channels a campaign publishes to",
    section: "channels",
    live: true,
    priority: 0.7,
    changeFrequency: "monthly",
  },
  social: {
    href: "/channels/social-media",
    label: "Social Media",
    description: "Instagram, Facebook, LinkedIn, X and Google Business",
    icon: "social",
    section: "channels",
    live: true,
    priority: 0.8,
    changeFrequency: "monthly",
  },
  email: {
    href: "/channels/email",
    label: "Email",
    description: "Campaign email written and designed from the same brief",
    icon: "mail",
    section: "channels",
    live: true,
    priority: 0.8,
    changeFrequency: "monthly",
  },
  sms: {
    href: "/channels/sms",
    label: "SMS",
    description: "Short, on-brand messages that respect the format",
    icon: "message",
    section: "channels",
    live: true,
    priority: 0.8,
    changeFrequency: "monthly",
  },

  /* Use cases ------------------------------------------------------------ */
  useCasesIndex: {
    href: "/use-cases",
    label: "Use Cases",
    description: "Who CampaignX is built for",
    section: "useCases",
    live: true,
    priority: 0.7,
    changeFrequency: "monthly",
  },
  smallBusiness: {
    href: "/use-cases/small-business",
    label: "Small Business",
    description: "Marketing that ships without a marketing department",
    icon: "store",
    section: "useCases",
    live: true,
    priority: 0.7,
    changeFrequency: "monthly",
  },
  agencies: {
    href: "/use-cases/agencies",
    label: "Agencies",
    description: "Several clients, several brand voices, one workspace",
    icon: "briefcase",
    section: "useCases",
    live: true,
    priority: 0.7,
    changeFrequency: "monthly",
  },
  marketingTeams: {
    href: "/use-cases/marketing-teams",
    label: "Marketing Teams",
    description: "Campaigns weekly instead of quarterly, with approvals",
    icon: "users",
    section: "useCases",
    live: true,
    priority: 0.7,
    changeFrequency: "monthly",
  },
  founders: {
    href: "/use-cases/founders",
    label: "Founders",
    description: "Run your own marketing without it taking the week",
    icon: "rocket",
    section: "useCases",
    live: true,
    priority: 0.7,
    changeFrequency: "monthly",
  },

  /* Company and pricing -------------------------------------------------- */
  pricing: {
    href: "/pricing",
    label: "Pricing",
    description: "A free plan, paid plans from $10 a month, and custom pricing.",
    icon: "tag",
    section: "company",
    live: true,
    priority: 0.9,
    changeFrequency: "weekly",
  },
  about: {
    href: "/about",
    label: "About",
    description: "Who builds CampaignX",
    icon: "info",
    section: "company",
    live: true,
    priority: 0.6,
    changeFrequency: "monthly",
  },

  /* Resources ------------------------------------------------------------ */
  faq: {
    href: "/faq",
    label: "FAQ",
    description: "Channels, brand voice, approvals, pricing and your data",
    icon: "help",
    section: "resources",
    live: true,
    priority: 0.8,
    changeFrequency: "monthly",
  },
  blog: {
    href: "/blog",
    label: "Blog",
    description: "Campaign strategy, social, email and SMS",
    icon: "book",
    section: "resources",
    live: true,
    priority: 0.8,
    changeFrequency: "weekly",
  },

  /* Legal ---------------------------------------------------------------- */
  privacy: {
    href: "/privacy",
    label: "Privacy Policy",
    section: "legal",
    live: true,
    priority: 0.3,
    changeFrequency: "yearly",
  },
  terms: {
    href: "/terms",
    label: "Terms and Conditions",
    section: "legal",
    live: true,
    priority: 0.3,
    changeFrequency: "yearly",
  },
} as const satisfies Record<string, RouteEntry>;

export type RouteKey = keyof typeof ROUTES;

/** Blog categories. Separate from ROUTES because they are generated. */
export const BLOG_CATEGORIES = [
  {
    slug: "campaign-strategy",
    label: "Campaign Strategy",
    description: "Briefs, planning and multi-channel campaigns.",
    /* A direct answer to "what is this subject", stated plainly enough
       to be quoted on its own. A category page with three cards and a
       one-line description is thin for a reader and gives an answer
       engine nothing to extract. */
    answer:
      "Campaign strategy is the work done before anything is written: deciding what you are promoting, who it is for, which channels carry it, and how long it runs. Most campaigns fail here rather than in the copy, because an unclear brief produces unclear work on every channel at once.",
    /* What someone arriving on this page is usually trying to settle. */
    covers: [
      "Writing a brief that answers the questions a writer will otherwise guess at",
      "Choosing a channel mix instead of posting everywhere by default",
      "Setting a campaign window, and what changes when it is two weeks rather than six",
      "Deciding what to measure before the campaign runs, not after",
    ],
  },
  {
    slug: "social-media",
    label: "Social Media",
    description: "Planning and running social campaigns.",
    answer:
      "A social campaign is one message adapted to several feeds, not the same post copied across them. Each surface has its own length, tone and reason people are there, so the useful question is what changes between them and what has to stay identical.",
    covers: [
      "Adapting one announcement to feeds that reward different things",
      "Planning a month of posts without running out of ideas in week three",
      "What to post on the days between a launch and a deadline",
      "Deciding how often to post, and when not to",
    ],
  },
  {
    slug: "email-sms",
    label: "Email and SMS",
    description: "Direct channels that still need a brand voice.",
    answer:
      "Email and SMS reach people directly rather than waiting for them to scroll, which makes both effective and easy to overuse. The constraint is not length but permission: these arrive in an inbox or on a lock screen, and the recipient can leave in one tap.",
    covers: [
      "Writing a subject line and preview text as one unit rather than two fields",
      "The character budget an SMS actually has once the sender name and opt-out are counted",
      "Timing, frequency, and what drives people to unsubscribe",
      "Keeping the direct channels in the same voice as everything else",
    ],
  },
] as const;

export type BlogCategorySlug = (typeof BLOG_CATEGORIES)[number]["slug"];

export const routeList: readonly RouteEntry[] = Object.values(ROUTES);

/** Section index pages. They head a section rather than sit inside it. */
const INDEX_HREFS = new Set(["/features", "/channels", "/use-cases"]);

/**
 * The child pages of a section, for dropdowns and footer columns.
 * The section's own index page is excluded: it is the parent, and listing
 * it beside its children reads as a duplicate.
 */
export function routesInSection(section: RouteSection): readonly RouteEntry[] {
  return routeList.filter(
    (r) => r.section === section && r.live && !INDEX_HREFS.has(r.href),
  );
}

/** Absolute URL for canonicals, OG tags, sitemap entries and JSON-LD @id. */
export function absoluteUrl(path: string, origin: string): string {
  if (path === "/") return `${origin}/`;
  return `${origin}${path}`;
}
