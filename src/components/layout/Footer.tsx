import Link from "next/link";
import { ArrowRight, ArrowUpRight, Globe, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/ui/Logo";
import { demoCta, footerNavigation, primaryCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";

/**
 * The site footer.
 *
 * Laid out as a masthead and a directory, in that order:
 *
 *   1. A masthead row — the logo, what CampaignX is, and the two actions
 *      someone has at the end of a page. This is the part that has to
 *      work; the rest is navigation.
 *   2. The directory — one row of equal link columns, with contact
 *      details in their own column at the end.
 *   3. The baseline — copyright, legal, credit.
 *
 * The previous version declared four grid columns and was handed six
 * children once the navigation became page-based, so the last two wrapped
 * onto a second row and sat stranded under the first. The directory now
 * sizes itself from the number of columns it is given, and the contact
 * block is part of that same row rather than a fifth element fighting it.
 */
export function Footer() {
  return (
    <footer className="relative">
      <div className="relative isolate overflow-hidden border-t border-line bg-surface-soft/60">
        {/* Backdrop. The hero's own dot field faded out toward the
            baseline, plus one low brand volume so the page ends on colour
            rather than on grey. Decorative throughout. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="cx-dots absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,#000,transparent_78%)]" />
          <div className="absolute -bottom-[38vh] left-1/2 h-[60vh] w-[120vw] max-w-[1800px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(var(--brand-blue-rgb),0.10),rgba(138,43,226,0.05)_58%,transparent)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(var(--brand-blue-rgb),0.35),rgba(208,0,255,0.25),transparent)]" />
        </div>

        <Container className="relative">
          {/* ---------------------------------------------------------
              1. Masthead
              --------------------------------------------------------- */}
          <div
            className="flex flex-col gap-8 border-b border-line py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-14"
          >
            <div className="max-w-[34rem]">
              <Link
                href="/"
                aria-label={`${siteConfig.name} home`}
                className="inline-block w-fit transition-opacity duration-300 hover:opacity-70"
              >
                <Logo />
              </Link>

              <p className="text-display mt-5 text-[clamp(1.25rem,2.1vw,1.75rem)] font-medium leading-[1.2] tracking-[-0.025em]">
                Write one sentence. Get a whole campaign back.
              </p>

              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                {siteConfig.blurb}
              </p>
            </div>

            {/* The two actions, kept together so the end of the page has
                one obvious next step and one quieter alternative. */}
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <Link
                href={primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand shadow-brand group inline-flex h-12 items-center gap-2 rounded-pill pl-6 pr-5 text-[0.9375rem] font-medium text-white transition-[box-shadow,transform,filter] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:brightness-[1.07] hover:shadow-brand-hover"
              >
                {primaryCta.label}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                href={demoCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center rounded-pill border border-line-strong bg-surface px-6 text-[0.9375rem] font-medium transition-colors duration-200 hover:bg-surface-soft"
              >
                {demoCta.label}
              </Link>
            </div>
          </div>

          {/* ---------------------------------------------------------
              2. Directory

              One row. `footerNavigation.length + 1` columns — the link
              columns plus contact — so adding a section to the navigation
              can never again leave an orphan row.
              --------------------------------------------------------- */}
          <div className="grid gap-x-8 gap-y-10 py-12 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,0.8fr))_minmax(0,1.15fr)] lg:py-14">
            {footerNavigation.map((column) => (
              <nav
                key={column.title}
                aria-label={column.title}
                className="flex flex-col gap-4"
              >
                <h2 className="text-eyebrow">{column.title}</h2>
                <ul className="flex flex-col gap-2.5">
                  {column.items.map((item) => (
                    <li key={`${column.title}-${item.label}`}>
                      <Link
                        href={item.href}
                        className="group relative inline-flex items-center text-[0.9375rem] text-muted transition-colors duration-300 hover:text-foreground"
                      >
                        {item.label}
                        <span
                          aria-hidden="true"
                          className="bg-brand absolute -bottom-1 left-0 block h-px w-0 rounded-full transition-[width] duration-300 ease-[var(--ease-out-soft)] group-hover:w-full"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            {/* Ways to reach us: last in the row, widest, because the
                address needs more line than a list of page names. */}
            <div
              className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1"
            >
              <h2 className="text-eyebrow">Get in touch</h2>
              <ul className="flex flex-col gap-3">
                {siteConfig.contact.map((item) => (
                  <li key={item.label}>
                    <ContactRow item={item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ---------------------------------------------------------
              3. Baseline
              --------------------------------------------------------- */}
          <div className="flex flex-col gap-4 border-t border-line py-7 sm:flex-row sm:items-center sm:justify-between">
            {/* Copyright and legal read as one line, so they are one flex
                row with a rule drawn on each item. A `<span>` separator
                would be read aloud as content. */}
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.875rem] text-muted">
              <li>
                {`© ${siteConfig.copyrightYear} ${siteConfig.name} by SuperMIA. All rights reserved.`}
              </li>

              {siteConfig.legal.map((item) => (
                <li
                  key={item.label}
                  className="before:mr-4 before:text-line-strong before:content-['|']"
                >
                  <Link
                    href={item.href}
                    className="transition-colors duration-300 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-1 text-[0.875rem] text-muted sm:items-end">
              <p>
                {siteConfig.credit.prefix}{" "}
                <span className="font-semibold text-muted-strong">
                  {siteConfig.credit.name}
                </span>
              </p>

              <p>
                {siteConfig.builtBy.prefix}{" "}
                <Link
                  href={siteConfig.builtBy.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-muted-strong transition-colors duration-300 hover:text-foreground"
                >
                  {siteConfig.builtBy.name}
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

/** The icon for each kind of contact detail. */
const CONTACT_ICONS = {
  email: Mail,
  site: Globe,
  link: ArrowUpRight,
  address: MapPin,
} as const;

type ContactItem = (typeof siteConfig.contact)[number];

/**
 * One line in "Get in touch".
 *
 * The address has nowhere to link to, so it renders as plain text rather
 * than as a dead anchor — a link that goes nowhere is worse than no link.
 * Everything else is a real destination.
 */
function ContactRow({ item }: { item: ContactItem }) {
  const Icon = CONTACT_ICONS[item.kind];

  const body = (
    <>
      <span
        aria-hidden="true"
        className="mt-0.5 flex size-4 shrink-0 items-center justify-center text-muted"
      >
        <Icon className="size-4" strokeWidth={1.75} />
      </span>
      <span className="leading-snug">{item.label}</span>
    </>
  );

  if (!("href" in item) || !item.href) {
    return (
      <span className="flex items-start gap-3 text-[0.9375rem] text-muted">
        {body}
      </span>
    );
  }

  /* External destinations open in a new tab; `noreferrer` with `noopener`
     is the safe default for a target we do not control. */
  const external = item.href.startsWith("http");

  return (
    <Link
      href={item.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
      className="group flex items-start gap-3 text-[0.9375rem] text-muted transition-colors duration-300 hover:text-foreground"
    >
      {body}
    </Link>
  );
}
