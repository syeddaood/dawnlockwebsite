"use client";

import { useRef } from "react";
import DemoFrame from "./DemoFrame";
import { useDemoLoop, type RunArgs } from "./useDemoLoop";
import styles from "./demoStyles.module.css";

type Pt = [number, number];

function draw(fig: SVGGElement | null, jt: SVGGElement | null, t: number) {
  const cx = 138;
  const ay = 230;
  const hipY = 128 + 48 * t;
  const kneeX = 18 + 22 * t;
  const kneeY = 180 + 12 * t;
  const sh = hipY - 62 + 6 * t;
  const hd = sh - 22;
  const armY = sh + 10 - 4 * t;
  const armX = 34 + 6 * t;
  const armEnd = sh + 48 - 40 * t;

  const P: Record<string, Pt> = {
    la: [cx - 20, ay],
    ra: [cx + 20, ay],
    lk: [cx - kneeX, kneeY],
    rk: [cx + kneeX, kneeY],
    lh: [cx - 14, hipY],
    rh: [cx + 14, hipY],
    ls: [cx - 22, sh],
    rs: [cx + 22, sh],
    le: [cx - armX, armY + 18],
    re: [cx + armX, armY + 18],
    lw: [cx - armX + 6, armEnd + 30],
    rw: [cx + armX - 6, armEnd + 30],
  };
  const L = (a: string, b: string) =>
    `<line x1="${P[a][0]}" y1="${P[a][1]}" x2="${P[b][0]}" y2="${P[b][1]}"/>`;

  if (fig) {
    fig.innerHTML =
      L("la", "lk") +
      L("lk", "lh") +
      L("ra", "rk") +
      L("rk", "rh") +
      L("lh", "rh") +
      `<line x1="${cx}" y1="${hipY}" x2="${cx}" y2="${sh}"/>` +
      L("ls", "rs") +
      L("ls", "le") +
      L("le", "lw") +
      L("rs", "re") +
      L("re", "rw") +
      `<circle cx="${cx}" cy="${hd}" r="15"/>`;
  }
  if (jt) {
    jt.innerHTML = Object.values(P)
      .map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="4"/>`)
      .join("");
  }
}

async function run({ $, wait }: RunArgs) {
  const fig = $<SVGGElement>('[data-demo="fig"]');
  const jt = $<SVGGElement>('[data-demo="jt"]');
  const rep = $('[data-demo="rep"]');
  const rb = $(`.${styles.bar} i`);
  const stt = $('[data-demo="stt"]');

  const tween = async (a: number, b: number, ms: number) => {
    const s = performance.now();
    while (true) {
      const k = Math.min(1, (performance.now() - s) / ms);
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      draw(fig, jt, a + (b - a) * e);
      if (k >= 1) break;
      await wait(16);
    }
  };

  if (rep) rep.textContent = "0";
  if (rb) rb.style.width = "0";
  if (stt) stt.textContent = "Hips, knees and ankles in view ✓";
  draw(fig, jt, 0);
  await wait(1000);

  for (let r = 1; r <= 3; r++) {
    if (stt) stt.textContent = "Lower…";
    await tween(0, 1, 750);
    await wait(150);
    if (stt) stt.textContent = "Up!";
    await tween(1, 0, 650);
    if (rep) rep.textContent = String(r);
    if (rb) rb.style.width = (r / 3) * 100 + "%";
    if (stt) stt.textContent = r < 3 ? "Good rep ✓" : "All reps done ✓";
    await wait(350);
  }

  await wait(500);
}

export default function ExerciseDemo({ maxWidth }: { maxWidth?: number }) {
  const phoneRef = useRef<HTMLDivElement>(null);
  useDemoLoop(phoneRef, async (args) => {
    await run(args);
    await args.done();
  });

  return (
    <DemoFrame
      label="Animated demo of the Exercise wake-up mission in the Cukkoo alarm app"
      doneTitle="Alarm off"
      doneSubtitle="3 squats · Good morning"
      phoneRef={phoneRef}
      maxWidth={maxWidth}
    >
      <div className={styles.hdr}>Exercise mission</div>
      <div className={styles.tabs}>
        <span className={`${styles.tab} ${styles.tabOn}`}>Squats</span>
        <span className={styles.tab}>Jumping jacks</span>
        <span className={styles.tab}>Push-ups</span>
      </div>
      <div className={styles.cam} style={{ height: 420 }}>
        <svg viewBox="0 0 276 260" width="276" height="260" style={{ position: "absolute", top: 10, left: 0 }}>
          <g data-demo="fig" stroke="#e9edf5" strokeWidth={5} strokeLinecap="round" fill="none" />
          <g data-demo="jt" fill="#ff8a3d" />
        </svg>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 22 }} className={styles.c}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Do 3 squats</div>
          <div className={styles.o} style={{ fontSize: 40, fontWeight: 800 }}>
            <span data-demo="rep">0</span> / 3
          </div>
          <div className={styles.pad}>
            <div className={styles.bar} style={{ height: 6 }}>
              <i />
            </div>
          </div>
          <div className={styles.sm} data-demo="stt" style={{ marginTop: 10, color: "#3ddc84" }}>
            Hips, knees and ankles in view &#10003;
          </div>
        </div>
      </div>
      <div className={`${styles.c} ${styles.sm} ${styles.muted} ${styles.pad}`} style={{ marginTop: 14 }}>
        Pose is checked on-device. Video never leaves your phone.
      </div>
    </DemoFrame>
  );
}
