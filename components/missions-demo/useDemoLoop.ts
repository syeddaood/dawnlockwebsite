"use client";

import { useEffect, type RefObject } from "react";
import styles from "./demoStyles.module.css";

export type RunArgs = {
  el: HTMLDivElement;
  $: <T extends Element = HTMLElement>(sel: string) => T | null;
  $$: <T extends Element = HTMLElement>(sel: string) => T[];
  wait: (ms: number) => Promise<boolean>;
  done: () => Promise<void>;
  /** True while the phone mockup is on screen. Lets a demo's own
   *  setInterval (e.g. an elapsed-time tick) skip DOM writes while
   *  scrolled out of view, instead of updating forever in the background. */
  isVisible: () => boolean;
};

/**
 * Drives one imperative demo loop against the DOM under `rootRef`
 * (the ".phone" element). Mirrors the reference file's `scene()` runner:
 * - plays only while the element is on screen (IntersectionObserver)
 * - never starts for prefers-reduced-motion
 * - loops forever until the component unmounts, then stops cleanly
 *
 * While off screen, `wait()` suspends on a promise resolved by the
 * IntersectionObserver callback itself — no timers fire at all until the
 * element is visible again. This matters because several of these demos
 * run concurrently on one page, so a busy-poll per hidden instance adds up.
 */
export function useDemoLoop(
  rootRef: RefObject<HTMLDivElement | null>,
  run: (args: RunArgs) => Promise<void>
) {
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cancelled = false;
    let visible = false;
    let notifyVisible: (() => void) | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
        if (visible && notifyVisible) {
          const fn = notifyVisible;
          notifyVisible = null;
          fn();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);

    const waitUntilVisible = () => {
      if (visible || cancelled) return Promise.resolve();
      return new Promise<void>((resolve) => {
        notifyVisible = resolve;
      });
    };

    const $ = <T extends Element = HTMLElement>(sel: string) =>
      el.querySelector<T>(sel);
    const $$ = <T extends Element = HTMLElement>(sel: string) =>
      Array.from(el.querySelectorAll<T>(sel));

    // Counts down `ms` of wall-clock time while visible, pausing (with zero
    // timers) whenever scrolled off screen. Returns false if cut short by unmount.
    const wait = async (ms: number) => {
      let remaining = ms;
      const step = Math.min(60, ms) || 16;
      while (!cancelled) {
        if (!visible) {
          await waitUntilVisible();
          continue;
        }
        if (remaining <= 0) break;
        const chunk = Math.min(remaining, step);
        const start = performance.now();
        await new Promise((r) => setTimeout(r, chunk));
        remaining -= performance.now() - start;
      }
      return !cancelled;
    };

    const done = async () => {
      const doneEl = $(`.${styles.done}`);
      doneEl?.classList.add(styles.doneShow);
      await wait(2400);
      doneEl?.classList.remove(styles.doneShow);
      await wait(500);
    };

    const isVisible = () => visible;

    (async () => {
      while (!cancelled) {
        await run({ el, $, $$, wait, done, isVisible });
      }
    })();

    return () => {
      cancelled = true;
      observer.disconnect();
      notifyVisible?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootRef]);
}
