import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function ProductionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold md:text-2xl">উৎপাদন ট্র্যাকিং</h2>
        <p className="text-sm text-[var(--muted-foreground)]">
          লাইন ও চক্রভিত্তিক অগ্রগতি · বিল অফ মেটেরিয়াল লিংকযোগ্য (ডেমো)
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { name: "লাইন A · ক্লাসিক আবায়া", v: 78 },
          { name: "লাইন B · বোরকা প্রিমিয়াম", v: 64 },
          { name: "লাইন C · কাস্টম নকশা", v: 42 },
          { name: "ছোট অর্ডার · উইকএন্ড ব্যাচ", v: 91 },
        ].map((l) => (
          <Card key={l.name} className="glass-card border-[var(--border)]">
            <CardHeader>
              <CardTitle className="text-base">{l.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Progress value={l.v} />
              <p className="text-xs text-[var(--muted-foreground)]">
                লক্ষ্য সম্পূর্ণতা: {l.v}%
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
