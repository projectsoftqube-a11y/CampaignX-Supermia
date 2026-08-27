"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, BookOpenCheck, Download, FileText, Share2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { withHighlight } from "@/components/ui/Highlight";
import { brochure } from "@/config/content";
import { gsap, registerGsap } from "@/lib/animations/gsap";
import { revealOnScroll } from "@/lib/animations/reveal";

/** Icon per fact. Keeps the content config free of React imports. */
const FACT_ICONS = {
  pages: FileText,
  file: Download,
  open: Share2,
} as const;

/**
 * The brochure.
 *
 * Aimed at a different reader than everything above it: the person who has
 * to take this to someone who was not on the call. That is a document, not
 * a page — so the section's whole job is to hand one over without ceremony,
 * and it is deliberately short.
 *
 * The cover is drawn, not photographed. A render of page one would have to
 * be regenerated every time the PDF changes and would sit at whatever
 * quality the export happened to produce; a card built from the same tokens
 * as the rest of the site is always sharp, always on-brand, and costs no
 * asset. Two stacked panels behind it give it the thickness of a real
 * document rather than a flat rectangle.
 */
export function Brochure() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      revealOnScroll(root, { stagger: 0.09, start: "top 82%" });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="brochure"
      aria-labelledby="brochure-heading"
      className="relative isolate py-[70px] sm:py-[80px]"
    >
      <Container>
        <div ref={rootRef}>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            {/* ---------------- The cover ---------------- */}
            <div
              data-animate="reveal"
              className="order-2 flex justify-center lg:order-1"
            >
              <div className="relative w-[210px] sm:w-[240px]">
                {/* Pages behind, fanned slightly — the document has depth. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-3 translate-y-2 rotate-[5deg] rounded-[18px] border border-line bg-surface/70"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-1.5 translate-y-1 rotate-[2.5deg] rounded-[18px] border border-line bg-surface"
                />

                {/* The cover itself. */}
                <div className="bg-brand relative flex aspect-[3/4] w-full -rotate-[3deg] flex-col items-center justify-center gap-4 overflow-hidden rounded-[18px] px-6 shadow-cinema">
                  {/* A light in the corner so the panel is not flat ink. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-1/3 -right-1/4 block size-[80%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.30),transparent)]"
                  />

                  <BookOpenCheck
                    className="relative size-8 text-white/90"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />

                  <span className="relative flex flex-col items-center gap-0.5">
                    <span className="text-display text-[1.375rem] leading-none text-white">
                      {brochure.cover.title}
                    </span>
                    {/* Not `text-highlight`: that utility paints a brand
                        gradient and clips it to the glyphs, which is
                        invisible against a brand-gradient background. The
                        hand-drawn face is kept, the fill is plain white. */}
                    <span className="font-highlight text-[1.375rem] leading-tight font-bold text-white">
                      {brochure.cover.subtitle}
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    className="relative h-px w-10 bg-white/25"
                  />

                  <span className="relative text-[0.625rem] font-medium tracking-[0.18em] text-white/70">
                    {brochure.cover.footnote}
                  </span>
                </div>
              </div>
            </div>

            {/* ---------------- The ask ---------------- */}
            <div className="order-1 flex flex-col gap-5 lg:order-2">
              <Eyebrow data-animate="reveal">{brochure.eyebrow}</Eyebrow>

              <h2
                id="brochure-heading"
                data-animate="reveal"
                className="text-display max-w-[18ch] text-balance text-[clamp(1.875rem,3.6vw,3rem)] leading-[1.1]"
              >
                {withHighlight(brochure.heading, brochure.headingHighlight)}
              </h2>

              <p
                data-animate="reveal"
                className="max-w-[54ch] text-[1.0625rem] leading-relaxed text-muted"
              >
                {brochure.supporting}
              </p>

              <div
                data-animate="reveal"
                className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                {/* `download` asks the browser to save rather than open the
                    PDF in a tab, and names the saved file. */}
                <a
                  href={brochure.file}
                  download={brochure.fileName}
                  className="bg-brand shadow-brand group inline-flex h-13 items-center justify-center gap-2.5 rounded-pill px-7 text-[0.9375rem] font-medium text-white transition-[box-shadow,transform,filter] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:brightness-[1.07] hover:shadow-brand-hover"
                >
                  {brochure.cta}
                  <Download className="size-4" aria-hidden="true" />
                </a>

                {/* No `download`, so this one opens in the browser's own
                    PDF viewer — the difference between the two buttons. */}
                <a
                  href={brochure.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-13 items-center justify-center gap-2 rounded-pill border border-line bg-surface px-7 text-[0.9375rem] font-medium transition-[border-color,background-color] duration-300 hover:border-line-strong hover:bg-white"
                >
                  {brochure.secondaryCta}
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>

              {/* The facts, under a rule. Stated before the click: a 5MB
                  download on mobile data is worth knowing about first. */}
              <ul
                data-animate="reveal"
                className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5"
              >
                {brochure.facts.map((fact) => {
                  const Icon = FACT_ICONS[fact.kind];
                  return (
                    <li
                      key={fact.label}
                      className="inline-flex items-center gap-2 text-[0.8125rem] text-muted"
                    >
                      <Icon
                        className="text-accent size-3.5 shrink-0"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      {fact.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
