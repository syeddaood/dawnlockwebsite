"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";

const EXCUSES = [
  {
    thought: "“I'll just turn tomorrow's alarm off tonight, I'm not feeling it.”",
    patch: "Goal Lock",
    detail:
      "Inside its lock window, an alarm can't be edited, disabled, or deleted — from any screen, by anyone, including groggy-you.",
  },
  {
    thought: "“I'll just hit snooze this once.”",
    patch: "No snooze, no dismiss",
    detail:
      "There's no snooze button, no swipe-away, no notification action, no back-button shortcut. The ring is the ring.",
  },
  {
    thought: "“I'll force-close the app so it can't ring.”",
    patch: "Built to actually fire",
    detail:
      "Custom native scheduling survives Doze, aggressive battery optimization, Do Not Disturb, and a force-closed app.",
  },
];

export default function ExcusesSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-bg py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="text-step--1 font-semibold uppercase tracking-[0.18em] text-accent">
            The problem
          </p>
          <h2 className="mt-3 font-display text-step-3 font-bold text-ink">
            Willpower fails at 6am. So we didn&apos;t build on it.
          </h2>
          <p className="mt-4 text-step-0 text-ink-dim">
            Every excuse for not waking up is one you&apos;ve already used.
            DawnLock was built by closing each one, on purpose.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {EXCUSES.map((item, i) => (
            <Reveal key={item.patch} delay={i * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-l border border-border bg-surface p-6">
                <p className="text-step-0 italic text-ink-dim">
                  <motion.span
                    initial={reduce ? false : { opacity: 1 }}
                    whileInView={{ opacity: [1, 1] }}
                    viewport={{ once: true }}
                    className="relative inline"
                  >
                    <span className="relative z-10">{item.thought}</span>
                    <motion.span
                      aria-hidden="true"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                      className="absolute left-0 top-1/2 h-[2px] w-full origin-left bg-ink-dim/70"
                    />
                  </motion.span>
                </p>

                <div className="mt-6 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                  <p className="font-display text-step-0 font-bold text-gold">
                    {item.patch}
                  </p>
                </div>
                <p className="mt-2 text-step--1 text-ink-dim">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
