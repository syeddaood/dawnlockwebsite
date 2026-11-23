"use client";

import { useRef } from "react";
import DemoFrame from "./DemoFrame";
import { useDemoLoop, type RunArgs } from "./useDemoLoop";
import styles from "./demoStyles.module.css";

const OBJ = ["mug", "book", "backpack", "glasses", "headphones", "watch", "lamp", "keys"];
const REEL = [...OBJ, ...OBJ, ...OBJ];
const ROW_HEIGHT = 56;

const ICON_PATHS: Record<string, string> = {
  backpack: '<path d="M5 9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v11H5z"/><path d="M9 5V3h6v2M8 14h8v6"/>',
  glasses:
    '<circle cx="6" cy="15" r="4"/><circle cx="18" cy="15" r="4"/><path d="M10 15h4M2 15l2-7M22 15l-2-7"/>',
  headphones:
    '<path d="M3 14v-2a9 9 0 0 1 18 0v2"/><rect x="3" y="14" width="5" height="7" rx="2"/><rect x="16" y="14" width="5" height="7" rx="2"/>',
  watch: '<circle cx="12" cy="12" r="6"/><path d="M12 10v2l1.5 1.5M9 6.5 9.5 2h5l.5 4.5M9 17.5l.5 4.5h5l.5-4.5"/>',
  lamp: '<path d="M8 2h8l3 9H5z"/><path d="M12 11v9M8 21h8"/>',
  mug: '<path d="M4 7h12v10a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M16 10h2a3 3 0 0 1 0 6h-2"/>',
  book: '<path d="M4 4h7a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H4z"/><path d="M20 4h-6v17a2 2 0 0 1 2-2h4z"/>',
  keys: '<circle cx="8" cy="15" r="5"/><path d="m11.5 11.5 8-8M17 6l3 3M14.5 8.5l2 2"/>',
};

function name(k: string) {
  return k[0].toUpperCase() + k.slice(1);
}

function Icon({ k, color = "#cfd5e2", size = 24 }: { k: string; color?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: ICON_PATHS[k] }}
    />
  );
}

async function run({ $, wait }: RunArgs) {
  const reel = $(`.${styles.reel}`);
  const box = $(`.${styles.reelbox}`);
  const view = $('[data-demo="view"]');
  const chipl = $(`.${styles.chipl}`);
  const scan = $(`.${styles.scan}`);
  const btn = $(`.${styles.btn}`);
  const ttl = $('[data-demo="ttl"]');
  const att = $('[data-demo="att"]');
  const flash = $(`.${styles.flash}`);

  if (!box) return;
  const center = (i: number) => box.clientHeight / 2 - ROW_HEIGHT / 2 - i * ROW_HEIGHT;

  if (reel) {
    reel.style.transition = "none";
    reel.style.transform = `translateY(${center(1)}px)`;
  }
  if (view) view.style.opacity = "0";
  chipl?.classList.remove(styles.chiplOn);
  scan?.classList.remove(styles.scanOn);
  btn?.classList.add(styles.btnDim);
  if (ttl) ttl.textContent = "Finding your object…";
  if (att) att.textContent = "0";

  await wait(800);
  if (reel) {
    reel.style.transition = "transform 2.4s cubic-bezier(.15,.7,.2,1)";
    reel.style.transform = `translateY(${center(8 + 4 + 8)}px)`;
  }

  await wait(2600);
  if (ttl) ttl.innerHTML = `Find: <span class="${styles.o}">Headphones</span>`;
  btn?.classList.remove(styles.btnDim);
  await wait(1200);

  if (view) view.style.opacity = "1";
  if (ttl) ttl.textContent = "Point the camera at it";
  scan?.classList.add(styles.scanOn);
  await wait(1600);

  btn?.classList.add(styles.btnPress);
  flash?.classList.add(styles.flashOn);
  await wait(120);
  flash?.classList.remove(styles.flashOn);
  btn?.classList.remove(styles.btnPress);
  if (att) att.textContent = "1";

  scan?.classList.remove(styles.scanOn);
  await wait(400);
  chipl?.classList.add(styles.chiplOn);
  if (ttl) ttl.innerHTML = '<span style="color:#3ddc84">Match!</span>';
  await wait(1100);
}

export default function ObjectHuntDemo({ maxWidth }: { maxWidth?: number }) {
  const phoneRef = useRef<HTMLDivElement>(null);
  useDemoLoop(phoneRef, async (args) => {
    await run(args);
    await args.done();
  });

  return (
    <DemoFrame
      label="Animated demo of the Photo (object hunt) wake-up mission in the Cukkoo alarm app"
      doneTitle="Alarm off"
      doneSubtitle="Headphones found · Good morning"
      phoneRef={phoneRef}
      maxWidth={maxWidth}
    >
      <div className={styles.hdr}>Photo mission</div>
      <div className={styles.tabs}>
        <span className={`${styles.tab} ${styles.tabOn}`}>Object Hunt</span>
        <span className={styles.tab}>Outdoor</span>
      </div>
      <div className={`${styles.pad} ${styles.sm} ${styles.muted}`}>
        Spin a random household object, then photograph it.
      </div>
      <div className={styles.cam} style={{ height: 370, marginTop: 10 }}>
        <div className={styles.reelbox}>
          <div className={styles.reel}>
            {REEL.map((k, i) => (
              <div className={styles.ri} key={i}>
                <Icon k={k} />
                {name(k)}
              </div>
            ))}
          </div>
          <div className={styles.fade} />
          <div className={styles.win} style={{ top: "calc(50% - 28px)" }} />
        </div>
        <div
          data-demo="view"
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            opacity: 0,
            transition: "opacity .4s",
            background: "radial-gradient(circle at 50% 45%,#2a2f3d,#0b0d13 70%)",
          }}
        >
          <Icon k="headphones" color="#d7dbe5" size={120} />
          <div className={styles.scan} />
          <div className={styles.chipl} style={{ left: "50%", top: 70, marginLeft: -70 }}>
            &#10003; Headphones &middot; 94%
          </div>
        </div>
        <div className={styles.flash} />
        <div className={styles.c} style={{ position: "absolute", left: 0, right: 0, bottom: 16 }}>
          <div data-demo="ttl" style={{ fontSize: 17, fontWeight: 700 }}>
            Finding your object&hellip;
          </div>
          <div className={styles.sm} style={{ color: "#ffd23f", marginTop: 4 }}>
            Attempts: <span data-demo="att">0</span>
          </div>
        </div>
      </div>
      <div className={styles.pad} style={{ marginTop: 14 }}>
        <div className={`${styles.btn} ${styles.btnDim}`}>Capture photo</div>
      </div>
      <div className={`${styles.c} ${styles.sm} ${styles.muted}`} style={{ marginTop: 10 }}>
        On-device labeling. The photo never leaves this phone.
      </div>
    </DemoFrame>
  );
}
