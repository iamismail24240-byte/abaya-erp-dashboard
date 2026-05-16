import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatBdt } from "@/lib/format-bn";
import { formatBnDate } from "@/lib/format-bn";

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export default async function SalesTargetsPage() {
  const session = await auth();
  const role = session?.user?.role;
  if (!role || !["SUPER_ADMIN", "MANAGER", "SALES"].includes(role)) {
    redirect("/dashboard");
  }

  const empId = session.user.employeeId;
  const salesTeam = await prisma.employee.findMany({
    where:
      role === "SALES" && empId
        ? { id: empId }
        : { user: { role: "SALES" } },
    select: { id: true, name: true },
  });

  const today = startOfDay(new Date());

  const targets = await prisma.salesDailyTarget.findMany({
    where: {
      date: today,
      employeeId: { in: salesTeam.map((s) => s.id) },
    },
  });

  const achievedToday = await prisma.salesOrder.groupBy({
    by: ["salespersonId"],
    where: {
      createdAt: {
        gte: today,
        lt: new Date(today.getTime() + 86400000),
      },
      salespersonId: { in: salesTeam.map((s) => s.id) },
    },
    _sum: { amount: true },
  });

  const achMap = Object.fromEntries(
    achievedToday.map((a) => [a.salespersonId, a._sum.amount ?? 0])
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold md:text-2xl">দৈনিক বিক্রয় লক্ষ্য</h2>
        <p className="text-sm text-[var(--muted-foreground)]">
          আজ ({formatBnDate(today)}) — লক্ষ্য অর্জন অনুপাত (ডেমো)।
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {salesTeam.map((s) => {
          const t = targets.find((x) => x.employeeId === s.id)?.targetAmount ?? 0;
          const a = achMap[s.id] ?? 0;
          const pct = t > 0 ? Math.min(100, Math.round((a / t) * 100)) : 0;
          return (
            <Card key={s.id} className="glass-card border-[var(--border)]">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{s.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">লক্ষ্য</span>
                  <span>{formatBdt(t)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">অর্জন (আজ)</span>
                  <span className="font-semibold text-[var(--primary)]">
                    {formatBdt(a)}
                  </span>
                </div>
                <Progress value={pct} />
                <p className="text-xs text-[var(--muted-foreground)]">
                  {pct}% সম্পূর্ণ
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
