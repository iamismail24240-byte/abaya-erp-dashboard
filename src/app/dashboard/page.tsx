import { auth } from "@/auth";
import { EmployeeSalaryMini, GrowthHint, StatsOverview } from "@/components/dashboard/stats-overview";
import { TodayOrdersCard } from "@/components/dashboard/today-orders-card";
import { ProductionTrackingCard } from "@/components/dashboard/production-tracking-card";
import { FactoryAndPipeline } from "@/components/dashboard/factory-pipeline";
import { SalesChannelsCard } from "@/components/dashboard/sales-channels-card";
import { InventoryAlertsCard } from "@/components/dashboard/inventory-alerts-card";
import { Badge } from "@/components/ui/badge";

export default async function DashboardPage() {
  const session = await auth();
  const role = session?.user?.role;
  const name = session?.user?.name;

  const isMgmt =
    role === "SUPER_ADMIN" || role === "MANAGER";
  const canSeeSalesChannel =
    role === "SUPER_ADMIN" ||
    role === "MANAGER" ||
    role === "SALES";
  const showLimitedMode =
    role === "SALES" ||
    role === "PRODUCTION";

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <p className="text-sm font-medium text-[var(--muted-foreground)]">
          স্বাগতম{name ? ` — ${name}` : ""} · নূর ফ্যাব্রিক্স
        </p>
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          <span className="text-gradient-gold">প্রিমিয়াম ERP ড্যাশবোর্ড</span>
          <span className="text-[var(--foreground)]">
            {" "}
            · আবায়া ও বোরকা উৎপাদন
          </span>
        </h2>
        {showLimitedMode ? (
          <div className="flex flex-wrap items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--muted)]/30 px-3 py-2 text-sm text-[var(--muted-foreground)]">
            <Badge variant="secondary">
              {role === "SALES" ? "সেলস মোড" : "উৎপাদন মোড"}
            </Badge>
            <span>
              {role === "SALES"
                ? "আপনার মেনুতে বিক্রয় ড্যাশবোর্ড, অর্ডার ট্র্যাকিং, কমিশন ও লক্ষ্য অন্তর্ভুক্ত।"
                : "অর্ডার ট্র্যাকিং (বিশেষাধিকারিত দৃশ্য), উৎপাদন ও উপস্থিতি — ব্যবস্থাপনা মেনু আলাদা।"}
            </span>
          </div>
        ) : null}
        <GrowthHint />
      </div>

      <StatsOverview />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <TodayOrdersCard />
          <FactoryAndPipeline />
          {canSeeSalesChannel ? <SalesChannelsCard /> : null}
        </div>
        <div className="space-y-6">
          <ProductionTrackingCard />
          {isMgmt ? <EmployeeSalaryMini /> : null}
          <InventoryAlertsCard />
        </div>
      </div>
    </div>
  );
}
