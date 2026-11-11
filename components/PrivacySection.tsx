"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CloudOff, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";

export default function PrivacySection() {
  return (
    <section className="relative bg-bg py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-2">
        <Reveal className="order-2 md:order-1">
          <p className="text-step--1 font-semibold uppercase tracking-[0.18em] text-accent">
            Privacy
          </p>
          <h2 className="mt-3 font-display text-step-3 font-bold text-ink">
            Your camera never leaves your pocket.
          </h2>
          <p className="mt-5 max-w-md text-step-0 text-ink-dim">
            Photo, camera and microphone missions are verified entirely on
            your device. No network call, no log line, no analytics event
            ever sees that data — not even us.
          </p>

          <div className="mt-8 flex items-center gap-4 rounded-l border border-border bg-surface p-5">
            <motion.div
              initial={{ rotate: -4 }}
              whileInView={{ rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 180, damping: 14 }}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-success/15"
            >
              <ShieldCheck className="h-6 w-6 text-success" aria-hidden="true" />
            </motion.div>
            <div>
              <p className="text-step--1 font-semibold text-ink">
                Processed on-device, always
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-step--1 text-ink-dim">
                <CloudOff className="h-3.5 w-3.5" aria-hidden="true" />
                Zero uploads of camera/mic mission data
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="order-1 flex justify-center md:order-2">
          <div className="relative aspect-[280/607] w-[220px] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] sm:w-[260px]">
            <Image
              src="/app-shots/settings.png"
              alt="DawnLock settings screen listing privacy policy and how DawnLock works"
              fill
              sizes="260px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
