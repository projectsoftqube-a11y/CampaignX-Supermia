/**
 * Shapes for the legal pages.
 *
 * These documents are not prose with headings — they carry numbered
 * subsections, definition lists, comparison tables and blocks that must be
 * reproduced verbatim (the all-caps disclaimers are written that way for
 * legal effect, not for emphasis). Flattening them into paragraphs would
 * change what the document says, so each of those forms gets its own block
 * type and the renderer handles them separately.
 */

/** A run of text that may carry emphasis or a link. */
export interface LegalSpan {
  readonly text: string;
  /** Renders in the foreground colour at semibold. */
  readonly bold?: boolean;
  /** Makes the run a link. External URLs open in a new tab. */
  readonly href?: string;
}

/** A paragraph is a plain string, or spans when it needs emphasis. */
export type LegalText = string | readonly LegalSpan[];

export type LegalBlock =
  | { readonly kind: "text"; readonly value: LegalText }
  /** Bulleted list. */
  | { readonly kind: "list"; readonly items: readonly LegalText[] }
  /**
   * Definition list — a bolded term followed by its meaning. Used for the
   * "Definitions" sections, where a bulleted list would lose the pairing.
   */
  | {
      readonly kind: "definitions";
      readonly items: readonly { readonly term: string; readonly definition: string }[];
    }
  /**
   * A table. Scrolls horizontally on narrow screens rather than wrapping
   * into an unreadable grid.
   */
  | {
      readonly kind: "table";
      readonly headers: readonly string[];
      readonly rows: readonly (readonly string[])[];
    }
  /**
   * A block that must stand out as legally operative: the "AS IS"
   * disclaimer, the liability cap, the class action waiver. Rendered in a
   * bordered panel so it cannot be mistaken for ordinary body copy.
   */
  | { readonly kind: "notice"; readonly value: LegalText };

/** A numbered subsection, e.g. "3.1 Information You Provide Directly". */
export interface LegalSubsection {
  readonly heading: string;
  readonly blocks: readonly LegalBlock[];
}

/** A top-level numbered section. */
export interface LegalSection {
  readonly heading: string;
  /** Blocks that sit directly under the section heading. */
  readonly blocks?: readonly LegalBlock[];
  /** Numbered subsections beneath it. */
  readonly subsections?: readonly LegalSubsection[];
}

export interface LegalDocument {
  readonly eyebrow: string;
  readonly title: string;
  readonly summary: string;
  readonly effective: string;
  readonly updated: string;
  readonly intro?: readonly LegalBlock[];
  readonly sections: readonly LegalSection[];
  /** The closing italic note, if the document has one. */
  readonly closing?: string;
}
