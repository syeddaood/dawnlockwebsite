"use client";

import type { CSSProperties, ReactNode, RefObject } from "react";
import styles from "./demoStyles.module.css";

type DemoFrameProps = {
  /** Accessible label for the whole animated mockup, e.g.
   *  "Animated demo of the Math wake-up mission in the Cukkoo alarm app" */
  label: string;
  doneTitle: string;
  doneSubtitle: string;
  phoneRef: RefObject<HTMLDivElement | null>;
  /** Caps the rendered width in px (default 300, the phone's native width). */
  maxWidth?: number;
  children: ReactNode;
};

export default function DemoFrame({
  label,
  doneTitle,
  doneSubtitle,
  phoneRef,
  maxWidth = 300,
  children,
}: DemoFrameProps) {
  const style = { "--demoWidth": `${maxWidth}px` } as CSSProperties;

  return (
    <div className={styles.scaleWrap} style={style} role="img" aria-label={label}>
      <div ref={phoneRef} className={styles.phone}>
        <div className={styles.sb}>
          <span>7:00</span>
          <span className={styles.bat} />
        </div>
        {children}
        <div className={styles.done}>
          <div className={styles.ck}>
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3ddc84"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </div>
          <b>{doneTitle}</b>
          <span>{doneSubtitle}</span>
        </div>
      </div>
    </div>
  );
}
