"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight, Globe, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/ui/Logo";
import { footerNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { gsap, registerGsap } from "@/lib/animations/gsap";
import { revealOnScroll } from "@/lib/animations/reveal";


/**
 * The site footer.
 *
 * Purely a directory now — the closing CTA panel that used to sit above it
 * was removed, along with its working prompt bar. The page's ask is made in
 * the hero and by the header's "Start a Campaign", both of which leave for
 * the app directly, so there is nothing left here to scroll to.
 */
export function Footer() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();

    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      /* Must run on every path, not just reduced motion: the CSS in
         animations.css keeps [data-animate="reveal"] hidden until GSAP
         clears it, so skipping this leaves the content invisible. */
      revealOnScroll(root, { stagger: 0.07, start: "top 85%" });

    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={rootRef} className="relative">




      {/* ---------------------------------------------------------------
          Footer.

          A conventional column layout, deliberately: the footer is where
          people go to check the product is real and find a way to contact
          someone. That is a job for a legible directory, not a composition
          — so the logo and what-we-are sentence sit on the left, the links
          in two short columns beside them, and the ways to reach us on the
          right, each with its own icon.

          Light, like the rest of the page. The closing CTA above is the
          one inverted panel; repeating that here would give the page two
          dark blocks stacked with only a gutter between them.

          Every link resolves to a real destination. Columns that would
          only be padding are not here.
          --------------------------------------------------------------- */}
      <div className="relative isolate overflow-hidden border-t border-line bg-surface-soft/60">
        {/* Backdrop.

            The footer was a flat panel with content floating on it. This
            is the hero's own dot field, faded out toward the baseline, so
            the top and bottom of the page are made of the same material —
            plus a low brand glow so the page ends on colour rather than on
            grey. Decorative throughout. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          {/* Dots, strongest at the top edge where the footer meets the
              page and gone by the legal line. */}
          <div className="cx-dots absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,#000,transparent_78%)]" />

          {/* One wide, low brand volume. Sized in vw so it stays a wash at
              any width rather than becoming a visible disc. */}
          <div className="absolute -bottom-[38vh] left-1/2 h-[60vh] w-[120vw] max-w-[1800px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(var(--brand-blue-rgb),0.10),rgba(138,43,226,0.05)_58%,transparent)]" />

          {/* A hairline of brand along the top border, so the seam between
              the page and the footer is not a plain grey rule. */}
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(var(--brand-blue-rgb),0.35),rgba(208,0,255,0.25),transparent)]" />
        </div>

        <Container className="relative">
          {/* The directory. */}
          <div className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.2fr)_repeat(2,minmax(0,0.65fr))_minmax(0,1.3fr)] lg:gap-8 lg:py-20">
            {/* Who we are. */}
            <div data-animate="reveal" className="flex flex-col gap-5">
              {/* Linked, like the header's: a logo that does nothing when
                  clicked reads as broken, and this one sits at the bottom
                  of the legal pages where it is the obvious way home. */}
              <Link
                href="/"
                aria-label={`${siteConfig.name} home`}
                className="w-fit transition-opacity duration-300 hover:opacity-70"
              >
                <Logo />
              </Link>

              <p className="max-w-[34ch] text-[0.9375rem] leading-relaxed text-muted">
                {siteConfig.blurb}
              </p>
            </div>

            {/* Link columns. */}
            {footerNavigation.map((column) => (
              <nav
                key={column.title}
                aria-label={column.title}
                data-animate="reveal"
                className="flex flex-col gap-4"
              >
                <h2 className="text-eyebrow">{column.title}</h2>
                <ul className="flex flex-col gap-3">
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

            {/* Ways to reach us. */}
            <div data-animate="reveal" className="flex flex-col gap-4">
              <h2 className="text-eyebrow">Get in touch</h2>
              <ul className="flex flex-col gap-3.5">
                {siteConfig.contact.map((item) => (
                  <li key={item.label}>
                    <ContactRow item={item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Baseline */}
          <div className="flex flex-col gap-4 border-t border-line py-8 sm:flex-row sm:items-center sm:justify-between">
            {/* The copyright and the legal links read as one line, so they
                are one flex row with a rule between each item rather than
                two blocks with their own spacing. The separators are drawn
                on the list items themselves — a `<span>` between them would
                be read aloud as content. */}
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.8125rem] text-muted">
              <li>
                {/* One expression, not two source lines: JSX collapses the
                    line break to a space, but leaves the sentence liable to
                    wrap in the middle of "All rights reserved". */}
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

            <p className="text-[0.8125rem] text-muted">
              {siteConfig.credit.prefix}{" "}
              <span className="font-semibold text-muted-strong">
                {siteConfig.credit.name}
              </span>
            </p>
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
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : null)}
      className="group flex items-start gap-3 text-[0.9375rem] text-muted transition-colors duration-300 hover:text-foreground"
    >
      {body}
    </Link>
  );
}
