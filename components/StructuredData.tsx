import { FAQS } from "@/lib/content";

const SITE_URL = "https://cukkoo.app";

export default function StructuredData() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "MobileApplication",
      name: "Cukkoo",
      url: SITE_URL,
      operatingSystem: "ANDROID",
      applicationCategory: "UtilitiesApplication",
      description:
        "Cukkoo is an Android alarm clock app for heavy sleepers. It locks itself before it rings and won't stop until you complete a real wake-up mission — no snooze, no dismiss.",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Cukkoo",
      url: SITE_URL,
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
