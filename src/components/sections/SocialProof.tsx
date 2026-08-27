import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { BrandGlyph } from "@/components/ui/BrandGlyph";
import { Highlight } from "@/components/ui/Highlight";
import { socialProof } from "@/config/content";

/**
 * The channel band.
 *
 * A single brief on the left, an always-moving rail of destination platforms
 * on the right — the section states the product's core claim as a picture
 * rather than as a list of logos.
 *
 * The rail is CSS-driven rather than GSAP: it must run forever, and a
 * keyframe animation costs nothing per frame on the main thread, keeps
 * running while JS is busy, and stops for `prefers-reduced-motion` through
 * the existing block in animations.css.
 *
 * The track is rendered twice. The animation translates it by exactly -50%,
 * so the second copy lands precisely where the first began and the loop has
 * no visible seam.
 */
export function SocialProof() {
  const { statement, platforms } = socialProof;

  return (
    <section
      id="channels"
      aria-labelledby="channels-heading"
      className="relative pb-6"
    >
      <Container>
        <FadeIn className="glass-quiet glass-sheen overflow-hidden rounded-panel">
          <div className="grid items-center gap-6 px-6 py-7 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-8 lg:px-9">
            {/* The claim. */}
            <div className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-left">
              <h2
                id="channels-heading"
                className="text-display text-[clamp(1.375rem,2.2vw,1.75rem)] leading-[1.25]"
              >
                One brief. <Highlight>every</Highlight> channel.
              </h2>
              <p className="max-w-[38ch] text-[0.875rem] leading-relaxed text-muted">
                {statement}
              </p>
            </div>

            {/* The destinations, always in motion. */}
            <div
              className="cx-marquee mask-fade-edges relative flex overflow-hidden py-2 [--marquee-duration:32s]"
              aria-hidden="true"
            >
              <ul className="cx-marquee-track flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4">
                {[...platforms, ...platforms].map((platform, index) => (
                  <li
                    key={`${platform.id}-${index}`}
                    className="group flex shrink-0 items-center gap-2.5 rounded-pill border border-line bg-surface/85 py-2 pr-4 pl-2 transition-[border-color,box-shadow] duration-300 ease-[var(--ease-out-soft)] hover:border-line-strong hover:shadow-raise"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white shadow-soft">
                      <BrandGlyph name={platform.id} className="size-[17px]" />
                    </span>
                    <span className="text-[0.875rem] font-medium whitespace-nowrap">
                      {platform.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* The rail is decorative, so the platform names are repeated
                here for assistive tech — once, in a stable order. */}
            <ul className="sr-only">
              {platforms.map((platform) => (
                <li key={platform.id}>{platform.name}</li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
