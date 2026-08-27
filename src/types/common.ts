import type { ReactNode } from "react";

/** Every icon referenced by content data. Keeps `config/` free of React imports. */
export type IconName =
  | "sparkles"
  | "wand"
  | "target"
  | "send"
  | "split"
  | "workflow"
  | "brain"
  | "chart"
  | "globe"
  | "bell"
  | "mail"
  | "message"
  | "shield"
  | "layers"
  | "zap"
  | "clock"
  | "users"
  | "store"
  | "building"
  | "megaphone"
  | "check"
  | "arrow-right"
  | "play";

export interface WithChildren {
  children: ReactNode;
}

export interface WithClassName {
  className?: string;
}

export type Align = "left" | "center";
