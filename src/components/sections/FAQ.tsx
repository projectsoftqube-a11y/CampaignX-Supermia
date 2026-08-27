import { Plus } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { withHighlight } from "@/components/ui/Highlight";
import { SectionGlow } from "@/components/ui/SectionGlow";
import { faq } from "@/config/content";

/**
 * FAQ.
 *
 * The page's last section before the closing ask, which is where the
 * remaining objections live — the ones price and security raise but do not
 * fully answer.
 *
 * Built on native <details>/<summary> rather than a JS accordion: it opens
 * without hydration, is keyboard-operable and screen-reader-correct for
 * free, and survives in-page search (browsers open a closed <details> when
 * find-in-page matches inside it). The only thing this costs is an animated
 * height, which is not worth a client component here.
 */
export function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative isolate py-[90px]"
    >
      <SectionGlow position="left" />

      <Container>
        <Reveal stagger={0.06} start="top 82%">
          {/* Heading, centred above the list — matching every other
              section on the page. */}
          <div className="mx-auto flex max-w-[64rem] flex-col items-center gap-5 text-center">
            <Eyebrow data-animate="reveal">{faq.eyebrow}</Eyebrow>

            <h2
              id="faq-heading"
              data-animate="reveal"
              className="text-display max-w-[52rem] text-balance text-[clamp(2rem,4.4vw,3.75rem)]"
            >
              {withHighlight(faq.heading, faq.headingHighlight)}
            </h2>
          </div>

          {/* One column, held to a readable measure so the answers do not
              run the full width of a 1520px rail. */}
          <div className="mx-auto mt-14 max-w-[52rem] sm:mt-16">
            <ul className="flex flex-col">
              {faq.items.map((item) => (
                <li key={item.question} data-animate="reveal">
                  <details className="cx-disclosure group border-b border-line">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                      <h3 className="text-[1.0625rem] font-medium transition-colors duration-300 group-hover:text-accent">
                        {item.question}
                      </h3>

                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-line transition-[transform,border-color,background-color] duration-[var(--dur-base)] ease-[var(--ease-out-soft)] group-hover:border-accent-line group-open:rotate-135 group-open:border-accent-line group-open:bg-brand-soft"
                      >
                        <Plus className="size-3.5 text-muted" strokeWidth={2} />
                      </span>
                    </summary>

                    <p className="max-w-[62ch] pb-6 text-[0.9375rem] leading-relaxed text-muted">
                      {item.answer}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
