"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  LuGithub,
  LuExternalLink,
  LuAward,
  LuUsers,
  LuBookOpen,
  LuCalendar,
  LuArrowLeft,
  LuArrowRight,
} from "react-icons/lu";
import Image from "next/image";
import type { Project, EmbedVisualization, ProjectScreenshot } from "@/data/projects";
import { cn } from "@/lib/utils";
import { GlitchText } from "@/components/effects/GlitchText";
import { SectionReveal } from "@/components/effects/SectionReveal";

// ─── Color System ───────────────────────────────────────────────────────────

type AccentColor = "cyan" | "green" | "amber" | "red";

const accentStyles: Record<
  AccentColor,
  {
    text: string;
    border: string;
    bg: string;
    bgMuted: string;
    tagBg: string;
    tagText: string;
    tagBorder: string;
    glowRgb: string;
  }
> = {
  cyan: {
    text: "text-accent-cyan",
    border: "border-accent-cyan/30",
    bg: "bg-accent-cyan",
    bgMuted: "bg-accent-cyan/10",
    tagBg: "bg-accent-cyan/8",
    tagText: "text-accent-cyan/80",
    tagBorder: "border-accent-cyan/15",
    glowRgb: "0, 240, 255",
  },
  green: {
    text: "text-accent-green",
    border: "border-accent-green/30",
    bg: "bg-accent-green",
    bgMuted: "bg-accent-green/10",
    tagBg: "bg-accent-green/8",
    tagText: "text-accent-green/80",
    tagBorder: "border-accent-green/15",
    glowRgb: "57, 255, 20",
  },
  amber: {
    text: "text-accent-amber",
    border: "border-accent-amber/30",
    bg: "bg-accent-amber",
    bgMuted: "bg-accent-amber/10",
    tagBg: "bg-accent-amber/8",
    tagText: "text-accent-amber/80",
    tagBorder: "border-accent-amber/15",
    glowRgb: "255, 191, 0",
  },
  red: {
    text: "text-accent-red",
    border: "border-accent-red/30",
    bg: "bg-accent-red",
    bgMuted: "bg-accent-red/10",
    tagBg: "bg-accent-red/8",
    tagText: "text-accent-red/80",
    tagBorder: "border-accent-red/15",
    glowRgb: "255, 0, 60",
  },
};

// ─── Section Label ──────────────────────────────────────────────────────────
// Lightweight replacement for HUDBracket — just a label + accent divider line.

function SectionLabel({
  title,
  accent,
}: {
  title: string;
  accent: AccentColor;
}) {
  const colors = accentStyles[accent];
  return (
    <div className="mb-5 flex items-center gap-3">
      <h2
        className={cn(
          "font-heading text-xs uppercase tracking-[0.25em]",
          colors.text
        )}
      >
        {title}
      </h2>
      <div
        className="h-px flex-1"
        style={{
          background: `linear-gradient(to right, rgba(${colors.glowRgb}, 0.3), transparent)`,
        }}
        aria-hidden="true"
      />
    </div>
  );
}

// ─── Rich Text Renderer ─────────────────────────────────────────────────────

function renderRichText(content: string, accent: AccentColor) {
  const colors = accentStyles[accent];
  const paragraphs = content.split("\n\n");

  return paragraphs.map((paragraph, pIdx) => {
    // Bullet list items
    if (paragraph.startsWith("• ") || paragraph.startsWith("- ")) {
      const items = paragraph.split("\n").filter(Boolean);
      return (
        <ul key={pIdx} className="my-3 space-y-2 pl-1">
          {items.map((item, iIdx) => {
            const text = item.replace(/^[•\-]\s*/, "");
            return (
              <li
                key={iIdx}
                className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary"
              >
                <span
                  className={cn(
                    "mt-2 h-1 w-1 shrink-0 rounded-full",
                    colors.bg
                  )}
                  aria-hidden="true"
                />
                <span
                  dangerouslySetInnerHTML={{
                    __html: formatInlineText(text),
                  }}
                />
              </li>
            );
          })}
        </ul>
      );
    }

    return (
      <p
        key={pIdx}
        className="my-3 text-sm leading-relaxed text-text-secondary"
        dangerouslySetInnerHTML={{ __html: formatInlineText(paragraph) }}
      />
    );
  });
}

