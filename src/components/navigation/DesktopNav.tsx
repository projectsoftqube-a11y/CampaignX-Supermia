"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { navGroups, navLinks } from "@/config/navigation";
import { ArrowUpRight, NavIcon } from "@/components/navigation/NavIcon";
import { cn } from "@/lib/utils";

/**
 * Primary desktop menu: four dropdowns plus Pricing (Navigation Spec §4).
 *
 * Opens on hover and on focus, because hover alone is unreachable by
 * keyboard. A short close delay keeps the panel open while the pointer
 * crosses the gap between the trigger and the panel — without it the menu
 * snaps shut mid-travel. Escape closes and returns focus to the trigger.
 */

function DesktopNavMenu() {
  const [open, setOpen] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);
  const pathname = usePathname();


  const cancelClose = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(null), 140);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isCurrent = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-0.5">
        {navGroups.map((group) => {
          const expanded = open === group.label;
          const active = group.items.some((item) => isCurrent(item.href));

          return (
            <li
              key={group.label}
              className="relative"
              onMouseEnter={() => {
                cancelClose();
                setOpen(group.label);
              }}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                aria-expanded={expanded}
                aria-haspopup="true"
                onClick={() => setOpen(expanded ? null : group.label)}
                onFocus={() => {
                  cancelClose();
                  setOpen(group.label);
                }}
                className={cn(
                  "group relative inline-flex h-9 items-center gap-1 rounded-pill px-3.5 text-[0.9375rem] transition-colors duration-300",
                  active || expanded
                    ? "text-foreground"
                    : "text-muted-strong hover:text-foreground",
                )}
              >
                {group.label}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "size-3.5 transition-transform duration-300 ease-[var(--ease-out-soft)]",
                    expanded && "rotate-180",
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "bg-brand pointer-events-none absolute inset-x-3.5 bottom-1.5 h-[1.5px] origin-left rounded-full transition-transform duration-400 ease-[var(--ease-out-soft)]",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </button>

              {/* The panel.

                  A plain list, sized to its own content. Earlier versions
                  had a promo rail beside the links, which meant a menu
                  with three items left most of the panel empty — the
                  rail's height was fixed by its own copy, not by the
                  list. With one column and no second region there is
                  nothing left to leave blank, whatever the item count.

                  Solid surface, not glass: a blurred translucent sheet
                  over a light page reads as washed out. */}
              <div
                className={cn(
                  "absolute left-0 top-[calc(100%+0.625rem)] w-[23rem] transition-[opacity,transform] duration-200 ease-[var(--ease-out-soft)]",
                  expanded
                    ? "visible translate-y-0 opacity-100"
                    : "pointer-events-none invisible -translate-y-1 opacity-0",
                )}
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
              >
                <div className="overflow-hidden rounded-panel border border-line bg-surface p-1.5 shadow-float">
                  {group.items.map((item) => {
                    const current = isCurrent(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        tabIndex={expanded ? 0 : -1}
                        aria-current={current ? "page" : undefined}
                        className={cn(
                          "group/item relative flex items-center gap-3 rounded-card px-2.5 py-2.5",
                          "transition-[background-color,transform] duration-200 ease-[var(--ease-out-soft)]",
                          /* A small nudge toward the reading direction,
                             so hover is felt as well as seen. */
                          "hover:translate-x-0.5",
                          current ? "bg-accent-soft" : "hover:bg-surface-soft",
                        )}
                      >
                        {/* A brand rule that grows down the left edge.
                            It sits in the row's own padding so nothing
                            shifts when it appears. */}
                        <span
                          aria-hidden="true"
                          className={cn(
                            "bg-brand absolute left-0 top-1/2 w-[2px] -translate-y-1/2 rounded-full transition-[height] duration-200 ease-[var(--ease-out-soft)]",
                            current
                              ? "h-5"
                              : "h-0 group-hover/item:h-5",
                          )}
                        />
                        <NavIcon
                          name={item.icon}
                          active={current}
                          className="transition-[border-color,background-color,color,transform] duration-200 ease-[var(--ease-out-soft)] group-hover/item:border-accent-line group-hover/item:bg-accent-soft group-hover/item:text-accent"
                        />

                        <span className="min-w-0 flex-1 pr-5">
                          <span
                            className={cn(
                              "block text-[0.875rem] font-medium leading-tight transition-colors duration-200",
                              current
                                ? "text-accent"
                                : "text-foreground group-hover/item:text-accent",
                            )}
                          >
                            {item.label}
                          </span>
                          {item.description ? (
                            <span className="mt-1 block text-[0.875rem] leading-snug text-muted">
                              {item.description}
                            </span>
                          ) : null}
                        </span>

                        <ArrowUpRight
                          aria-hidden="true"
                          className="absolute right-2.5 top-3 size-3.5 -translate-x-1 text-accent opacity-0 transition-[opacity,transform] duration-200 ease-[var(--ease-out-soft)] group-hover/item:translate-x-0 group-hover/item:opacity-100"
                        />
                      </Link>
                    );
                  })}

                  {group.href ? (
                    <Link
                      href={group.href}
                      tabIndex={expanded ? 0 : -1}
                      className="group/all mt-1.5 flex items-center justify-between rounded-card border-t border-line px-2.5 pb-2.5 pt-3 text-[0.875rem] font-medium text-accent transition-colors duration-200 hover:bg-accent-soft"
                    >
                      All {group.label.toLowerCase()}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3.5 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5"
                      />
                    </Link>
                  ) : null}
                </div>
              </div>

            </li>
          );
        })}

        {navLinks.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              className={cn(
                "group relative inline-flex h-9 items-center rounded-pill px-3.5 text-[0.9375rem] transition-colors duration-300",
                isCurrent(item.href)
                  ? "text-foreground"
                  : "text-muted-strong hover:text-foreground",
              )}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={cn(
                  "bg-brand pointer-events-none absolute inset-x-3.5 bottom-1.5 h-[1.5px] origin-left rounded-full transition-transform duration-400 ease-[var(--ease-out-soft)] group-hover:scale-x-100",
                  isCurrent(item.href) ? "scale-x-100" : "scale-x-0",
                )}
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Keyed on the current path so React discards the menu's state on
 * navigation. A click that navigates leaves the pointer sitting over a
 * dropdown that is no longer relevant; remounting closes it without an
 * effect and without a second render pass.
 */
export function DesktopNav() {
  const pathname = usePathname();
  return <DesktopNavMenu key={pathname} />;
}
