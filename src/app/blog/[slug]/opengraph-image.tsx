import { ImageResponse } from "next/og";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { readFileSync } from "fs";
import { join } from "path";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const categoryAccentMap: Record<string, { primary: string; secondary: string }> = {
  article:  { primary: "#00f0ff", secondary: "#39ff14" },
  research: { primary: "#39ff14", secondary: "#00f0ff" },
  project:  { primary: "#f5a623", secondary: "#00f0ff" },
};

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = getPostBySlug(slug);

  // Load fonts from CDN
  const [interBold, jetbrainsMono] = await Promise.all([
    fetch("https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.woff").then((r) => r.arrayBuffer()),
    fetch("https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-400-normal.woff").then((r) => r.arrayBuffer()),
  ]);

  // Load high-res PNG logo for crisp rendering
  const logoPath = join(process.cwd(), "public", "logo-og.png");
  const logoData = readFileSync(logoPath);
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  if (!result) {
    return new ImageResponse(
      <div style={{ width: "100%", height: "100%", background: "#0a0a0f", display: "flex" }} />,
      { ...size }
    );
  }

  const { post } = result;
  const accent = categoryAccentMap[post.category] ?? categoryAccentMap.article;
  const subtitle = post.subtitle ?? post.excerpt ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(145deg, #0a0a0f 0%, #12121a 50%, #0a0a0f 100%)",
          position: "relative",
          overflow: "hidden",
          padding: "64px 72px",
          fontFamily: "Inter",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)`,
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
            background: `linear-gradient(90deg, transparent 0%, ${accent.primary} 30%, ${accent.secondary} 70%, transparent 100%)`,
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
            background: `linear-gradient(90deg, transparent 0%, ${accent.secondary} 30%, ${accent.primary} 70%, transparent 100%)`,
            display: "flex",
          }}
        />

        {/* Corner brackets */}
        {[
          { top: "24px", left: "24px", borderTop: `2px solid ${accent.primary}`, borderLeft: `2px solid ${accent.primary}` },
          { top: "24px", right: "24px", borderTop: `2px solid ${accent.primary}`, borderRight: `2px solid ${accent.primary}` },
          { bottom: "24px", left: "24px", borderBottom: `2px solid ${accent.primary}`, borderLeft: `2px solid ${accent.primary}` },
          { bottom: "24px", right: "24px", borderBottom: `2px solid ${accent.primary}`, borderRight: `2px solid ${accent.primary}` },
        ].map((style, i) => (
          <div
            key={i}
            style={{ position: "absolute", width: "40px", height: "40px", display: "flex", ...style }}
          />
        ))}

        {/* Header row: logo + byline + category tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "40px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Logo */}
            <img
              src={logoBase64}
              width={56}
              height={56}
              style={{ borderRadius: "50%", border: `2px solid ${accent.primary}40` }}
            />
            <div
              style={{
                fontSize: 18,
                fontFamily: "JetBrains Mono",
                color: "#777777",
                letterSpacing: "3px",
                display: "flex",
              }}
            >
              STEVE MEADOWS
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: `rgba(0,240,255,0.08)`,
              border: `1px solid ${accent.primary}40`,
              borderRadius: "4px",
              padding: "6px 16px",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: accent.primary,
                display: "flex",
              }}
            />
            <div
              style={{
                fontSize: 13,
                fontFamily: "JetBrains Mono",
                color: accent.primary,
                letterSpacing: "2px",
                display: "flex",
              }}
            >
              {post.category?.toUpperCase() ?? "ARTICLE"}
            </div>
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: post.title.length > 50 ? 44 : 52,
            fontWeight: 700,
            fontFamily: "Inter",
            color: "#e8e8e8",
            lineHeight: 1.15,
            letterSpacing: "-0.5px",
            display: "flex",
            flexWrap: "wrap",
            marginBottom: "24px",
            maxWidth: "960px",
          }}
        >
          {post.title}
        </div>

        {/* Divider */}
        <div
          style={{
            width: "80px",
            height: "2px",
            background: `linear-gradient(90deg, ${accent.primary}, ${accent.secondary})`,
            marginBottom: "24px",
            display: "flex",
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            fontFamily: "Inter",
            color: "#999999",
            lineHeight: 1.5,
            display: "flex",
            flexWrap: "wrap",
            maxWidth: "900px",
            flex: 1,
          }}
        >
          {subtitle}
        </div>

        {/* Footer row: tags + read time */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            {post.tags?.slice(0, 3).map((t: string) => (
              <div
                key={t}
                style={{
                  fontSize: 13,
                  fontFamily: "JetBrains Mono",
                  color: accent.secondary,
                  border: `1px solid ${accent.secondary}40`,
                  borderRadius: "3px",
                  padding: "4px 10px",
                  letterSpacing: "1px",
                  display: "flex",
                }}
              >
                {t}
              </div>
            ))}
          </div>

          {post.readTime && (
            <div
              style={{
                fontSize: 14,
                fontFamily: "JetBrains Mono",
                color: "#555555",
                letterSpacing: "2px",
                display: "flex",
              }}
            >
              {post.readTime.toUpperCase()}
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: interBold,
          weight: 700,
          style: "normal",
        },
        {
          name: "JetBrains Mono",
          data: jetbrainsMono,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );
}