/** Inline formatting: **bold**, `code`, and HTML-safe output */
function formatInlineText(text: string): string {
  // 1. Extract backtick code spans to protect them from escaping
  const codeSpans: string[] = [];
  let withPlaceholders = text.replace(/`([^`]+)`/g, (_, code) => {
    codeSpans.push(code);
    return `__CODE_SPAN_${codeSpans.length - 1}__`;
  });

  // 2. HTML-escape the rest so angle brackets render as text
  withPlaceholders = withPlaceholders
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 3. Bold markers → <strong>
  withPlaceholders = withPlaceholders.replace(
    /\*\*(.+?)\*\*/g,
    '<strong class="text-text-primary font-medium">$1</strong>'
  );

  // 4. Restore code spans as styled <code> elements (escape their contents too)
  withPlaceholders = withPlaceholders.replace(
    /__CODE_SPAN_(\d+)__/g,
    (_, idx) => {
      const escaped = codeSpans[Number(idx)]
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      return `<code class="rounded bg-bg-elevated px-1.5 py-0.5 font-heading text-xs text-accent-cyan">${escaped}</code>`;
    }
  );

  return withPlaceholders;
}

// ─── Screenshot Gallery ─────────────────────────────────────────────────────

function ScreenshotGallery({
  screenshots,
  accent,
}: {
  screenshots: ProjectScreenshot[];
  accent: AccentColor;
}) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const colors = accentStyles[accent];

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {screenshots.map((shot, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIdx(idx)}
            className={cn(
              "group relative overflow-hidden border text-left transition-all duration-300",
              colors.border,
              "bg-bg-base hover:bg-white/[0.02]"
            )}
            style={{
              boxShadow: `0 0 0 rgba(${colors.glowRgb}, 0)`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                `0 0 20px rgba(${colors.glowRgb}, 0.15)`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                `0 0 0 rgba(${colors.glowRgb}, 0)`;
            }}
          >
            <div className="relative aspect-video w-full">
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-base/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            {shot.caption && (
              <p className="px-3 py-2.5 font-heading text-[9px] uppercase tracking-[0.2em] text-text-muted">
                {shot.caption}
              </p>
            )}
            {/* Corner accents */}
            <div
              className={cn(
                "pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t",
                colors.border
              )}
              aria-hidden="true"
            />
            <div
              className={cn(
                "pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t",
                colors.border
              )}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg-base/90 backdrop-blur-sm"
          onClick={() => setSelectedIdx(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot preview"
        >
          <div
            className="relative mx-4 max-h-[85vh] max-w-5xl overflow-hidden border"
            style={{
              borderColor: `rgba(${colors.glowRgb}, 0.3)`,
              boxShadow: `0 0 40px rgba(${colors.glowRgb}, 0.15), 0 0 80px rgba(${colors.glowRgb}, 0.05)`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={screenshots[selectedIdx].src}
              alt={screenshots[selectedIdx].alt}
              width={1920}
              height={1080}
              className="h-auto max-h-[85vh] w-full object-contain"
              priority
            />
            {screenshots[selectedIdx].caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-bg-base/80 px-4 py-2.5 backdrop-blur-sm">
                <p className={cn("font-heading text-[10px] uppercase tracking-[0.2em]", colors.text)}>
                  {screenshots[selectedIdx].caption}
                </p>
              </div>
            )}
            <button
              onClick={() => setSelectedIdx(null)}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center border border-white/20 bg-bg-base/80 font-heading text-xs text-text-secondary backdrop-blur-sm transition-colors hover:border-white/40 hover:text-text-primary"
              aria-label="Close preview"
            >
              &times;
            </button>
            {/* Prev / Next in lightbox */}
            {screenshots.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIdx((selectedIdx - 1 + screenshots.length) % screenshots.length);
                  }}
                  className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-white/20 bg-bg-base/80 font-heading text-xs text-text-secondary backdrop-blur-sm transition-colors hover:border-white/40 hover:text-text-primary"
                  aria-label="Previous screenshot"
                >
                  &lsaquo;
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIdx((selectedIdx + 1) % screenshots.length);
                  }}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-white/20 bg-bg-base/80 font-heading text-xs text-text-secondary backdrop-blur-sm transition-colors hover:border-white/40 hover:text-text-primary"
                  aria-label="Next screenshot"
                >
                  &rsaquo;
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ─── Embed Tabs ─────────────────────────────────────────────────────────────

/** Native size of the Tableau embed including Public chrome (px).
 *  Dashboard canvas is 1300x900; extra height accounts for the
 *  "View on Tableau Public" footer bar (~27px). */
const EMBED_NATIVE_W = 1300;
const EMBED_NATIVE_H = 927;

function EmbedTabs({
  embeds,
  accent,
}: {
  embeds: EmbedVisualization[];
  accent: AccentColor;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const colors = accentStyles[accent];
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const updateScale = useCallback(() => {
    if (!containerRef.current) return;
    const containerW = containerRef.current.offsetWidth;
    setScale(containerW / EMBED_NATIVE_W);
  }, []);

  useEffect(() => {
    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [updateScale]);

  const scaledHeight = EMBED_NATIVE_H * scale;

  /** Build the Tableau Public link (strip embed params) for external open */
  const publicUrl = embeds[activeIdx].url.split("?")[0];

  return (
    <div>
      {/* ── Mobile / Tablet: link cards instead of embedded iframes ── */}
      <div className="lg:hidden">
        <div className="space-y-3">
          {embeds.map((embed, idx) => (
            <a
              key={idx}
              href={embed.url.split("?")[0]}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center justify-between border px-5 py-4 transition-all duration-200",
                colors.border,
                "bg-white/[0.02] hover:bg-white/[0.05]"
              )}
              style={{
                boxShadow: `0 0 0 rgba(${colors.glowRgb}, 0)`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  `0 0 16px rgba(${colors.glowRgb}, 0.2)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  `0 0 0 rgba(${colors.glowRgb}, 0)`;
              }}
            >
              <div>
                <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-text-primary">
                  {embed.title}
                </p>
                <p className="mt-1 font-heading text-[9px] uppercase tracking-[0.15em] text-text-muted">
                  Open in Tableau Public
                </p>
              </div>
              <LuExternalLink
                className={cn("h-4 w-4 shrink-0", colors.text)}
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
      </div>

      {/* ── Desktop: full interactive embeds ── */}
      <div className="hidden lg:block">
        {/* Tab bar */}
        {embeds.length > 1 && (
          <div className="mb-4 flex gap-2 overflow-x-auto">
            {embeds.map((embed, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={cn(
                  "shrink-0 border px-4 py-2 font-heading text-[10px] uppercase tracking-[0.2em] transition-all duration-200",
                  idx === activeIdx
                    ? cn(colors.border, colors.bgMuted, colors.text)
                    : "border-white/10 text-text-muted hover:border-white/20 hover:text-text-secondary"
                )}
                style={
                  idx === activeIdx
                    ? {
                        boxShadow: `0 0 12px rgba(${colors.glowRgb}, 0.15)`,
                      }
                    : undefined
                }
              >
                {embed.title}
              </button>
            ))}
          </div>
        )}

        {/* Embed container — scales iframe to fit */}
        <div
          ref={containerRef}
          className={cn(
            "relative overflow-hidden border",
            colors.border,
            "bg-bg-base"
          )}
          style={{
            height: scaledHeight,
            boxShadow: `0 0 20px rgba(${colors.glowRgb}, 0.08), inset 0 0 20px rgba(${colors.glowRgb}, 0.03)`,
          }}
        >
          {/* Corner accents */}
          <div
            className={cn(
              "pointer-events-none absolute left-0 top-0 z-10 h-4 w-4 border-l-2 border-t-2",
              colors.border
            )}
            aria-hidden="true"
          />
          <div
            className={cn(
              "pointer-events-none absolute right-0 top-0 z-10 h-4 w-4 border-r-2 border-t-2",
              colors.border
            )}
            aria-hidden="true"
          />
          <div
            className={cn(
              "pointer-events-none absolute bottom-0 left-0 z-10 h-4 w-4 border-b-2 border-l-2",
              colors.border
            )}
            aria-hidden="true"
          />
          <div
            className={cn(
              "pointer-events-none absolute bottom-0 right-0 z-10 h-4 w-4 border-b-2 border-r-2",
              colors.border
            )}
            aria-hidden="true"
          />

          {/* Iframe rendered at native size, then CSS-scaled to fit */}
          <iframe
            src={embeds[activeIdx].url}
            title={embeds[activeIdx].title}
            width={EMBED_NATIVE_W}
            height={EMBED_NATIVE_H}
            className="block origin-top-left border-0"
            style={{ transform: `scale(${scale})` }}
            allowFullScreen
            loading="lazy"
          />
        </div>

        {/* Embed label */}
        <div className="mt-3 flex items-center justify-between">
          <p className="font-heading text-[9px] uppercase tracking-[0.2em] text-text-muted">
            {embeds[activeIdx].title}
            {embeds.length > 1 && (
              <span className="ml-2 opacity-50">
                {activeIdx + 1} / {embeds.length}
              </span>
            )}
          </p>
          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-heading text-[9px] uppercase tracking-[0.2em] text-text-muted transition-colors hover:text-text-primary"
          >
            <LuExternalLink className="h-3 w-3" />
            Open in Tableau
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Props ──────────────────────────────────────────────────────────────────

