import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email =
    typeof body === "object" && body !== null && "email" in body
      ? String((body as { email: unknown }).email).trim().toLowerCase()
      : "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const { env } = getCloudflareContext();
  await env.WAITLIST_KV.put(email, JSON.stringify({ email, joinedAt: new Date().toISOString() }));

  return NextResponse.json({ ok: true });
}
