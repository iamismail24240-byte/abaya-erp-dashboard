import type { DefaultSession } from "next-auth";
import type { SystemRole } from "@prisma/client";

declare module "next-auth" {
  interface User {
    role: SystemRole;
    employeeId: string | null;
  }

  interface Session {
    user: {
      id: string;
      role: SystemRole;
      employeeId: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: SystemRole;
    employeeId?: string | null;
  }
}
