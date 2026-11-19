"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Keyboard,
  Mic,
  Brain,
  Smartphone,
  Dumbbell,
  Gauge,
  Camera,
  Lock,
  BellRing,
  Power,
} from "lucide-react";
import Reveal from "./Reveal";

const MISSION_TYPES = [
  { icon: Calculator, label: "Math", detail: "A couple of problems, no calculator." },
  { icon: Keyboard, label: "Typing", detail: "Retype a sentence, typos don't count." },
  { icon: Mic, label: "Voice", detail: "Say a phrase out loud, checked for an 80% match." },
  { icon: Brain, label: "Memory", detail: "A quick sequence game, eyes open." },
  { icon: Smartphone, label: "Shake", detail: "Physically shake the phone to prove you're up." },
  { icon: Dumbbell, label: "Exercise", detail: "Squats, jumping jacks, or push-ups — camera-counted." },
  { icon: Gauge, label: "Balance", detail: "Hold the phone steady — the opposite problem." },
  { icon: Camera, label: "Photo", detail: "Snap a real-world object. Verified on-device only." },
];

function MissionTypesDemo() {
  const [active, setActive] = useState(0);
  const Current = MISSION_TYPES[active];

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {MISSION_TYPES.map((m, i) => {
          const isActive = i === active;
          return (
            <button
              key={m.label}
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-step--1 font-medium transition ${
                isActive
                  ? "border-accent bg-accent/15 text-accent"
                  : "border-border text-ink-dim hover:border-white/30 hover:text-ink"
              }`}
            >
              <m.icon className="h-3.5 w-3.5" aria-hidden="true" />
              {m.label}
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
          className="mt-4 flex items-center gap-3 rounded-m border border-border bg-bg/60 p-4"
        >
          <Current.icon className="h-8 w-8 shrink-0 text-gold" aria-hidden="true" />
          <p className="text-step--1 text-ink-dim">{Current.detail}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function GoalLockDemo() {
  const [hours, setHours] = useState(4);

  return (
    <div>
      <div className="flex items-center justify-between text-step--1 text-ink-dim">
        <span>Protected window</span>
        <span className="font-mono tabular text-gold">{hours}h before ring</span>
      </div>
      <input
        type="range"
        min={4}
        max={12}
        step={1}
        value={hours}
        onChange={(e) => setHours(Number(e.target.value))}
        aria-label="Goal Lock protected window in hours"
        className="mt-3 w-full accent-accent"
      />
      <div className="mt-5 flex items-center gap-3 rounded-m border border-border bg-bg/60 p-4">
        <motion.div
          animate={{ scale: 1 + (hours - 4) * 0.025 }}
          transition={{ type: "spring", stiffness: 200, damping: 16 }}
        >
          <Lock className="h-8 w-8 shrink-0 text-gold" aria-hidden="true" />
        </motion.div>
        <p className="text-step--1 text-ink-dim">
          {hours === 4
            ? "Default: can't edit or disable this alarm for the final 4 hours."
            : `Widened to ${hours}h — stronger commitment. Widening only ever adds protection, never removes it.`}
        </p>
      </div>
    </div>
  );
}

function ReliabilityDemo() {
  const [state, setState] = useState<"idle" | "killing" | "rang">("idle");

  const run = () => {
    setState("killing");
    window.setTimeout(() => setState("rang"), 900);
  };

  return (
    <div>
      <button
        onClick={run}
        disabled={state === "killing"}
        className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-step--1 font-medium text-ink-dim transition hover:border-white/30 hover:text-ink disabled:opacity-60"
      >
        <Power className="h-4 w-4" aria-hidden="true" />
        Force-close the app, then wait
      </button>

      <div className="mt-5 flex min-h-[72px] items-center gap-3 rounded-m border border-border bg-bg/60 p-4">
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.p
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-step--1 text-ink-dim"
            >
              Doze mode, battery optimization, Do Not Disturb, force-closed —
              the alarm doesn&apos;t care.
            </motion.p>
          )}
          {state === "killing" && (
            <motion.div
              key="killing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <motion.div
                animate={{ scale: [1, 0.6], opacity: [1, 0.3] }}
                transition={{ duration: 0.8 }}
              >
                <Smartphone className="h-7 w-7 text-ink-dim" aria-hidden="true" />
              </motion.div>
              <p className="text-step--1 text-ink-dim">Killing the app…</p>
            </motion.div>
          )}
          {state === "rang" && (
            <motion.div
              key="rang"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
              className="flex items-center gap-3"
            >
              <motion.div
                animate={{ rotate: [0, -12, 12, -8, 0] }}
                transition={{ duration: 0.5 }}
              >
                <BellRing className="h-7 w-7 text-accent" aria-hidden="true" />
              </motion.div>
              <p className="text-step--1 font-medium text-ink">
                Still rang. Right on time.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const CARDS = [
  {
    title: "Eight ways to prove you're awake",
    body: "Pick the mission that actually wakes your brain, not just your thumb.",
    demo: <MissionTypesDemo />,
  },
  {
    title: "Goal Lock",
    body: "The closer the alarm, the harder it is to touch. You decide how hard.",
    demo: <GoalLockDemo />,
  },
  {
    title: "Built to actually fire",
    body: "An alarm that silently fails is the worst bug this app could ship — so it doesn't.",
    demo: <ReliabilityDemo />,
  },
];

export default function MissionsGrid() {
  return (
    <section id="missions" className="relative bg-bg py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="text-step--1 font-semibold uppercase tracking-[0.18em] text-accent">
            The mechanics
          </p>
          <h2 className="mt-3 font-display text-step-3 font-bold text-ink">
            Try them. They&apos;re not just screenshots.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-l border border-border bg-surface p-6">
                <h3 className="font-display text-step-1 font-bold text-ink">
                  {card.title}
                </h3>
                <p className="mt-2 text-step--1 text-ink-dim">{card.body}</p>
                <div className="mt-6">{card.demo}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
