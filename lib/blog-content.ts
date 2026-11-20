import { marked } from "marked";

type Block =
  | { type: "markdown"; content: string }
  | { type: "hero_image"; description: string; alt: string; src?: string }
  | { type: "image"; description: string; alt: string; src?: string }
  | { type: "tldr"; text: string }
  | { type: "tip"; text: string }
  | { type: "quote"; text: string }
  | { type: "mermaid"; code: string }
  | { type: "chart"; spec: ChartSpec };

type ChartSpec = {
  type: "bar";
  title: string;
  labels: string[];
  values: number[];
};

export type HeroImage = { description: string; alt: string; src?: string };

// src is optional: "[HERO_IMAGE: desc | alt: text]" renders a placeholder,
// "[HERO_IMAGE: desc | alt: text | src: /path.jpg]" renders the real image.
const HERO_IMAGE_RE = /^\[HERO_IMAGE:\s*(.+?)\s*\|\s*alt:\s*(.+?)(?:\s*\|\s*src:\s*(.+?))?\]$/;
const IMAGE_RE = /^\[IMAGE:\s*(.+?)\s*\|\s*alt:\s*(.+?)(?:\s*\|\s*src:\s*(.+?))?\]$/;
const TLDR_RE = /^\[TLDR:\s*(.+?)\]$/;
const TIP_RE = /^\[TIP:\s*(.+?)\]$/;
const QUOTE_RE = /^\[QUOTE:\s*(.+?)\]$/;
const CHART_RE = /^\[CHART:\s*(\{.*\})\]$/;

