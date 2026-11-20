import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import Reveal from "@/components/Reveal";
import { MOTION, staggerDelay } from "@/lib/motion";

export const dynamic = "force-static";

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
                className="block overflow-hidden rounded-l border border-border bg-surface transition hover:border-white/30"
              >
                {post.heroImage?.src ? (
                  <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border">
                    <Image
                      src={post.heroImage.src}
                      alt={post.heroImage.alt}
                      fill
                      sizes="(min-width: 768px) 672px, 100vw"
                      loading="lazy"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  post.heroImage && (
                    <div className="flex aspect-[21/9] flex-col items-center justify-center gap-1 border-b border-dashed border-border bg-bg/40 px-6 text-center">
                      <p className="text-step--1 font-semibold uppercase tracking-[0.14em] text-muted">
                        Image placeholder
                      </p>
                      <p className="max-w-lg text-step--1 text-ink-dim">{post.heroImage.alt}</p>
                    </div>
                  )
                )}
                <div className="p-6">
                  <p className="text-step--1 font-mono text-muted">{formatDate(post.date)}</p>
                  <h2 className="mt-2 font-display text-step-1 font-bold text-ink">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-step--1 text-ink-dim">{post.description}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
