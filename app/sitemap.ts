import type { MetadataRoute } from "next";

const SITE_URL = "https://cukkoo.app";

const APP_SHOTS = [
  "alarms-dismiss",
  "ring-now",
  "math-mission",
  "typing-mission",
  "voice-mission",
  "memory-mission",
  "shake-mission",
  "exercise-mission",
  "balance-mission",
  "object-hunt-mission",
  "streaks",
  "garden",
  "report",
  "settings",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: "2026-11-19",
      changeFrequency: "weekly",
      priority: 1,
      images: APP_SHOTS.map((shot) => `${SITE_URL}/app-shots/${shot}.png`),
    },
  ];
}
