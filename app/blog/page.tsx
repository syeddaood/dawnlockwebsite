import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import Reveal from "@/components/Reveal";
import { MOTION, staggerDelay } from "@/lib/motion";

const TITLE = "Blog — Cukkoo";
const DESCRIPTION =
  "Notes on wake-up habits, alarm design, and why most alarm clocks fail to get people out of bed.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://cukkoo.app/blog",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://cukkoo.app/blog",
    siteName: "Cukkoo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <section className="relative bg-bg pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal
          direction="down"
          distance={MOTION.slide}
          duration={MOTION.durationNormal}
          ease={MOTION.easeStandard}
        >
          <p className="text-step--1 font-semibold uppercase tracking-[0.18em] text-accent">
            The blog
          </p>
          <h1 className="mt-3 font-display text-step-3 font-bold text-ink">
            Notes on waking up.
          </h1>
        </Reveal>

        <div className="mt-14 flex flex-col gap-8">
          {posts.map((post, i) => (
            <Reveal
              key={post.slug}
              direction="down"
              distance={MOTION.slide}
              duration={MOTION.durationNormal}
              ease={MOTION.easeStandard}
              delay={staggerDelay(i, MOTION.staggerShot, MOTION.staggerSection)}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block rounded-l border border-border bg-surface p-6 transition hover:border-white/30"
              >
                <p className="text-step--1 font-mono text-muted">{formatDate(post.date)}</p>
                <h2 className="mt-2 font-display text-step-1 font-bold text-ink">
                  {post.title}
                </h2>
                <p className="mt-2 text-step--1 text-ink-dim">{post.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
