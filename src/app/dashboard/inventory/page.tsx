import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const items = [
  { sku: "FAB-JET-180", loc: "A-12", qty: "১২ রোল", risk: "নিম্ন" },
  { sku: "ACC-LCE-02", loc: "B-04", qty: "৪৪ মিটার", risk: "মাঝারি" },
  { sku: "PKG-BOX-L", loc: "S-01", qty: "৬০০ বাক্স", risk: "ভালো" },
];

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold md:text-2xl">ইনভেন্টরি</h2>
        <p className="text-sm text-[var(--muted-foreground)]">
          কাপড়, অ্যাকসেসরিজ ও প্যাকেজিং — বিন অবস্থান সহ
        </p>
      </div>
      <Card className="glass-card border-[var(--border)]">
        <CardHeader>
          <CardTitle>দ্রুত সন্ধান</CardTitle>
          <CardDescription>SKU বা বিন লেবেল দিয়ে ফিল্টার (ডেমো)।</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="sku">SKU</Label>
            <Input id="sku" placeholder="যেমন FAB-JET-180" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bin">বিন</Label>
            <Input id="bin" placeholder="যেমন A-12" />
          </div>
        </CardContent>
      </Card>
      <Card className="glass-card border-[var(--border)]">
        <CardHeader>
          <CardTitle>স্টক সারাংশ</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>বিন</TableHead>
                <TableHead>পরিমাণ</TableHead>
                <TableHead>ঝুঁকি</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((i) => (
                <TableRow key={i.sku}>
                  <TableCell className="font-mono text-xs font-medium">
                    {i.sku}
                  </TableCell>
                  <TableCell>{i.loc}</TableCell>
                  <TableCell>{i.qty}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        i.risk === "ভালো"
                          ? "success"
                          : i.risk === "মাঝারি"
                            ? "warning"
                            : "destructive"
                      }
                    >
                      {i.risk}
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
