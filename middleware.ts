import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, api, docs, dll.)
    "/((?!api|assets|docs|.*\\..*|_next).*)",
  ],
};

export function middleware(request: NextRequest) {
  // Jangan redirect jika path adalah root /
  if (request.nextUrl.pathname === "/") {
    return NextResponse.next();
  }

  // Middleware logic lainnya bisa kamu tambahkan di sini kalau perlu
}
