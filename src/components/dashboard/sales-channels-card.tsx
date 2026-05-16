import Link from "next/link";
import { ArrowUpRight, Box, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const wholesale = [
  { id: "WS-1092", buyer: "বায়তুল আবায়া", city: "সিলেট", qty: 1200, due: "২০ মে" },
  { id: "WS-1093", buyer: "আল-খারিজি ট্রেড", city: "ঢাকা", qty: 800, due: "২২ মে" },
];

const retail = [
  { id: "RT-8841", src: "ফেসবুক শপ", sku: "NB-BRK-09", amount: "৳ ৫,২০০" },
  { id: "RT-8842", src: "ওয়েবসাইট", sku: "NB-ABY-14", amount: "৳ ৮,৭৫০" },
];

export function SalesChannelsCard() {
  return (
    <Card className="glass-card border-[var(--border)]">
      <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-4">
        <div>
          <CardTitle>হোলসেল ও খুচরা</CardTitle>
          <CardDescription>
            B2B চুক্তি ও B2C চেকআউট — আলাদা কিউ ও বিলিং
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/wholesale-retail" className="gap-1">
            ব্যবস্থাপনা
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="wholesale" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-grid">
            <TabsTrigger value="wholesale">হোলসেল</TabsTrigger>
            <TabsTrigger value="retail">খুচরা</TabsTrigger>
          </TabsList>
          <TabsContent value="wholesale" className="mt-4">
            <div className="mb-3 flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
              <Layers className="h-4 w-4" />
              সক্রিয় চুক্তি এবং ডেলিভারি উইন্ডো
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>চুক্তি</TableHead>
                  <TableHead className="hidden sm:table-cell">ক্রেতা</TableHead>
                  <TableHead className="hidden md:table-cell">শহর</TableHead>
                  <TableHead>পিস</TableHead>
                  <TableHead>শেষ তারিখ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wholesale.map((w) => (
                  <TableRow key={w.id}>
                    <TableCell className="font-medium">{w.id}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {w.buyer}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{w.city}</TableCell>
                    <TableCell>{w.qty}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{w.due}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="retail" className="mt-4">
            <div className="mb-3 flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
              <Box className="h-4 w-4" />
              সর্বশেষ খুচরা চেকআউট (কাস্টমাইজেশন সহ)
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>রসিদ</TableHead>
                  <TableHead className="hidden sm:table-cell">সোর্স</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>অর্ডার মূল্য</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {retail.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.id}</TableCell>
                    <TableCell className="hidden sm:table-cell">{r.src}</TableCell>
                    <TableCell className="font-mono text-xs">{r.sku}</TableCell>
                    <TableCell className="font-medium">{r.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
