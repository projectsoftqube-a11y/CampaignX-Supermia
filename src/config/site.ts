/** Overridable per environment so canonical + OG URLs are correct on previews. */
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const url = (configuredUrl || "https://campaignx.ai").replace(/\/$/, "");

export const siteConfig = {
  name: "CampaignX",
  tagline: "The AI Campaign Agent",
  url,
  description:
    "CampaignX transforms marketing briefs into strategy, creative, targeting, launch and optimization with AI.",
  title: "CampaignX — Turn One Brief Into a Complete Campaign",
  twitter: "@campaignx",
  /** Social links for the footer. Placeholders until the accounts exist. */
  socials: [
    { id: "x", label: "X", href: "#x" },
    { id: "linkedin", label: "LinkedIn", href: "#linkedin" },
    { id: "instagram", label: "Instagram", href: "#instagram" },
  ] as const,
  copyrightYear: 2026,
  legal: [
    { label: "Privacy", href: "#privacy" },
    { label: "Terms", href: "#terms" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
