import { SITE_URL, ORGANIZATION_ENTITY, LOGO_URL, toJsonLd } from "@/lib/seo";

type Props = {
  slug: string;
  title: string;
  description: string;
  date: string;
  imageSrc?: string;
};

export default function BlogPostStructuredData({
  slug,
  title,
  description,
  date,
  imageSrc,
}: Props) {
  const url = `${SITE_URL}/blog/${slug}`;

  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    author: ORGANIZATION_ENTITY,
    publisher: ORGANIZATION_ENTITY,
    image: imageSrc ? `${SITE_URL}${imageSrc}` : LOGO_URL,
    mainEntityOfPage: url,
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: toJsonLd(data) }}
    />
  );
}
