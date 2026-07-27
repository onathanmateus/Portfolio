import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon: o prompt de terminal que dá identidade ao site (~/nathan, caret). */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#12151b",
          borderRadius: 7,
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4d9dff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* chevron do prompt */}
          <path d="M4 7 L10 12 L4 17" />
          {/* cursor */}
          <path d="M13 17.5 L20 17.5" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
