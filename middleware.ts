import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.headers.get("host") === "www.cukkoo.app") {
    const url = request.nextUrl.clone();
    url.hostname = "cukkoo.app";
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}
