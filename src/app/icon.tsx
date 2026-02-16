import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  const logoData = readFileSync(join(process.cwd(), "public", "logo.jpg"));
  const base64 = logoData.toString("base64");
  const dataUri = `data:image/jpeg;base64,${base64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0f",
        }}
      >
        <img
          src={dataUri}
          width={32}
          height={32}
          style={{ objectFit: "cover", borderRadius: "4px" }}
        />
      </div>
    ),
    { ...size }
  );
}
