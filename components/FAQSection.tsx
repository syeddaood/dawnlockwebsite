"use client";

import { useState, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Reveal from "./Reveal";
import { FAQS } from "@/lib/content";

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
