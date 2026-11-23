"use client";

import { useRef } from "react";
import DemoFrame from "./DemoFrame";
import { useDemoLoop, type RunArgs } from "./useDemoLoop";
import styles from "./demoStyles.module.css";

const VP = "I am awake, I am ready, and today is mine.".split(" ");
const WAVE_BARS = 26;

async function run({ $, $$, wait }: RunArgs) {
  const ws = $$(`.${styles.ref} span`);
  const bars = $$(`.${styles.wave} i`);
  const mic = $(`.${styles.mic}`);
  const st = $('[data-demo="st"]');
  const heardEl = $('[data-demo="heard"]');
  const pct = $('[data-demo="pct"]');
  const mbarI = $(`.${styles.mbar} i`);
  let on = false;

  ws.forEach((w) => (w.className = ""));
  if (heardEl) heardEl.textContent = "“…”";
  if (pct) pct.textContent = "0%";
  if (mbarI) {
    mbarI.style.width = "0";
    mbarI.style.background = "";
  }
  if (st) st.textContent = "Tap the mic and say the phrase";

  const anim = window.setInterval(() => {
    bars.forEach((b, i) => {
      b.style.height = on ? `${4 + Math.random() * 22 * Math.sin(((i + 1) / 27) * Math.PI)}px` : "3px";
    });
  }, 110);

  await wait(1100);
  mic?.classList.add(styles.micOn);
  on = true;
  if (st) st.textContent = "Listening…";

  const heard: string[] = [];
  for (let i = 0; i < VP.length; i++) {
    await wait(340);
    if (ws[i]) ws[i].className = styles.d;
    heard.push(VP[i]);
    if (heardEl) heardEl.textContent = '"' + heard.join(" ") + '"';
    const p = Math.round(((i + 1) / VP.length) * 92);
    if (pct) pct.textContent = p + "%";
    if (mbarI) {
      mbarI.style.width = p + "%";
      if (p >= 80) mbarI.style.background = "#3ddc84";
    }
  }

  await wait(400);
  on = false;
  mic?.classList.remove(styles.micOn);
  if (st) st.innerHTML = '<span style="color:#3ddc84">Passed: 92% match</span>';

  await wait(900);
  window.clearInterval(anim);
}

export default function VoiceDemo({ maxWidth }: { maxWidth?: number }) {
  const phoneRef = useRef<HTMLDivElement>(null);
  useDemoLoop(phoneRef, async (args) => {
    await run(args);
    await args.done();
  });

  return (
    <DemoFrame
      label="Animated demo of the Voice wake-up mission in the Cukkoo alarm app"
      doneTitle="Alarm off"
      doneSubtitle="92% match · Good morning"
      phoneRef={phoneRef}
      maxWidth={maxWidth}
    >
      <div className={styles.hdr}>Voice mission</div>
      <div className={styles.blob} />
      <div className={`${styles.pad} ${styles.z}`} style={{ marginTop: 6 }}>
        <span className={styles.ppill}>&#9200; 6:30 AM &middot; Wake-up</span>
        <div className={styles.big}>Say it to wake up</div>
        <div className={styles.sm} style={{ color: "#d9c3b6" }}>
          Say the phrase out loud. 80% match passes.
        </div>
      </div>
      <div className={`${styles.pad} ${styles.z}`} style={{ marginTop: 16 }}>
        <div className={styles.card}>
          <div className={styles.lbl}>SAY THIS PHRASE</div>
          <div className={styles.ref} style={{ fontSize: 20 }}>
            {VP.flatMap((w, i) =>
              i === 0 ? [<span key={i}>{w}</span>] : [" ", <span key={i}>{w}</span>]
            )}
          </div>
        </div>
      </div>
      <div className={styles.mic}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1a0e05" strokeWidth="2.2" strokeLinecap="round">
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
        </svg>
      </div>
      <div className={styles.wave}>
        {Array.from({ length: WAVE_BARS }).map((_, i) => (
          <i key={i} />
        ))}
      </div>
      <div className={`${styles.c} ${styles.sm} ${styles.muted}`} data-demo="st" style={{ margin: "8px 0 10px" }}>
        Tap the mic and say the phrase
      </div>
      <div className={styles.pad}>
        <div className={styles.card}>
          <div className={styles.lbl}>WHAT WE HEARD</div>
          <div data-demo="heard" style={{ margin: "8px 0 10px", minHeight: 20 }}>
            &#8220;&hellip;&#8221;
          </div>
          <div className={`${styles.row} ${styles.sm}`}>
            <span>Match</span>
            <span>
              <b data-demo="pct" className={styles.o} style={{ fontSize: 16 }}>
                0%
              </b>
              <span className={styles.muted}> / 80% to pass</span>
            </span>
          </div>
          <div className={styles.mbar}>
            <i />
          </div>
        </div>
      </div>
    </DemoFrame>
  );
}
