"use client";

import { useState, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Reveal from "./Reveal";

const FAQS = [
  {
    q: "What if I genuinely need to turn off a locked alarm?",
    a: "There's no backdoor once Goal Lock engages — that's the entire point. If you want more day-to-day flexibility, keep the lock window at the 4-hour default; save wider windows (up to 12 hours) for alarms you truly mean to keep.",
  },
  {
    q: "Does it still ring with Do Not Disturb or battery saver on?",
    a: "Yes. Custom native scheduling is built to keep the alarm ringing through Doze mode, aggressive battery optimization, Do Not Disturb, and even a force-closed app. An alarm that silently fails to fire is the one bug this app is built around avoiding.",
  },
  {
    q: "What wake-up missions can I choose from?",
    a: "Math problems, a typing or voice challenge, a quick memory game, physically shaking the phone, holding the phone still, or photographing a specific real-world object — verified on-device.",
  },
  {
    q: "Is my camera or microphone data ever uploaded?",
    a: "No. Any camera or microphone data used to verify a mission is processed entirely on your device and is never uploaded, logged, or seen by analytics.",
  },
  {
    q: "What platforms does Cukkoo support?",
    a: "Cukkoo is built for Android, where we can engineer the deep, reliable alarm scheduling this concept depends on.",
  },
  {
    q: "When can I get it?",
    a: "Cukkoo is pre-launch. Join the waitlist and you'll be among the first to get early access.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const idBase = useId();

  return (
    <section id="faq" className="relative bg-bg py-24">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal>
          <p className="text-step--1 font-semibold uppercase tracking-[0.18em] text-accent">
            FAQ
          </p>
          <h2 className="mt-3 font-display text-step-3 font-bold text-ink">
            Questions you&apos;re probably asking
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-border rounded-l border border-border bg-surface">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            const panelId = `${idBase}-panel-${i}`;
            const buttonId = `${idBase}-button-${i}`;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-step-0 font-semibold text-ink transition hover:text-accent"
                  >
                    {item.q}
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-muted transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-step--1 text-ink-dim">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
