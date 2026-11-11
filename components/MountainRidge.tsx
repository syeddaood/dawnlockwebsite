"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

function Layer({
  d,
  fill,
  y,
}: {
  d: string;
  fill: string;
  y: MotionValue<number>;
}) {
  return (
    <motion.svg
      style={{ y }}
      viewBox="0 0 1440 400"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 h-full w-full"
      aria-hidden="true"
    >
      <path d={d} fill={fill} />
    </motion.svg>
  );
}

/** Layered sunrise mountain ridge, parallaxes with scroll. Decorative only. */
export default function MountainRidge({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yBack = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, 130]);

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <Layer
        y={yBack}
        fill="#3A1C2E"
        d="M0,260 C180,200 320,290 480,240 C640,190 760,260 920,220 C1080,180 1240,250 1440,210 L1440,400 L0,400 Z"
      />
      <Layer
        y={yMid}
        fill="#5C2430"
        d="M0,310 C160,270 300,330 460,300 C660,260 820,320 1000,290 C1180,260 1300,310 1440,280 L1440,400 L0,400 Z"
      />
      <Layer
        y={yFront}
        fill="#28121F"
        d="M0,360 C200,330 380,380 600,350 C800,325 960,370 1160,345 C1280,330 1360,355 1440,340 L1440,400 L0,400 Z"
      />
    </div>
  );
}
