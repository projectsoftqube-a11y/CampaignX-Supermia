import { createElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "footer" | "header" | "nav";
  /** `wide` matches the header rail; `default` is the page rail. */
  width?: "default" | "wide" | "narrow";
}

/** Rails come from tokens.css so every section shares one source. */
const WIDTHS = {
  narrow: "max-w-[var(--container-narrow)]",
  default: "max-w-[var(--container-max)]",
  wide: "max-w-[var(--container-wide)]",
} as const;

export function Container({
  children,
  className,
  as = "div",
  width = "default",
}: ContainerProps) {
  return createElement(
    as,
    { className: cn("mx-auto w-full px-5 sm:px-8 lg:px-12", WIDTHS[width], className) },
    children,
  );
}
