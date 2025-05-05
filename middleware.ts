import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/robots.txt")
  ) {
    return NextResponse.next();
  }
  if (!token && pathname !== "/register") {
    return NextResponse.redirect(new URL("/register", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/(.*)",
};
