/** Overridable per environment so canonical + OG URLs are correct on previews. */
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const url = (configuredUrl || "https://campaignx.ai").replace(/\/$/, "");

/**
 * The product itself, on its own subdomain. Every "Start a Campaign" and
 * "Log in" control points here — this is the one place to change it.
 */
const APP_URL = "https://app.campaignx.supermia.ai";

export const siteConfig = {
  name: "CampaignX",
  tagline: "The AI Campaign Agent",
  url,
  appUrl: APP_URL,
  /** Sign-up and sign-in entry points into the app. */
  signupUrl: APP_URL,
  loginUrl: `${APP_URL}/login`,
  description:
    "CampaignX transforms marketing briefs into strategy, creative, targeting, launch and optimization with AI.",
  title: "CampaignX: Turn One Brief Into a Complete Campaign",
  twitter: "@campaignx",
  /** Social links for the footer. Placeholders until the accounts exist. */
  socials: [
    { id: "x", label: "X", href: "#x" },
    { id: "linkedin", label: "LinkedIn", href: "#linkedin" },
    { id: "instagram", label: "Instagram", href: "#instagram" },
  ] as const,
  copyrightYear: 2026,
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms and Conditions", href: "/terms" },
  ],

  /**
   * The footer blurb. Says what CampaignX is and who builds it, in one
   * sentence — the footer is where people land when they are checking the
   * product is real.
   */
  blurb:
    "CampaignX is the AI campaign operating system designed by SuperMIA to give marketing teams their time back.",

  /**
   * Contact details, shown in the footer's "Get in touch" column.
   * `kind` picks the icon; nothing else in the app reads it.
   */
  contact: [
    {
      kind: "email",
      label: "hello@supermia.ai",
      href: "mailto:hello@supermia.ai",
    },
    { kind: "site", label: "supermia.ai", href: "https://supermia.ai" },
    {
      kind: "link",
      label: "About CampaignX on SuperMIA",
      href: "https://supermia.ai/ai-marketing-campaign/",
    },
    {
      kind: "address",
      label: "2451 W Grapevine Mills Cir #547, Grapevine, TX 76051",
    },
  ] as const,

  /** The build credit on the right of the baseline bar. */
  credit: { prefix: "by", name: "SuperMIA · Botfinity Inc." },
} as const;

export type SiteConfig = typeof siteConfig;
