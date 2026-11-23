"use client";

import { useRef } from "react";
import DemoFrame from "./DemoFrame";
import { useDemoLoop, type RunArgs } from "./useDemoLoop";
import styles from "./demoStyles.module.css";

const PATH: [number, number][] = [
  [-30, -20],
  [20, 26],
  [-12, -8],
  [6, 4],
  [0, 0],
];

async function run({ $, wait }: RunArgs) {
  const bub = $(`.${styles.bub}`);
  const tgt = $(`.${styles.tgt}`);
  const parc = $<SVGCircleElement>('[data-demo="parc"]');
  const sec = $('[data-demo="sec"]');
  const st = $('[data-demo="st"]');
  const tx = $('[data-demo="tx"]');
  const ty = $('[data-demo="ty"]');

  let x = 46;
  let y = 18;
  const set = () => {
    bub?.style.setProperty("transform", `translate(${x}px,${y}px)`);
    if (tx) tx.textContent = (x / 4).toFixed(1) + "°";
    if (ty) ty.textContent = (y / 4).toFixed(1) + "°";
  };

  if (sec) sec.textContent = "5";
  tgt?.classList.remove(styles.tgtOn);
  if (parc) {
    parc.style.transition = "none";
    parc.style.strokeDashoffset = "728.8";
  }
  if (st) st.textContent = "Center the bubble to start";

  x = 46;
  y = 18;
  set();
  await wait(900);

  for (const [dx, dy] of PATH) {
    const sx = x;
    const sy = y;
    const s = performance.now();
    while (true) {
      const k = Math.min(1, (performance.now() - s) / 600);
      const e = 1 - Math.pow(1 - k, 3);
      x = sx + (dx - sx) * e;
      y = sy + (dy - sy) * e;
      set();
      if (k >= 1) break;
      await wait(16);
    }
  }

  tgt?.classList.add(styles.tgtOn);
  if (st) st.innerHTML = '<span style="color:#3ddc84">Hold steady…</span>';
  if (parc) {
    parc.style.transition = "stroke-dashoffset 5s linear";
    parc.style.strokeDashoffset = "0";
  }

  for (let s2 = 4; s2 >= 0; s2--) {
    for (let j = 0; j < 10; j++) {
      x = (Math.random() - 0.5) * 5;
      y = (Math.random() - 0.5) * 5;
      set();
      await wait(100);
    }
    if (sec) sec.textContent = String(s2);
  }

  await wait(300);
}

export default function BalanceDemo({ maxWidth }: { maxWidth?: number }) {
  const phoneRef = useRef<HTMLDivElement>(null);
  useDemoLoop(phoneRef, async (args) => {
    await run(args);
    await args.done();
  });

  return (
    <DemoFrame
      label="Animated demo of the Balance wake-up mission in the Cukkoo alarm app"
      doneTitle="Alarm off"
      doneSubtitle="Held steady for 5 seconds"
      phoneRef={phoneRef}
      maxWidth={maxWidth}
    >
      <div className={styles.hdr}>Balance mission</div>
      <div className={styles.tabs}>
        <span className={`${styles.tab} ${styles.tabOn}`}>5s</span>
        <span className={styles.tab}>10s</span>
        <span className={styles.tab}>20s</span>
      </div>
      <div className={`${styles.pad} ${styles.row}`}>
        <span className={`${styles.sm} ${styles.muted}`}>&#9200; 6:30 AM &middot; WAKE UP</span>
        <span className={styles.ppill} style={{ padding: "4px 8px" }}>
          &#128266; Ringing
        </span>
      </div>
      <div className={styles.pad}>
        <div className={styles.big} style={{ marginTop: 8 }}>
          Balance test
        </div>
        <div className={`${styles.sm} ${styles.muted}`}>
          Get into position. The timer starts on its own once the bubble is centered.
        </div>
      </div>
      <div className={styles.bwrap}>
        <div className={styles.glow} />
        <div className={styles.bout} />
        <div className={styles.bin} />
        <svg viewBox="0 0 240 240" style={{ position: "absolute", inset: 0 }}>
          <circle
            data-demo="parc"
            cx="120"
            cy="120"
            r="116"
            fill="none"
            stroke="#3ddc84"
            strokeWidth="8"
            strokeDasharray="728.8"
            strokeDashoffset="728.8"
            transform="rotate(-90 120 120)"
          />
        </svg>
        <div className={styles.tgt} />
        <div className={styles.bub} />
      </div>
      <div className={styles.c} style={{ marginTop: 6 }}>
        <span className={styles.o} style={{ fontSize: 48, fontWeight: 800 }}>
          <span data-demo="sec">5</span>
          <small style={{ fontSize: 20 }}>s</small>
        </span>
        <div className={styles.muted} data-demo="st">
          Center the bubble to start
        </div>
      </div>
      <div className={styles.tilt}>
        <span>
          Tilt X <b data-demo="tx">11.5&#176;</b>
        </span>
        <span>
          Tilt Y <b data-demo="ty">4.3&#176;</b>
        </span>
      </div>
    </DemoFrame>
  );
}
