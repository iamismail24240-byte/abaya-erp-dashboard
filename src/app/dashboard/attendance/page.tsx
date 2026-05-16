import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatBnDate } from "@/lib/format-bn";
import { attendanceStatusLabel } from "@/lib/enum-labels";

export default async function AttendancePage() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  const role = session.user.role;
  const selfId = session.user.employeeId;

  const list = await prisma.attendance.findMany({
    where:
      role === "SUPER_ADMIN" || role === "MANAGER"
        ? {}
        : selfId
          ? { employeeId: selfId }
          : {},
    orderBy: { date: "desc" },
    take: 40,
    include: { employee: { select: { name: true } } },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold md:text-2xl">উপস্থিতি</h2>
        <p className="text-sm text-[var(--muted-foreground)]">
          হাজিরা রেজিস্টার — সকলের জন্য দৃশ্যমান (ডেমো ডেটা)।
        </p>
      </div>

      <Card className="glass-card border-[var(--border)]">
        <CardHeader>
          <CardTitle>সাম্প্রতিক রেকর্ড</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0 sm:p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>তারিখ</TableHead>
                <TableHead>কর্মচারী</TableHead>
                <TableHead className="hidden sm:table-cell">প্রবেশ</TableHead>
                <TableHead className="hidden sm:table-cell">প্রস্থান</TableHead>
                <TableHead>স্ট্যাটাস</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="whitespace-nowrap">
                    {formatBnDate(r.date)}
                  </TableCell>
                  <TableCell>{r.employee.name}</TableCell>
                  <TableCell className="hidden sm:table-cell">{r.checkIn}</TableCell>
                  <TableCell className="hidden sm:table-cell">{r.checkOut}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {attendanceStatusLabel[r.status]}
                    </Badge>
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
