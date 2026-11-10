import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { site } from "@/config/site";
import { brand, theme } from "@/config/theme";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const c = theme.colors;

const emblemData = await readFile(join(process.cwd(), "public/brand/roy-capital-emblem.png"), "base64");
const emblemSrc = `data:image/png;base64,${emblemData}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 72,
          background: `radial-gradient(ellipse 60% 80% at 80% 45%, ${brand.royal}, ${brand.navy} 70%)`,
          color: c.text,
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 6, color: brand.goldSoft, fontFamily: "sans-serif" }}>
            {site.wordmark}
          </div>
          <div style={{ display: "flex", width: 80, height: 2, background: brand.gold, marginTop: 24 }} />
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.05, marginTop: 36 }}>
            Building Financial Intelligence.
          </div>
          <div style={{ display: "flex", fontSize: 64, lineHeight: 1.1, color: brand.gold, fontStyle: "italic" }}>
            Creating a Better Tomorrow.
          </div>
          <div style={{ display: "flex", fontSize: 22, color: c.textMuted, marginTop: 36, fontFamily: "sans-serif" }}>
            {site.values}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
        <img src={emblemSrc} width={380} height={380} alt="" style={{ borderRadius: 999, boxShadow: `0 0 0 2px ${brand.gold}` }} />
      </div>
    ),
    size,
  );
}
