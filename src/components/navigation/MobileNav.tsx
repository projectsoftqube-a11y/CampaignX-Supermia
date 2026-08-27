"use client";

import { useState } from "react";
import { MobileMenu } from "./MobileMenu";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="group flex size-10 cursor-pointer items-center justify-center rounded-pill transition-colors hover:bg-surface-soft lg:hidden"
      >
        <span aria-hidden="true" className="flex w-5 flex-col items-end gap-[5px]">
          <span className="h-px w-full bg-foreground transition-all duration-300 group-hover:w-3/4" />
          <span className="h-px w-3/4 bg-foreground transition-all duration-300 group-hover:w-full" />
        </span>
      </button>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
