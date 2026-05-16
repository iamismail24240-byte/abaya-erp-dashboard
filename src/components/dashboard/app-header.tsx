"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { signOut, useSession } from "next-auth/react";
import { Menu, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { filterNavByRole } from "@/config/navigation";
import { Badge } from "@/components/ui/badge";
import { ROLE_LABELS } from "@/lib/roles";
import type { SystemRole } from "@prisma/client";

type AppHeaderProps = {
  onMenuClick?: () => void;
};

function initialsFromName(name?: string | null) {
  if (!name?.trim()) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return parts[0].slice(0, 2).toUpperCase();
}

export function AppHeader({ onMenuClick }: AppHeaderProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const navItems = useMemo(
    () => filterNavByRole(session?.user?.role),
    [session?.user?.role]
  );
  const match = [...navItems]
    .sort((a, b) => b.href.length - a.href.length)
    .find(
      (item) =>
        item.href === "/dashboard"
          ? pathname === "/dashboard"
          : pathname === item.href || pathname.startsWith(`${item.href}/`)
    );
  const title = match?.title ?? "ড্যাশবোর্ড";
  const subtitle =
    match?.description ?? "আবায়া/বোরকা ফ্যাক্টরি — এক নজরে";

  const role = session?.user?.role;
  const displayName = session?.user?.name ?? "ব্যবহারকারী";
  const email = session?.user?.email ?? "";

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 md:px-6">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
          aria-label="মেনু খুলুন"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="truncate text-lg font-semibold tracking-tight md:text-xl">
              {title}
            </h1>
            {role ? (
              <Badge
                variant={
                  role === "SUPER_ADMIN" || role === "MANAGER"
                    ? "default"
                    : "secondary"
                }
                className="max-w-[10rem] truncate text-[10px] sm:max-w-none sm:text-xs"
              >
                {ROLE_LABELS[role as SystemRole] ?? role}
              </Badge>
            ) : null}
          </div>
          <p className="hidden text-sm text-[var(--muted-foreground)] sm:block">
            {subtitle}
          </p>
        </div>

        <div className="hidden max-w-md flex-1 md:flex md:justify-center">
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
            <Input
              placeholder="অর্ডার, SKU, কর্মচারী খুঁজুন..."
              className="ps-9"
            />
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" className="relative" type="button">
            <Bell className="h-5 w-5" />
            <span className="absolute end-1.5 top-1.5 h-2 w-2 rounded-full bg-[var(--primary)] ring-2 ring-[var(--background)]" />
            <span className="sr-only">বিজ্ঞপ্তি</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 max-w-[14rem] gap-2 rounded-full ps-2 pe-3"
                type="button"
              >
                <Avatar className="h-8 w-8 border border-[var(--border)]">
                  <AvatarFallback className="bg-[var(--muted)] text-xs font-semibold text-[var(--foreground)]">
                    {initialsFromName(displayName)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden min-w-0 truncate text-sm font-medium sm:inline">
                  {displayName}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuLabel>
                <div className="flex flex-col gap-0.5">
                  <span className="truncate">{displayName}</span>
                  <span className="truncate text-xs font-normal text-[var(--muted-foreground)]">
                    {email}
                  </span>
                  {role ? (
                    <span className="text-xs text-[var(--muted-foreground)]">
                      ভূমিকা:{" "}
                      {ROLE_LABELS[role as SystemRole] ?? role}
                    </span>
                  ) : null}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>প্রোফাইল</DropdownMenuItem>
              <DropdownMenuItem disabled>সেটিংস</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-[var(--destructive)] focus:text-[var(--destructive)]"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                লগআউট
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
