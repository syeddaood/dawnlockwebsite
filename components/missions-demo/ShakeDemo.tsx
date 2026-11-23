"use client";

import { useRef } from "react";
import DemoFrame from "./DemoFrame";
import { useDemoLoop, type RunArgs } from "./useDemoLoop";
import styles from "./demoStyles.module.css";

const CIRC = 703.7;

async function run({ $, wait }: RunArgs) {
  const g = $('[data-demo="phone"]');
  const cnt = $('[data-demo="cnt"]');
  const arc = $<SVGCircleElement>('[data-demo="arc"]');
  const left = $('[data-demo="left"]');

  if (cnt) cnt.textContent = "0";
  arc?.style.setProperty("stroke-dashoffset", `${CIRC}`);
  if (left) left.textContent = "30 more to go";

  await wait(1000);
  g?.classList.add(styles.shk);

  for (let n = 1; n <= 30; n++) {
    await wait(n < 6 ? 190 : 115);
    if (cnt) cnt.textContent = String(n);
    arc?.style.setProperty("stroke-dashoffset", `${CIRC * (1 - n / 30)}`);
    if (left) left.textContent = n < 30 ? `${30 - n} more to go` : "Done!";
    if (n === 14) {
      g?.classList.remove(styles.shk);
      await wait(500);
      g?.classList.add(styles.shk);
    }
  }
  g?.classList.remove(styles.shk);
  await wait(500);
}

export default function ShakeDemo({ maxWidth }: { maxWidth?: number }) {
  const phoneRef = useRef<HTMLDivElement>(null);
  useDemoLoop(phoneRef, async (args) => {
    await run(args);
    await args.done();
  });

  return (
    <DemoFrame
      label="Animated demo of the Shake wake-up mission in the Cukkoo alarm app"
      doneTitle="Alarm off"
      doneSubtitle="30 shakes · Good morning"
      phoneRef={phoneRef}
      maxWidth={maxWidth}
    >
      <div className={styles.night} style={{ position: "absolute", inset: 0 }} />
      <div className={styles.stars} />
      <div className={styles.moon} />
      <div className={styles.dunes} />
      <div className={styles.z}>
        <div className={styles.hdr}>Shake mission</div>
        <div className={styles.clock} style={{ fontSize: 48, marginTop: 2 }}>
          6:30
        </div>
        <div className={styles.c} style={{ marginTop: 12 }}>
          <span
            className={styles.tab}
            style={{
              background: "#2a2c52",
              borderColor: "#3a3d6a",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: ".06em",
            }}
          >
            <span className={styles.o}>&#9679;</span> SHAKE MISSION
          </span>
        </div>
      </div>
      <svg className={styles.ring} viewBox="0 0 240 240">
        <circle cx="120" cy="120" r="112" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="5" />
        <circle
          data-demo="arc"
          cx="120"
          cy="120"
          r="112"
          fill="none"
          stroke="#ff8a3d"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="703.7"
          strokeDashoffset="703.7"
          transform="rotate(-90 120 120)"
          style={{ transition: "stroke-dashoffset .12s" }}
        />
        <g data-demo="phone" style={{ transformOrigin: "120px 120px" }}>
          <rect x="98" y="82" width="44" height="76" rx="9" fill="none" stroke="#e9edf5" strokeWidth="2.5" />
          <path d="M112 128v-8a8 8 0 0 1 16 0v8l3 4h-22z" fill="none" stroke="#ff8a3d" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M117 136h6" stroke="#ff8a3d" strokeWidth="2.2" />
          <path d="M113 148h14" stroke="#e9edf5" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </svg>
      <div className={`${styles.z} ${styles.c}`} style={{ position: "absolute", left: 0, right: 0, bottom: 24 }}>
        <div>
          <span data-demo="cnt" className={styles.cnt}>
            0
          </span>
          <span style={{ fontSize: 22, color: "#cfd5e2" }}> / 30</span>
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, marginTop: 6 }}>Shake your phone</div>
        <div className={styles.sm} data-demo="left" style={{ marginTop: 6, color: "#e6d6cc" }}>
          30 more to go
        </div>
        <div className={styles.sm} style={{ marginTop: 20, color: "#bfa99c" }}>
          Hold your phone firmly and shake
        </div>
      </div>
    </DemoFrame>
  );
}
