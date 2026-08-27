import localFont from "next/font/local";

/**
 * Self-hosted fonts. No runtime request to a third-party font CDN, one file
 * per family, and zero layout shift via `display: swap` + fallbacks.
 */

/** Body copy. */
export const sans = localFont({
  src: "./Inter-Variable.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-inter",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
  adjustFontFallback: "Arial",
});

/** Every heading on the page. */
export const display = localFont({
  src: "./DMSans-Variable.woff2",
  weight: "100 1000",
  style: "normal",
  display: "swap",
  variable: "--font-display-sans",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
  adjustFontFallback: "Arial",
});

/**
 * Highlighted words inside a heading. Two weights, so the highlight can
 * track the weight of the heading it sits in; a display face used a few
 * words at a time, never for body copy or a whole heading.
 */
export const highlight = localFont({
  src: [
    { path: "./Kalam-Regular.woff2", weight: "400", style: "normal" },
    { path: "./Kalam-Bold.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-highlight-hand",
  fallback: ["Comic Sans MS", "ui-rounded", "cursive"],
  adjustFontFallback: false,
});
