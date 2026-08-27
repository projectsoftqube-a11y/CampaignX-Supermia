/** Breakpoints mirror the Tailwind defaults used across the app. */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
} as const;

export const MEDIA = {
  mobile: `(max-width: ${BREAKPOINTS.md - 1}px)`,
  tablet: `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.xl - 1}px)`,
  desktop: `(min-width: ${BREAKPOINTS.xl}px)`,
  reducedMotion: "(prefers-reduced-motion: reduce)",
  hover: "(hover: hover) and (pointer: fine)",
} as const;

/** Anchor targets. Kept here so nav config and sections can never drift apart. */
export const SECTION_IDS = {
  hero: "hero",
  how: "how",
  gallery: "gallery",
  pricing: "pricing",
  start: "start",
} as const;

export const HEADER_SCROLL_THRESHOLD = 24;
