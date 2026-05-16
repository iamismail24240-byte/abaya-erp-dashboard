import Link from "next/link";
import { AlertTriangle, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

const stock = [
  { sku: "FAB-JET-180", name: "জর্জেট রোল", onHand: "১২ রোল", days: "১৮ দিন" },
  { sku: "ACC-LCE-02", name: "লেস ট্রিম গোল্ড", onHand: "৪৪ মিটার", days: "৯ দিন" },
  { sku: "ZIP-YKK-60", name: "ইনভিজিবল জিপ", onHand: "১২০ ইউনিট", days: "২৬ দিন" },
];

export function InventoryAlertsCard() {
  return (
    <Card className="glass-card border-[var(--border)]">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-[var(--warning)]" />
            ইনভেন্টরি সতর্কতা
          </CardTitle>
          <CardDescription>
            দ্রুত সরবরাহ শেষ হওয়ার আগে রি-অর্ডার সুপারিশ
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/inventory" className="gap-1">
            স্টক শীট
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead className="hidden sm:table-cell">আইটেম</TableHead>
              <TableHead>হাতে</TableHead>
              <TableHead className="hidden md:table-cell">কভারেজ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stock.map((s) => (
              <TableRow key={s.sku}>
                <TableCell className="font-mono text-xs font-medium">
                  {s.sku}
                </TableCell>
                <TableCell className="hidden sm:table-cell">{s.name}</TableCell>
                <TableCell>{s.onHand}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="warning">{s.days}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
