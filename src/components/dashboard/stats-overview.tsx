import {
  Banknote,
  ClipboardList,
  Gauge,
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";

export function StatsOverview() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        icon={ShoppingBag}
        label="আজকের অর্ডার"
        value="১৪৮"
        hint="সকাল ৬ টা থেকে এখন পর্যন্ত"
        trend={{ value: "+১২% গতকালের তুলনায়", positive: true }}
      />
      <StatCard
        icon={Gauge}
        label="লাইন দক্ষতা"
        value="৮৭%"
        hint="সেলাই · ফিনিশ · QC"
        trend={{ value: "লক্ষ্য ৯০%", positive: true }}
      />
      <StatCard
        icon={Package}
        label="স্টক স্বাস্থ্য"
        value="৯২%"
        hint="কাপড় ও অ্যাকসেসরিজ"
        trend={{ value: "৪ SKU নিম্ন সতর্কতা", positive: false }}
      />
      <StatCard
        icon={Banknote}
        label="আনুমানিক আয় (আজ)"
        value="৳ ৪,২৮,৫০০"
        hint="হোলসেল + খুচরা"
        trend={{ value: "চলতি মাস +৮.6%", positive: true }}
      />
    </section>
  );
}

export function EmployeeSalaryMini() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <StatCard
        icon={Users}
        label="সক্রিয় কর্মচারী"
        value="৬২"
        hint="২ টি শিফট · পরিকল্পিত উপস্থিতি ৯৬%"
        className="md:col-span-1"
      />
      <StatCard
        icon={ClipboardList}
        label="বেতন চক্র"
        value="১৬ মে"
        hint="পাশ হয়েছে · ব্যাংক ট্রান্সফার শুক্রবার"
        trend={{ value: "বকেয়া বাতা ৩টি", positive: false }}
        className="md:col-span-1"
      />
    </div>
  );
}

export function GrowthHint() {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)]/60 px-3 py-2 text-xs text-[var(--muted-foreground)]">
      <TrendingUp className="h-4 w-4 text-[var(--success)]" />
      <span>
        খুচরা চ্যানেলে গড় অর্ডার মূল্য গত সপ্তাহের তুলনায়{" "}
        <strong className="text-[var(--foreground)]">+৭.২%</strong> বেড়েছে।
      </span>
    </div>
  );
}
