import { Factory, LayoutGrid } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const stations = [
  { name: "কাটিং ইউনিট", load: "মাঝারি", color: "warning" as const },
  { name: "সেলাই ব্লক-১", load: "পূর্ণ", color: "success" as const },
  { name: "সেলাই ব্লক-২", load: "পূর্ণ", color: "success" as const },
  { name: "ফিনিশিং", load: "হালকা", color: "secondary" as const },
  { name: "QC ল্যাব", load: "মাঝারি", color: "warning" as const },
];

const pipeline = [
  { step: "অর্ডার কনফার্ম", count: 42 },
  { step: "কাটিং", count: 36 },
  { step: "সেলাই", count: 28 },
  { step: "ফিনিশ", count: 19 },
  { step: "QC", count: 14 },
  { step: "ডিপো / ডেলিভারি", count: 9 },
];

export function FactoryAndPipeline() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="glass-card border-[var(--border)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Factory className="h-5 w-5 text-[var(--primary)]" />
            ফ্যাক্টরি স্ট্যাটাস
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {stations.map((s) => (
            <div
              key={s.name}
              className="rounded-xl border border-[var(--border)] bg-[var(--muted)]/25 px-3 py-3"
            >
              <p className="text-sm font-medium">{s.name}</p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="text-xs text-[var(--muted-foreground)]">
                  লোড
                </span>
                <Badge
                  variant={
                    s.color === "success"
                      ? "success"
                      : s.color === "warning"
                        ? "warning"
                        : "secondary"
                  }
                >
                  {s.load}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="glass-card border-[var(--border)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <LayoutGrid className="h-5 w-5 text-[var(--primary)]" />
            অর্ডার স্ট্যাটাস (পাইপলাইন)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-0">
          {pipeline.map((p, i) => (
            <div key={p.step}>
              <div className="flex items-center justify-between gap-3 py-2.5">
                <span className="text-sm font-medium">{p.step}</span>
                <span className="tabular-nums text-sm text-[var(--muted-foreground)]">
                  {p.count} অর্ডার
                </span>
              </div>
              {i < pipeline.length - 1 ? (
                <Separator className="bg-[var(--border)]" />
              ) : null}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
