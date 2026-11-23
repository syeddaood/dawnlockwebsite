import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/lib/posts";
import { renderBlogBody, extractHeroImage } from "@/lib/blog-content";
import BlogRichContent from "@/components/BlogRichContent";
import BlogPostStructuredData from "@/components/BlogPostStructuredData";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `https://cukkoo.app/blog/${slug}`;
  const { title, description, date } = post.metadata;

  return {
    title: `${title} — Cukkoo Alarm Clock`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Cukkoo",
      type: "article",
      publishedTime: date,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
  const post = getPost(slug);
  if (!post) notFound();

  const html = renderBlogBody(post.body);
  const heroImage = extractHeroImage(post.body);

  return (
    <article className="relative bg-bg pb-24 pt-32 md:pt-40">
      <BlogPostStructuredData
        slug={slug}
        title={post.metadata.title}
        description={post.metadata.description}
        date={post.metadata.date}
        imageSrc={heroImage?.src}
      />
      <div className="mx-auto max-w-2xl px-5">
        <p className="text-step--1 font-mono text-muted">{formatDate(post.metadata.date)}</p>
        <h1 className="mt-3 font-display text-step-3 font-bold text-ink">
          {post.metadata.title}
        </h1>
        <p className="mt-4 text-step-0 text-ink-dim">{post.metadata.description}</p>

        <div className="mt-10">
          <BlogRichContent html={html} />
        </div>
      </div>
    </article>
  );
}
