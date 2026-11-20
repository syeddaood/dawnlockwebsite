import Image from "next/image";
import Reveal from "./Reveal";
import { MOTION, staggerDelay } from "@/lib/motion";

const MISSIONS = [
  {
    image: "/app-shots/math-mission.png",
    title: "Math",
    body: "Solve three math problems in a row before the alarm will stop — no calculator, no guessing. Get one wrong and it keeps ringing until you get it right.",
  },
  {
    image: "/app-shots/typing-mission.png",
    title: "Typing",
    body: "Retype an on-screen phrase exactly, typos and all, while the app tracks your accuracy and mistakes live. Enough friction to get your brain working before it'll let you silence it.",
  },
  {
    image: "/app-shots/voice-mission.png",
    title: "Voice",
    body: "Say a phrase out loud and the app checks it against an 80% match before it'll stop ringing. No typing — just prove you can speak in full sentences.",
  },
  {
    image: "/app-shots/memory-mission.png",
    title: "Memory",
    body: "Clear a memory-match grid — pick 4, 6, or 8 pairs depending on how much of a fight you're up for. Moves and time are tracked, so there's no half-finishing it back to sleep.",
  },
  {
    image: "/app-shots/shake-mission.png",
    title: "Shake",
    body: "Physically shake the phone until the counter hits its target — a motionless hand can't fake it. The most physical of the missions, by design.",
  },
  {
    image: "/app-shots/exercise-mission.png",
    title: "Exercise",
    body: "The camera counts real reps — squats, jumping jacks, or push-ups — and won't dismiss the alarm until you've actually done them. Pose tracking runs entirely on-device; the feed is never uploaded.",
  },
  {
    image: "/app-shots/balance-mission.png",
    title: "Balance",
    body: "Hold the phone level and still for a stretch you choose — 5, 10, or 20 seconds — and the timer resets the instant you move too much. The one mission where staying still proves you're awake.",
  },
  {
    image: "/app-shots/object-hunt-mission.png",
    title: "Photo",
    body: "Photograph a random object the app names on the spot, or step outside and snap the sky or street around you. Recognition runs entirely on-device — the photo itself never leaves your phone.",
  },
];

export default function MissionShowcase() {
  return (
    <section id="features" className="relative bg-bg pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal
          className="max-w-2xl"
          direction="down"
          distance={MOTION.slide}
          duration={MOTION.durationNormal}
          ease={MOTION.easeStandard}
        >
          <p className="text-step--1 font-semibold uppercase tracking-[0.18em] text-accent">
            The missions
          </p>
          <h1 className="mt-3 font-display text-step-3 font-bold text-ink">
            Every wake-up mission, from the real app.
          </h1>
          <p className="mt-4 text-step-0 text-ink-dim">
            Eight ways to prove you&apos;re actually awake — pick one per
            alarm, or mix it up.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MISSIONS.map((mission, i) => (
            <Reveal
              key={mission.title}
              direction="down"
              distance={MOTION.slide}
              duration={MOTION.durationNormal}
              ease={MOTION.easeStandard}
              delay={staggerDelay(i, MOTION.staggerShot, MOTION.staggerSection)}
            >
              <div className="flex h-full flex-col items-center text-center">
                <div className="relative aspect-[560/1073] w-[170px] overflow-hidden rounded-[1.6rem] border border-white/10 shadow-[0_20px_50px_-18px_rgba(0,0,0,0.55)]">
                  <Image
                    src={mission.image}
                    alt={`Cukkoo ${mission.title} wake-up mission screen`}
                    fill
                    sizes="170px"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-5 font-display text-step-1 font-bold text-ink">
                  {mission.title}
                </h3>
                <p className="mt-2 max-w-[18rem] text-step--1 text-ink-dim">
                  {mission.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
