export const SITE_URL = "https://cukkoo.app";
export const ORG_NAME = "Cukkoo";
export const LOGO_URL = `${SITE_URL}/icons/icon-512.png`;

// TODO: add real social profile URLs once they exist, e.g.
// ["https://twitter.com/cukkooapp", "https://instagram.com/cukkooapp"]
// then spread them into ORGANIZATION_JSON_LD as `sameAs`.
export const SAME_AS: string[] = [];

// No "@context" here — this object is reused both as a standalone top-level
// JSON-LD node (where callers add "@context") and nested inside other nodes
// (author/publisher), where a repeated "@context" would be redundant.
export const ORGANIZATION_ENTITY = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: ORG_NAME,
  url: SITE_URL,
  logo: LOGO_URL,
  ...(SAME_AS.length > 0 && { sameAs: SAME_AS }),
};

/**
 * JSON.stringify with "<" escaped, so a closing </script> (or an HTML tag)
 * embedded in any string value can't break out of the ld+json script tag.
 */
export function toJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
