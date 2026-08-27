import Link from "next/link";
import { navigation } from "@/config/navigation";

/** Primary desktop links. Underline grows from the left on hover/focus. */
export function DesktopNav() {
  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {navigation.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group relative inline-flex h-9 items-center rounded-pill px-3.5 text-[0.9375rem] text-muted-strong transition-colors duration-300 hover:text-foreground focus-visible:text-foreground"
            >
              {item.label}
              <span
                aria-hidden="true"
                className="bg-brand pointer-events-none absolute inset-x-3.5 bottom-1.5 h-[1.5px] origin-left scale-x-0 rounded-full transition-transform duration-400 ease-[var(--ease-out-soft)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
