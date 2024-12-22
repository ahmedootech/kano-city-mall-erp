import { NextResponse, type NextRequest } from "next/server";
import { config as configuration } from "./utils/config";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (
    path.split("/")[1] !== "auth" &&
    !request.cookies.has(configuration.authToken)
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (
    path.split("/")[1] === "auth" &&
    request.cookies.has(configuration.authToken)
  ) {
    return NextResponse.redirect(new URL("/overview", request.url));
  }
}

export const config = {
  matcher: ["/", "/auth/login", "/modules/:path*"],
};
