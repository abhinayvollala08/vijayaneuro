import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

const ROLE_ACCESS: Record<string, string[]> = {
  PATIENT: ["/patient"],
  DOCTOR: ["/doctor"],
  ADMIN: ["/admin", "/doctor", "/patient"],
  EDITOR: ["/editor"],
};

const DASHBOARD_HOME: Record<string, string> = {
  PATIENT: "/patient/dashboard",
  DOCTOR: "/doctor/dashboard",
  ADMIN: "/admin/dashboard",
  EDITOR: "/editor/dashboard",
};

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const role = session?.user?.role as string;

  const protectedPrefixes = ["/patient", "/doctor", "/admin", "/editor"];
  const isProtected =
    protectedPrefixes.some((p) => pathname.startsWith(p)) &&
    pathname !== "/doctor" &&
    pathname !== "/doctor/";

  // Not authenticated — redirect to login
  if (isProtected && !session) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, req.url)
    );
  }

  // Authenticated but wrong role — redirect to own dashboard
  if (isProtected && role) {
    const allowed = ROLE_ACCESS[role] || [];
    const canAccess = allowed.some((r) => pathname.startsWith(r));
    if (!canAccess) {
      return NextResponse.redirect(
        new URL(DASHBOARD_HOME[role] || "/", req.url)
      );
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/patient/:path*",
    "/doctor/:path*",
    "/admin/:path*",
    "/editor/:path*",
  ],
};
