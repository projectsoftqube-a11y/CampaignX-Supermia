import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type {
  LegalBlock,
  LegalDocument,
  LegalSpan,
  LegalText,
} from "@/types/legal";

/**
 * The legal pages.
 *
 * Uses the page rail rather than a bare centred column, so these read as
 * part of the site. The width is spent on structure instead of line length:
 * a sticky contents rail on the left, the document held to a readable
 * measure on the right. Nobody reads a privacy policy top to bottom — they
 * arrive from a footer link looking for one clause, and the rail is what
 * makes that quick.
 *
 * The document's own structure is preserved rather than flattened. Tables
 * stay tables, definition lists keep their term/definition pairing, and the
 * all-caps disclaimers are rendered in bordered panels because they are
 * written that way for legal effect.
 *
 * Server-rendered with no motion. Contents links are plain anchors, so they
 * work before hydration and can be copied out of the address bar.
 */
export function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    <main id="main" className="relative isolate">
      {/* ---------------------------------------------------------------
          Masthead
          --------------------------------------------------------------- */}
      <div className="relative overflow-hidden border-b border-line bg-surface-soft/60 pt-32 pb-14 sm:pt-40 sm:pb-16">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="cx-dots absolute inset-0 opacity-50 [mask-image:radial-gradient(75%_70%_at_50%_40%,#000,transparent)]" />
          <div className="absolute -top-[30%] left-[8%] size-[45%] rounded-full bg-[radial-gradient(closest-side,rgba(var(--brand-blue-rgb),0.13),transparent)]" />
          <div className="absolute -right-[6%] -bottom-[40%] size-[45%] rounded-full bg-[radial-gradient(closest-side,rgba(208,0,255,0.09),transparent)]" />
        </div>

        <Container>
          <div className="flex max-w-[44rem] flex-col gap-5">
            <Eyebrow>{doc.eyebrow}</Eyebrow>

            <h1 className="text-display text-balance text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05]">
              {doc.title}
            </h1>

            <p className="max-w-[54ch] text-[1.0625rem] leading-relaxed text-muted">
              {doc.summary}
            </p>

            <div className="flex flex-wrap gap-2">
              <Stamp label="Effective" value={doc.effective} />
              <Stamp label="Last updated" value={doc.updated} />
            </div>
          </div>
        </Container>
      </div>

      {/* ---------------------------------------------------------------
          Contents rail + document
          --------------------------------------------------------------- */}
      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav aria-label="On this page">
              <h2 className="text-eyebrow">On this page</h2>

              {/* Capped and scrollable: twenty sections would otherwise run
                  past the bottom of a laptop viewport, and a sticky rail
                  taller than the screen cannot be scrolled to the end. */}
              <ol className="mt-5 flex max-h-[60vh] flex-col gap-0.5 overflow-y-auto overscroll-contain pr-1">
                {doc.sections.map((section, index) => (
                  <li key={section.heading}>
                    <a
                      href={`#${slug(section.heading)}`}
                      className="group flex gap-3 rounded-[10px] px-3 py-2 text-[0.8125rem] leading-snug text-muted transition-colors duration-200 hover:bg-surface-soft hover:text-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className="shrink-0 tabular-nums text-muted/45 transition-colors duration-200 group-hover:text-accent"
                      >
                        {pad(index + 1)}
                      </span>
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="min-w-0 max-w-[48rem]">
            {doc.intro ? (
              <div className="mb-14 flex flex-col gap-4 border-b border-line pb-14">
                {doc.intro.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            ) : null}

            <div className="flex flex-col gap-14">
              {doc.sections.map((section, index) => (
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
                      {pad(index + 1)}
                    </span>

                    <h2 className="text-display text-[1.375rem] leading-tight">
                      {section.heading}
                    </h2>
                  </div>

                  <div className="mt-5 flex flex-col gap-5 lg:pl-[2.4rem]">
                    {section.blocks?.map((block, i) => (
                      <Block key={i} block={block} />
                    ))}

                    {section.subsections?.map((sub, subIndex) => (
                      <div key={sub.heading} className="flex flex-col gap-4">
                        <h3 className="mt-2 flex gap-2.5 text-[1rem] font-semibold">
                          <span
                            aria-hidden="true"
                            className="shrink-0 tabular-nums text-muted/50"
                          >
                            {index + 1}.{subIndex + 1}
                          </span>
                          {sub.heading}
                        </h3>

                        {sub.blocks.map((block, i) => (
                          <Block key={i} block={block} />
                        ))}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {doc.closing ? (
              <p className="mt-16 border-t border-line pt-8 text-[0.875rem] leading-relaxed text-muted italic">
                {doc.closing}
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </main>
  );
}

/* ------------------------------------------------------------- blocks -- */

function Block({ block }: { block: LegalBlock }) {
  switch (block.kind) {
    case "text":
      return (
        <p className="text-[0.9375rem] leading-relaxed text-muted">
          <Text value={block.value} />
        </p>
      );

    case "list":
      return (
        <ul className="flex flex-col gap-2.5">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted"
            >
              <span
                aria-hidden="true"
                className="bg-brand mt-[0.6em] block size-1 shrink-0 rounded-full"
              />
              <span>
                <Text value={item} />
              </span>
            </li>
          ))}
        </ul>
      );

    case "definitions":
      return (
        <dl className="flex flex-col gap-3 rounded-panel border border-line bg-surface-soft/50 p-5">
          {block.items.map((item) => (
            <div key={item.term} className="text-[0.9375rem] leading-relaxed">
              <dt className="inline font-semibold text-foreground">
                {item.term}
              </dt>{" "}
              <dd className="inline text-muted">{item.definition}</dd>
            </div>
          ))}
        </dl>
      );

    case "table":
      return (
        /* Scrolls rather than wrapping. A three-column table squeezed into
           320px becomes unreadable, and these carry the specifics people
           come to a privacy policy to check. */
        <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[34rem] border-collapse text-left text-[0.875rem]">
            <thead>
              <tr className="border-b border-line-strong">
                {block.headers.map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="py-3 pr-4 align-bottom font-semibold text-foreground last:pr-0"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-line last:border-b-0">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={
                        j === 0
                          ? "py-3 pr-4 align-top font-medium text-foreground last:pr-0"
                          : "py-3 pr-4 align-top leading-relaxed text-muted last:pr-0"
                      }
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "notice":
      return (
        <p className="rounded-panel border border-accent-line bg-brand-soft/40 p-5 text-[0.875rem] leading-relaxed font-medium text-muted-strong">
          <Text value={block.value} />
        </p>
      );
  }
}

/** Renders a string, or spans with emphasis and links. */
function Text({ value }: { value: LegalText }) {
  if (typeof value === "string") return <>{value}</>;

  return (
    <>
      {value.map((span, i) => (
        <Span key={i} span={span} />
      ))}
    </>
  );
}

function Span({ span }: { span: LegalSpan }) {
  if (span.href) {
    const external = span.href.startsWith("http");
    return (
      <Link
        href={span.href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
        className="text-accent underline underline-offset-4 transition-colors duration-200 hover:text-foreground"
      >
        {span.text}
      </Link>
    );
  }

  if (span.bold) {
    return <strong className="font-semibold text-foreground">{span.text}</strong>;
  }

  return <>{span.text}</>;
}

/* ------------------------------------------------------------- pieces -- */

function Stamp({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-3.5 py-1.5 text-[0.8125rem] text-muted">
      <span aria-hidden="true" className="bg-brand block size-1.5 rounded-full" />
      <span className="font-medium text-foreground">{label}</span>
      {value}
    </span>
  );
}

const pad = (n: number): string => String(n).padStart(2, "0");

/** Heading to anchor id. Stable as long as the heading text is. */
function slug(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
