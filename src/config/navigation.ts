import type { SystemRole } from "@prisma/client";
import {
  LayoutDashboard,
  ShoppingCart,
  Factory,
  Users,
  Wallet,
  Package,
  Gauge,
  ClipboardList,
  Store,
  TrendingUp,
  Target,
  Percent,
  CalendarCheck,
  LineChart,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  description: string;
  /** If set, only these roles see the item. If omitted, all authenticated roles. */
  roles?: SystemRole[];
};

export const mainNav: NavItem[] = [
  {
    title: "ড্যাশবোর্ড",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "সারাংশ ও KPI",
  },
  {
    title: "বিক্রয় ড্যাশবোর্ড",
    href: "/dashboard/sales",
    icon: LineChart,
    description: "বিক্রয় ও লক্ষ্য সারাংশ",
    roles: ["SUPER_ADMIN", "MANAGER", "SALES"],
  },
  {
    title: "অর্ডার ট্র্যাকিং",
    href: "/dashboard/order-tracking",
    icon: TrendingUp,
    description: "কর্মচারী অনুযায়ী অর্ডার",
    roles: ["SUPER_ADMIN", "MANAGER", "SALES", "PRODUCTION"],
  },
  {
    title: "কমিশন",
    href: "/dashboard/commissions",
    icon: Percent,
    description: "অর্ডার ভিত্তিক কমিশন",
    roles: ["SUPER_ADMIN", "MANAGER", "SALES"],
  },
  {
    title: "দৈনিক বিক্রয় লক্ষ্য",
    href: "/dashboard/sales-targets",
    icon: Target,
    description: "প্রতিদিনের টার্গেট",
    roles: ["SUPER_ADMIN", "MANAGER", "SALES"],
  },
  {
    title: "উপস্থিতি",
    href: "/dashboard/attendance",
    icon: CalendarCheck,
    description: "হাজিরা ও সময়",
  },
  {
    title: "কর্মচারী ব্যবস্থাপনা",
    href: "/dashboard/employees",
    icon: Users,
    description: "যোগ · সম্পাদনা · বাতিল",
    roles: ["SUPER_ADMIN", "MANAGER"],
  },
  {
    title: "বেতন ব্যবস্থা",
    href: "/dashboard/salary",
    icon: Wallet,
    description: "পে-রোল ও ভাতা",
    roles: ["SUPER_ADMIN", "MANAGER"],
  },
  {
    title: "আজকের অর্ডার",
    href: "/dashboard/today-orders",
    icon: ShoppingCart,
    description: "দৈনিক অর্ডার তালিকা",
  },
  {
    title: "উৎপাদন ট্র্যাকিং",
    href: "/dashboard/production",
    icon: Factory,
    description: "লাইন ও চক্র অনুযায়ী",
    roles: ["SUPER_ADMIN", "MANAGER", "PRODUCTION"],
  },
  {
    title: "ইনভেন্টরি",
    href: "/dashboard/inventory",
    icon: Package,
    description: "কাপড়, অ্যাকসেসরিজ ও স্টক",
  },
  {
    title: "ফ্যাক্টরি স্ট্যাটাস",
    href: "/dashboard/factory",
    icon: Gauge,
    description: "লাইভ উৎপাদন অবস্থা",
    roles: ["SUPER_ADMIN", "MANAGER", "PRODUCTION"],
  },
  {
    title: "অর্ডার স्ट্যাটাস",
    href: "/dashboard/order-status",
    icon: ClipboardList,
    description: "পাইপলাইন ও SLA",
  },
  {
    title: "হোলসেল ও খুচরা রিপোর্ট",
    href: "/dashboard/wholesale-retail",
    icon: Store,
    description: "B2B ও B2C রিপোর্ট",
    roles: ["SUPER_ADMIN", "MANAGER", "SALES"],
  },
];

export function filterNavByRole(role: SystemRole | undefined): NavItem[] {
  if (!role) {
    return mainNav.filter((item) => !item.roles?.length);
  }
  return mainNav.filter(
    (item) => !item.roles || item.roles.includes(role)
  );
}
