import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cukkoo: Alarm Clock App for Heavy Sleepers",
    short_name: "Cukkoo",
    description:
      "The alarm clock app that locks itself and won't stop ringing until you solve a real wake-up mission — no snooze, no dismiss.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0A10",
    theme_color: "#E8742F",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
