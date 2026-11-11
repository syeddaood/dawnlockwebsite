import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background:
            "radial-gradient(120% 120% at 50% -10%, #5C2430 0%, #2B1526 45%, #0B0A10 85%)",
          color: "#F7F3ED",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "#F7F3ED",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 72, fontWeight: 700 }}>DawnLock</div>
        </div>
        <div style={{ fontSize: 34, color: "#F2B84B", marginTop: 24 }}>
          The alarm clock that doesn&apos;t let you win.
        </div>
      </div>
    ),
    { ...size }
  );
}
