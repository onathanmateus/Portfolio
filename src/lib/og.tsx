import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/**
 * Card de pré-visualização para redes sociais. O mesmo desenho em todas as
 * rotas, mudando só o título — assim cada página tem preview próprio.
 */
export function ogImage({ title, subtitle }: { title?: string; subtitle?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#12151b",
          backgroundImage:
            "linear-gradient(#1b2029 1px, transparent 1px), linear-gradient(90deg, #1b2029 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          fontFamily: "monospace",
          color: "#e7ecf3",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#4d9dff" }}>
          {title ? `~/nathan/${title.toLowerCase()}` : "~/nathan"}
        </div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 700, marginTop: 24 }}>
          {title ?? profile.name}
        </div>
        <div style={{ display: "flex", fontSize: 40, color: "#97a2b2", marginTop: 12 }}>
          {subtitle ?? profile.role}
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#4d9dff", marginTop: 40 }}>
          {title ? profile.name : "Protheus · ADVPL / TLPP · React · Next.js"}
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
