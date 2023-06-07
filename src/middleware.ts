import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server.js";

export default authMiddleware({
  publicRoutes: ["/api/v1/similarity"],
  afterAuth: async (auth, req) => {
    const pathname = req.nextUrl.pathname;

    // Manage route protection
    const token = await auth.getToken();
    const isAuth = !!token;
    const isAuthPage = pathname.startsWith("/login");
    const sensitiveRoutes = ["/dashboard"];

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      return null;
    }

    if (
      !isAuth &&
      sensitiveRoutes.some((route) => pathname.startsWith(route))
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
});

export const config = {
  matcher: [
    "/((?!_next/image|_next/static|favicon.ico).*)",
    "/login",
    "/dashboard/:path*",
    "/api/:path*",
  ],
};
