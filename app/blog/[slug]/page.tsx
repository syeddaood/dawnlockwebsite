import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { mdxComponents } from "@/components/mdx-components";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  const url = `https://cukkoo.app/blog/${post.slug}`;

  return {
    title: `${post.title} — Cukkoo`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: "Cukkoo",
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = getAllPosts();
  if (!posts.some((p) => p.slug === slug)) notFound();

  const post = getPostBySlug(slug);

  return (
    <article className="relative bg-bg pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-2xl px-5">
        <p className="text-step--1 font-mono text-muted">{formatDate(post.date)}</p>
        <h1 className="mt-3 font-display text-step-3 font-bold text-ink">{post.title}</h1>
        <p className="mt-4 text-step-0 text-ink-dim">{post.description}</p>

        <div className="mt-10">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>
      </div>
    </article>
  );
}
