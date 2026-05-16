"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type {
  Employee,
  EmployeeStatus,
  User,
  SystemRole,
} from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ROLE_LABELS } from "@/lib/roles";
import { employeeStatusLabel } from "@/lib/enum-labels";

const ROLES: SystemRole[] = [
  "SUPER_ADMIN",
  "MANAGER",
  "SALES",
  "PRODUCTION",
];

const STATUSES: EmployeeStatus[] = ["ACTIVE", "INACTIVE", "ON_LEAVE"];

function SubmitLabel({ idle, pending }: { idle: string; pending: string }) {
  const { pending: loading } = useFormStatus();
  return <>{loading ? pending : idle}</>;
}

type Props = {
  action: (prev: unknown, formData: FormData) => Promise<{ ok?: boolean; error?: string }>;
  employee?: Employee & { user: User };
  mode: "create" | "edit";
};

export function EmployeeForm({ action, employee, mode }: Props) {
  const router = useRouter();
  const [state, formAction] = useFormState(action, null);

  useEffect(() => {
    if (state?.ok) {
      router.push("/dashboard/employees");
      router.refresh();
    }
  }, [state, router]);

  const jd = employee?.joiningDate
    ? new Date(employee.joiningDate).toISOString().slice(0, 10)
    : "";

  return (
    <form action={formAction} className="mx-auto max-w-lg space-y-5">
      {state?.error ? (
        <p
          className="rounded-lg border border-[var(--destructive)]/50 bg-[var(--destructive)]/10 px-3 py-2 text-sm text-[var(--destructive-foreground)]"
          role="alert"
        >
          {state.error}
        </p>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="name">নাম *</Label>
        <Input
          id="name"
          name="name"
          required
          defaultValue={employee?.name ?? ""}
          placeholder="পূর্ণ নাম"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">ফোন *</Label>
          <Input
            id="phone"
            name="phone"
            required
            defaultValue={employee?.phone ?? ""}
            placeholder="+880 ..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">ইমেইল (লগইন) *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={employee?.user.email ?? ""}
            autoComplete="email"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">
          পাসওয়ার্ড {mode === "create" ? "*" : "(খালি রাখলে পরিবর্তন হবে না)"}
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          required={mode === "create"}
          autoComplete="new-password"
          placeholder="••••••••"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="salary">মাসিক বেতন (৳)</Label>
          <Input
            id="salary"
            name="salary"
            type="number"
            min={0}
            required
            defaultValue={employee?.salary ?? 0}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="joiningDate">যোগদানের তারিখ *</Label>
          <Input
            id="joiningDate"
            name="joiningDate"
            type="date"
            required
            defaultValue={jd}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="role">ভূমিকা *</Label>
          <select
            id="role"
            name="role"
            required
            defaultValue={employee?.user.role ?? "PRODUCTION"}
            className={cn(
              "flex h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--input-background)] px-3 py-2 text-sm",
              "ring-offset-[var(--background)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            )}
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {ROLE_LABELS[r]}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">স্ট্যাটাস *</Label>
          <select
            id="status"
            name="status"
            required
            defaultValue={employee?.status ?? "ACTIVE"}
            className={cn(
              "flex h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--input-background)] px-3 py-2 text-sm",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            )}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {employeeStatusLabel[s]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="profilePhoto">প্রোফাইল ছবির URL (ঐচ্ছিক)</Label>
        <Input
          id="profilePhoto"
          name="profilePhoto"
          type="url"
          defaultValue={employee?.profilePhoto ?? ""}
          placeholder="https://..."
        />
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button type="submit">
          <SubmitLabel idle="সংরক্ষণ করুন" pending="সংরক্ষণ হচ্ছে…" />
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard/employees")}
        >
          বাতিল
        </Button>
      </div>
    </form>
  );
}
