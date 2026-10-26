"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { searchCountries, type Country } from "@/lib/countries";

type Props = {
  value: Country;
  onChange: (country: Country) => void;
  disabled?: boolean;
  /** id of the element labelling this control. */
  labelledBy?: string;
};

/**
 * Searchable country dialling code picker.
 *
 * A native <select> cannot be typed into beyond first-letter matching, so this
 * is a listbox with a filter field. The chosen country drives the phone
 * placeholder in the parent form.
 */
export function CountryCodeSelect({
  value,
  onChange,
  disabled,
  labelledBy,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => searchCountries(query), [query]);

  // Focus the filter as soon as the list opens.
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => searchRef.current?.focus(), 0);
    return () => window.clearTimeout(id);
  }, [open]);

  // Close when clicking outside the control.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  // Keep the active option scrolled into view.
  useEffect(() => {
    if (!open || !listRef.current) return;
    const node = listRef.current.children[activeIndex] as
      | HTMLElement
      | undefined;
    node?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  const select = (country: Country) => {
    onChange(country);
    setOpen(false);
    setQuery("");
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (!open) {
      if (event.key === "ArrowDown" || event.key === "Enter") {
        event.preventDefault();
        setOpen(true);
      }
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        event.preventDefault();
        if (results[activeIndex]) select(results[activeIndex]);
        break;
      case "Escape":
        event.preventDefault();
        // Keep the dialog open; only dismiss this list.
        event.stopPropagation();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelledBy}
        className="flex w-full items-center justify-between gap-1 rounded-[14px] border border-line bg-surface px-3 py-3 text-[14px] text-foreground transition-colors outline-none focus:border-accent-line focus:ring-2 focus:ring-accent/25 disabled:opacity-60"
      >
        <span className="truncate">
          {value.dial}
          <span className="ml-1 text-muted">({value.iso})</span>
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted transition-transform ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 z-10 mt-2 w-70 max-w-[85vw] overflow-hidden rounded-[14px] border border-line bg-surface shadow-[0_18px_40px_-12px_rgba(7,26,61,0.35)]">
          <div className="relative border-b border-line">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={onKeyDown}
              placeholder="Search country or code"
              aria-label="Search country or dialling code"
              className="w-full bg-transparent py-3 pr-3 pl-9 text-[14px] text-foreground outline-none placeholder:text-muted"
            />
          </div>

          {results.length === 0 ? (
            <p className="m-0 px-4 py-4 text-[13px] text-muted">
              No match for “{query.trim()}”.
            </p>
          ) : (
            <ul
              ref={listRef}
              role="listbox"
              aria-label="Country dialling codes"
              // Lenis captures wheel events document-wide, so opt this list
              // out or it cannot be scrolled with the mouse wheel.
              data-lenis-prevent
              className="m-0 max-h-60 list-none overflow-y-auto overscroll-contain p-1"
            >
              {results.map((country, index) => {
                const selected =
                  country.iso === value.iso && country.dial === value.dial;

                return (
                  <li
                    key={country.iso}
                    role="option"
                    aria-selected={selected}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => select(country)}
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-[13.5px] ${
                      index === activeIndex
                        ? "bg-brand-soft text-foreground"
                        : "text-muted"
                    }`}
                  >
                    <span className="truncate">{country.name}</span>
                    <span className="flex shrink-0 items-center gap-2">
                      <span className="text-foreground">
                        {country.dial}
                      </span>
                      {selected && (
                        <Check
                          className="h-3.5 w-3.5 text-accent"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      {/* Expose the chosen code to assistive tech and native form tooling. */}
      <input type="hidden" name="country_code" value={value.dial} />
    </div>
  );
}

