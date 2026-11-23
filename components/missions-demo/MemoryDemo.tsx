"use client";

import { useRef } from "react";
import DemoFrame from "./DemoFrame";
import { useDemoLoop, type RunArgs } from "./useDemoLoop";
import styles from "./demoStyles.module.css";

const SYM = ["☀", "☂", "★", "♥", "♫", "⚑"];
const DECK = [0, 1, 2, 3, 4, 5, 1, 0, 3, 2, 5, 4];
const PLAYS: [number, number][] = [
  [0, 1],
  [6, 1],
  [0, 7],
  [2, 3],
  [9, 2],
  [8, 3],
  [4, 5],
  [11, 4],
  [10, 5],
];

async function run({ $, $$, wait }: RunArgs) {
  const cs = $$(`.${styles.mc}`);
  cs.forEach((c) => (c.className = styles.mc));
  let mv = 0;
  let pr = 0;
  let t0 = performance.now();

  const mvEl = $('[data-demo="mv"]');
  const prEl = $('[data-demo="pr"]');
  const tmEl = $('[data-demo="tm"]');
  if (mvEl) mvEl.textContent = "0";
  if (prEl) prEl.textContent = "0/6";

  const tick = window.setInterval(() => {
    const s = Math.floor((performance.now() - t0) / 1000);
    if (tmEl) tmEl.textContent = `0:${String(s).padStart(2, "0")}`;
  }, 250);

  await wait(900);
  t0 = performance.now();

  for (const [a, b] of PLAYS) {
    cs[a]?.classList.add(styles.mcUp);
    await wait(450);
    cs[b]?.classList.add(styles.mcUp);
    await wait(500);
    mv++;
    if (mvEl) mvEl.textContent = String(mv);

    if (DECK[a] === DECK[b]) {
      cs[a]?.classList.add(styles.mcOk);
      cs[b]?.classList.add(styles.mcOk);
      pr++;
      if (prEl) prEl.textContent = pr + "/6";
      await wait(350);
    } else {
      cs[a]?.classList.add(styles.mcNo);
      cs[b]?.classList.add(styles.mcNo);
      await wait(650);
      if (cs[a]) cs[a].className = styles.mc;
      if (cs[b]) cs[b].className = styles.mc;
      await wait(350);
    }
  }

  window.clearInterval(tick);
  await wait(400);
}

export default function MemoryDemo({ maxWidth }: { maxWidth?: number }) {
  const phoneRef = useRef<HTMLDivElement>(null);
  useDemoLoop(phoneRef, async (args) => {
    await run(args);
    await args.done();
  });

  return (
    <DemoFrame
      label="Animated demo of the Memory wake-up mission in the Cukkoo alarm app"
      doneTitle="Alarm off"
      doneSubtitle="6 pairs in 9 moves"
      phoneRef={phoneRef}
      maxWidth={maxWidth}
    >
      <div className={styles.hdr}>Memory mission</div>
      <div className={styles.pad}>
        <div className={styles.big} style={{ marginTop: 4 }}>
          Memory Match
        </div>
        <div className={styles.muted}>Find all 6 pairs</div>
      </div>
      <div className={styles.stats} style={{ marginTop: 14 }}>
        <div className={styles.card}>
          <span className={styles.lbl}>MOVES</span>
          <b data-demo="mv">0</b>
        </div>
        <div className={styles.card}>
          <span className={styles.lbl}>PAIRS</span>
          <b data-demo="pr">0/6</b>
        </div>
        <div className={styles.card}>
          <span className={styles.lbl}>TIME</span>
          <b data-demo="tm">0:00</b>
        </div>
      </div>
      <div className={styles.mg}>
        {DECK.map((s, i) => (
          <div className={styles.mc} key={i}>
            <div>
              <div className={styles.f} />
              <div className={styles.b}>{SYM[s]}</div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.pad} style={{ position: "absolute", left: 0, right: 0, bottom: 26 }}>
        <div className={styles.btn}>New Game</div>
      </div>
    </DemoFrame>
  );
}
