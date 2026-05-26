import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default function Icon() {
  const logoData = readFileSync(
    join(process.cwd(), "public/LOGO BYSEVIA/LOGO BYSEVIA.PNG")
  );
  const base64 = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          overflow: "hidden",
          display: "flex",
          background: "#0D1B3E",
        }}
      >
        <img
          src={base64}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    ),
    { ...size }
  );
}
