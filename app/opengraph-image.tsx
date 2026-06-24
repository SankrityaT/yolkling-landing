import { ImageResponse } from "next/og";

export const alt = "Yolkling, a tiny one of a kind creature you hatch from your vibe";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#FBF6EC",
          padding: "0 84px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "600px" }}>
          <div style={{ fontSize: 104, fontWeight: 800, color: "#2A241B", letterSpacing: "-4px", lineHeight: 1 }}>
            yolkling
          </div>
          <div style={{ fontSize: 40, fontWeight: 600, color: "#2A241B", marginTop: 26, lineHeight: 1.22 }}>
            a tiny one of a kind creature you hatch from your vibe.
          </div>
          <div style={{ fontSize: 27, color: "#6E5C49", marginTop: 18, lineHeight: 1.3 }}>
            it grows when you take care of yourself. the app that wants you off your phone.
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 34 }}>
            <div style={{ width: 13, height: 13, borderRadius: 13, background: "#FFC23B", marginRight: 12 }} />
            <div style={{ fontSize: 25, color: "#A8937D", fontFamily: "monospace" }}>yolkling.com · ios, coming soon</div>
          </div>
        </div>
        <svg width="380" height="380" viewBox="0 0 120 120">
          <ellipse cx="60" cy="110" rx="36" ry="7" fill="rgba(42,36,27,0.10)" />
          <circle cx="60" cy="58" r="48" fill="#FFC23B" />
          <circle cx="45" cy="53" r="12" fill="#ffffff" />
          <circle cx="75" cy="53" r="12" fill="#ffffff" />
          <circle cx="46.5" cy="55" r="6" fill="#2A241B" />
          <circle cx="73.5" cy="55" r="6" fill="#2A241B" />
          <ellipse cx="36" cy="68" rx="7.5" ry="4.5" fill="#FF94C2" opacity="0.6" />
          <ellipse cx="84" cy="68" rx="7.5" ry="4.5" fill="#FF94C2" opacity="0.6" />
          <path d="M49 74 Q60 85 71 74" stroke="#2A241B" strokeWidth="5.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
