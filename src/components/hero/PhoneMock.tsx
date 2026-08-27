import { BrandGlyph } from "@/components/ui/BrandGlyph";
import type { HeroChannel } from "@/types/content";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
   Placeholder screens.

   Each is plain DOM, so the hero looks finished before a single video file
   exists. They are decorative — the device already carries an accessible
   name — so everything here is hidden from assistive tech by the parent.
   -------------------------------------------------------------------------- */

/** Instagram-shaped: story progress bars, a subject block, caption lines. */
function StoryMock() {
  return (
    <div className="flex h-full flex-col bg-[linear-gradient(165deg,#fdfdfc,#eef0f4_55%,#e6e9f2)] p-3">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-[3px] flex-1 overflow-hidden rounded-full bg-foreground/12"
          >
            <span
              className="cx-mock-progress block h-full w-full rounded-full bg-accent"
              style={{ animationDelay: `${i * 2.4}s` }}
            />
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className="size-5 rounded-full bg-[linear-gradient(135deg,var(--accent),rgba(var(--accent-rgb),0.45))]" />
        <span className="h-1.5 w-12 rounded-full bg-foreground/20" />
      </div>

      <div className="relative mt-3 flex-1 overflow-hidden rounded-[10px] bg-white/70">
        <div className="cx-mock-float absolute inset-x-3 top-1/2 -translate-y-1/2">
          <div className="h-1.5 w-3/4 rounded-full bg-foreground/25" />
          <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-foreground/15" />
          <div className="mt-3 h-5 w-16 rounded-full bg-accent/85" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(var(--accent-rgb),0.10),transparent)]" />
      </div>

      <div className="mt-2.5 space-y-1.5">
        <div className="h-1.5 w-full rounded-full bg-foreground/12" />
        <div className="h-1.5 w-2/3 rounded-full bg-foreground/10" />
      </div>
    </div>
  );
}


/**
 * A real iOS Messages thread, built in DOM.
 *
 * Not a video: a chat is text, rounded rectangles and two icons, all of
 * which the browser renders perfectly sharp at any size — where a generated
 * clip would soften the type and risk garbling it. It also costs nothing to
 * download and follows the page's own palette.
 *
 * Styled to the real app: the light translucent header with the contact
 * stacked and centred, the blue outgoing bubble and grey incoming one,
 * bottom-curling tails, the "Text Message" field, and a Delivered receipt
 * under the last sent message.
 *
 * The thread is static by design. A looping build-and-clear sequence sat
 * beside two autoplaying videos and read as flicker rather than motion; a
 * still conversation is calmer and lets the copy actually be read.
 */

/** iOS Messages' own colours, so the thread reads as the real product. */
const SMS = {
  outgoing: "#2C7DFA",
  incoming: "#E9E9EB",
  canvas: "#FFFFFF",
  header: "rgba(247,247,247,0.92)",
  text: "#000000",
  meta: "#8E8E93",
} as const;

/**
 * The campaign creative inside the first message.
 *
 * A raw gradient rectangle reads as a missing image. This is composed like
 * an actual social asset — gradient ground, a light bloom, drifting volumes
 * and a headline block — so the bubble looks like it is carrying real work.
 */
function CampaignCreative() {
  return (
    <span className="relative mb-1.5 block aspect-[5/4] w-full overflow-hidden rounded-[10px] bg-[linear-gradient(145deg,var(--brand-blue),var(--brand-violet)_48%,var(--brand-magenta))]">
      <span className="absolute -top-1/4 -left-1/4 block size-[85%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.5),transparent)]" />
      {/* Static, not drifting: these sit inside a 300px card where the
          movement was imperceptible, and two more animated layers in the
          hero cost frames the section cannot spare. */}
      <span className="absolute right-[-12%] bottom-[-18%] block size-[65%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.28),transparent)]" />
      <span className="absolute top-[18%] left-[8%] block size-[38%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.22),transparent)]" />

      <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-[linear-gradient(to_top,rgba(0,0,0,0.28),transparent)] px-2 pt-4 pb-2">
        <span className="block h-1.5 w-3/5 rounded-full bg-white/90" />
        <span className="block h-1 w-2/5 rounded-full bg-white/55" />
      </span>
    </span>
  );
}

interface Message {
  readonly text: string;
  readonly mine: boolean;
  /** Renders the campaign creative above the text. */
  readonly image?: boolean;
}

const THREAD: readonly Message[] = [
  { text: "Spring offer inside 🌸", mine: true, image: true },
  { text: "omg need this", mine: false },
  { text: "20% off until Sunday!", mine: true },
  { text: "just ordered 🎉", mine: false },
];

