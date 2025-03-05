import { NextResponse } from "next/server";


export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, api, docs, dll.)
    "/((?!api|assets|docs|.*\\..*|_next).*)",
  ],
};

import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/operator/dashboard", request.url));
  }
}
