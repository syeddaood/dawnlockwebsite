import Link from "next/link";
import Logo from "./Logo";

// TODO: no social profile URLs exist yet. Once there are real ones, add
// lucide-react icon imports above and a list like:
// const SOCIAL_LINKS = [
//   { href: "https://twitter.com/cukkooapp", label: "Cukkoo on X (Twitter)", icon: Twitter },
//   { href: "https://instagram.com/cukkooapp", label: "Cukkoo on Instagram", icon: Instagram },
// ];
// then render the commented-out <ul> below.

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-2">
          <Logo size={24} />
          <div>
            <p className="font-display font-bold text-ink">Cukkoo</p>
            <p className="text-step--1 text-muted">
              Cukkoo, the no-snooze alarm app for heavy sleepers.
            </p>
          </div>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link href="/#mechanism" className="text-step--1 text-ink-dim hover:text-ink">
            How it locks
          </Link>
          <Link href="/#missions" className="text-step--1 text-ink-dim hover:text-ink">
            Missions
          </Link>
          <Link href="/features" className="text-step--1 text-ink-dim hover:text-ink">
            Features
          </Link>
          <Link href="/#proof" className="text-step--1 text-ink-dim hover:text-ink">
            Proof
          </Link>
          <Link href="/#faq" className="text-step--1 text-ink-dim hover:text-ink">
            FAQ
          </Link>
          <Link href="/blog" className="text-step--1 text-ink-dim hover:text-ink">
            Blog
          </Link>
        </nav>

        {/* TODO: no social profile URLs yet — once they exist, uncomment:
        <ul className="flex items-center gap-4">
          {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="me noopener"
                aria-label={label}
                className="text-ink-dim transition hover:text-ink"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        */}

        <p className="text-step--1 text-muted">
          © {new Date().getFullYear()} Cukkoo. Built for iOS and Android — coming soon.
        </p>
      </div>
    </footer>
  );
}
