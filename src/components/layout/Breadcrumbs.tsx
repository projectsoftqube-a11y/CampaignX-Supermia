import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { BreadcrumbStep } from "@/lib/schema";

interface BreadcrumbsProps {
  /** Ancestors and the current page, in order. Home is prepended here. */
  steps: readonly BreadcrumbStep[];
}

/**
 * Visible breadcrumb trail (Navigation Spec §7).
 *
 * The matching BreadcrumbList JSON-LD is emitted by the page's schema
 * graph, not here — Google wants the markup to describe a trail the visitor
 * can actually see, so the two are built from the same `steps` array.
 *
 * The last item is the current page: rendered as plain text with
 * `aria-current`, because a link to the page you are on is a dead end for
 * screen reader and keyboard users alike.
 */
export function Breadcrumbs({ steps }: BreadcrumbsProps) {
  const trail = [{ name: "Home", href: "/" }, ...steps];

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[0.875rem] text-muted">
        {trail.map((step, index) => {
          const last = index === trail.length - 1;

          return (
            <li key={step.href} className="flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-muted/60"
                />
              ) : null}

              {last ? (
                <span aria-current="page" className="text-muted-strong">
                  {step.name}
                </span>
              ) : (
                <Link
                  href={step.href}
                  className="rounded-sm transition-colors duration-200 hover:text-foreground"
                >
                  {step.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
