"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { ArrowRight, Paperclip, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { BrandGlyph } from "@/components/ui/BrandGlyph";
import { withHighlight } from "@/components/ui/Highlight";
import { finalCta, footerBlurb } from "@/config/content";
import { footerNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { gsap, registerGsap } from "@/lib/animations/gsap";
import { revealOnScroll } from "@/lib/animations/reveal";

/** Where the prompt bar sends people. A placeholder until auth exists. */
const LOGIN_HREF = "#login";

/**
 * The closing CTA and footer.
 *
 * They are one component because they are one moment: the CTA is the page's
 * last argument and the footer is what holds it up. Splitting them would
 * put a seam between the ask and the ground it sits on.
 *
 * `#start` lives here. Every "Start a Campaign" control in the header and
 * hero points at it, so without this section those buttons scroll nowhere.
 */
export function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  const [brief, setBrief] = useState("");
  const router = useRouter();

  /* The brief is carried to the login screen as a query param, so whatever
     was typed survives sign-up instead of being retyped afterwards. */
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = brief.trim();
    router.push(
      trimmed
        ? `${LOGIN_HREF}?brief=${encodeURIComponent(trimmed)}`
        : LOGIN_HREF,
    );
  };

  /* Enter submits; Shift+Enter keeps its usual newline, since this is a
     textarea and a brief may well run to two lines. */
  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

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
          Closing CTA

          A bounded dark panel rather than centred text on a wash. The page
          is off-white the whole way down, so ending on an inverted card
          gives the final ask somewhere to land instead of dissolving into
          the same background as everything above it.
          --------------------------------------------------------------- */}
      <section id="start" aria-labelledby="cta-heading" className="pb-20">
        <Container>
          <div
            data-animate="reveal"
            className="relative isolate overflow-hidden rounded-frame bg-foreground px-6 py-16 sm:px-14 sm:py-20"
          >
            {/* Brand light, from the lower right. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-1/4 -bottom-1/2 -z-10 size-[80%] rounded-full bg-[radial-gradient(closest-side,rgba(var(--brand-blue-rgb),0.45),transparent)] blur-[60px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-1/3 -left-[10%] -z-10 size-[60%] rounded-full bg-[radial-gradient(closest-side,rgba(208,0,255,0.30),transparent)] blur-[70px]"
            />

            <div className="mx-auto flex max-w-[46rem] flex-col items-center gap-6 text-center">
              {/* The ask */}
              <div className="flex flex-col items-center gap-5">
                <h2
                  id="cta-heading"
                  className="text-display max-w-[18ch] text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.08] text-white"
                >
                  {withHighlight(finalCta.heading, finalCta.headingHighlight)}
                </h2>

                <p className="max-w-[52ch] text-[1.0625rem] leading-relaxed text-white/55">
                  {finalCta.supporting}
                </p>

                <div className="mt-2 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
                  <Link
                    href={finalCta.primaryCta.href}
                    className="bg-brand shadow-brand group inline-flex h-14 items-center justify-center gap-2 rounded-pill px-8 text-base font-medium text-white transition-[box-shadow,transform,filter] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:brightness-[1.07] hover:shadow-brand-hover"
                  >
                    {finalCta.primaryCta.label}
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>

                  <Link
                    href={finalCta.secondaryCta.href}
                    className="inline-flex h-14 items-center justify-center rounded-pill border border-white/20 px-8 text-base font-medium text-white transition-colors duration-300 hover:border-white/40 hover:bg-white/5"
                  >
                    {finalCta.secondaryCta.label}
                  </Link>
                </div>
              </div>

              {/* A working prompt bar, echoing the hero's. Unlike the hero's
                  — which is a link, because it sits above the fold before
                  anyone has read anything — this one accepts real input:
                  by this point the visitor has read the page and typing is
                  the action they are ready to take. Submitting carries the
                  brief to the login screen so it is not lost on sign-up. */}
              <form
                onSubmit={onSubmit}
                className="mt-4 w-full text-left"
              >
                <div className="rounded-frame border border-white/10 bg-white/[0.04] p-2.5 backdrop-blur-sm transition-colors duration-300 focus-within:border-white/25">
                  <div className="rounded-[1.4rem] bg-white/[0.04] px-5 pt-5 pb-3.5">
                    <label htmlFor="cta-brief" className="sr-only">
                      Describe your campaign
                    </label>

                    <textarea
                      id="cta-brief"
                      name="brief"
                      value={brief}
                      onChange={(event) => setBrief(event.target.value)}
                      onKeyDown={onKeyDown}
                      rows={2}
                      placeholder="Launch our spring collection to everyone who bought last season."
                      className="w-full resize-none bg-transparent text-[0.9375rem] leading-[1.6] text-white placeholder:text-white/35 focus:outline-none"
                    />

                    <div className="mt-2 flex items-center justify-between gap-3">
                      <span
                        aria-hidden="true"
                        className="flex size-8 items-center justify-center rounded-full border border-white/15"
                      >
                        <Paperclip className="size-3.5 text-white/40" />
                      </span>

                      <button
                        type="submit"
                        className="bg-brand shadow-brand inline-flex h-10 cursor-pointer items-center gap-2 rounded-pill pr-3.5 pl-4 text-[0.9375rem] font-medium text-white transition-[filter,box-shadow] duration-200 hover:brightness-[1.07] hover:shadow-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        <Sparkles className="size-3.5" aria-hidden="true" />
                        {finalCta.prompt.action}
                      </button>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-center text-[0.8125rem] text-white/40">
                  {finalCta.prompt.hint}
                </p>
              </form>
            </div>
          </div>
        </Container>
      </section>




      {/* ---------------------------------------------------------------
          Footer.

          The structural idea: the wordmark is the floor. It runs the full
          bleed at the very bottom, clipped by the page edge, and everything
          else sits on top of it — so the footer reads as one composition
          rather than a column layout with a logo dropped in the corner.

          The navigation is a single ruled row rather than three stacked
          columns. With nine links a column grid leaves most of its area
          empty, which is what made the previous version feel like padding.
          --------------------------------------------------------------- */}
      <div className="relative overflow-hidden bg-foreground pt-20">
        {/* Aurora, low and wide. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
        >
          <div className="absolute -bottom-1/3 left-[10%] size-[55%] rounded-full bg-[radial-gradient(closest-side,rgba(var(--brand-blue-rgb),0.35),transparent)] blur-[90px]" />
          <div className="absolute right-[8%] -bottom-1/4 size-[45%] rounded-full bg-[radial-gradient(closest-side,rgba(208,0,255,0.22),transparent)] blur-[90px]" />
        </div>

        <Container className="relative">
          {/* Top row: the promise, and the way in. */}
          <div
            data-animate="reveal"
            className="flex flex-col gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-16"
          >
            <p className="text-display max-w-[18ch] text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.1] text-white">
              {footerBlurb}
            </p>

            <Link
              href={finalCta.primaryCta.href}
              className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-pill border border-white/20 py-3 pr-3 pl-6 text-[0.9375rem] font-medium text-white transition-colors duration-300 hover:border-white/40"
            >
              {finalCta.primaryCta.label}
              <span className="bg-brand flex size-9 items-center justify-center rounded-full transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:rotate-45">
                <ArrowRight className="size-4" aria-hidden="true" />
              </span>
            </Link>
          </div>

          {/* Navigation as one ruled row. Each column is a label above its
              links, so nine items read at a glance instead of filling a
              grid with air. */}
          <nav
            aria-label="Footer"
            className="grid gap-x-8 gap-y-10 py-12 sm:grid-cols-2 lg:grid-cols-4"
          >
            {footerNavigation.map((column) => (
              <div
                key={column.title}
                data-animate="reveal"
                className="flex flex-col gap-4"
              >
                <h2 className="text-eyebrow text-white/30">{column.title}</h2>
                <ul className="flex flex-col gap-3">
                  {column.items.map((item) => (
                    <li key={`${column.title}-${item.label}`}>
                      <Link
                        href={item.href}
                        className="group relative inline-flex items-center text-[0.9375rem] text-white/55 transition-colors duration-300 hover:text-white"
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
              </div>
            ))}

            {/* Fourth column: socials and status, so the grid resolves
                evenly instead of leaving a gap. */}
            <div data-animate="reveal" className="flex flex-col gap-4">
              <h2 className="text-eyebrow text-white/30">Follow</h2>

              <ul className="flex gap-2.5">
                {siteConfig.socials.map((social) => (
                  <li key={social.id}>
                    <Link
                      href={social.href}
                      aria-label={social.label}
                      className="flex size-10 items-center justify-center rounded-full border border-white/12 text-white/60 transition-[border-color,background-color,color,transform] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                    >
                      <BrandGlyph name={social.id} className="size-4" inherit />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Baseline */}
          <div className="flex flex-col gap-4 border-t border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.8125rem] text-white/35">
              © {siteConfig.copyrightYear} {siteConfig.name}, Inc.
            </p>

            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {siteConfig.legal.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[0.8125rem] text-white/35 transition-colors duration-300 hover:text-white/75"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>

        {/* The floor: the wordmark, full bleed and clipped by the page
            edge. Decorative — the name is already in the copyright line
            above, so it is hidden from assistive tech. */}
        <p
          aria-hidden="true"
          className="text-display pointer-events-none translate-y-[0] text-center text-[19vw] leading-none font-semibold tracking-[-0.04em] text-white/[0.07] select-none"
        >
          {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
