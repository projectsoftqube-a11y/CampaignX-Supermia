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
    <ul className="divide-y divide-line">
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
    <li data-animate="reveal">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="group flex w-full items-start justify-between gap-4 py-5 text-left sm:gap-6"
        >
          <span
            className={cn(
              "text-[1.0625rem] font-medium leading-snug transition-colors duration-200",
              open ? "text-foreground" : "text-foreground/85 group-hover:text-foreground",
            )}
          >
            {item.question}
          </span>

          {/* The open row is the current one, so its marker is a filled
              dot rather than a close affordance — there is nothing to
              close, because one answer is always showing. */}
          <span
            aria-hidden="true"
            className="mt-1 flex size-4 shrink-0 items-center justify-center"
          >
            {open ? (
              <span className="bg-brand size-2 rounded-full" />
            ) : (
              <Plus className="size-4 text-muted transition-colors duration-200 group-hover:text-foreground" />
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
          <p className="max-w-[46rem] pb-6 text-[0.9375rem] leading-relaxed text-muted-strong">
            {item.answer}
          </p>
        </div>
      </div>
    </li>
  );
}
