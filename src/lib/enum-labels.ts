import type {
  AttendanceStatus,
  EmployeeStatus,
  OrderChannel,
  OrderPipelineStatus,
} from "@prisma/client";
import { ROLE_LABELS } from "@/lib/roles";

export const orderChannelLabel: Record<OrderChannel, string> = {
  WHOLESALE: "হোলসেল",
  RETAIL: "খুচরা",
};

export const orderStatusLabel: Record<OrderPipelineStatus, string> = {
  PENDING: "অপেক্ষমান",
  CONFIRMED: "নিশ্চিত",
  PRODUCTION: "উৎপাদনে",
  QC: "QC",
  READY: "প্রস্তুত",
  DELIVERED: "ডেলিভার্ড",
  CANCELLED: "বাতিল",
};

export const employeeStatusLabel: Record<EmployeeStatus, string> = {
  ACTIVE: "সক্রিয়",
  INACTIVE: "নিষ্ক্রিয়",
  ON_LEAVE: "ছুটিতে",
};

export const attendanceStatusLabel: Record<AttendanceStatus, string> = {
  PRESENT: "উপস্থিত",
  ABSENT: "অনুপস্থিত",
  LATE: "বিলম্ব",
  HALF_DAY: "অর্ধেক দিন",
};

export { ROLE_LABELS };
