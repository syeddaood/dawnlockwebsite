"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Lock, ShieldCheck, Zap } from "lucide-react";
import MountainRidge from "./MountainRidge";
import RingingPhoneDemo from "./RingingPhoneDemo";
import MissionIconField from "./MissionIconField";

const CHIPS = [
  { icon: Lock, label: "Goal Lock — no editing it away" },
  { icon: Zap, label: "Fires through Doze & DND" },
  { icon: ShieldCheck, label: "Camera/mic data never leaves your phone" },
];

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden pb-20 pt-32 md:pt-40"
      style={{
        background:
          "radial-gradient(120% 90% at 50% -10%, #5C2430 0%, #2B1526 45%, #0B0A10 85%)",
      }}
    >
      <MountainRidge className="opacity-80" />
      <div className="grain" />

      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <motion.span
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-step--1 font-medium text-dawn-gold"
        >
          Commitment device, not an app feature
        </motion.span>

        <h1 className="mx-auto mt-5 max-w-2xl text-balance font-display text-step-hero font-bold leading-[0.95] tracking-tight text-ink">
          Cukkoo alarm clock. Solve it. Play it. Beat it. Get up!
        </h1>

        <motion.p
          initial={reduce ? false : { y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-step-1 text-ink-dim"
        >
          No snooze, no dismiss — only a real wake-up mission stops the
          ring. The Cukkoo app removes the escape hatches you reach for at
          6am, while you&apos;re still too groggy to be trusted.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#waitlist"
            className="rounded-full bg-accent px-7 py-3.5 text-step-0 font-semibold text-ink-dark shadow-[0_12px_32px_-10px_rgba(232,116,47,0.7)] transition hover:bg-accent-strong active:scale-95"
          >
            Join the waitlist
          </a>
          <a
            href="#mechanism"
            className="rounded-full border border-white/20 px-7 py-3.5 text-step-0 font-semibold text-ink transition hover:border-white/40"
          >
            See how it locks
          </a>
        </motion.div>

        <motion.ul
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center"
        >
          {CHIPS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3.5 py-2 text-step--1 text-ink-dim"
            >
              <Icon className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              {label}
            </li>
          ))}
        </motion.ul>
      </div>

      <div className="relative mt-4 md:mt-0">
        <MissionIconField>
          <RingingPhoneDemo />
        </MissionIconField>
      </div>
    </section>
  );
}
