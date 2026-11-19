"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  distance = 18,
  direction = "up",
  ease = [0.22, 1, 0.36, 1],
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: "up" | "down";
  ease?: [number, number, number, number];
  className?: string;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const offset = direction === "down" ? -distance : distance;

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : offset },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce
        ? { duration: 0.2, delay: 0 }
        : { duration, delay, ease },
    },
  };

  const Component = motion[as];

  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      className={className}
    >
      {children}
    </Component>
  );
}
