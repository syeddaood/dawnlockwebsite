import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const SITE_URL = "https://cukkoo.app";

const HOME_APP_SHOTS = [
  "alarms-dismiss",
  "ring-now",
  "math-mission",
  "streaks",
  "garden",
  "report",
  "settings",
];

const FEATURES_APP_SHOTS = [
  "math-mission",
  "typing-mission",
  "voice-mission",
  "memory-mission",
  "shake-mission",
  "exercise-mission",
  "balance-mission",
  "object-hunt-mission",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: "2026-11-19",
      changeFrequency: "weekly",
      priority: 1,
      images: HOME_APP_SHOTS.map((shot) => `${SITE_URL}/app-shots/${shot}.png`),
    },
    {
      url: `${SITE_URL}/features`,
      lastModified: "2026-11-19",
      changeFrequency: "weekly",
      priority: 0.8,
      images: FEATURES_APP_SHOTS.map((shot) => `${SITE_URL}/app-shots/${shot}.png`),
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: "2026-11-19",
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...getAllPosts().map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
