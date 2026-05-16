import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

type StatCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  hint: string;
  trend?: { value: string; positive?: boolean };
  className?: string;
};

export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  trend,
  className,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "glass-card group overflow-hidden border-[var(--border)]",
        className
      )}
    >
      <CardContent className="relative p-5">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="relative flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
              {label}
            </span>
            <span className="text-2xl font-semibold tracking-tight md:text-3xl">
              {value}
            </span>
            <span className="text-xs text-[var(--muted-foreground)]">{hint}</span>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)]/12 text-[var(--primary)] ring-1 ring-[var(--primary)]/25">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            {trend ? (
              <span
                className={cn(
                  "text-xs font-medium",
                  trend.positive === false
                    ? "text-[var(--destructive)]"
                    : "text-[var(--success)]"
                )}
              >
                {trend.value}
              </span>
            ) : null}
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 start-0 h-0.5 w-full bg-gradient-to-r from-transparent via-[var(--primary)]/50 to-transparent opacity-60" />
      </CardContent>
    </Card>
  );
}
