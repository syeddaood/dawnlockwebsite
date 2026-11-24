import type { Metadata } from "next";

const TITLE = "Privacy Policy — Cukkoo Alarm Clock";
const DESCRIPTION =
  "How Cukkoo collects, uses, and protects your information on cukkoo.app and in the Cukkoo alarm app.";
const LAST_UPDATED = "November 24, 2026";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://cukkoo.app/privacy" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://cukkoo.app/privacy",
    siteName: "Cukkoo",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <article className="relative bg-bg pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-2xl px-5">
        <p className="text-step--1 font-mono text-muted">Last updated: {LAST_UPDATED}</p>
        <h1 className="mt-3 font-display text-step-3 font-bold text-ink">Privacy Policy</h1>
        <p className="mt-4 text-step-0 text-ink-dim">
          This policy explains what information Cukkoo collects through cukkoo.app and the
          Cukkoo alarm app, and what we do — and don&apos;t do — with it.
        </p>

        <div className="blog-content mt-10">
          <h2>Who we are</h2>
          <p>
            Cukkoo (&quot;Cukkoo,&quot; &quot;we,&quot; &quot;us&quot;) makes the Cukkoo alarm
            clock app, which is pre-launch and coming to iOS and Android. This policy covers the
            cukkoo.app website and will cover the Cukkoo app once it is released.
          </p>

          <h2>Information we collect</h2>
          <h3>Waitlist email address</h3>
          <p>
            If you join the waitlist on cukkoo.app, we collect the email address you submit and
            the time you joined. We use this solely to notify you about Cukkoo&apos;s launch and
            related updates. We store it securely on our infrastructure (Cloudflare) and do not
            sell, rent, or share it with third parties.
          </p>
          <h3>Camera, microphone, and mission data</h3>
          <p>
            Wake-up missions that use your camera or microphone (for example, voice or
            photo-based missions) are verified entirely on your device. That data is never
            uploaded, transmitted to our servers, logged, or seen by us or any analytics
            service — regardless of platform.
          </p>
          <h3>What we don&apos;t collect</h3>
          <p>
            The cukkoo.app website does not use cookies, analytics, or advertising trackers, and
            does not share data with third-party services. If that changes, we will update this
            policy to describe it before it takes effect.
          </p>

          <h2>How we use your information</h2>
          <p>
            We use your waitlist email only to communicate with you about Cukkoo — launch
            announcements, early-access invitations, and related updates. We do not use it for
            advertising or sell it to anyone.
          </p>

          <h2>Data retention</h2>
          <p>
            We keep your waitlist email until Cukkoo launches or you ask us to delete it,
            whichever comes first. You can request deletion at any time using the contact
            information below.
          </p>

          <h2>Your choices</h2>
          <p>
            You can ask us to access, correct, or delete the information we hold about you, or
            to stop contacting you, at any time by reaching out using the contact information
            below. We will act on your request promptly.
          </p>

          <h2>Children&apos;s privacy</h2>
          <p>
            Cukkoo is not directed at children, and we do not knowingly collect information from
            children under 13. If you believe a child has given us information, contact us and
            we will delete it.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy as Cukkoo evolves — for example, once the app itself
            launches and this policy is extended to cover it. We&apos;ll update the &quot;last
            updated&quot; date above when we do.
          </p>

          <h2>Contact us</h2>
          {/* TODO: no verified contact email exists yet for this project. Replace
              the line below with a real, monitored address (e.g. privacy@cukkoo.app)
              before relying on this page for GDPR/CCPA requests or App Store /
              Play Store submission — both require a working contact method. */}
          <p>
            Questions about this policy or your data? Contact us at{" "}
            <strong>[ADD CONTACT EMAIL]</strong>.
          </p>
        </div>
      </div>
    </article>
  );
}
