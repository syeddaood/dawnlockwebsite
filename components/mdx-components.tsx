import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2 className="mt-10 font-display text-step-2 font-bold text-ink" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-8 font-display text-step-1 font-bold text-ink" {...props} />
  ),
  p: (props) => <p className="mt-4 text-step-0 leading-relaxed text-ink-dim" {...props} />,
  ul: (props) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-step-0 text-ink-dim" {...props} />
  ),
  ol: (props) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-step-0 text-ink-dim" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  a: (props) => (
    <a className="text-accent underline underline-offset-2 hover:text-accent-strong" {...props} />
  ),
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mt-6 border-l-2 border-accent pl-4 text-step-0 italic text-ink-dim"
      {...props}
    />
  ),
  code: (props) => (
    <code className="rounded-s bg-surface px-1.5 py-0.5 font-mono text-step--1 text-gold" {...props} />
  ),
};
