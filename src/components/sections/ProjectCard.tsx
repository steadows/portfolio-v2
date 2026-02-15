"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { LuExternalLink, LuGithub, LuAward } from "react-icons/lu";
import type { Project } from "@/data/projects";
import { categoryAccentMap } from "@/data/projects";
import { cn } from "@/lib/utils";

// ─── Color Mappings ──────────────────────────────────────────────────────────

const accentColorMap = {
  cyan: {
    text: "text-accent-cyan",
    border: "border-accent-cyan/20",
    borderHover: "border-accent-cyan/50",
    bg: "bg-accent-cyan",
    bgMuted: "bg-accent-cyan/10",
    glowShadow:
      "0 0 15px rgba(0, 240, 255, 0.35), 0 0 40px rgba(0, 240, 255, 0.12)",
    tagBg: "bg-accent-cyan/8",
    tagText: "text-accent-cyan/80",
    tagBorder: "border-accent-cyan/15",
    scanColor: "rgba(0, 240, 255, 0.06)",
  },
  green: {
    text: "text-accent-green",
    border: "border-accent-green/20",
    borderHover: "border-accent-green/50",
    bg: "bg-accent-green",
    bgMuted: "bg-accent-green/10",
    glowShadow:
      "0 0 15px rgba(57, 255, 20, 0.35), 0 0 40px rgba(57, 255, 20, 0.12)",
    tagBg: "bg-accent-green/8",
    tagText: "text-accent-green/80",
    tagBorder: "border-accent-green/15",
    scanColor: "rgba(57, 255, 20, 0.06)",
  },
  amber: {
    text: "text-accent-amber",
    border: "border-accent-amber/20",
    borderHover: "border-accent-amber/50",
    bg: "bg-accent-amber",
    bgMuted: "bg-accent-amber/10",
    glowShadow:
      "0 0 15px rgba(255, 191, 0, 0.35), 0 0 40px rgba(255, 191, 0, 0.12)",
    tagBg: "bg-accent-amber/8",
    tagText: "text-accent-amber/80",
    tagBorder: "border-accent-amber/15",
    scanColor: "rgba(255, 191, 0, 0.06)",
  },
  red: {
    text: "text-accent-red",
    border: "border-accent-red/20",
    borderHover: "border-accent-red/50",
    bg: "bg-accent-red",
    bgMuted: "bg-accent-red/10",
    glowShadow:
      "0 0 15px rgba(255, 0, 60, 0.35), 0 0 40px rgba(255, 0, 60, 0.12)",
    tagBg: "bg-accent-red/8",
    tagText: "text-accent-red/80",
    tagBorder: "border-accent-red/15",
    scanColor: "rgba(255, 0, 60, 0.06)",
  },
} as const;

// ─── Animation Variants (defined outside component) ─────────────────────────

const cardItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 350,
      damping: 28,
    },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const accent = categoryAccentMap[project.category];
  const colors = accentColorMap[accent];

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : cardItemVariants}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -6,
              boxShadow: colors.glowShadow,
              transition: {
                type: "spring" as const,
                stiffness: 400,
                damping: 25,
              },
            }
      }
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      className={cn(
        "group relative flex flex-col overflow-hidden border",
        "bg-bg-surface/40 hover:bg-bg-surface/70",
        "transition-colors duration-300",
        colors.border
      )}
    >
      {/* ── Scan line animation on hover ── */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10",
          "opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        )}
        aria-hidden="true"
      >
        <div
          className="absolute inset-x-0 h-[1px] animate-scan-line"
          style={{ backgroundColor: colors.scanColor }}
        />
      </div>

      {/* ── Project Image / Preview Area ── */}
      <div className="relative h-44 overflow-hidden bg-bg-base/60">
        <div className="absolute inset-x-0 top-9 bottom-0 px-2">
          <Image
            src={project.image}
            alt={`${project.title} — ${project.subtitle}`}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-contain"
            priority={project.featured}
          />
        </div>

        {/* Project category label */}
        <div className="absolute top-3 left-3 z-20">
          <span
            className={cn(
              "inline-block border px-2 py-0.5",
              "font-heading text-[9px] uppercase tracking-[0.2em]",
              colors.tagBorder,
              colors.tagBg,
              colors.text
            )}
          >
            {project.category}
          </span>
        </div>

        {/* Achievement badge */}
        {project.achievement && (
          <div className="absolute top-3 right-3 z-20">
            <span
              className={cn(
                "inline-flex items-center gap-1 border px-2 py-0.5",
                "font-heading text-[9px] uppercase tracking-[0.15em]",
                "border-accent-amber/30 bg-accent-amber/10 text-accent-amber"
              )}
            >
              <LuAward className="h-2.5 w-2.5" aria-hidden="true" />
              {project.achievement}
            </span>
          </div>
        )}

        {/* Gradient overlay at bottom of image area */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg-surface/90 to-transparent" />

      </div>

      {/* ── Content Area ── */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title + Subtitle */}
        <div className="mb-3">
          <h3 className="font-heading text-sm font-semibold tracking-wide text-text-primary transition-colors group-hover:text-white">
            {project.title}
          </h3>
          <p
            className={cn(
              "mt-0.5 font-heading text-[10px] tracking-[0.15em]",
              colors.text,
              "opacity-70"
            )}
          >
            {project.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="mb-4 flex-1 text-xs leading-relaxed text-text-secondary line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className={cn(
                "inline-block border px-1.5 py-0.5",
                "font-heading text-[9px] uppercase tracking-[0.1em]",
                colors.tagBorder,
                colors.tagBg,
                colors.tagText
              )}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="inline-block px-1 py-0.5 font-heading text-[9px] text-text-muted">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Footer: Tech stack preview + Links */}
        <div className="flex items-center justify-between border-t border-white/5 pt-3">
          {/* Tech stack */}
          <div className="flex items-center gap-1.5">
            <span className="font-heading text-[8px] uppercase tracking-[0.15em] text-text-muted">
              STACK:
            </span>
            <span className="text-[10px] text-text-secondary">
              {project.techStack.slice(0, 3).join(" · ")}
            </span>
          </div>

          {/* External links */}
          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "text-text-muted transition-colors",
                  `hover:${colors.text}`
                )}
                aria-label={`${project.title} GitHub repository`}
                onClick={(e) => e.stopPropagation()}
              >
                <LuGithub className="h-3.5 w-3.5" />
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "text-text-muted transition-colors",
                  `hover:${colors.text}`
                )}
                aria-label={`${project.title} live demo`}
                onClick={(e) => e.stopPropagation()}
              >
                <LuExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Full card link overlay ── */}
      <Link
        href={`/projects/${project.slug}`}
        className="absolute inset-0 z-30"
        aria-label={`View details for ${project.title}`}
      >
        <span className="sr-only">View project details</span>
      </Link>
    </motion.div>
  );
}
