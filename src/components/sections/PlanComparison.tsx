import { Check, Minus } from "lucide-react";
import { Container } from "@/components/layout/Container";
import type { LivePlan, PlanLimits } from "@/lib/billing";
import { cn } from "@/lib/utils";

/**
 * The plans compared row by row.
 *
 * The cards answer "which one is for me"; this answers "what exactly
 * am I getting", which a stack of bullet lists cannot, because the
 * reader has to hold four lists in their head to spot one difference.
 *
 * Every figure is read from the API's structured limits rather than
 * its ready-made display strings, so a limit changing upstream changes
 * this table. Nothing here is written into the page.
 */

/** How one row reads a plan. Returns a figure, or a yes/no. */
type Row = {
  label: string;
  /** One line of help, where the label alone is ambiguous. */
  hint?: string;
  read: (l: PlanLimits) => string | boolean;
};

/** "Unlimited" for null, otherwise the number. */
function count(value: number | null, unit?: string): string {
  if (value === null) return "Unlimited";
  if (unit) return `${value} ${unit}${value === 1 ? "" : "s"}`;
  return String(value);
}

const ROWS: readonly Row[] = [
  {
    label: "Workspaces",
    hint: "Separate brands or clients, each with its own voice.",
    read: (l) => count(l.workspaces),
  },
  {
    label: "Connected accounts",
    hint: "Social, email and SMS destinations you can publish to.",
    read: (l) => count(l.connectedAccounts),
  },
  {
    label: "AI campaigns",
    hint: "Campaigns generated from a brief each month.",
    read: (l) =>
      l.aiCampaigns === null ? "Unlimited" : `${l.aiCampaigns} / month`,
  },
  {
    label: "Manual campaigns",
    read: (l) =>
      l.manualCampaigns === null ? "Unlimited" : `${l.manualCampaigns} / month`,
  },
  {
    label: "Scheduled posts",
    hint: "Queued per connected account.",
    read: (l) =>
      l.scheduledPosts === null
        ? "Unlimited"
        : `${l.scheduledPosts} per account`,
  },
  {
    label: "X (Twitter) campaigns",
    read: (l) => {
      if (!l.xAllowed) return false;
      return l.xCampaigns === null ? "Unlimited" : `${l.xCampaigns} / month`;
    },
  },
  {
    label: "Analytics",
    hint: "How far back reporting can look.",
    read: (l) => {
      if (!l.analyticsEnabled) return false;
      const d = l.analyticsHistoryDays;
      if (d >= 365) return "Custom range";
      return `${d} days history`;
    },
  },
  {
    label: "Cloud storage",
    read: (l) => (l.storageUncapped ? "Uncapped" : false),
  },
];

/** One cell: a figure, a tick, or a dash for "not on this plan". */
function Cell({ value }: { value: string | boolean }) {
  if (value === false) {
    return (
      <>
        <Minus
          aria-hidden="true"
          className="mx-auto size-4 text-muted/50"
          strokeWidth={2}
        />
        <span className="sr-only">Not included</span>
      </>
    );
  }

  if (value === true) {
    return (
      <>
        <Check
          aria-hidden="true"
          className="mx-auto size-4 text-accent"
          strokeWidth={2.5}
        />
        <span className="sr-only">Included</span>
      </>
    );
  }

  return <span className="text-foreground">{value}</span>;
}

export function PlanComparison({ plans }: { plans: readonly LivePlan[] }) {
  if (plans.length === 0) return null;

  return (
    <section className="relative bg-surface-soft py-[clamp(2.5rem,4vw,3.5rem)]">
      <Container width="wide">
        <div className="max-w-[42rem]">
          <p className="text-eyebrow">Compare</p>
          <h2 className="text-display mt-3 text-[clamp(1.625rem,3vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Every limit, side by side
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-strong">
            The plans do not differ on what the product does. They differ
            on how much of it you run, and how far back the reporting
            goes.
          </p>
        </div>

        {/* The table scrolls sideways on a phone rather than wrapping
            into something unreadable; the first column stays put so a
            row never loses its label. */}
        <div className="cx-scroll-slim mt-8 overflow-x-auto rounded-frame border border-line bg-surface">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <caption className="sr-only">
              Feature and limit comparison across every CampaignX plan
            </caption>

            <thead>
              <tr className="border-b border-line">
                <th
                  scope="col"
                  className="sticky left-0 z-10 bg-surface px-5 py-4 text-[0.875rem] font-medium uppercase tracking-[0.08em] text-muted"
                >
                  Plan
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.id}
                    scope="col"
                    className={cn(
                      "px-5 py-4 text-center",
                      plan.featured && "bg-accent-soft/30",
                    )}
                  >
                    <span className="text-display block text-[1.0625rem] font-medium">
                      {plan.name}
                    </span>
                    <span className="mt-1 block text-[0.875rem] text-muted">
                      {/* "Free/mo" reads badly, and a custom tier has
                          no per-month figure to qualify. */}
                      {plan.isCustom || plan.isFree
                        ? plan.price
                        : `${plan.price}/mo`}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {ROWS.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-line last:border-0"
                >
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-surface px-5 py-4 align-top font-normal"
                  >
                    <span className="block text-[0.9375rem] font-medium text-foreground">
                      {row.label}
                    </span>
                    {row.hint ? (
                      <span className="mt-0.5 block text-[0.875rem] leading-snug text-muted">
                        {row.hint}
                      </span>
                    ) : null}
                  </th>

                  {plans.map((plan) => (
                    <td
                      key={plan.id}
                      className={cn(
                        "px-5 py-4 text-center align-middle text-[0.9375rem] text-muted-strong",
                        plan.featured && "bg-accent-soft/30",
                      )}
                    >
                      <Cell value={row.read(plan.limits)} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-[0.875rem] leading-relaxed text-muted">
          Every plan publishes to the same channels, learns your brand
          voice, and holds each asset until a named approver releases it.
        </p>
      </Container>
    </section>
  );
}
