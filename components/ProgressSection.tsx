import Image from "next/image";
import { Medal } from "lucide-react";
import Reveal from "./Reveal";

const SHOTS = [
  {
    image: "/app-shots/streaks.png",
    title: "Streaks",
    body: "Weekly wins as a bar graph across a rolling 12-week window, plus a swipeable history of every morning — good and bad.",
  },
  {
    image: "/app-shots/garden.png",
    title: "The Garden",
    body: "A living garden that grows with your real wake-up history. Consistent wins make it flourish; misses show.",
  },
  {
    image: "/app-shots/report.png",
    title: "Reports",
    body: "Real averages for wake-up time and time-to-wake, so your mornings stop being a mystery.",
  },
];

const MILESTONES = [
  { days: 7, name: "Early Bird" },
  { days: 14, name: "Morning Glory" },
  { days: 21, name: "Sunrise Seeker" },
  { days: 30, name: "Chanticleer's Call" },
  { days: 45, name: "Golden Hour Pioneer" },
  { days: 60, name: "Morning Mentor" },
  { days: 90, name: "Dawn Patrol Marshal" },
  { days: 120, name: "Early Riser Vanguard" },
  { days: 180, name: "Early Riser Olympian" },
  { days: 365, name: "Morning Master" },
];

export default function ProgressSection() {
  return (
    <section id="proof" className="relative bg-surface py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="text-step--1 font-semibold uppercase tracking-[0.18em] text-accent">
            Progress &amp; motivation
          </p>
          <h2 className="mt-3 font-display text-step-3 font-bold text-ink">
            Every win is counted. Nothing is faked.
          </h2>
          <p className="mt-4 text-step-0 text-ink-dim">
            Progress syncs via the cloud, so it survives switching devices —
            these are real in-app screens, not mockups.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {SHOTS.map((shot, i) => (
            <Reveal key={shot.title} delay={i * 0.1}>
              <div className="flex h-full flex-col items-center text-center">
                <div className="relative aspect-[280/607] w-[200px] overflow-hidden rounded-[1.8rem] border border-white/10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)]">
                  <Image
                    src={shot.image}
                    alt={`Cukkoo app screen: ${shot.title}`}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-5 font-display text-step-1 font-bold text-ink">
                  {shot.title}
                </h3>
                <p className="mt-2 max-w-[22rem] text-step--1 text-ink-dim">
                  {shot.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-16">
          <div className="rounded-l border border-border bg-bg/60 p-6">
            <p className="text-step--1 font-semibold text-ink-dim">
              10 milestone badges, 7 days to 365
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {MILESTONES.map((milestone) => (
                <div
                  key={milestone.days}
                  className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2"
                >
                  <Medal className="h-4 w-4 flex-shrink-0 text-gold" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="truncate text-step--1 font-medium text-ink-dim">
                      {milestone.name}
                    </p>
                    <p className="truncate text-step--1 text-muted">
                      {milestone.days} days
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
