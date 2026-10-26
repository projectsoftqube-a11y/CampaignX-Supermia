"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { ContactSalesDialog } from "@/components/sections/ContactSalesDialog";

type Props = {
  label: string;
  className?: string;
};

/**
 * Contact Sales CTA for the custom plan.
 *
 * Pricing is an async Server Component, so the dialog state lives here in the
 * smallest possible client boundary.
 *
 * The dialog is portalled into `document.body` because the pricing card uses
 * a CSS transform (`hover:-translate-y-1`). A transformed ancestor becomes
 * the containing block for `position: fixed`, which would otherwise trap the
 * modal inside the card instead of covering the viewport.
 */
export function ContactSalesButton({ label, className }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {label}
      </button>

      {/* Only ever rendered after a click, so `document` is available and no
          mount guard is needed. Keyed so each open starts an empty form. */}
      {open
        ? createPortal(
            <ContactSalesDialog
              key={String(open)}
              open
              onClose={() => setOpen(false)}
            />,
            document.body,
          )
        : null}
    </>
  );
}
