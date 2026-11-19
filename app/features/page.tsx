import type { Metadata } from "next";
import MissionShowcase from "@/components/MissionShowcase";

const TITLE = "Wake-Up Missions — Cukkoo";
const DESCRIPTION =
  "See all eight Cukkoo wake-up missions — math, typing, voice, memory, shake, exercise, balance, and photo — with real screenshots from the app.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://cukkoo.app/features",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://cukkoo.app/features",
    siteName: "Cukkoo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function FeaturesPage() {
  return <MissionShowcase />;
}
