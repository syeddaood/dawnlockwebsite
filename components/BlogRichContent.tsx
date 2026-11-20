"use client";

import { useEffect, useRef } from "react";

const MERMAID_THEME_VARIABLES = {
  background: "#15121D",
  primaryColor: "#1D1927",
  primaryTextColor: "#F7F3ED",
  primaryBorderColor: "#2A2635",
  lineColor: "#C9C2D6",
  secondaryColor: "#15121D",
  tertiaryColor: "#0B0A10",
  textColor: "#F7F3ED",
  fontFamily: "var(--font-sans), system-ui, sans-serif",
};

export default function BlogRichContent({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const diagrams = root.querySelectorAll<HTMLElement>(".blog-diagram");
    if (diagrams.length === 0) return;

    let cancelled = false;

    import("mermaid").then(async ({ default: mermaid }) => {
      if (cancelled) return;
      // mermaid measures text synchronously to size node boxes; rendering
      // before the custom webfont is active would size boxes against the
      // fallback font's (narrower) metrics and clip the real font's text.
      await document.fonts.ready;
      if (cancelled) return;
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: MERMAID_THEME_VARIABLES,
        securityLevel: "strict",
      });

      for (let i = 0; i < diagrams.length; i++) {
        const container = diagrams[i];
        const code = container.querySelector("code")?.textContent ?? "";
        try {
          const { svg } = await mermaid.render(`blog-mermaid-${i}`, code);
          if (cancelled) return;
          const rendered = document.createElement("div");
          rendered.className = "blog-diagram-rendered";
          rendered.innerHTML = svg;
          container.prepend(rendered);
          container.classList.add("is-rendered");
        } catch (error) {
          console.error("Mermaid render failed", error);
        }
      }
    });

    return () => {
      cancelled = true;
    };
  }, [html]);

  return <div ref={ref} className="blog-content" dangerouslySetInnerHTML={{ __html: html }} />;
}
