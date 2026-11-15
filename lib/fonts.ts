import localFont from "next/font/local";

export const display = localFont({
  src: [{ path: "./fonts/space-grotesk-variable.woff2", weight: "500 700", style: "normal" }],
  variable: "--font-display",
  display: "swap",
});

export const sans = localFont({
  src: [{ path: "./fonts/inter-variable.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-sans",
  display: "swap",
});

export const mono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ibm-plex-mono-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
});
