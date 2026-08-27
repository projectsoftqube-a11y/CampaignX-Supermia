import { AnimatedText } from "@/components/ui/AnimatedText";
import { withHighlight } from "@/components/ui/Highlight";
import { hero } from "@/config/content";

/** Each headline line, with its marked word set in the highlight face. */
const HEADLINE = hero.headline.map((line) =>
  withHighlight(line.text, line.highlight),
);

/** Static hero copy. GSAP animates it via data attributes from <Hero />. */
export function HeroContent() {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-display text-[clamp(2.375rem,6vw,5.75rem)]">
        <AnimatedText lines={HEADLINE} />
      </h1>

      <p
        data-hero-supporting
        className="mt-5 max-w-[56ch] text-[clamp(1rem,1.3vw,1.125rem)] leading-[1.65] text-muted"
      >
        {hero.supporting}
      </p>
    </div>
  );
}
