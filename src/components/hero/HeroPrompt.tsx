import Link from "next/link";
import { ArrowUpRight, Paperclip, Sparkles } from "lucide-react";
import { hero } from "@/config/content";

/**
 * The floating prompt bar — the focal point of the hero.
 *
 * Presentation only: it *looks* like an input but is a link, so there is no
 * dead text field promising something the page cannot deliver. The brief
 * inside it is typed by GSAP (see lib/animations/hero.ts) into
 * `[data-hero-typed]`, with `[data-hero-caret]` glued to the last glyph.
 *
 * Server-rendered with the placeholder visible, so no-JS visitors see a
 * complete, sensible bar rather than an empty one.
 */
export function HeroPrompt() {
  return (
    <div data-hero-prompt className="w-full">
      <Link
        href={hero.primaryCta.href}
        aria-label={`${hero.prompt.action} a campaign`}
        className="group glass-strong glass-sheen block rounded-[1.75rem] p-1.5 shadow-float transition-shadow duration-500 ease-[var(--ease-out-soft)] hover:shadow-cinema focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <div className="rounded-[1.4rem] bg-white/70 px-5 pt-5 pb-3.5 sm:px-6">
          {/* Brief line. Every brief in content is written to fill two lines,
              and min-h reserves exactly that much, so the bar keeps a fixed
              height while the text types itself in and clears again.
              Three lines on the narrowest screens, where two won't fit. */}
          <p className="flex min-h-[4.5rem] items-start text-left text-[0.9375rem] leading-[1.6] text-foreground sm:min-h-[3.25rem] sm:text-base">
            {/* Deliberately not `text-balance`: it re-wraps on every frame as
                characters arrive, so words visibly jump between lines while
                typing. Plain wrapping keeps each line settled once written. */}
            <span>
              <span data-hero-typed />
              <span
                data-hero-caret
                aria-hidden="true"
                className="bg-brand ml-px inline-block h-[1.05em] w-[2px] translate-y-[0.18em] align-baseline"
              />
              {/* Visible only before the typing starts, and for no-JS. */}
              <span data-hero-placeholder className="text-muted">
                {hero.prompt.placeholder}
              </span>
            </span>
          </p>

          <div className="mt-2 flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-muted">
              <span className="flex size-8 items-center justify-center rounded-full border border-line bg-white/80 transition-colors duration-300 group-hover:border-line-strong">
                <Paperclip className="size-3.5" aria-hidden="true" />
              </span>
              <span className="hidden text-[0.8125rem] sm:inline">
                {hero.prompt.hint}
              </span>
            </span>

            <span className="bg-brand shadow-brand inline-flex h-10 items-center gap-2 rounded-pill pr-3.5 pl-4 text-[0.9375rem] font-medium text-white transition-[box-shadow,filter] duration-200 ease-[var(--ease-out-soft)] group-hover:brightness-[1.07] group-hover:shadow-brand-hover">
              <Sparkles className="size-3.5" aria-hidden="true" />
              {hero.prompt.action}
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
