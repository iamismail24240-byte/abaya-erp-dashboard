import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const live = [
  { label: "বিদ্যুৎ গ্রিড", v: "স্থিতিশীল" },
  { label: "এসি সেলাই হল", v: "২৪ °C" },
  { label: "জেনারেটার", v: "স্ট্যানবাই" },
  { label: "উৎপাদন আউটপুট (ঘণ্টা)", v: "+৪.২%" },
];

export default function FactoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold md:text-2xl">ফ্যাক্টরি স্ট্যাটাস</h2>
        <p className="text-sm text-[var(--muted-foreground)]">
          পরিবেশ ও সরঞ্জাম — রিয়েলটাইম সেন্সরে সংযোগ (ডেমো মান)
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {live.map((x) => (
          <Card key={x.label} className="glass-card border-[var(--border)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">
                {x.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">{x.v}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="glass-card border-[var(--border)]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">লাইন স্ট্যাটাস</CardTitle>
          <Badge variant="success">অপটিম্যাল</Badge>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-[var(--muted-foreground)]">
          সকল মেশিনে পিএম সম্পন্ন। C লাইনে সূক্ষ্ম সামঞ্জস্য চলছে; আনুমানিক ডাউনটাইম{" "}
          <span className="font-medium text-[var(--foreground)]">১২ মিনিট</span>{" "}
          (আজ)।
        </CardContent>
      </Card>
    </div>
  );
}
