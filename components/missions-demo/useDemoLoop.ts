"use client";

import { useEffect, type RefObject } from "react";
import styles from "./demoStyles.module.css";

export type RunArgs = {
  el: HTMLDivElement;
  $: <T extends Element = HTMLElement>(sel: string) => T | null;
  $$: <T extends Element = HTMLElement>(sel: string) => T[];
  wait: (ms: number) => Promise<boolean>;
  done: () => Promise<void>;
};

/**
 * Drives one imperative demo loop against the DOM under `rootRef`
 * (the ".phone" element). Mirrors the reference file's `scene()` runner:
 * - plays only while the element is on screen (IntersectionObserver)
 * - never starts for prefers-reduced-motion
 * - loops forever until the component unmounts, then stops cleanly
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

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0.15 }
    );
    observer.observe(el);

    const $ = <T extends Element = HTMLElement>(sel: string) =>
      el.querySelector<T>(sel);
    const $$ = <T extends Element = HTMLElement>(sel: string) =>
      Array.from(el.querySelectorAll<T>(sel));

    // Returns false if the wait was cut short by unmount, so callers can bail.
    const wait = async (ms: number) => {
      const end = performance.now() + ms;
      while (!cancelled && (performance.now() < end || !visible)) {
        await new Promise((r) => setTimeout(r, Math.min(60, ms) || 16));
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

    (async () => {
      while (!cancelled) {
        await run({ el, $, $$, wait, done });
      }
    })();

    return () => {
      cancelled = true;
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootRef]);
}
