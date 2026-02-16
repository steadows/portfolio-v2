import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "Steve Meadows — Data Scientist & ML Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OGImage() {
  const logoData = readFileSync(join(process.cwd(), "public", "logo.jpg"));
  const base64 = logoData.toString("base64");
  const logoUri = `data:image/jpeg;base64,${base64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #0a0a0f 0%, #12121a 50%, #0a0a0f 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            display: "flex",
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background:
              "linear-gradient(90deg, transparent 0%, #00f0ff 30%, #39ff14 70%, transparent 100%)",
            display: "flex",
          }}
        />

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background:
              "linear-gradient(90deg, transparent 0%, #39ff14 30%, #00f0ff 70%, transparent 100%)",
            display: "flex",
          }}
        />

        {/* Corner bracket — top left */}
        <div
          style={{
            position: "absolute",
            top: "24px",
            left: "24px",
            width: "48px",
            height: "48px",
            borderTop: "2px solid #00f0ff",
            borderLeft: "2px solid #00f0ff",
            display: "flex",
          }}
        />
        {/* Corner bracket — top right */}
        <div
          style={{
            position: "absolute",
            top: "24px",
            right: "24px",
            width: "48px",
            height: "48px",
            borderTop: "2px solid #00f0ff",
            borderRight: "2px solid #00f0ff",
            display: "flex",
          }}
        />
        {/* Corner bracket — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            left: "24px",
            width: "48px",
            height: "48px",
            borderBottom: "2px solid #00f0ff",
            borderLeft: "2px solid #00f0ff",
            display: "flex",
          }}
        />
        {/* Corner bracket — bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            right: "24px",
            width: "48px",
            height: "48px",
            borderBottom: "2px solid #00f0ff",
            borderRight: "2px solid #00f0ff",
            display: "flex",
          }}
        />

        {/* Logo */}
        <img
          src={logoUri}
          width={140}
          height={140}
          style={{
            borderRadius: "20px",
            border: "2px solid rgba(0,240,255,0.3)",
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#00f0ff",
            marginTop: 28,
            letterSpacing: "6px",
            display: "flex",
          }}
        >
          STEVE MEADOWS
        </div>

        {/* Divider */}
        <div
          style={{
            width: 280,
            height: 2,
            marginTop: 16,
            marginBottom: 16,
            background:
              "linear-gradient(90deg, transparent 0%, #00f0ff 20%, #39ff14 80%, transparent 100%)",
            display: "flex",
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: "#888888",
            letterSpacing: "2px",
            display: "flex",
          }}
        >
          DATA SCIENTIST · ML ENGINEER · PROBLEM SOLVER
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: 16,
            color: "#555555",
            marginTop: 24,
            letterSpacing: "3px",
            display: "flex",
          }}
        >
          STEVE-MEADOWS.COM
        </div>

        {/* Status indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            left: "84px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#39ff14",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 12,
              color: "#39ff14",
              letterSpacing: "2px",
              display: "flex",
            }}
          >
            SYSTEM ONLINE
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
