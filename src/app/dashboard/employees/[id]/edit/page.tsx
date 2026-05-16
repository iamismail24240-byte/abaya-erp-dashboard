import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { canManageEmployees } from "@/lib/roles";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { updateEmployee } from "@/actions/employee-actions";
import { EmployeeForm } from "@/components/employees/employee-form";

type Props = { params: Promise<{ id: string }> };

export default async function EditEmployeePage({ params }: Props) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.role || !canManageEmployees(session.user.role)) {
    redirect("/dashboard");
  }

  const employee = await prisma.employee.findUnique({
    where: { id },
    include: { user: true },
  });
  if (!employee) notFound();

  const boundUpdate = updateEmployee.bind(null, id);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold md:text-2xl">
          কর্মচারী সম্পাদনা
        </h2>
        <p className="text-sm text-[var(--muted-foreground)]">{employee.name}</p>
      </div>
      <Card className="glass-card border-[var(--border)]">
        <CardHeader>
          <CardTitle>তথ্য হালনাগাদ</CardTitle>
          <CardDescription>
            পাসওয়ার্ড খালি রাখলে পুরনোই থাকবে।
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmployeeForm
            action={boundUpdate}
            employee={employee}
            mode="edit"
          />
        </CardContent>
      </Card>
    </div>
  );
}
