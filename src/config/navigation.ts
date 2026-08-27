import type { FooterColumn, NavItem } from "@/types/navigation";
import { siteConfig } from "@/config/site";

/**
 * Absolute hrefs (`/#problem`, not `#problem`).
 *
 * The header and footer render on /privacy and /terms as well as the
 * homepage, and a bare `#problem` there resolves to `/privacy#problem` — a
 * section that does not exist on that page, so the link silently does
 * nothing. Rooting them at `/` sends the visitor home and to the right
 * section from anywhere on the site.
 */
export const navigation: readonly NavItem[] = [
  { label: "Why CampaignX", href: "/#problem", description: "The cost of four tools" },
  { label: "How it works", href: "/#how", description: "Brief to shipped campaign" },
  { label: "Channels", href: "/#channels", description: "Everywhere your audience is" },
  { label: "Pricing", href: "/#pricing", description: "Start free, pay when it ships" },
  { label: "FAQ", href: "/#faq", description: "The things people ask first" },
];

export const primaryCta: NavItem = {
  label: "Start a Campaign",
  href: siteConfig.signupUrl,
};

export const secondaryCta: NavItem = {
  label: "Log in",
  href: siteConfig.loginUrl,
};

/**
 * Two short columns rather than three padded ones.
 *
 * Every link here resolves to a section that actually exists on the page or
 * to the app itself. The previous version advertised About, Careers, Help
 * centre and Status, none of which had anywhere to go.
 */
export const footerNavigation: readonly FooterColumn[] = [
  {
    title: "Explore",
    items: [
      { label: "Why CampaignX", href: "/#problem" },
      { label: "How it works", href: "/#how" },
      { label: "Channels", href: "/#channels" },
    ],
  },
  {
    title: "Try it",
    items: [
      { label: "Start a Campaign", href: siteConfig.signupUrl },
      { label: "Watch the demo", href: "/#demo" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Download brochure", href: "/#brochure" },
    ],
  },
];
