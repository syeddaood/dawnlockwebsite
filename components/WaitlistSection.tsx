import MountainRidge from "./MountainRidge";
import WaitlistForm from "./WaitlistForm";
import Reveal from "./Reveal";

export default function WaitlistSection() {
  return (
    <section
      id="waitlist"
      className="relative overflow-hidden py-28"
      style={{
        background:
          "radial-gradient(120% 100% at 50% 110%, #E6962F 0%, #B9552C 35%, #2B1526 75%, #0B0A10 100%)",
      }}
    >
      <MountainRidge className="opacity-70" />
      <div className="grain" />

      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <Reveal>
          <h2 className="font-display text-step-3 font-bold text-ink">
            Set an alarm you can&apos;t talk your way out of.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-step-0 text-ink-dim">
            Cukkoo is pre-launch on iOS and Android. Join the waitlist for
            early access — no spam, just one email when it&apos;s ready.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-9 flex justify-center">
          <WaitlistForm />
        </Reveal>
      </div>
    </section>
  );
}
