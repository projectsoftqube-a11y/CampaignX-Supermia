export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly description?: string;
}

export interface FooterColumn {
  readonly title: string;
  readonly items: readonly NavItem[];
}
