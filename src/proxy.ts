import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { SystemRole } from "@prisma/client";
import { canAccessDashboardRoute } from "@/lib/route-permissions";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  if (pathname === "/login" || pathname.startsWith("/login/")) {
    if (session?.user) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard")) {
    if (!session?.user) {
      const login = new URL("/login", req.url);
      login.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(login);
    }

    const role = session.user.role as SystemRole;
    if (!canAccessDashboardRoute(pathname, role)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/login", "/login/:path*", "/dashboard/:path*"],
};
