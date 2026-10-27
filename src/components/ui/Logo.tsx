import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

/** Intrinsic size of the artwork, used to reserve layout space. */
const LOGO = {
  src: "/logos/campaignx-logo-dark.png",
  width: 400,
  height: 95,
} as const;

interface LogoProps {
  className?: string;
  /**
   * Reserved for a mark-only lockup. The supplied artwork is a full
   * wordmark, so until a separate mark exists this renders the same image.
   */
  markOnly?: boolean;
}

/**
 * The CampaignX wordmark.
 *
 * Served through next/image so the browser gets an AVIF/WebP at the size it
 * actually renders, rather than the full PNG. `sizes` is set because
 * without it next/image assumes the intrinsic width and generates 1920w and
 * 3840w candidates for something displayed around 120px wide.
 */
export function Logo({ className, markOnly = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src={LOGO.src}
        alt={siteConfig.name}
        width={LOGO.width}
        height={LOGO.height}
        /* Above the fold in the header, so it should not wait on the
           lazy-load observer. */
        priority
        sizes="200px"
        /* Height drives the size and `w-auto` keeps the 400x95 ratio, so
           the wordmark never distorts. Capped at 40px because the header
           rail is 64px tall and the mark needs breathing room inside it.

           `max-w-full` matters: `w-auto` resolves against the 400px
           intrinsic width, so in the window before the height rule
           takes effect the mark lays out at 400px and briefly pushes
           the header past a 320px viewport. The cap makes that
           impossible rather than merely unlikely. */
        className={cn(
          "h-9 w-auto max-w-full shrink-0 object-contain object-left sm:h-10",
          markOnly && "aspect-square",
        )}
      />
    </span>
  );
}
