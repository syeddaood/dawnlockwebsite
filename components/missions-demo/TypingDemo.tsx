"use client";

import { useRef } from "react";
import DemoFrame from "./DemoFrame";
import { useDemoLoop, type RunArgs } from "./useDemoLoop";
import styles from "./demoStyles.module.css";

const PHRASE = "The early bird catches the worm";

async function run({ $, $$, wait }: RunArgs) {
  const refs = $$(`.${styles.ref} span`);
  const tv = $('[data-demo="tv"]');
  const barI = $(`.${styles.bar} i`);
  const pc = $('[data-demo="pc"]');
  const mis = $('[data-demo="mis"]');
  const acc = $('[data-demo="acc"]');
  const el = $('[data-demo="el"]');
  const tin = $(`.${styles.tin}`);
  const btn = $(`.${styles.btn}`);

  let typed = "";
  let keys = 0;
  let bad = 0;
  let t0 = performance.now();

  const paint = () => {
    refs.forEach((s, i) => {
      s.className = i < typed.length ? styles.d : i === typed.length ? styles.cur : "";
    });
    if (tv) tv.textContent = typed.slice(-22);
    if (barI) barI.style.width = (typed.length / PHRASE.length) * 100 + "%";
    if (pc) pc.textContent = `${typed.length} / ${PHRASE.length}`;
    if (mis) mis.textContent = String(bad);
    if (acc) acc.textContent = keys ? Math.round(((keys - bad) / keys) * 100) + "%" : "100%";
  };

  const tick = window.setInterval(() => {
    const s = Math.floor((performance.now() - t0) / 1000);
    if (el) el.textContent = `0:${String(s).padStart(2, "0")}`;
  }, 250);

  btn?.classList.add(styles.btnDim);
  paint();
  await wait(900);
  t0 = performance.now();

  for (let i = 0; i < PHRASE.length; i++) {
    if (i === 27) {
      keys++;
      bad++;
      typed += "n";
      paint();
      tin?.classList.add(styles.tinBad);
      await wait(450);
      typed = typed.slice(0, -1);
      tin?.classList.remove(styles.tinBad);
      paint();
      await wait(250);
    }
    keys++;
    typed += PHRASE[i];
    paint();
    await wait(PHRASE[i] === " " ? 150 : 85 + Math.random() * 60);
  }

  btn?.classList.remove(styles.btnDim);
  await wait(500);
  btn?.classList.add(styles.btnPress);
  await wait(200);
  btn?.classList.remove(styles.btnPress);

  window.clearInterval(tick);
  await wait(250);
}

export default function TypingDemo({ maxWidth }: { maxWidth?: number }) {
  const phoneRef = useRef<HTMLDivElement>(null);
  useDemoLoop(phoneRef, async (args) => {
    await run(args);
    await args.done();
  });

  return (
    <DemoFrame
      label="Animated demo of the Typing wake-up mission in the Cukkoo alarm app"
      doneTitle="Alarm off"
      doneSubtitle="Typed with 97% accuracy"
      phoneRef={phoneRef}
      maxWidth={maxWidth}
    >
      <div className={styles.hdr}>Typing mission</div>
      <div className={styles.blob} />
      <div className={`${styles.pad} ${styles.z}`} style={{ marginTop: 6 }}>
        <span className={styles.ppill}>&#9200; 7:00 AM &middot; Wake-up</span>
        <div className={styles.big}>Type to wake up</div>
        <div className={styles.sm} style={{ color: "#d9c3b6" }}>
          Copy the phrase exactly to turn off the alarm.
        </div>
      </div>
      <div className={`${styles.pad} ${styles.z}`} style={{ marginTop: 12 }}>
        <div className={styles.card}>
          <div className={styles.lbl}>YOUR PHRASE</div>
          <div className={styles.ref}>
            {[...PHRASE].map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </div>
          <div className={styles.row} style={{ gap: 10 }}>
            <div className={styles.bar}>
              <i />
            </div>
            <span className={`${styles.sm} ${styles.muted}`} data-demo="pc">
              0 / {PHRASE.length}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.tin}>
        <span data-demo="tv" />
        <span className={styles.caret} />
      </div>
      <div className={styles.stats}>
        <div className={styles.card}>
          <span className={`${styles.sm} ${styles.muted}`}>Accuracy</span>
          <b data-demo="acc" style={{ color: "#3ddc84" }}>
            100%
          </b>
        </div>
        <div className={styles.card}>
          <span className={`${styles.sm} ${styles.muted}`}>Mistakes</span>
          <b data-demo="mis">0</b>
        </div>
        <div className={styles.card}>
          <span className={`${styles.sm} ${styles.muted}`}>Elapsed</span>
          <b data-demo="el">0:00</b>
        </div>
      </div>
      <div className={styles.pad}>
        <div className={`${styles.btn} ${styles.btnDim}`}>Submit</div>
      </div>
      <div className={`${styles.c} ${styles.sm} ${styles.muted}`} style={{ marginTop: 12 }}>
        &#128274; Snooze is off for this alarm
      </div>
    </DemoFrame>
  );
}
