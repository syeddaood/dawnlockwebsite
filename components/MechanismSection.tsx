"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";

const STEPS = [
  {
    image: "/app-shots/alarms-dismiss.png",
    eyebrow: "01 — Goal Lock",
    title: "Set it. Mean it.",
    body: "Every alarm locks itself hours before it rings, so 2am-you can't quietly switch it off. The lock window starts at 4 hours and you can widen it to 12 for extra commitment — it only ever adds protection, never removes it.",
  },
  {
    image: "/app-shots/ring-now.png",
    eyebrow: "02 — The ring",
    title: "No snooze. No dismiss.",
    body: "No swipe-away, no back-button shortcut, no notification action that stops it early. The only way to stop a ringing alarm is to complete the wake-up mission you picked for it.",
  },
  {
    image: "/app-shots/math-mission.png",
    eyebrow: "03 — Wake-up missions",
    title: "Wake your brain, not just your thumb.",
    body: "Pick per alarm: a math problem, a typing or voice challenge, a quick memory game, a physical shake, holding the phone still, or photographing a real-world object — verified entirely on-device.",
  },
];

export default function MechanismSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="mechanism" className="relative bg-surface py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="text-step--1 font-semibold uppercase tracking-[0.18em] text-accent">
            How it locks
          </p>
          <h2 className="mt-3 font-display text-step-3 font-bold text-ink">
            Three mechanisms. Zero escape hatches.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-10">
          <div className="order-2 flex flex-col gap-24 md:order-1 md:gap-40 md:py-10">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                onViewportEnter={() => setActive(i)}
                viewport={{ amount: 0.6, margin: "-10% 0px -10% 0px" }}
                className="max-w-md"
              >
                <p className="font-mono text-step--1 font-semibold text-gold">
                  {step.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-step-2 font-bold text-ink">
                  {step.title}
                </h3>
                <p className="mt-4 text-step-0 text-ink-dim">{step.body}</p>
              </motion.div>
            ))}
          </div>

          <div className="order-1 md:sticky md:top-28 md:order-2 md:self-start">
            <div className="relative mx-auto aspect-[280/607] w-[240px] overflow-hidden rounded-[2.2rem] border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] sm:w-[280px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={STEPS[active].image}
                    alt={`Cukkoo app screen: ${STEPS[active].title}`}
                    fill
                    sizes="280px"
                    className="object-cover"
                    priority={active === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-5 flex justify-center gap-2" aria-hidden="true">
              {STEPS.map((step, i) => (
                <span
                  key={step.title}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? "w-6 bg-accent" : "w-1.5 bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
