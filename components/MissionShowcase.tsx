import Reveal from "./Reveal";
import { MOTION, staggerDelay } from "@/lib/motion";
import {
  MathDemo,
  TypingDemo,
  VoiceDemo,
  MemoryDemo,
  ShakeDemo,
  ExerciseDemo,
  BalanceDemo,
  ObjectHuntDemo,
} from "./missions-demo";

const MISSIONS = [
  {
    Demo: MathDemo,
    title: "Math",
    body: "Solve three math problems in a row before the alarm will stop — no calculator, no guessing. Get one wrong and it keeps ringing until you get it right.",
  },
  {
    Demo: TypingDemo,
    title: "Typing",
    body: "Retype an on-screen phrase exactly, typos and all, while the app tracks your accuracy and mistakes live. Enough friction to get your brain working before it'll let you silence it.",
  },
  {
    Demo: VoiceDemo,
    title: "Voice",
    body: "Say a phrase out loud and the app checks it against an 80% match before it'll stop ringing. No typing — just prove you can speak in full sentences.",
  },
  {
    Demo: MemoryDemo,
    title: "Memory",
    body: "Clear a memory-match grid — pick 4, 6, or 8 pairs depending on how much of a fight you're up for. Moves and time are tracked, so there's no half-finishing it back to sleep.",
  },
  {
    Demo: ShakeDemo,
    title: "Shake",
    body: "Physically shake the phone until the counter hits its target — a motionless hand can't fake it. The most physical of the missions, by design.",
  },
  {
    Demo: ExerciseDemo,
    title: "Exercise",
    body: "The camera counts real reps — squats, jumping jacks, or push-ups — and won't dismiss the alarm until you've actually done them. Pose tracking runs entirely on-device; the feed is never uploaded.",
  },
  {
    Demo: BalanceDemo,
    title: "Balance",
    body: "Hold the phone level and still for a stretch you choose — 5, 10, or 20 seconds — and the timer resets the instant you move too much. The one mission where staying still proves you're awake.",
  },
  {
    Demo: ObjectHuntDemo,
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
            Cukkoo alarm clock: every wake-up mission, from the real app.
          </h1>
          <p className="mt-4 text-step-0 text-ink-dim">
            Eight ways to prove you&apos;re actually awake — pick one per
            alarm, or mix it up.
          </p>
        </Reveal>

        <div className="mt-20 flex flex-col gap-20 md:mt-28 md:gap-28">
          {MISSIONS.map((mission, i) => (
            <Reveal
              key={mission.title}
              direction="down"
              distance={MOTION.slide}
              duration={MOTION.durationNormal}
              ease={MOTION.easeStandard}
              delay={staggerDelay(i, MOTION.staggerShot, MOTION.staggerSection)}
            >
              <div
                className={
                  "flex flex-col items-center gap-10 text-center md:flex-row md:justify-center md:gap-16 md:text-left" +
                  (i % 2 === 1 ? " md:flex-row-reverse" : "")
                }
              >
                <div className="flex-shrink-0">
                  <mission.Demo />
                </div>
                <div className="max-w-md">
                  <p className="font-mono text-step--1 text-muted">
                    {String(i + 1).padStart(2, "0")} / {String(MISSIONS.length).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 font-display text-step-2 font-bold text-ink">
                    {mission.title}
                  </h2>
                  <p className="mt-3 text-step-0 text-ink-dim">{mission.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
