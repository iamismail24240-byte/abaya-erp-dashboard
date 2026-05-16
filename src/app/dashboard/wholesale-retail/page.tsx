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
import { Badge } from "@/components/ui/badge";

const ws = [
  { id: "WS-1092", party: "বায়তুল আবায়া", moq: "১২০০ পিস", price: "৳ ১৮,৪০,০০০" },
  { id: "WS-1093", party: "আল-খারিজি ট্রেড", moq: "৮০০ পিস", price: "৳ ১২,৬০,০০০" },
];

const rt = [
  { id: "RT-8841", ch: "ফেসবুক", pay: "COD", amt: "৳ ৫,২০০" },
  { id: "RT-8842", ch: "ওয়েব", pay: "ব্যাংক ট্রান্সফার", amt: "৳ ৮,৭৫০" },
];

export default function WholesaleRetailReportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold md:text-2xl">
          হোলসেল ও খুচরা রিপোর্ট
        </h2>
        <p className="text-sm text-[var(--muted-foreground)]">
          পৃথক মূল্য তালিকা ও চ্যানেল (ডেমো সারি)।
        </p>
      </div>
      <Card className="glass-card border-[var(--border)]">
        <CardHeader>
          <CardTitle>চ্যানেল ভিত্তিক অর্ডার</CardTitle>
          <CardDescription>
            হোলসেল MOQ ও খুচরা চেকআউট এক পর্দায়।
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="wholesale">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="wholesale">হোলসেল</TabsTrigger>
              <TabsTrigger value="retail">খুচরা</TabsTrigger>
            </TabsList>
            <TabsContent value="wholesale" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>চুক্তি</TableHead>
                    <TableHead>পক্ষ</TableHead>
                    <TableHead>MOQ</TableHead>
                    <TableHead>ইনভয়েস</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ws.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.id}</TableCell>
                      <TableCell>{r.party}</TableCell>
                      <TableCell>{r.moq}</TableCell>
                      <TableCell>{r.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="retail" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>রসিদ</TableHead>
                    <TableHead>চ্যানেল</TableHead>
                    <TableHead>পরিশোধ</TableHead>
                    <TableHead>মূল্য</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rt.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.id}</TableCell>
                      <TableCell>{r.ch}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{r.pay}</Badge>
                      </TableCell>
                      <TableCell>{r.amt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
