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

const payroll = [
  { name: "সাবিনা খাতুন", base: "৳ ৩২,০০০", bonus: "৳ ২,৫০০", net: "৳ ৩৪,৫০০", state: "প্রস্তুত" },
  { name: "তানভীর হাসান", base: "৳ ৩৮,৫০০", bonus: "—", net: "৳ ৩৮,৫০০", state: "প্রস্তুত" },
  { name: "নাফিসা বেগম", base: "৳ ২৮,০০০", bonus: "—", net: "৳ ২৮,০০০", state: "পর্যালোচনা" },
];

export default function SalaryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold md:text-2xl">বেতন ব্যবস্থা</h2>
        <p className="text-sm text-[var(--muted-foreground)]">
          চক্র: ১৬ মে পরিশোধ · ব্যাংক ব্যাচ শুক্রবার
        </p>
      </div>
      <Card className="glass-card border-[var(--border)]">
        <CardHeader>
          <CardTitle>পে-রোল সারাংশ</CardTitle>
          <CardDescription>
            ভাতা, ওভারটাইম ও করের প্রোফাইল ERP থেকে টেনে আনা হবে।
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>কর্মচারী</TableHead>
                <TableHead>বেসিক</TableHead>
                <TableHead>বোনাস / ভাতা</TableHead>
                <TableHead>নিট</TableHead>
                <TableHead>অবস্থা</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payroll.map((r) => (
                <TableRow key={r.name}>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell>{r.base}</TableCell>
                  <TableCell className="text-[var(--muted-foreground)]">{r.bonus}</TableCell>
                  <TableCell className="font-medium">{r.net}</TableCell>
                  <TableCell>
                    <Badge variant={r.state === "প্রস্তুত" ? "success" : "warning"}>
                      {r.state}
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
