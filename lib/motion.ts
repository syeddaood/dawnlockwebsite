export const MOTION = {
  slide: 24,
  slideSmall: 14,
  durationNormal: 0.45,
  durationCard: 0.5,
  durationFade: 0.5,
  staggerSection: 0.15,
  staggerItem: 0.06,
  staggerShot: 0.12,
  easeStandard: [0.16, 1, 0.3, 1] as [number, number, number, number],
  easePop: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  maxStaggeredItems: 6,
} as const;

export function staggerDelay(index: number, step: number, base = 0, cap = MOTION.maxStaggeredItems) {
  return base + Math.min(index, cap - 1) * step;
}
