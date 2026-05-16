import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatBdt } from "@/lib/format-bn";

export default async function CommissionsPage() {
  const session = await auth();
  const role = session?.user?.role;
  if (!role || !["SUPER_ADMIN", "MANAGER", "SALES"].includes(role)) {
    redirect("/dashboard");
  }

  const empId = session.user.employeeId;
  const where =
    role === "SALES" && empId ? { employeeId: empId } : {};

  const rows = await prisma.commission.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      order: { select: { orderNo: true, customerName: true, amount: true } },
      employee: { select: { name: true } },
    },
  });

  const total = rows.reduce((a, r) => a + r.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold md:text-2xl">কমিশন</h2>
        <p className="text-sm text-[var(--muted-foreground)]">
          অর্ডার ভিত্তিক কমিশন — হোলসেল {`২.৫%`} / খুচরা {`৫%`} (ডেমো নিয়ম)।
        </p>
      </div>

      <Card className="glass-card border-[var(--border)]">
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
          <CardTitle>কমিশন লেজার</CardTitle>
          <p className="text-sm font-medium text-[var(--primary)]">
            মোট কমিশন: {formatBdt(total)}
          </p>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0 sm:p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>কর্মচারী</TableHead>
                <TableHead>অর্ডার</TableHead>
                <TableHead className="hidden md:table-cell">ক্রেতা</TableHead>
                <TableHead className="text-end">অর্ডার মূল্য</TableHead>
                <TableHead className="text-end">হার %</TableHead>
                <TableHead className="text-end">কমিশন</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.employee.name}</TableCell>
                  <TableCell className="font-mono text-xs">
                    {r.order.orderNo}
                  </TableCell>
                  <TableCell className="hidden max-w-[10rem] truncate md:table-cell">
                    {r.order.customerName}
                  </TableCell>
                  <TableCell className="text-end">
                    {formatBdt(r.order.amount)}
                  </TableCell>
                  <TableCell className="text-end">{r.ratePercent}%</TableCell>
                  <TableCell className="text-end font-semibold text-[var(--primary)]">
                    {formatBdt(r.amount)}
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
