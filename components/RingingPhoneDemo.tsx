"use client";

import { useCallback, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { Flame, X } from "lucide-react";

type Phase = "ringing" | "mission" | "success";

const TAUNTS = [
  "Nice try.",
  "That's not how this works.",
  "No snooze here.",
  "Still ringing.",
  "Only one way out of this.",
  "The X button is just for show.",
];

function makeProblem() {
  const a = Math.floor(Math.random() * 70) + 20;
  const b = Math.floor(Math.random() * 50) + 10;
  const isAdd = Math.random() > 0.4;
  const answer = isAdd ? a + b : a - b;
  return { prompt: `${a} ${isAdd ? "+" : "-"} ${b}`, answer };
}

export default function RingingPhoneDemo() {
  const [phase, setPhase] = useState<Phase>("ringing");
  const [tauntIndex, setTauntIndex] = useState<number | null>(null);
  const [problemNum, setProblemNum] = useState(1);
  const [problem, setProblem] = useState(() => makeProblem());
  const [input, setInput] = useState("");
  const [wrongShake, setWrongShake] = useState(0);
  const [streak, setStreak] = useState(6);
  const liveRegionId = useId();
  const controls = useAnimationControls();
  const lastTaunt = useRef(-1);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const taunt = useCallback(async () => {
    let next = Math.floor(Math.random() * TAUNTS.length);
    if (next === lastTaunt.current) next = (next + 1) % TAUNTS.length;
    lastTaunt.current = next;
    setTauntIndex(next);
    if (!prefersReducedMotion) {
      await controls.start({
        x: [0, -10, 9, -7, 5, 0],
        transition: { duration: 0.42, ease: "easeInOut" },
      });
    }
  }, [controls, prefersReducedMotion]);

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number; y: number } }) => {
      const distance = Math.hypot(info.offset.x, info.offset.y);
      if (distance > 60) {
        taunt();
      }
    },
    [taunt]
  );

  const submitAnswer = useCallback(() => {
    const value = Number(input);
    if (value === problem.answer) {
      if (problemNum >= 3) {
        setPhase("success");
      } else {
        setProblemNum((n) => n + 1);
        setProblem(makeProblem());
        setInput("");
      }
    } else {
      setWrongShake((n) => n + 1);
      setInput("");
    }
  }, [input, problem.answer, problemNum]);

  const reset = useCallback(() => {
    setPhase("ringing");
    setProblemNum(1);
    setProblem(makeProblem());
    setInput("");
    setTauntIndex(null);
    setStreak((s) => s + 1);
  }, []);

  return (
    <div className="relative mx-auto w-[280px] select-none">
      <div
        aria-live="polite"
        id={liveRegionId}
        className="sr-only"
      >
        {phase === "ringing" && tauntIndex !== null && TAUNTS[tauntIndex]}
        {phase === "mission" && `Mission problem ${problemNum} of 3: ${problem.prompt}`}
        {phase === "success" && "Wake successful. Alarm completed."}
      </div>

      <motion.div
        drag={phase === "ringing"}
        dragElastic={0.12}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        whileDrag={{ scale: 1.02 }}
        className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2.2rem] border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
        style={{
          background:
            phase === "success"
              ? "linear-gradient(180deg, #F4C969 0%, #FBE7B8 100%)"
              : "linear-gradient(180deg, #2B1526 0%, #5C2430 32%, #B9552C 62%, #E6962F 86%, #F4C969 100%)",
        }}
      >
        <div className="grain" />

        {/* notch */}
        <div className="absolute left-1/2 top-2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-black/30" />

        <div className="flex h-full flex-col items-center justify-between px-5 pb-7 pt-10 text-center">
          <AnimatePresence mode="wait">
            {phase === "ringing" && (
              <motion.div
                key="ringing"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex w-full flex-1 flex-col items-center justify-center gap-3"
              >
                <p className="font-display text-step-1 font-bold tracking-tight text-white/90">
                  RISE &amp; SHINE
                </p>
                <p className="font-mono text-4xl font-semibold tabular text-white">
                  6:42
                </p>
                <p className="text-step--1 font-semibold text-dawn-gold">
                  Mission: Math (Easy)
                </p>
                <p className="max-w-[200px] text-step--1 text-white/70">
                  No snooze. No dismiss. Complete the mission.
                </p>

                <AnimatePresence>
                  {tauntIndex !== null && (
                    <motion.p
                      key={tauntIndex}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-full bg-black/35 px-3 py-1 text-step--1 font-medium text-white"
                    >
                      {TAUNTS[tauntIndex]}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {phase === "mission" && (
              <motion.div
                key="mission"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex w-full flex-1 flex-col items-center justify-center gap-4"
              >
                <p className="text-step--1 text-white/70">
                  Problem {problemNum} of 3
                </p>
                <motion.p
                  animate={wrongShake ? { x: [0, -8, 8, -5, 0] } : {}}
                  key={wrongShake}
                  className="font-display text-3xl font-bold text-white"
                >
                  {problem.prompt} = ?
                </motion.p>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value.replace(/[^0-9-]/g, ""))}
                  onKeyDown={(e) => e.key === "Enter" && submitAnswer()}
                  inputMode="numeric"
                  aria-label={`Answer for ${problem.prompt}`}
                  className="w-28 rounded-m border border-white/20 bg-black/30 px-3 py-2 text-center font-mono text-xl text-white outline-none focus-visible:border-gold"
                  placeholder="?"
                />
                <button
                  onClick={submitAnswer}
                  className="rounded-full bg-accent px-5 py-2 text-step--1 font-semibold text-ink-dark transition hover:bg-accent-strong active:scale-95"
                >
                  Done
                </button>
              </motion.div>
            )}

            {phase === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex w-full flex-1 flex-col items-center justify-center gap-3"
              >
                <p className="font-display text-step-1 font-bold text-[#1C1729]">
                  Wake successful!
                </p>
                <p className="text-step--1 text-[#5C4A2A]">Alarm completed</p>
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 14 }}
                  className="flex items-center gap-2 text-2xl font-bold text-accent"
                >
                  <Flame className="h-6 w-6 fill-accent" aria-hidden="true" />
                  {streak} day streak
                </motion.div>
                <button
                  onClick={reset}
                  className="mt-2 rounded-full border border-[#1C1729]/20 bg-[#1C1729] px-5 py-2 text-step--1 font-semibold text-white transition hover:opacity-90 active:scale-95"
                >
                  Try it again
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {phase === "ringing" && (
            <div className="flex w-full items-center justify-between gap-3">
              <button
                type="button"
                onClick={taunt}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-step--1 font-medium text-white/60"
              >
                Snooze
              </button>
              <button
                type="button"
                onClick={taunt}
                aria-label="Dismiss"
                className="rounded-full border border-white/20 bg-white/10 p-2 text-white/60"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setPhase("mission")}
                className="rounded-full bg-accent px-4 py-2 text-step--1 font-semibold text-ink-dark transition hover:bg-accent-strong active:scale-95"
              >
                Start Mission
              </button>
            </div>
          )}
        </div>
      </motion.div>

      <p className="mt-4 text-center text-step--1 text-muted">
        Drag it, tap snooze, tap the X — go on.{" "}
        <span className="text-ink-dim">Only the mission stops the ring.</span>
      </p>
    </div>
  );
}
