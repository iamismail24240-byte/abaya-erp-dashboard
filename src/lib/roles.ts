import type { SystemRole } from "@prisma/client";

export const ROLE_LABELS: Record<SystemRole, string> = {
  SUPER_ADMIN: "সুপার অ্যাডমিন",
  MANAGER: "ম্যানেজার",
  SALES: "সেলস টিম",
  PRODUCTION: "উৎপাদন কর্মী",
};

export function canManageEmployees(role: SystemRole | undefined): boolean {
  return role === "SUPER_ADMIN" || role === "MANAGER";
}

export function canViewAllSales(role: SystemRole | undefined): boolean {
  return (
    role === "SUPER_ADMIN" ||
    role === "MANAGER" ||
    role === "SALES" ||
    role === "PRODUCTION"
  );
}

export function isSalesRole(role: SystemRole | undefined): boolean {
  return role === "SALES" || role === "MANAGER" || role === "SUPER_ADMIN";
}
