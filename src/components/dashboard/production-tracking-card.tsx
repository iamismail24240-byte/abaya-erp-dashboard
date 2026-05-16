import { Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const lines = [
  { name: "লাইন A — ক্লাসিক আবায়া", progress: 78, status: "চালু" as const },
  { name: "লাইন B — বোরকা প্রিমিয়াম", progress: 64, status: "চালু" as const },
  { name: "লাইন C — কাস্টম নকশা", progress: 42, status: "রক্ষণাবেক্ষণ" as const },
];

export function ProductionTrackingCard() {
  return (
    <Card className="glass-card border-[var(--border)]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)]/12 text-[var(--primary)]">
            <Cpu className="h-5 w-5" />
          </span>
          উৎপাদন ট্র্যাকিং
        </CardTitle>
        <Badge variant="success">লাইভ</Badge>
      </CardHeader>
      <CardContent className="space-y-5">
        {lines.map((line) => (
          <div key={line.name} className="space-y-2">
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="font-medium leading-snug">{line.name}</span>
              <span className="text-xs text-[var(--muted-foreground)]">
                {line.progress}%
              </span>
            </div>
            <Progress value={line.progress} />
            <p className="text-xs text-[var(--muted-foreground)]">
              অবস্থা:{" "}
              <span className="text-[var(--foreground)]">{line.status}</span>
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
