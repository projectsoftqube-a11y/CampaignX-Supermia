export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly description?: string;
  /** Icon key, resolved to a component by the header. */
  readonly icon?: string;
}

export interface FooterColumn {
  readonly title: string;
  readonly items: readonly NavItem[];
}
