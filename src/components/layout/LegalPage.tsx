import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export interface LegalSection {
  readonly heading: string;
  /** Each entry is one paragraph. */
  readonly body: readonly string[];
  /** Optional bulleted list, rendered after the paragraphs. */
  readonly list?: readonly string[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  /** One-line summary under the title. */
  summary: string;
  /** Absolute date, so it never drifts as "recently updated" would. */
  updated: string;
  sections: readonly LegalSection[];
  /** Anything to close with, after the numbered sections. */
  footer?: ReactNode;
}

/**
 * Shared shell for the legal pages.
 *
 * Uses the page rail rather than a bare centred column, so these read as
 * part of the site rather than as a document someone pasted into it. The
 * width is then spent on structure instead of line length: a sticky
 * contents rail on the left, and the text held to a readable measure on the
 * right. Nobody reads a privacy policy top to bottom — they arrive from a
 * footer link looking for one clause, and the rail is what makes that
 * quick.
 *
 * Server-rendered with no motion. Contents links are plain anchors, so they
 * work before hydration and can be copied out of the address bar.
 */
export function LegalPage({
  eyebrow,
  title,
  summary,
  updated,
  sections,
  footer,
}: LegalPageProps) {
  return (
    <main id="main" className="relative isolate">
      {/* ---------------------------------------------------------------
          Masthead. Given its own tinted band so the page opens on
          something, rather than on body text under a fixed header.
          --------------------------------------------------------------- */}
      <div className="relative overflow-hidden border-b border-line bg-surface-soft/60 pt-32 pb-14 sm:pt-40 sm:pb-16">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="cx-dots absolute inset-0 opacity-50 [mask-image:radial-gradient(75%_70%_at_50%_40%,#000,transparent)]" />
          <div className="absolute -top-[30%] left-[8%] size-[45%] rounded-full bg-[radial-gradient(closest-side,rgba(var(--brand-blue-rgb),0.13),transparent)]" />
          <div className="absolute -right-[6%] -bottom-[40%] size-[45%] rounded-full bg-[radial-gradient(closest-side,rgba(208,0,255,0.09),transparent)]" />
        </div>

        <Container>
          <div className="flex max-w-[42rem] flex-col gap-5">
            <Eyebrow>{eyebrow}</Eyebrow>

            <h1 className="text-display text-balance text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05]">
              {title}
            </h1>

            <p className="max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted">
              {summary}
            </p>

            <p className="inline-flex w-fit items-center gap-2 rounded-pill border border-line bg-surface px-3.5 py-1.5 text-[0.8125rem] text-muted">
              <span
                aria-hidden="true"
                className="bg-brand block size-1.5 rounded-full"
              />
              Last updated {updated}
            </p>
          </div>
        </Container>
      </div>

      {/* ---------------------------------------------------------------
          Body: contents rail + the document.
          --------------------------------------------------------------- */}
      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
          {/* Contents. Sticky on desktop so it stays available the whole
              way down; a plain block on mobile, where a sticky rail would
              eat a third of the screen. */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav aria-label="On this page">
              <h2 className="text-eyebrow">On this page</h2>

              <ol className="mt-5 flex flex-col gap-1">
                {sections.map((section, index) => (
                  <li key={section.heading}>
                    <a
                      href={`#${slug(section.heading)}`}
                      className="group flex gap-3 rounded-[10px] px-3 py-2 text-[0.875rem] leading-snug text-muted transition-colors duration-200 hover:bg-surface-soft hover:text-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className="shrink-0 tabular-nums text-muted/45 transition-colors duration-200 group-hover:text-accent"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          {/* The document. Held to a measure regardless of how wide the
              rail gets: legal text at 1200px is unreadable. */}
          <div className="min-w-0 max-w-[46rem]">
            <div className="flex flex-col gap-14">
              {sections.map((section, index) => (
                <section
                  key={section.heading}
                  id={slug(section.heading)}
                  /* Cleared so an anchor jump does not tuck the heading
                     under the fixed header. */
                  className="scroll-mt-28"
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      aria-hidden="true"
                      className="text-accent shrink-0 text-[0.8125rem] font-semibold tabular-nums"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h2 className="text-display text-[1.375rem] leading-tight">
                      {section.heading}
                    </h2>
                  </div>

                  <div className="mt-4 flex flex-col gap-4 lg:pl-[2.4rem]">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-[0.9375rem] leading-relaxed text-muted"
                      >
                        {paragraph}
                      </p>
                    ))}

                    {section.list ? (
                      <ul className="mt-1 flex flex-col gap-3 rounded-panel border border-line bg-surface-soft/50 p-5">
                        {section.list.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted"
                          >
                            <span
                              aria-hidden="true"
                              className="bg-brand mt-[0.6em] block size-1 shrink-0 rounded-full"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </section>
              ))}
            </div>

            {footer ? (
              <div className="mt-16 rounded-frame border border-accent-line bg-brand-soft/40 p-6 text-[0.9375rem] leading-relaxed text-muted-strong sm:p-8">
                {footer}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </main>
  );
}

/** Heading to anchor id. Stable as long as the heading text is. */
function slug(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
