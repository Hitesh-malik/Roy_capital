import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { theme } from "@/config/theme";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const c = theme.colors;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: `radial-gradient(ellipse 60% 70% at 78% 40%, ${c.architectural}, ${c.bg} 70%)`,
          color: c.text,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 40, height: 40, borderRadius: 999, border: `2px solid ${c.accentSoft}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 16, height: 16, background: c.accent, transform: "rotate(45deg)" }} />
          </div>
          <div style={{ fontSize: 26, letterSpacing: 8, fontWeight: 700 }}>{site.wordmark}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.04, letterSpacing: -2 }}>Building Financial Intelligence.</div>
          <div style={{ fontSize: 76, fontWeight: 400, lineHeight: 1.1, color: c.accentSoft, fontStyle: "italic" }}>Creating a Better Tomorrow.</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: c.textMuted, borderTop: `1px solid ${c.border}`, paddingTop: 28 }}>
          <span>{site.values}</span>
          <span style={{ color: c.accentSoft }}>Sponsorships & Partnerships</span>
        </div>
      </div>
    ),
    size,
  );
}
