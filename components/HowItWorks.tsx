"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Reveal from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Set an alarm, pick a mission",
    body: "Choose a time and the wake-up mission that will actually get you up: math, typing, voice, memory, shake, exercise, balance, or a photo.",
  },
  {
    n: "02",
    title: "It locks itself",
    body: "Once it's close enough to firing, the alarm enters its Goal Lock window. No edits, no disabling, no deleting — from any screen.",
  },
  {
    n: "03",
    title: "Only a real wake-up stops it",
    body: "The alarm rings until the mission is completed for real. Win, and it feeds your streak, your garden, and your badges.",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.3"],
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <section className="relative bg-surface py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="text-step--1 font-semibold uppercase tracking-[0.18em] text-accent">
            How it works
          </p>
          <h2 className="mt-3 font-display text-step-3 font-bold text-ink">
            Three steps. One rule: no shortcuts.
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-16">
          <div className="absolute left-0 right-0 top-6 hidden h-[2px] bg-border md:block" />
          <motion.div
            style={{ scaleX }}
            className="absolute left-0 right-0 top-6 hidden h-[2px] origin-left bg-gradient-to-r from-dawn-ember via-accent to-gold md:block"
          />

          <div className="grid gap-10 md:grid-cols-3">
            {STEPS.map((step) => (
              <Reveal key={step.n}>
                <div className="relative pt-0 md:pt-14">
                  <span className="hidden h-3 w-3 -translate-x-1/2 rounded-full bg-accent md:absolute md:top-[18px] md:left-0 md:block" />
                  <p className="font-mono text-step--1 font-semibold text-gold">
                    {step.n}
                  </p>
                  <h3 className="mt-2 font-display text-step-1 font-bold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-step--1 text-ink-dim">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
