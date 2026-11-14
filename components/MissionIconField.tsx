"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Calculator,
  Keyboard,
  Brain,
  Smartphone,
  Hand,
  Camera,
  Lock,
  Flame,
  type LucideIcon,
} from "lucide-react";

type Tile = {
  icon: LucideIcon;
  color: string;
  glow: string;
  top: string;
  side: "left" | "right";
  inset: string;
  size: number;
  depth: number;
  duration: number;
  delay: number;
};

const TILES: Tile[] = [
  { icon: Calculator, color: "#F2B84B", glow: "rgba(242,184,75,0.35)", top: "6%", side: "left", inset: "10%", size: 64, depth: 18, duration: 5.5, delay: 0 },
  { icon: Hand, color: "#3FBE6B", glow: "rgba(63,190,107,0.3)", top: "40%", side: "left", inset: "0%", size: 72, depth: 26, duration: 6.5, delay: 0.6 },
  { icon: Keyboard, color: "#9290AB", glow: "rgba(146,144,171,0.3)", top: "74%", side: "left", inset: "8%", size: 56, depth: 14, duration: 5, delay: 1.1 },
  { icon: Brain, color: "#5EE6B0", glow: "rgba(94,230,176,0.3)", top: "90%", side: "left", inset: "26%", size: 50, depth: 10, duration: 4.5, delay: 0.3 },
  { icon: Camera, color: "#E2576A", glow: "rgba(226,87,106,0.3)", top: "8%", side: "right", inset: "8%", size: 60, depth: 16, duration: 5.8, delay: 0.8 },
  { icon: Smartphone, color: "#E8742F", glow: "rgba(232,116,47,0.35)", top: "42%", side: "right", inset: "-2%", size: 76, depth: 28, duration: 6, delay: 0 },
  { icon: Lock, color: "#F2B84B", glow: "rgba(242,184,75,0.3)", top: "72%", side: "right", inset: "12%", size: 54, depth: 12, duration: 5.2, delay: 1.3 },
  { icon: Flame, color: "#FF8A3D", glow: "rgba(255,138,61,0.3)", top: "92%", side: "right", inset: "24%", size: 50, depth: 10, duration: 4.8, delay: 0.5 },
];

function IconTile({
  tile,
  pointerX,
  pointerY,
}: {
  tile: Tile;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}) {
  const Icon = tile.icon;
  const style =
    tile.side === "left" ? { left: tile.inset, top: tile.top } : { right: tile.inset, top: tile.top };

  // closer tiles (higher depth) drift further with the pointer than distant ones
  const x = useTransform(pointerX, (v) => v * tile.depth);
  const y = useTransform(pointerY, (v) => v * tile.depth);

  return (
    <motion.div
      className="absolute hidden md:block"
      style={{
        ...style,
        x,
        y,
        width: tile.size,
        height: tile.size,
      }}
    >
      <div
        className="tile-float flex h-full w-full items-center justify-center rounded-2xl border border-white/10 backdrop-blur-sm"
        style={{
          background: "rgba(21,18,29,0.55)",
          boxShadow: `0 10px 30px -8px ${tile.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
          animationDuration: `${tile.duration}s`,
          animationDelay: `${tile.delay}s`,
        }}
      >
        <Icon style={{ color: tile.color, width: tile.size * 0.42, height: tile.size * 0.42 }} aria-hidden="true" />
      </div>
    </motion.div>
  );
}

export default function MissionIconField({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { stiffness: 60, damping: 20, mass: 0.6 });
  const springY = useSpring(mvY, { stiffness: 60, damping: 20, mass: 0.6 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mvX.set(px);
    mvY.set(py);
  }

  function handleMouseLeave() {
    mvX.set(0);
    mvY.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto flex min-h-[420px] max-w-4xl items-center justify-center md:min-h-[600px]"
    >
      {TILES.map((tile, i) => (
        <IconTile key={i} tile={tile} pointerX={springX} pointerY={springY} />
      ))}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
