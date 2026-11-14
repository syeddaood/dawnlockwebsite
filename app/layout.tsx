import type { Metadata } from "next";
import { display, sans, mono } from "@/lib/fonts";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cukkoo.app"),
  title: "Cukkoo — The alarm clock that doesn't let you win",
  description:
    "Cukkoo is a commitment device, not just an alarm. No snooze, no dismiss button, and once it's close to firing it locks itself — only a real wake-up mission stops the ring.",
  openGraph: {
    title: "Cukkoo — The alarm clock that doesn't let you win",
    description:
      "No snooze, no dismiss, no editing it away. Only a real wake-up mission stops the ring.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cukkoo — The alarm clock that doesn't let you win",
    description:
      "No snooze, no dismiss, no editing it away. Only a real wake-up mission stops the ring.",
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
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ScrollProgress />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