interface ProjectDetailContentProps {
  project: Project;
  accent: AccentColor;
  prev: Project | null;
  next: Project | null;
}

// ─── Component ──────────────────────────────────────────────────────────────

export function ProjectDetailContent({
  project,
  accent,
  prev,
  next,
}: ProjectDetailContentProps) {
  const colors = accentStyles[accent];
  const detail = project.detail;

  return (
    <article>
      {/* ── Hero Header ── */}
      <SectionReveal animation="fadeUp" duration={0.5}>
        <header className="mb-12">
          {/* Category + Achievement */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span
              className={cn(
                "inline-block border px-2.5 py-1",
                "font-heading text-[10px] uppercase tracking-[0.25em]",
                colors.tagBorder,
                colors.tagBg,
                colors.text
              )}
            >
              {project.category}
            </span>
            {project.achievement && (
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 border px-2.5 py-1",
                  "font-heading text-[10px] uppercase tracking-[0.2em]",
                  "border-accent-amber/30 bg-accent-amber/10 text-accent-amber"
                )}
              >
                <LuAward className="h-3 w-3" aria-hidden="true" />
                {project.achievement}
              </span>
            )}
          </div>

          {/* Title */}
          <GlitchText
            as="h1"
            glowColor={accent}
            className="font-heading text-3xl font-bold tracking-wide sm:text-4xl md:text-5xl"
          >
            {project.title}
          </GlitchText>

          {/* Subtitle */}
          <p
            className={cn(
              "mt-2 font-heading text-sm tracking-[0.15em] sm:text-base",
              colors.text,
              "opacity-70"
            )}
          >
            {project.subtitle}
          </p>

          {/* Divider line */}
          <div
            className="mt-6 h-px w-full"
            style={{
              background: `linear-gradient(to right, rgba(${colors.glowRgb}, 0.5), transparent)`,
            }}
            aria-hidden="true"
          />

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "inline-block border px-2 py-0.5",
                  "font-heading text-[9px] uppercase tracking-[0.15em]",
                  colors.tagBorder,
                  colors.tagBg,
                  colors.tagText
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </header>
      </SectionReveal>

      {/* ── Key Metrics Panel ── */}
      {detail?.keyMetrics && detail.keyMetrics.length > 0 && (
        <SectionReveal animation="fadeUp" delay={0.1} duration={0.5}>
          <section className="mb-12">
            <SectionLabel title="Key Metrics" accent={accent} />
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
              {detail.keyMetrics.map((metric) => (
                <div key={metric.label} className="text-center">
                  <p
                    className={cn(
                      "font-heading text-xl font-bold sm:text-2xl",
                      colors.text
                    )}
                  >
                    {metric.value}
                  </p>
                  <p className="mt-1 font-heading text-[9px] uppercase tracking-[0.2em] text-text-muted">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </SectionReveal>
      )}

      {/* ── Narrative Sections ── */}
      {detail?.sections.map((section, idx) => (
        <SectionReveal
          key={section.id}
          animation="fadeUp"
          delay={0.05 * idx}
          duration={0.5}
        >
          <section className="mb-10">
            <SectionLabel title={section.title} accent={accent} />
            <div>{renderRichText(section.content, accent)}</div>
          </section>
        </SectionReveal>
      ))}

      {/* ── Fallback if no detail sections yet ── */}
      {!detail && (
        <SectionReveal animation="fadeUp" delay={0.1} duration={0.5}>
          <section className="mb-10">
            <SectionLabel title="Overview" accent={accent} />
            <p className="text-sm leading-relaxed text-text-secondary">
              {project.longDescription}
            </p>
          </section>
        </SectionReveal>
      )}

      {/* ── Screenshot Gallery ── */}
      {detail?.screenshots && detail.screenshots.length > 0 && (
        <SectionReveal animation="fadeUp" delay={0.1} duration={0.5}>
          <section className="mb-12">
            <SectionLabel title="Screenshots" accent={accent} />
            <ScreenshotGallery screenshots={detail.screenshots} accent={accent} />
          </section>
        </SectionReveal>
      )}

      {/* ── Interactive Embeds (Tableau, etc.) ── */}
      {detail?.embeds && detail.embeds.length > 0 && (
        <SectionReveal animation="fadeUp" delay={0.1} duration={0.5}>
          <section className="mb-12">
            <SectionLabel title="Interactive Dashboards" accent={accent} />
            <p className="mb-6 text-sm text-text-muted">
              Explore the live Tableau dashboards below — filters and
              interactions are fully functional.
            </p>
            <EmbedTabs embeds={detail.embeds} accent={accent} />
          </section>
        </SectionReveal>
      )}

      {/* ── Tech Stack ── */}
      <SectionReveal animation="fadeUp" delay={0.1} duration={0.5}>
        <section className="mb-10">
          <SectionLabel title="Tech Stack" accent={accent} />
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className={cn(
                  "inline-block border px-3 py-1.5",
                  "font-heading text-[10px] uppercase tracking-[0.15em]",
                  "border-white/10 bg-white/5 text-text-primary",
                  "transition-colors duration-200",
                  "hover:border-white/20 hover:bg-white/8"
                )}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      </SectionReveal>

      {/* ── Details: Team / Course / Timeline ── */}
      {detail && (detail.team || detail.course || detail.timeline) && (
        <SectionReveal animation="fadeUp" delay={0.1} duration={0.5}>
          <section className="mb-10">
            <SectionLabel title="Details" accent={accent} />
            <div className="grid gap-4 sm:grid-cols-3">
              {detail.team && detail.team.length > 0 && (
                <div className="flex items-start gap-3">
                  <LuUsers
                    className={cn("mt-0.5 h-4 w-4 shrink-0", colors.text)}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-heading text-[9px] uppercase tracking-[0.2em] text-text-muted">
                      Team
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      {detail.team.join(", ")}
                    </p>
                  </div>
                </div>
              )}
              {detail.course && (
                <div className="flex items-start gap-3">
                  <LuBookOpen
                    className={cn("mt-0.5 h-4 w-4 shrink-0", colors.text)}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-heading text-[9px] uppercase tracking-[0.2em] text-text-muted">
                      Course
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      {detail.course}
                    </p>
                  </div>
                </div>
              )}
              {detail.timeline && (
                <div className="flex items-start gap-3">
                  <LuCalendar
                    className={cn("mt-0.5 h-4 w-4 shrink-0", colors.text)}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-heading text-[9px] uppercase tracking-[0.2em] text-text-muted">
                      Timeline
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      {detail.timeline}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </SectionReveal>
      )}

      {/* ── Action Links ── */}
      <SectionReveal animation="fadeUp" delay={0.1} duration={0.5}>
        <div className="mb-16 flex flex-wrap gap-4">
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 border px-6 py-3",
                "font-heading text-xs uppercase tracking-[0.2em]",
                "transition-all duration-300",
                colors.border,
                colors.text,
                "hover:bg-white/5"
              )}
              style={{
                boxShadow: `0 0 0 rgba(${colors.glowRgb}, 0)`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  `0 0 20px rgba(${colors.glowRgb}, 0.3)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  `0 0 0 rgba(${colors.glowRgb}, 0)`;
              }}
            >
              <LuExternalLink className="h-4 w-4" aria-hidden="true" />
              {project.liveDemoLabel ?? "View Notebook"}
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 border px-6 py-3",
                "font-heading text-xs uppercase tracking-[0.2em]",
                "border-white/10 text-text-secondary",
                "transition-all duration-300",
                "hover:border-white/20 hover:text-text-primary hover:bg-white/5"
              )}
            >
              <LuGithub className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
          )}
        </div>
      </SectionReveal>

      {/* ── Prev / Next Navigation ── */}
      <nav
        className="flex items-stretch justify-between border-t border-white/5 pt-8"
        aria-label="Project navigation"
      >
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="group flex items-center gap-3 text-left transition-colors"
          >
            <LuArrowLeft
              className="h-4 w-4 text-text-muted transition-colors group-hover:text-accent-cyan"
              aria-hidden="true"
            />
            <div>
              <p className="font-heading text-[9px] uppercase tracking-[0.2em] text-text-muted transition-colors group-hover:text-accent-cyan">
                Previous
              </p>
              <p className="mt-0.5 font-heading text-xs tracking-wide text-text-secondary transition-colors group-hover:text-text-primary">
                {prev.title}
              </p>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="group flex items-center gap-3 text-right transition-colors"
          >
            <div>
              <p className="font-heading text-[9px] uppercase tracking-[0.2em] text-text-muted transition-colors group-hover:text-accent-cyan">
                Next
              </p>
              <p className="mt-0.5 font-heading text-xs tracking-wide text-text-secondary transition-colors group-hover:text-text-primary">
                {next.title}
              </p>
            </div>
            <LuArrowRight
              className="h-4 w-4 text-text-muted transition-colors group-hover:text-accent-cyan"
              aria-hidden="true"
            />
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
  );
}
