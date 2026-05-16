import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stages = [
  { name: "অর্ডার নিশ্চিত", n: 42, sla: "১ ঘণ্টা" },
  { name: "কাটিং শেষ", n: 36, sla: "৬ ঘণ্টা" },
  { name: "সেলাই চলছে", n: 28, sla: "১৮ ঘণ্টা" },
  { name: "ফিনিশ ও আয়রন", n: 19, sla: "৬ ঘণ্টা" },
  { name: "QC পাস", n: 14, sla: "৩ ঘণ্টা" },
  { name: "ডেলিভারি সাজানো", n: 9, sla: "২ ঘণ্টা" },
];

export default function OrderStatusPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold md:text-2xl">অর্ডার স্ট্যাটাস</h2>
        <p className="text-sm text-[var(--muted-foreground)]">
          SLA ও টিকেট কিউ · অগ্রাধিকার ট্যাগযোগ্য
        </p>
      </div>
      <div className="grid gap-3">
        {stages.map((s) => (
          <Card key={s.name} className="glass-card border-[var(--border)]">
            <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 space-y-0 pb-3">
              <CardTitle className="text-base">{s.name}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{s.n} অর্ডার</Badge>
                <Badge variant="outline">SLA {s.sla}</Badge>
              </div>
            </CardHeader>
            <CardContent className="h-1.5 rounded-full bg-[var(--muted)]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--chart-4)]"
                style={{ width: `${Math.min(100, 35 + s.n)}%` }}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
