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

const rows = [
  { id: "NF-2048", buyer: "আলনূর বুটিক · ঢাকা", ch: "হোলসেল", pcs: 240, due: "আজ সন্ধ্যা" },
  { id: "NF-2049", buyer: "হিজাব হাউজ · চট্টগ্রাম", ch: "খুচরা", pcs: 18, due: "আগামীকাল" },
  { id: "NF-2050", buyer: "রুফায়েদা টেক্সটাইল", ch: "হোলসেল", pcs: 500, due: "৪৮ ঘণ্টা" },
  { id: "NF-2051", buyer: "ওয়েবসাইট — কাস্টমার", ch: "খুচরা", pcs: 6, due: "আজ বিকাল" },
];

export default function TodayOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold md:text-2xl">আজকের অর্ডার</h2>
        <p className="text-sm text-[var(--muted-foreground)]">
          ফিল্টার: চ্যানেল · শিফট · লাইন (ডেমো ডেটা)
        </p>
      </div>
      <Card className="glass-card border-[var(--border)]">
        <CardHeader>
          <CardTitle>সম্পূর্ণ তালিকা</CardTitle>
          <CardDescription>
            উৎপাদন সূচি ও পূরণের সময় একসাথে ট্র্যাক করুন।
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>অর্ডার</TableHead>
                <TableHead>ক্রেতা</TableHead>
                <TableHead>চ্যানেল</TableHead>
                <TableHead>পিস</TableHead>
                <TableHead>টার্নঅ্যারাউন্ড</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.id}</TableCell>
                  <TableCell>{r.buyer}</TableCell>
                  <TableCell>
                    <Badge variant={r.ch === "হোলসেল" ? "secondary" : "outline"}>
                      {r.ch}
                    </Badge>
                  </TableCell>
                  <TableCell>{r.pcs}</TableCell>
                  <TableCell>{r.due}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
