import { FAQS } from "@/lib/content";
import { SITE_URL, ORG_NAME, ORGANIZATION_ENTITY, toJsonLd } from "@/lib/seo";

export default function StructuredData() {
  const data = [
    { "@context": "https://schema.org", ...ORGANIZATION_ENTITY },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: ORG_NAME,
      alternateName: ["Cukkoo app", "Cukkoo alarm"],
      url: SITE_URL,
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: ORG_NAME,
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Android, iOS",
      url: SITE_URL,
      description:
        "Cukkoo is an alarm clock app for heavy sleepers. It locks itself before it rings and won't stop until you complete a real wake-up mission — no snooze, no dismiss.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: toJsonLd(data) }}
    />
  );
}
