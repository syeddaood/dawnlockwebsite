import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-2">
          <Logo size={24} />
          <div>
            <p className="font-display font-bold text-ink">Cukkoo</p>
            <p className="text-step--1 text-muted">
              Solve it. Play it. Beat it. Get up!
            </p>
          </div>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <a href="#mechanism" className="text-step--1 text-ink-dim hover:text-ink">
            How it locks
          </a>
          <a href="#missions" className="text-step--1 text-ink-dim hover:text-ink">
            Missions
          </a>
          <a href="#proof" className="text-step--1 text-ink-dim hover:text-ink">
            Proof
          </a>
          <a href="#faq" className="text-step--1 text-ink-dim hover:text-ink">
            FAQ
          </a>
        </nav>

        <p className="text-step--1 text-muted">
          © {new Date().getFullYear()} Cukkoo. Built for Android.
        </p>
      </div>
    </footer>
  );
}