function parseBlocks(body: string): Block[] {
  const lines = body.split("\n");
  const blocks: Block[] = [];
  let buffer: string[] = [];

  const flush = () => {
    if (buffer.length) {
      blocks.push({ type: "markdown", content: buffer.join("\n") });
      buffer = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    const hero = line.match(HERO_IMAGE_RE);
    if (hero) {
      flush();
      blocks.push({ type: "hero_image", description: hero[1], alt: hero[2], src: hero[3] });
      continue;
    }

    const image = line.match(IMAGE_RE);
    if (image) {
      flush();
      blocks.push({ type: "image", description: image[1], alt: image[2], src: image[3] });
      continue;
    }

    const tldr = line.match(TLDR_RE);
    if (tldr) {
      flush();
      blocks.push({ type: "tldr", text: tldr[1] });
      continue;
    }

    const tip = line.match(TIP_RE);
    if (tip) {
      flush();
      blocks.push({ type: "tip", text: tip[1] });
      continue;
    }

    const quote = line.match(QUOTE_RE);
    if (quote) {
      flush();
      blocks.push({ type: "quote", text: quote[1] });
      continue;
    }

    const chart = line.match(CHART_RE);
    if (chart) {
      flush();
      try {
        blocks.push({ type: "chart", spec: JSON.parse(chart[1]) });
      } catch {
        buffer.push(lines[i]);
      }
      continue;
    }

    if (line === "```mermaid") {
      flush();
      const code: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== "```") {
        code.push(lines[i]);
        i++;
      }
      blocks.push({ type: "mermaid", code: code.join("\n") });
      continue;
    }

    buffer.push(lines[i]);
  }
  flush();

  return blocks;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderImageBlock(
  { description, alt, src }: { description: string; alt: string; src?: string },
  isHero: boolean,
): string {
  if (src) {
    return `<figure class="blog-image${isHero ? " blog-image-hero" : ""}">
  <img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" width="1280" height="720" loading="${isHero ? "eager" : "lazy"}"${isHero ? ' fetchpriority="high"' : ""} />
</figure>`;
  }
  return `<figure class="blog-image-placeholder${isHero ? " blog-image-placeholder-hero" : ""}">
  <p class="blog-image-placeholder-label">${isHero ? "Hero image" : "Image"} placeholder</p>
  <p class="blog-image-placeholder-desc">${escapeHtml(description)}</p>
  <figcaption class="blog-image-placeholder-alt">Alt: ${escapeHtml(alt)}</figcaption>
</figure>`;
}

function renderMermaid(code: string): string {
  return `<div class="blog-diagram">
  <pre class="blog-diagram-fallback"><code>${escapeHtml(code)}</code></pre>
</div>`;
}

function renderBarChart(spec: ChartSpec): string {
  const { title, labels, values } = spec;
  const max = Math.max(...values, 0);

  const longestLabelLength = Math.max(...labels.map((label) => label.length), 0);
  const slot = Math.max(56, longestLabelLength * 6.5 + 8);
  const barWidth = 24;
  const padding = 16;
  const plotTop = 28;
  const plotBottom = 170;
  const labelY = plotBottom + 22;
  const width = labels.length * slot + padding * 2;
  const height = labelY + 16;

  const bars = labels
    .map((label, i) => {
      const value = values[i] ?? 0;
      const barHeight = max > 0 ? (value / max) * (plotBottom - plotTop) : 0;
      const barTop = plotBottom - barHeight;
      const barX = padding + i * slot + (slot - barWidth) / 2;
      const squareOverlayHeight = Math.min(4, barHeight);
      return `<g>
    <rect class="blog-chart-bar" x="${barX}" y="${barTop}" width="${barWidth}" height="${barHeight}" rx="4" ry="4">
      <title>${escapeHtml(label)}: ${value}</title>
    </rect>
    <rect class="blog-chart-bar" x="${barX}" y="${plotBottom - squareOverlayHeight}" width="${barWidth}" height="${squareOverlayHeight}" />
    <text class="blog-chart-value" x="${barX + barWidth / 2}" y="${barTop - 8}" text-anchor="middle">${value}</text>
    <text class="blog-chart-label" x="${barX + barWidth / 2}" y="${labelY}" text-anchor="middle">${escapeHtml(label)}</text>
  </g>`;
    })
    .join("\n");

  const tableRows = labels
    .map((label, i) => `<tr><td>${escapeHtml(label)}</td><td>${values[i] ?? 0}</td></tr>`)
    .join("\n");

  return `<figure class="blog-chart">
  <p class="blog-chart-title">${escapeHtml(title)}</p>
  <svg class="blog-chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(title)}">
    <line class="blog-chart-axis" x1="${padding}" y1="${plotBottom}" x2="${width - padding}" y2="${plotBottom}" />
    ${bars}
  </svg>
  <table class="blog-chart-table">
    <caption>${escapeHtml(title)}</caption>
    <thead><tr><th scope="col">Label</th><th scope="col">Value</th></tr></thead>
    <tbody>
    ${tableRows}
    </tbody>
  </table>
</figure>`;
}

function renderBlock(block: Block): string {
  switch (block.type) {
    case "markdown":
      return marked.parse(block.content, { async: false }) as string;
    case "hero_image":
      return renderImageBlock(block, true);
    case "image":
      return renderImageBlock(block, false);
    case "tldr":
      return `<div class="blog-callout blog-callout-tldr"><p class="blog-callout-label">TL;DR</p><p>${marked.parseInline(block.text, { async: false })}</p></div>`;
    case "tip":
      return `<div class="blog-callout blog-callout-tip"><p class="blog-callout-label">Tip</p><p>${marked.parseInline(block.text, { async: false })}</p></div>`;
    case "quote":
      return `<blockquote class="blog-pullquote">${marked.parseInline(block.text, { async: false })}</blockquote>`;
    case "mermaid":
      return renderMermaid(block.code);
    case "chart":
      return renderBarChart(block.spec);
  }
}

export function renderBlogBody(body: string): string {
  return parseBlocks(body).map(renderBlock).join("\n");
}

export function extractHeroImage(body: string): HeroImage | null {
  for (const line of body.split("\n")) {
    const match = line.trim().match(HERO_IMAGE_RE);
    if (match) return { description: match[1], alt: match[2], src: match[3] };
  }
  return null;
}

export function extractImageSrcs(body: string): string[] {
  const srcs: string[] = [];
  for (const rawLine of body.split("\n")) {
    const line = rawLine.trim();
    const match = line.match(HERO_IMAGE_RE) ?? line.match(IMAGE_RE);
    if (match?.[3]) srcs.push(match[3]);
  }
  return srcs;
}
