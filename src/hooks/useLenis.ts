"use client";

import { createContext, useContext, type RefObject } from "react";
import type Lenis from "lenis";

export type LenisRef = RefObject<Lenis | null>;

const FALLBACK: LenisRef = { current: null };

export const LenisContext = createContext<LenisRef>(FALLBACK);

/**
 * A stable ref to the single app-wide Lenis instance created by
 * <SmoothScroll />. Read `.current` inside effects or event handlers — never
 * during render. `current` is null on the server and under reduced motion.
 */
export function useLenisRef(): LenisRef {
  return useContext(LenisContext);
}
