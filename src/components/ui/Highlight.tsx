import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HighlightProps {
  children: ReactNode;
  className?: string;
}

/**
 * Emphasised words inside a heading, set in the hand-drawn display face.
 *
 * Set in Kalam. Use it for a word or two, never a whole heading: the
 * contrast against DM Sans is what carries the emphasis, and it disappears
 * if everything is set the same way.
 *
 * Rendered as a plain <span>, so it inherits the heading's own animation
 * wrapper and never interferes with the line-masking in <AnimatedText />.
 */
export function Highlight({ children, className }: HighlightProps) {
  return (
    <span className={cn("text-highlight", className)}>{children}</span>
  );
}

/**
 * Splits `text` around `word` and sets that word in the highlight face.
 * Returns the text untouched when there is no word, or it is not present,
 * so a typo in config degrades to a plain heading rather than a crash.
 */
export function withHighlight(text: ReactNode, word?: string): ReactNode {
  if (typeof text !== "string" || !word) return text;

  const at = text.indexOf(word);
  if (at < 0) return text;

  return (
    <>
      {text.slice(0, at)}
      <Highlight>{word}</Highlight>
      {text.slice(at + word.length)}
    </>
  );
}
