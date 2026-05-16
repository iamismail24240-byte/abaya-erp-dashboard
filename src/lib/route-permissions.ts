import type { SystemRole } from "@prisma/client";

/** Roles that may access a path prefix (longest prefix wins). */
const ROUTE_RULES: { prefix: string; roles: SystemRole[] }[] = [
  { prefix: "/dashboard/employees", roles: ["SUPER_ADMIN", "MANAGER"] },
  { prefix: "/dashboard/salary", roles: ["SUPER_ADMIN", "MANAGER"] },
  {
    prefix: "/dashboard/sales-targets",
    roles: ["SUPER_ADMIN", "MANAGER", "SALES"],
  },
  {
    prefix: "/dashboard/wholesale-retail",
    roles: ["SUPER_ADMIN", "MANAGER", "SALES"],
  },
  {
    prefix: "/dashboard/sales",
    roles: ["SUPER_ADMIN", "MANAGER", "SALES"],
  },
  {
    prefix: "/dashboard/order-tracking",
    roles: ["SUPER_ADMIN", "MANAGER", "SALES", "PRODUCTION"],
  },
  {
    prefix: "/dashboard/commissions",
    roles: ["SUPER_ADMIN", "MANAGER", "SALES"],
  },
  { prefix: "/dashboard/production", roles: ["SUPER_ADMIN", "MANAGER", "PRODUCTION"] },
  { prefix: "/dashboard/factory", roles: ["SUPER_ADMIN", "MANAGER", "PRODUCTION"] },
];

export function canAccessDashboardRoute(
  pathname: string,
  role: SystemRole
): boolean {
  const match = [...ROUTE_RULES]
    .filter((r) => pathname.startsWith(r.prefix))
    .sort((a, b) => b.prefix.length - a.prefix.length)[0];
  if (!match) {
    return true;
  }
  return match.roles.includes(role);
}
