import { NextResponse, type NextRequest } from "next/server";
import { config as configuration } from "@/utils/config";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Redirect to login if not authenticated and trying to access a non-auth route
  if (
    path.startsWith("/auth") === false &&
    !request.cookies.has(configuration.authToken)
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Redirect to overview if authenticated but trying to access the login page
  if (
    path.startsWith("/auth") &&
    request.cookies.has(configuration.authToken)
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Always return NextResponse.next() if no redirect is needed
  return NextResponse.next();
}

// Middleware config: apply to specific routes
export const config = {
  matcher: ["/", "/auth/login", "/configuration/:path*"], // Adjust this matcher as needed
};
