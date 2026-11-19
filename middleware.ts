import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const proto =
    request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "");

  if (host === "www.cukkoo.app" || proto !== "https") {
    const url = request.nextUrl.clone();
    url.protocol = "https";
    url.hostname = "cukkoo.app";
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}
