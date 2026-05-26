import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default function OgImage() {
  const imgData = readFileSync(
    join(process.cwd(), "public/MONDES BYSEVIA/PAYSAGES/Multi_mondes.PNG")
  );
  const base64 = `data:image/png;base64,${imgData.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative" }}>
        <img
          src={base64}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "24px 40px",
            background: "linear-gradient(to top, rgba(13,27,62,0.85), transparent)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div style={{ color: "#00B4D8", fontSize: 18, letterSpacing: 6, fontWeight: 600 }}>
            BY SEVIA
          </div>
          <div style={{ color: "#F0F4FF", fontSize: 32, fontWeight: 700 }}>
            Créations originales, vidéos & musiques
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
