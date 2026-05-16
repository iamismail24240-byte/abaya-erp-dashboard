"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { deleteEmployee } from "@/actions/employee-actions";

export function DeleteEmployeeButton({
  employeeId,
  disabled,
}: {
  employeeId: string;
  disabled?: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="text-[var(--destructive)]"
      disabled={disabled || pending}
      aria-label="মুছুন"
      onClick={() => {
        if (
          !confirm(
            "এই কর্মচারী ও তার লগইন চিরতরে মুছে যাবে। নিশ্চিত?"
          )
        )
          return;
        startTransition(async () => {
          const r = await deleteEmployee(employeeId);
          if (!r.ok && r.error) alert(r.error);
          window.location.reload();
        });
      }}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
