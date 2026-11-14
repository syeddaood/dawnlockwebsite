import type { Metadata } from "next";
import { display, sans, mono } from "@/lib/fonts";
import ScrollProgress from "@/components/ScrollProgress";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const TITLE = "Cukkoo: Alarm Clock App for Heavy Sleepers (No Snooze)";
const DESCRIPTION =
  "Cukkoo is the Android alarm clock app that locks itself and won't stop ringing until you solve a real wake-up mission — math, typing, memory, shake, or photo. No snooze, no dismiss button, no excuses.";

export const metadata: Metadata = {
  metadataBase: new URL("https://cukkoo.app"),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "alarm clock app for heavy sleepers",
    "alarm app no snooze",
    "math alarm clock app",
    "alarm clock app that forces you to wake up",
    "wake up mission alarm app",
    "commitment device alarm app",
    "android alarm app that can't be turned off",
    "alarm clock with challenges to turn off",
  ],
  alternates: {
    canonical: "https://cukkoo.app",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://cukkoo.app",
    siteName: "Cukkoo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <StructuredData />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ScrollProgress />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
