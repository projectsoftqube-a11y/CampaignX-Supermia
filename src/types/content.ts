import type { IconName } from "./common";

/** A phone mockup below the hero prompt bar. */
export interface HeroChannel {
  /** Channel name, shown under the device. */
  readonly name: string;
  /** Short label for what this channel received. */
  readonly output: string;
  readonly icon: IconName;
  /** Which brand mark to show on the caption card. */
  readonly platform: PlatformName;
  /** Portrait clip. Absent until a real file is dropped in. */
  readonly src?: string;
  readonly poster?: string;
  /** Chooses which animated placeholder UI renders inside the screen. */
  readonly mock: "story" | "chat" | "email";
}

/** Platforms CampaignX publishes to. Keys map to marks in <BrandGlyph />. */
export type PlatformName =
  | "instagram"
  | "facebook"
  | "linkedin"
  | "email"
  | "sms"
  | "x"
  | "google";

export interface Platform {
  readonly id: PlatformName;
  readonly name: string;
}

/** One step in the "How it works" rail. */
export interface HowStep {
  /** Two-digit ordinal, shown on the card. */
  readonly step: string;
  readonly title: string;
  readonly description: string;
  /**
   * A 4:3 illustration for this step. Optional so the section still renders
   * while only some images exist; a step without one shows copy alone.
   */
  readonly image?: string;
  /** Three short proof points under the copy. */
  readonly points: readonly string[];
  /** A single headline figure for the step, with its own label. */
  readonly stat: { readonly value: string; readonly label: string };
  /** One closing line that says what the step means for the reader. */
  readonly takeaway: string;
}

/**
 * One stage of shipping a campaign, shown on both timelines so the two can
 * be read against each other line for line.
 */
export interface CampaignStage {
  readonly role: string;
  /** Before: the tool this stage happens in. */
  readonly tool: string;
  /** Before: elapsed days, as displayed. */
  readonly days: string;
  /**
   * Before: elapsed days as a number. The timeline sizes each block by this
   * rather than parsing `days`, so copy like "a week" cannot silently break
   * the geometry.
   */
  readonly dayCount: number;
  /** Before: what the handoff out of this stage costs. */
  readonly loss: string;
  /** After: elapsed time in CampaignX. */
  readonly time: string;
  /**
   * After: elapsed minutes as a number, for the compressed track. Zero means
   * "no elapsed time at all" — the continuous stages, like live reporting.
   */
  readonly minuteCount: number;
  /** After: what happens instead. */
  readonly instead: string;
  /**
   * The handoff *out* of this stage — the wait between finishing here and
   * starting the next stage. Absent on the last stage, which hands off to
   * nothing. This is the "three handoffs" the totals refer to.
   */
  readonly handoff?: string;
}

/** One pricing tier. */
export interface PricingPlan {
  readonly name: string;
  readonly summary: string;
  /** Null renders as "Custom" — used for the contact-us tier. */
  readonly monthly: number | null;
  readonly priceNote: string;
  readonly cta: string;
  readonly featured: boolean;
  readonly features: readonly string[];
}

/** One question and answer. */
export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

/** One customer quote. */
export interface Testimonial {
  readonly quote: string;
  readonly name: string;
  readonly role: string;
  readonly company: string;
}
