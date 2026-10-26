import type { FooterColumn, NavItem } from "@/types/navigation";
import { siteConfig } from "@/config/site";
import { ROUTES, routesInSection } from "@/config/routes";

/**
 * Page-based menu, replacing the five on-page anchors (Navigation Spec §4,
 * SEO audit issue #8). Anchors passed no relevance to any page that could
 * rank, and there was no sign-up or demo action in the header.
 *
 * Every item is built from the route registry, so the Spec's rule that
 * "nothing in the menu may link to a 404" is enforced by `live` rather than
 * by remembering to edit two files.
 */

export interface NavGroup {
  label: string;
  /** Where the group label itself points, for keyboard and touch users. */
  href?: string;
  /** Rendered as a two-column dropdown when present. */
  items: readonly NavItem[];
}

function toNavItems(section: Parameters<typeof routesInSection>[0]) {
  return routesInSection(section).map(
    (route): NavItem => ({
      label: route.label,
      href: route.href,
      description: route.description,
      icon: route.icon,
    }),
  );
}

export const navGroups: readonly NavGroup[] = [
  {
    label: "Features",
    href: ROUTES.productIndex.href,
    items: toNavItems("product"),
  },
  {
    label: "Channels",
    href: ROUTES.channelsIndex.href,
    items: toNavItems("channels"),
  },
  {
    label: "Use Cases",
    href: ROUTES.useCasesIndex.href,
    items: toNavItems("useCases"),
  },
  {
    label: "Resources",
    items: [
      {
        label: ROUTES.faq.label,
        href: ROUTES.faq.href,
        description: ROUTES.faq.description,
        icon: ROUTES.faq.icon,
      },
      {
        label: ROUTES.blog.label,
        href: ROUTES.blog.href,
        description: ROUTES.blog.description,
        icon: ROUTES.blog.icon,
      },
      {
        label: ROUTES.about.label,
        href: ROUTES.about.href,
        description: ROUTES.about.description,
        icon: ROUTES.about.icon,
      },
    ],
  },
] as const;

/** Flat items sitting between the dropdowns and the CTAs. */
export const navLinks: readonly NavItem[] = [
  { label: "Pricing", href: ROUTES.pricing.href },
];

/** Kept for the homepage in-page jump links. */
export const navigation: readonly NavItem[] = [
  { label: "How it works", href: "/#how" },
  { label: "Pricing", href: ROUTES.pricing.href },
  { label: "FAQ", href: ROUTES.faq.href },
];

export const primaryCta: NavItem = {
  label: "Start free",
  href: siteConfig.signupUrl,
};

export const secondaryCta: NavItem = {
  label: "Log in",
  href: siteConfig.loginUrl,
};

/**
 * Book a demo points at the existing SuperMIA scheduler.
 * [CONFIRM] Fact Sheet: should this go to supermia.ai/schedule-demo/ or a
 * CampaignX page once one exists?
 */
export const demoCta: NavItem = {
  label: "Book a demo",
  href: "https://supermia.ai/schedule-demo/",
};

export const footerNavigation: readonly FooterColumn[] = [
  {
    title: "Features",
    items: toNavItems("product").map(({ label, href }) => ({ label, href })),
  },
  {
    title: "Channels",
    items: [
      ...toNavItems("channels").map(({ label, href }) => ({ label, href })),
      { label: "How it works", href: "/#how" },
    ],
  },
  {
    title: "Use cases",
    items: toNavItems("useCases").map(({ label, href }) => ({ label, href })),
  },
  {
    title: "Company",
    items: [
      { label: ROUTES.pricing.label, href: ROUTES.pricing.href },
      { label: ROUTES.about.label, href: ROUTES.about.href },
      { label: ROUTES.faq.label, href: ROUTES.faq.href },
      { label: ROUTES.blog.label, href: ROUTES.blog.href },
      { label: "Start free", href: siteConfig.signupUrl },
    ],
  },
];
