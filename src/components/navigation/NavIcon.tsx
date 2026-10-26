import {
  ArrowUpRight,
  AudioLines,
  BadgeCheck,
  BookOpen,
  Briefcase,
  CircleHelp,
  ChartNoAxesColumn,
  Images,
  Info,
  Mail,
  MessageSquare,
  Rocket,
  Send,
  Store,
  Tag,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Maps a route's icon key to a component.
 *
 * The keys live in `config/routes.ts` as plain strings so that config
 * stays free of JSX and can be imported from anywhere, including the
 * sitemap and llms.txt routes. Resolution happens here, in the one place
 * that actually renders them.
 */
const ICONS: Record<string, LucideIcon> = {
  voice: AudioLines,
  image: Images,
  send: Send,
  check: BadgeCheck,
  chart: ChartNoAxesColumn,
  social: Images,
  mail: Mail,
  message: MessageSquare,
  store: Store,
  briefcase: Briefcase,
  users: Users,
  rocket: Rocket,
  help: CircleHelp,
  book: BookOpen,
  info: Info,
  tag: Tag,
};

interface NavIconProps {
  name?: string;
  className?: string;
  /** Lifts the tile when its row is hovered or is the current page. */
  active?: boolean;
}

/**
 * The icon tile in a header dropdown row.
 *
 * A tile rather than a bare glyph: at 15px a line icon beside 15px text
 * disappears into the row. The tinted, bordered square gives each item a
 * fixed anchor on the left, which is what turns a list of sentences into
 * a scannable menu.
 */
export function NavIcon({ name, className, active }: NavIconProps) {
  const Icon = name ? ICONS[name] : undefined;
  if (!Icon) return null;

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-[0.625rem] border transition-colors duration-200",
        active
          ? "border-accent-line bg-accent-soft text-accent"
          : "border-line bg-surface-soft text-muted-strong",
        className,
      )}
    >
      <Icon className="size-[1.0625rem]" strokeWidth={1.75} />
    </span>
  );
}

export { ArrowUpRight };
