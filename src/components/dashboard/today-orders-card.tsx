import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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

const todayOrders = [
  {
    id: "NF-2048",
    customer: "আলনূর বুটিক · ঢাকা",
    channel: "হোলসেল" as const,
    pieces: 240,
    stage: "সেলাই",
    eta: "আজ, সন্ধ্যা",
  },
  {
    id: "NF-2049",
    customer: "হিজাব হাউজ · চট্টগ্রাম",
    channel: "খুচরা" as const,
    pieces: 18,
    stage: "কাটিং",
    eta: "আগামীকাল",
  },
  {
    id: "NF-2050",
    customer: "রুফায়েদা টেক্সটাইল",
    channel: "হোলসেল" as const,
    pieces: 500,
    stage: "QC",
    eta: "২ দিন",
  },
  {
    id: "NF-2051",
    customer: "অনলাইন — ওয়েবসাইট",
    channel: "খুচরা" as const,
    pieces: 6,
    stage: "প্যাকেজিং",
    eta: "আজ, বিকাল",
  },
];

export function TodayOrdersCard() {
  return (
    <Card className="glass-card border-[var(--border)]">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div>
          <CardTitle>আজকের অর্ডার</CardTitle>
          <CardDescription>
            হোলসেল ও খুচরা — বর্তমান উৎপাদন ধাপ
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/today-orders" className="gap-1">
            সব দেখুন
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>অর্ডার</TableHead>
              <TableHead className="hidden sm:table-cell">ক্রেতা</TableHead>
              <TableHead>চ্যানেল</TableHead>
              <TableHead className="hidden md:table-cell">পিস</TableHead>
              <TableHead>ধাপ</TableHead>
              <TableHead className="hidden lg:table-cell">সময়</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todayOrders.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.id}</TableCell>
                <TableCell className="hidden max-w-[12rem] truncate sm:table-cell">
                  {row.customer}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      row.channel === "হোলসেল" ? "secondary" : "outline"
                    }
                  >
                    {row.channel}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {row.pieces}
                </TableCell>
                <TableCell>
                  <Badge variant="success">{row.stage}</Badge>
                </TableCell>
                <TableCell className="hidden text-[var(--muted-foreground)] lg:table-cell">
                  {row.eta}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
