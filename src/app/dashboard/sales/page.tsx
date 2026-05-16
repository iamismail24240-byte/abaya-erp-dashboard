import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatBdt } from "@/lib/format-bn";
import { Badge } from "@/components/ui/badge";
import { redirect } from "next/navigation";
import { orderChannelLabel, orderStatusLabel } from "@/lib/enum-labels";

export default async function SalesDashboardPage() {
  const session = await auth();
  const role = session?.user?.role;
  if (!role || !["SUPER_ADMIN", "MANAGER", "SALES"].includes(role)) {
    redirect("/dashboard");
  }

  const empId = session.user.employeeId;
  const scope =
    role === "SALES" && empId
      ? { salespersonId: empId }
      : {};

  const [orders, totals, byChannel, topReps] = await Promise.all([
    prisma.salesOrder.findMany({
      where: scope,
      orderBy: { createdAt: "desc" },
      take: 8,
      include: { salesperson: true },
    }),
    prisma.salesOrder.aggregate({
      where: scope,
      _sum: { amount: true },
      _count: true,
    }),
    prisma.salesOrder.groupBy({
      by: ["channel"],
      where: scope,
      _sum: { amount: true },
    }),
    prisma.salesOrder.groupBy({
      by: ["salespersonId"],
      where: scope,
      _sum: { amount: true },
    }),
  ]);

  const repIds = topReps.map((t) => t.salespersonId);
  const reps = await prisma.employee.findMany({
    where: { id: { in: repIds } },
    select: { id: true, name: true },
  });
  const repMap = Object.fromEntries(reps.map((r) => [r.id, r.name]));

  const totalAmount = totals._sum.amount ?? 0;
  const channelWholesale =
    byChannel.find((c) => c.channel === "WHOLESALE")?._sum.amount ?? 0;
  const channelRetail =
    byChannel.find((c) => c.channel === "RETAIL")?._sum.amount ?? 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold md:text-2xl">বিক্রয় ড্যাশবোর্ড</h2>
        <p className="text-sm text-[var(--muted-foreground)]">
          {role === "SALES"
            ? "আপনার অর্ডার ও অবদান।"
            : "দলীয় বিক্রয় ও চ্যানেল সারাংশ।"}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card border-[var(--border)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">
              মোট বিক্রয়
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{formatBdt(totalAmount)}</p>
            <p className="text-xs text-[var(--muted-foreground)]">
              {totals._count} টি অর্ডার
            </p>
          </CardContent>
        </Card>
        <Card className="glass-card border-[var(--border)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">
              হোলসেল
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{formatBdt(channelWholesale)}</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-[var(--border)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">
              খুচরা
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{formatBdt(channelRetail)}</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-[var(--border)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">
              শীর্ষ প্রতিনিধি (অংশ)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            {topReps.slice(0, 3).map((t) => (
              <div
                key={t.salespersonId}
                className="flex justify-between gap-2"
              >
                <span className="truncate">{repMap[t.salespersonId] ?? "—"}</span>
                <span className="shrink-0 font-medium">
                  {formatBdt(t._sum.amount ?? 0)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card border-[var(--border)]">
        <CardHeader>
          <CardTitle>সাম্প্রতিক অর্ডার</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0 sm:p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-start text-[var(--muted-foreground)]">
                <th className="p-3 font-medium">অর্ডার</th>
                <th className="p-3 font-medium">ক্রেতা</th>
                <th className="hidden p-3 font-medium md:table-cell">বিক্রয়কর্মী</th>
                <th className="p-3 font-medium">চ্যানেল</th>
                <th className="p-3 font-medium">অবস্থা</th>
                <th className="p-3 font-medium text-end">পরিমাণ</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-[var(--border)]/80 hover:bg-[var(--muted)]/20"
                >
                  <td className="p-3 font-mono text-xs">{o.orderNo}</td>
                  <td className="p-3">{o.customerName}</td>
                  <td className="hidden p-3 md:table-cell">
                    {o.salesperson.name}
                  </td>
                  <td className="p-3">
                    <Badge variant="outline">
                      {orderChannelLabel[o.channel]}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <Badge variant="secondary">
                      {orderStatusLabel[o.status]}
                    </Badge>
                  </td>
                  <td className="p-3 text-end font-medium">
                    {formatBdt(o.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <p className="text-center text-sm text-[var(--muted-foreground)]">
        হোলসেল/খুচরা রিপোর্ট টেবিলের জন্য{" "}
        <Link href="/dashboard/wholesale-retail" className="text-[var(--primary)] underline">
          এখানে যান
        </Link>
        ।
      </p>
    </div>
  );
}
