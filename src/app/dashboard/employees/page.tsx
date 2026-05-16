import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { canManageEmployees } from "@/lib/roles";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ROLE_LABELS } from "@/lib/roles";
import { employeeStatusLabel } from "@/lib/enum-labels";
import { formatBdt, formatBnDate } from "@/lib/format-bn";
import { DeleteEmployeeButton } from "@/components/employees/delete-employee-button";

export default async function EmployeesManagementPage() {
  const session = await auth();
  if (!session?.user?.role || !canManageEmployees(session.user.role)) {
    redirect("/dashboard");
  }

  const rows = await prisma.employee.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold md:text-2xl">
            কর্মচারী ব্যবস্থাপনা
          </h2>
          <p className="text-sm text-[var(--muted-foreground)]">
            নতুন কর্মচারী যোগ, ভূমিকা ও স্ট্যাটাস নিয়ন্ত্রণ।
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/employees/new" className="gap-2">
            <Plus className="h-4 w-4" />
            নতুন কর্মচারী
          </Link>
        </Button>
      </div>

      <Card className="glass-card border-[var(--border)]">
        <CardHeader>
          <CardTitle>সকল কর্মচারী</CardTitle>
          <CardDescription>
            মোট {rows.length} জন · লগইন ইমেইল ও ভূমিকা সহ।
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0 sm:p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>নাম</TableHead>
                <TableHead className="hidden md:table-cell">ইমেইল</TableHead>
                <TableHead className="hidden sm:table-cell">ফোন</TableHead>
                <TableHead>ভূমিকা</TableHead>
                <TableHead className="hidden lg:table-cell">বেতন</TableHead>
                <TableHead>স্ট্যাটাস</TableHead>
                <TableHead className="hidden xl:table-cell">যোগদান</TableHead>
                <TableHead className="text-end">কর্ম</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell className="hidden max-w-[10rem] truncate md:table-cell">
                    {r.user.email}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{r.phone}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {ROLE_LABELS[r.user.role]}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {formatBdt(r.salary)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        r.status === "ACTIVE"
                          ? "success"
                          : r.status === "ON_LEAVE"
                            ? "warning"
                            : "outline"
                      }
                    >
                      {employeeStatusLabel[r.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden text-sm text-[var(--muted-foreground)] xl:table-cell">
                    {formatBnDate(r.joiningDate)}
                  </TableCell>
                  <TableCell className="text-end">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" asChild>
                        <Link
                          href={`/dashboard/employees/${r.id}/edit`}
                          aria-label="সম্পাদনা"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <DeleteEmployeeButton
                        employeeId={r.id}
                        disabled={r.userId === session.user.id}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
