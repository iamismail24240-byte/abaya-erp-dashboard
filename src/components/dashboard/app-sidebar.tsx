"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { filterNavByRole } from "@/config/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type AppSidebarProps = {
  className?: string;
  onNavigate?: () => void;
};

export function AppSidebar({ className, onNavigate }: AppSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const navItems = useMemo(
    () => filterNavByRole(session?.user?.role),
    [session?.user?.role]
  );

  return (
    <aside
      className={cn(
        "flex h-full w-64 shrink-0 flex-col border-e border-[var(--sidebar-border)] bg-[var(--sidebar)]",
        className
      )}
    >
      <div className="flex h-16 items-center gap-2 border-b border-[var(--sidebar-border)] px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)]/15 text-[var(--primary)] ring-1 ring-[var(--primary)]/30">
          <Sparkles className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold leading-tight text-[var(--sidebar-foreground)]">
            নূর ফ্যাব্রিক্স ERP
          </p>
          <p className="truncate text-xs text-[var(--muted-foreground)]">
            আবায়া · বোরকা · প্রস্তুতকারক
          </p>
        </div>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1" aria-label="প্রধান মেনু">
          {navItems.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "group flex items-start gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "bg-[var(--sidebar-accent)] text-[var(--primary)] shadow-sm ring-1 ring-[var(--border)]"
                    : "text-[var(--sidebar-foreground)]/85 hover:bg-[var(--sidebar-accent)]/80 hover:text-[var(--sidebar-foreground)]"
                )}
              >
                <item.icon
                  className={cn(
                    "mt-0.5 h-4 w-4 shrink-0",
                    active
                      ? "text-[var(--primary)]"
                      : "text-[var(--muted-foreground)] group-hover:text-[var(--sidebar-foreground)]"
                  )}
                  aria-hidden
                />
                <span className="flex min-w-0 flex-col">
                  <span className="font-medium leading-snug">{item.title}</span>
                  <span className="text-xs font-normal text-[var(--muted-foreground)]">
                    {item.description}
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <div className="border-t border-[var(--sidebar-border)] p-4">
        <Separator className="mb-4 bg-[var(--sidebar-border)]" />
        <div className="rounded-lg bg-[var(--sidebar-accent)]/60 p-3 ring-1 ring-[var(--border)]">
          <p className="text-xs font-medium text-[var(--sidebar-foreground)]">
            প্রিমিয়াম সাপোর্ট
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[var(--muted-foreground)]">
            উৎপাদন লাইন ও স্টক সতর্কতা রিয়েল-টাইম সিঙ্ক।
          </p>
        </div>
      </div>
    </aside>
  );
}
