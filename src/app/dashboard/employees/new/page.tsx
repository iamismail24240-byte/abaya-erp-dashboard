import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { canManageEmployees } from "@/lib/roles";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createEmployee } from "@/actions/employee-actions";
import { EmployeeForm } from "@/components/employees/employee-form";

export default async function NewEmployeePage() {
  const session = await auth();
  if (!session?.user?.role || !canManageEmployees(session.user.role)) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold md:text-2xl">নতুন কর্মচারী</h2>
        <p className="text-sm text-[var(--muted-foreground)]">
          ইমেইল ও পাসওয়ার্ড দিয়ে লগইন অ্যাকাউন্ট তৈরি হবে।
        </p>
      </div>
      <Card className="glass-card border-[var(--border)]">
        <CardHeader>
          <CardTitle>ব্যক্তিগত ও চাকরির তথ্য</CardTitle>
          <CardDescription>সব বাধ্যতামূলক ঘর (*) পূরণ করুন।</CardDescription>
        </CardHeader>
        <CardContent>
          <EmployeeForm action={createEmployee} mode="create" />
        </CardContent>
      </Card>
    </div>
  );
}
