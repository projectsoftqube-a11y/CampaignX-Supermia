import type { FooterColumn, NavItem } from "@/types/navigation";

/* Only two anchors exist on the page now, so the nav links to those
   rather than advertising sections that were removed. */
export const navigation: readonly NavItem[] = [
  { label: "Why CampaignX", href: "#problem", description: "The cost of four tools" },
  { label: "How it works", href: "#how", description: "Brief to shipped campaign" },
  { label: "Channels", href: "#channels", description: "Everywhere your audience is" },
  { label: "Pricing", href: "#pricing", description: "Start free, pay when it ships" },
  { label: "FAQ", href: "#faq", description: "The things people ask first" },
];

export const primaryCta: NavItem = {
  label: "Start a Campaign",
  href: "#start",
};

export const secondaryCta: NavItem = {
  label: "Log in",
  href: "#login",
};

export const footerNavigation: readonly FooterColumn[] = [
  {
    title: "Product",
    items: [
      { label: "How it works", href: "#how" },
      { label: "Channels", href: "#channels" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "#company" },
      { label: "Careers", href: "#company" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "FAQ", href: "#faq" },
      { label: "Help centre", href: "#help" },
      { label: "Status", href: "#status" },
    ],
  },
];
