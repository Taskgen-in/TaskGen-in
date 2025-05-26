import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret");

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session_token")?.value;
  console.log("middleware: session_token =", session);

  if (
    !session &&
    (request.nextUrl.pathname.startsWith("/admin") ||
      request.nextUrl.pathname.startsWith("/dashboard"))
  ) {
    console.log("middleware: No session, redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session) {
    try {
      // Decode and verify JWT
      const { payload } = await jwtVerify(session, JWT_SECRET);
       console.log("middleware: JWT payload:", payload);

      // For admin routes, enforce admin role:
      if (request.nextUrl.pathname.startsWith("/admin") && payload.role !== "admin") {
        console.log("middleware: Not admin, redirecting to dashboard");
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      // For dashboard, any valid session is fine
      return NextResponse.next();
    } catch (err) {
      console.log("middleware: Invalid token, redirecting to login", err);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
