import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0B0A10",
        surface: "#15121D",
        "surface-raised": "#1D1927",
        ink: "#F7F3ED",
        "ink-dim": "#C9C2D6",
        "ink-dark": "#1C1729",
        muted: "#9C94A8",
        border: "#2A2635",
        accent: "#E8742F",
        "accent-strong": "#FF8A3D",
        gold: "#F2B84B",
        success: "#3FBE6B",
        danger: "#E2576A",
        dawn: {
          plum: "#2B1526",
          maroon: "#5C2430",
          ember: "#B9552C",
          amber: "#E6962F",
          gold: "#F4C969",
          cream: "#FBE7B8",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "step--1": "var(--step--1)",
        "step-0": "var(--step-0)",
        "step-1": "var(--step-1)",
        "step-2": "var(--step-2)",
        "step-3": "var(--step-3)",
        "step-hero": "var(--step-hero)",
      },
      borderRadius: {
        s: "var(--radius-s)",
        m: "var(--radius-m)",
        l: "var(--radius-l)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
        spring: "var(--ease-spring)",
      },
      backgroundImage: {
        "dawn-sweep":
          "linear-gradient(180deg, #2B1526 0%, #5C2430 28%, #B9552C 58%, #E6962F 78%, #F4C969 92%, #FBE7B8 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