function ChatMock() {
  return (
    <div
      className="flex h-full flex-col"
      style={{ backgroundColor: SMS.canvas }}
    >
      {/* Header. iOS centres the contact and stacks the avatar above the
          name, rather than sitting beside it as other apps do. */}
      <div
        className="relative flex shrink-0 flex-col items-center gap-1 px-3 pt-2 pb-2 backdrop-blur-md"
        style={{
          backgroundColor: SMS.header,
          borderBottom: "0.5px solid rgba(0,0,0,0.16)",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2"
          fill="none"
          style={{ color: SMS.outgoing }}
        >
          <path
            d="M15 18 9 12l6-6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className="block size-7 rounded-full bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-magenta))]" />
        <span
          className="text-[0.5625rem] font-medium"
          style={{ color: SMS.text }}
        >
          Northwave
        </span>
      </div>

      {/* Thread. iOS has no wallpaper — plain white is the real look. */}
      <div className="flex flex-1 flex-col justify-end gap-1.5 overflow-hidden px-2.5 pt-3 pb-1">
        <span
          className="mx-auto mb-1 text-[0.4375rem] font-medium"
          style={{ color: SMS.meta }}
        >
          Text Message &middot; Today 09:41
        </span>

        {THREAD.map((message, i) => (
          <div
            key={message.text}
            className={cn(
              "relative max-w-[80%] rounded-[16px] px-2.5 py-1.5",
              message.mine ? "self-end" : "self-start",
              /* Room under the last sent bubble for its receipt. */
              message.mine && i === 2 && "mb-3.5",
            )}
            style={{
              backgroundColor: message.mine ? SMS.outgoing : SMS.incoming,
            }}
          >
            {/* Bubble tail, drawn as a curved path rather than a clipped
                triangle: iOS tails are a swoosh that hooks back under the
                bubble, and a straight-edged triangle reads as a stray
                arrowhead detached from the corner. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 12 16"
              className={cn(
                "absolute bottom-0 -z-10 h-4 w-3",
                message.mine ? "right-[-5px]" : "left-[-5px] -scale-x-100",
              )}
              fill={message.mine ? SMS.outgoing : SMS.incoming}
            >
              <path d="M0 0v16C0 16 1 9.5 6.5 15.2 9 17.8 12 15 12 15S6 12 6 0Z" />
            </svg>

            {message.image ? <CampaignCreative /> : null}

            <span
              className="block text-[0.6875rem] leading-[1.35]"
              style={{ color: message.mine ? "#FFFFFF" : SMS.text }}
            >
              {message.text}
            </span>

            {message.mine && i === 2 ? (
              <span
                className="absolute right-0 -bottom-3.5 text-[0.4375rem] font-medium whitespace-nowrap"
                style={{ color: SMS.meta }}
              >
                Delivered
              </span>
            ) : null}
          </div>
        ))}
      </div>

      {/* Composer */}
      <div className="flex shrink-0 items-center gap-1.5 px-2.5 pt-3 pb-2">
        <span
          className="flex size-6 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: SMS.incoming }}
        >
          <svg
            viewBox="0 0 24 24"
            className="size-3.5"
            fill="none"
            style={{ color: SMS.meta }}
          >
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>

        <span
          className="flex flex-1 items-center justify-between gap-1.5 rounded-full px-2.5 py-1.5"
          style={{ border: "1px solid rgba(0,0,0,0.14)" }}
        >
          <span className="text-[0.5625rem]" style={{ color: SMS.meta }}>
            Text Message
          </span>
          <svg
            viewBox="0 0 24 24"
            className="size-3.5 shrink-0"
            fill="none"
            style={{ color: SMS.meta }}
          >
            <path
              d="M12 4a4 4 0 0 1 4 4v4a4 4 0 0 1-8 0V8a4 4 0 0 1 4-4Z"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M5 11a7 7 0 0 0 14 0M12 18v3"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

/** Email-shaped: an inbox row opening into a campaign email. */
function EmailMock() {
  return (
    <div className="flex h-full flex-col bg-[linear-gradient(180deg,#fbfbfa,#f1f2ef)] p-3">
      {/* Inbox header */}
      <div className="flex items-center justify-between border-b border-foreground/8 pb-2.5">
        <span className="h-1.5 w-10 rounded-full bg-foreground/22" />
        <span className="flex gap-1">
          <span className="size-1 rounded-full bg-foreground/15" />
          <span className="size-1 rounded-full bg-foreground/15" />
          <span className="size-1 rounded-full bg-foreground/15" />
        </span>
      </div>

      {/* The opened campaign email */}
      <div className="mt-2.5 rounded-[10px] bg-white p-2.5 shadow-[0_1px_3px_rgba(20,30,50,0.05)]">
        <div className="flex items-center gap-2">
          <span className="size-5 rounded-full bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-magenta))]" />
          <span className="flex flex-1 flex-col gap-1">
            <span className="h-1.5 w-3/5 rounded-full bg-foreground/22" />
            <span className="h-1 w-2/5 rounded-full bg-foreground/12" />
          </span>
        </div>

        {/* Hero banner inside the email */}
        <div className="cx-mock-float mt-2.5 flex aspect-[16/9] items-center justify-center rounded-[8px] bg-[linear-gradient(140deg,rgba(var(--brand-blue-rgb),0.22),rgba(208,0,255,0.10))]">
          <span className="h-1.5 w-1/3 rounded-full bg-white/70" />
        </div>

        <div className="mt-2.5 space-y-1.5">
          <div className="h-1.5 w-full rounded-full bg-foreground/12" />
          <div className="h-1.5 w-5/6 rounded-full bg-foreground/10" />
          <div className="h-1.5 w-2/3 rounded-full bg-foreground/10" />
        </div>

        {/* The call to action */}
        <div className="bg-brand mt-3 h-5 w-20 rounded-full" />
      </div>

      {/* Queued sends below, arriving in sequence */}
      <div className="mt-2.5 flex flex-col gap-1.5">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="cx-mock-bubble flex items-center gap-2 rounded-[8px] bg-white/70 px-2 py-1.5"
            style={{ animationDelay: `${1.2 + i * 0.8}s` }}
          >
            <span className="size-3 shrink-0 rounded-full bg-foreground/10" />
            <span className="h-1 flex-1 rounded-full bg-foreground/12" />
          </span>
        ))}
      </div>
    </div>
  );
}

const MOCKS = {
  story: StoryMock,
  chat: ChatMock,
  email: EmailMock,
} as const;

interface PhoneMockProps {
  channel: HeroChannel;
  className?: string;
}

/**
 * A portrait device holding one channel's output.
 *
 * Renders a real `<video>` the moment `channel.src` exists in content config,
 * and the animated placeholder until then — so dropping in footage is a
 * content edit, never a component edit.
 *
 * The video is deliberately *not* a client component: `autoplay muted loop`
 * needs no JS, and the poster covers the first frame. Keeping it server-side
 * means three more videos cost nothing in bundle size.
 */
export function PhoneMock({ channel, className }: PhoneMockProps) {
  const Mock = MOCKS[channel.mock];

  return (
    <figure className={cn("flex flex-col items-center", className)}>
      {/* Device shell. The bezel is the frame; the screen is inset. */}
      <div
        data-hero-device
        /* Extra bottom padding leaves the caption card somewhere to overlap
           without covering the screen. */
        className="glass-sheen relative w-full rounded-[2.1rem] border border-white/70 bg-[linear-gradient(160deg,rgba(255,255,255,0.92),rgba(255,255,255,0.62))] p-[7px] pb-8 shadow-cinema sm:rounded-[2.4rem] sm:p-2 sm:pb-9"
      >
        {/* Speaker slot / notch. */}
        <span
          aria-hidden="true"
          className="absolute top-[13px] left-1/2 z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-foreground/15 sm:top-[15px]"
        />

        <div
          data-hero-screen
          aria-hidden="true"
          /* `contain: paint` lets the browser skip everything outside the
             screen's own box, and translateZ promotes it to its own
             compositor layer — so a video frame changing here repaints the
             card rather than a region of the hero around it. */
          className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.65rem] bg-surface-sunk [contain:paint] [transform:translateZ(0)] sm:rounded-[1.9rem]"
        >
          {channel.src ? (
            /* `preload="auto"` rather than "metadata": these are small
               clips that must loop without a stall at the seam, and
               metadata-only leaves the first repeat waiting on the network.
               `muted` + `playsInline` are what make autoplay permitted at
               all — without both, iOS Safari and Chrome refuse to start. */
            <video
              className="h-full w-full object-cover"
              poster={channel.poster}
              preload="auto"
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              aria-hidden="true"
              tabIndex={-1}
            >
              <source src={channel.src} type="video/mp4" />
            </video>
          ) : (
            <Mock />
          )}

          {/* Screen glass: a soft diagonal sheen over whatever is below. */}
          <span className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(150deg,rgba(255,255,255,0.5),rgba(255,255,255,0)_42%)]" />
          <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/50" />
        </div>
      </div>

      {/* Caption card.
          Loose text under a device reads as a stray label; giving it a
          surface makes it the device's plaque. It overlaps the phone
          slightly so the two register as one object, and carries the real
          platform mark rather than a generic glyph. */}
      <figcaption className="relative z-10 -mt-5 w-[92%] rounded-card border border-line bg-surface/90 px-3 py-3 text-center shadow-raise backdrop-blur-sm">
        <span className="flex items-center justify-center gap-2">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white shadow-soft">
            <BrandGlyph name={channel.platform} className="size-3.5" />
          </span>
          <span className="text-[0.9375rem] font-semibold">{channel.name}</span>
        </span>

        <span className="mt-2 flex items-center justify-center gap-1.5">
          <span
            aria-hidden="true"
            className="bg-brand block size-1.5 shrink-0 rounded-full"
          />
          <span className="text-[0.75rem] leading-tight text-muted">
            {channel.output}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
