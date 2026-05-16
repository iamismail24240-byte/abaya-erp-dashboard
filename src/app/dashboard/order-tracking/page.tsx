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
import { Badge } from "@/components/ui/badge";
import { formatBdt } from "@/lib/format-bn";
import { orderChannelLabel, orderStatusLabel } from "@/lib/enum-labels";

export default async function OrderTrackingPage() {
  const session = await auth();
  const role = session?.user?.role;
  if (
    !role ||
    !["SUPER_ADMIN", "MANAGER", "SALES", "PRODUCTION"].includes(role)
  ) {
    redirect("/dashboard");
  }

  const empId = session.user.employeeId;
  const orders = await prisma.salesOrder.findMany({
    where:
      role === "SALES" && empId
        ? { salespersonId: empId }
        : {},
    orderBy: { createdAt: "desc" },
    include: { salesperson: { select: { name: true, id: true } } },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold md:text-2xl">
          অর্ডার ট্র্যাকিং (কর্মচারী অনুযায়ী)
        </h2>
        <p className="text-sm text-[var(--muted-foreground)]">
          বিক্রয় প্রতিনিধি ও অবস্থার ভিত্তিতে —{" "}
          {role === "SALES" || role === "PRODUCTION"
            ? "আপনার অর্ডার।"
            : "সম্পূর্ণ দল।"}
        </p>
      </div>

      <Card className="glass-card border-[var(--border)]">
        <CardHeader>
          <CardTitle>অর্ডার তালিকা</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0 sm:p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>অর্ডার নং</TableHead>
                <TableHead>ক্রেতা</TableHead>
                <TableHead className="hidden sm:table-cell">বিক্রয়কর্মী</TableHead>
                <TableHead>চ্যানেল</TableHead>
                <TableHead>অবস্থা</TableHead>
                <TableHead className="text-end">মূল্য</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-mono text-xs">{o.orderNo}</TableCell>
                  <TableCell className="max-w-[12rem] truncate">
                    {o.customerName}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {o.salesperson.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {orderChannelLabel[o.channel]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {orderStatusLabel[o.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-end font-medium">
                    {formatBdt(o.amount)}
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
