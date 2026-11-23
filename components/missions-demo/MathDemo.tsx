"use client";

import { useRef } from "react";
import DemoFrame from "./DemoFrame";
import { useDemoLoop, type RunArgs } from "./useDemoLoop";
import styles from "./demoStyles.module.css";

const KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, "⌫", 0, "✓"];
const SEQ: [number, number, string, boolean][] = [
  [9, 16, "25", true],
  [14, 27, "41", true],
  [38, 45, "73", false],
  [6, 58, "64", true],
];

async function run({ $, $$, wait }: RunArgs) {
  const inp = $(`.${styles.inp}`);
  const val = $('[data-demo="val"]');
  const ph = $(`.${styles.inp} .${styles.ph}`);
  const prob = $(`.${styles.prob}`);
  const tbarI = $(`.${styles.tbar} i`);
  const tt = $('[data-demo="tt"]');
  const msg = $('[data-demo="msg"]');
  const pn = $('[data-demo="pn"]');
  const segs = $$(`.${styles.segs} i`);

  let solved = 0;
  segs.forEach((i) => i.classList.remove(styles.segFilled));
  if (pn) pn.textContent = "1";

  for (const [a, b, ans, ok] of SEQ) {
    if (inp) inp.className = styles.inp;
    if (val) val.textContent = "";
    if (ph) ph.style.display = "";

    if (prob) prob.style.opacity = "0";
    await wait(200);
    if (prob) {
      prob.textContent = `${a} + ${b} = ?`;
      prob.style.opacity = "1";
    }

    if (tbarI) {
      tbarI.style.transition = "none";
      tbarI.style.height = "100%";
    }
    if (tt) tt.textContent = "0:30";
    await wait(700);
    if (tbarI) {
      tbarI.style.transition = "height 3s linear";
      tbarI.style.height = "86%";
    }
    if (tt) tt.textContent = "0:26";

    for (const d of ans) {
      const k = $(`[data-k="${d}"]`);
      k?.classList.add(styles.keyHit);
      if (ph) ph.style.display = "none";
      if (val) val.textContent = (val.textContent ?? "") + d;
      await wait(170);
      k?.classList.remove(styles.keyHit);
      await wait(260);
    }
    const ck = $('[data-k="✓"]');
    ck?.classList.add(styles.keyHit);
    await wait(180);
    ck?.classList.remove(styles.keyHit);

    if (ok) {
      inp?.classList.add(styles.inpOk);
      solved++;
      segs[solved - 1]?.classList.add(styles.segFilled);
      if (msg) msg.innerHTML = '<span style="color:#3ddc84">Correct!</span>';
      await wait(900);
      if (solved < 3 && pn) pn.textContent = String(solved + 1);
    } else {
      inp?.classList.add(styles.inpBad);
      if (msg)
        msg.innerHTML =
          '<span style="color:#ff5d5d">Not quite. Here’s a new one.</span>';
      await wait(1100);
    }
    if (msg) msg.textContent = "Wrong answer? A new problem appears.";
  }

  await wait(300);
}

export default function MathDemo({ maxWidth }: { maxWidth?: number }) {
  const phoneRef = useRef<HTMLDivElement>(null);
  useDemoLoop(phoneRef, async (args) => {
    await run(args);
    await args.done();
  });

  return (
    <DemoFrame
      label="Animated demo of the Math wake-up mission in the Cukkoo alarm app"
      doneTitle="Alarm off"
      doneSubtitle="3 of 3 solved · Good morning"
      phoneRef={phoneRef}
      maxWidth={maxWidth}
    >
      <div className={styles.hdr}>Math mission</div>
      <div className={`${styles.pad} ${styles.row}`} style={{ marginTop: 4 }}>
        <span className={styles.ppill}>Wake-up mission</span>
        <span className={`${styles.muted} ${styles.sm}`}>&#128274; Snooze off</span>
      </div>
      <div className={styles.clock}>
        7:00<small>AM</small>
      </div>
      <div className={`${styles.pad} ${styles.row} ${styles.sm}`} style={{ marginTop: 6 }}>
        <span>
          Problem <b data-demo="pn">1</b> of 3
        </span>
        <span className={styles.o}>Easy</span>
      </div>
      <div className={styles.segs}>
        <i />
        <i />
        <i />
      </div>
      <div className={styles.pad}>
        <div className={styles.card}>
          <div className={`${styles.lbl} ${styles.c}`}>SOLVE TO DISMISS</div>
          <div className={styles.prob}>9 + 16 = ?</div>
          <div className={styles.row} style={{ gap: 10 }}>
            <div className={styles.inp}>
              <span data-demo="val" />
              <span className={styles.caret} />
              <span className={styles.ph}>Type your answer</span>
            </div>
            <div className={styles.tbar}>
              <div>
                <i />
              </div>
              <span data-demo="tt">0:30</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${styles.muted} ${styles.c} ${styles.sm}`}
        data-demo="msg"
        style={{ marginTop: 10, height: 16 }}
      >
        Wrong answer? A new problem appears.
      </div>
      <div className={styles.keys}>
        {KEYS.map((k) => (
          <span key={k} data-k={k}>
            {k}
          </span>
        ))}
      </div>
    </DemoFrame>
  );
}
