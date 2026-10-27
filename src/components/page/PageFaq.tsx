"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/lib/schema";

interface PageFaqProps {
  items: readonly FaqItem[];
}

/**
 * Visible FAQ list.
 *
 * Important: this component renders **no** FAQPage markup. Per the content
 * package, FAQPage structured data lives on /faq alone; every other page
 * may show questions but must not mark them up, or the pages compete for
 * the same rich result. The /faq route adds the markup itself.
 *
 * The panel animates on `grid-template-rows` rather than `height: auto`,
 * which is not animatable — this keeps the open/close smooth without
 * measuring the content in JavaScript.
 */
export function PageFaq({ items }: PageFaqProps) {
  /* An accordion, not a set of independent toggles: exactly one answer
     is open at any time, and clicking the open row does nothing rather
     than collapsing it. A list that can end up entirely closed leaves a
     column of bare questions and a block of empty space, which is what
     this previously did. */
  const [open, setOpen] = useState(0);

  return (
    <ul className="space-y-1">
      {items.map((item, index) => (
        <Row
          key={item.question}
          item={item}
          open={open === index}
          onToggle={() => setOpen(index)}
        />
      ))}
    </ul>
  );
}

function Row({
  item,
  open,
  onToggle,
}: {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
}) {
  /* useId gives a stable, collision-free id that matches between the
     server and client render, which a slug built from the question text
     cannot guarantee once two questions start with the same words. */
  const panelId = useId();

  return (
    <li
      data-animate="reveal"
      className={cn(
        "rounded-panel border transition-colors duration-300",
        open
          ? "border-line bg-surface shadow-soft"
          : "border-transparent hover:bg-surface/60",
      )}
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className={cn(
            "group flex w-full items-start justify-between gap-4 text-left sm:gap-6",
            /* The ring is for keyboard users; a mouse click should not
               box the row. `focus-visible` alone still fired here, so
               the outline is suppressed and re-applied explicitly. */
            "rounded-panel outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            open ? "px-5 pb-3 pt-5" : "px-5 py-4",
          )}
        >
          <span
            className={cn(
              "max-w-[52rem] text-[1.0625rem] font-medium leading-snug transition-colors duration-200",
              open ? "text-foreground" : "text-foreground/85 group-hover:text-foreground",
            )}
          >
            {item.question}
          </span>

          {/* A filled disc on the open row rather than a bare dot: at
              2px the dot read as a stray mark, and the marker has to
              hold its own against a question set at 17px. There is no
              close affordance because one answer is always showing. */}
          <span
            aria-hidden="true"
            className={cn(
              "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full transition-colors duration-200",
              open
                ? "bg-accent text-white"
                : "border border-line text-muted group-hover:border-accent-line group-hover:text-accent",
            )}
          >
            {open ? (
              <span className="h-[1.5px] w-2.5 rounded-full bg-current" />
            ) : (
              <Plus className="size-3.5" />
            )}
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-400 ease-[var(--ease-out-soft)]",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <p className="max-w-[52rem] px-5 pb-5 text-[0.9375rem] leading-relaxed text-muted-strong">
            {item.answer}
          </p>
        </div>
      </div>
    </li>
  );
}
