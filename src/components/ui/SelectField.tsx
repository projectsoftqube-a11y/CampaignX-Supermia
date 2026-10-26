"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

type Props = {
  /** Currently selected value, or "" when nothing is chosen. */
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  /** Shown when no option is selected. */
  placeholder: string;
  disabled?: boolean;
  /** id of the element labelling this control. */
  labelledBy?: string;
};

/**
 * Custom single-select dropdown.
 *
 * A native <select> renders with operating system styling that cannot be
 * themed, so it looks out of place next to the rest of the form. This is a
 * listbox styled to match, with full keyboard support.
 */
export function SelectField({
  value,
  onChange,
  options,
  placeholder,
  disabled,
  labelledBy,
}: Props) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  const openList = () => {
    const current = options.indexOf(value);
    setActiveIndex(current >= 0 ? current : 0);
    setOpen(true);
  };

  const select = (option: string) => {
    onChange(option);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (!open) {
      if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openList();
      }
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (options[activeIndex]) select(options[activeIndex]);
        break;
      case "Escape":
        event.preventDefault();
        // Keep the surrounding dialog open; only dismiss this list.
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
        ref={buttonRef}
        type="button"
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelledBy}
        className="flex w-full items-center justify-between gap-2 rounded-[14px] border border-line bg-surface px-4 py-3 text-left text-[14px] transition-colors outline-none focus:border-accent-line focus:ring-2 focus:ring-accent/25 disabled:opacity-60"
      >
        <span
          className={`truncate ${
            value ? "text-foreground" : "text-[#9aa3b2]"
          }`}
        >
          {value || placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted transition-transform ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          aria-labelledby={labelledBy}
          // Lenis captures wheel events document-wide, so opt this list out or
          // it cannot be scrolled with the mouse wheel.
          data-lenis-prevent
          className="absolute top-full left-0 z-10 m-0 mt-2 max-h-60 w-full list-none overflow-y-auto overscroll-contain rounded-[14px] border border-line bg-surface p-1 shadow-[0_18px_40px_-12px_rgba(7,26,61,0.35)]"
        >
          {options.map((option, index) => {
            const selected = option === value;

            return (
              <li
                key={option}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => select(option)}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-[13.5px] ${
                  index === activeIndex
                    ? "bg-brand-soft text-foreground"
                    : "text-muted"
                }`}
              >
                <span className="truncate">{option}</span>
                {selected && (
                  <Check
                    className="h-3.5 w-3.5 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
