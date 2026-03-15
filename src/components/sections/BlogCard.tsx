"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { LuCalendar, LuClock, LuTag } from "react-icons/lu";
import type { BlogPost } from "@/data/blog";
import { blogCategoryAccentMap } from "@/data/blog";
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
  },
} as const;

// ─── Category Display Labels ─────────────────────────────────────────────────

const categoryLabels: Record<string, string> = {
  article: "ARTICLE",
  research: "RESEARCH",
  tutorial: "TUTORIAL",
  wip: "WIP",
};

// ─── Animation Variants (defined outside component) ──────────────────────────

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

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const accent = blogCategoryAccentMap[post.category];
  const colors = accentColorMap[accent];

  const formattedDate = new Date(`${post.date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

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
      {/* ── Content Area ── */}
      <div className="flex flex-1 flex-col p-5">
        {/* Meta row: category badge + date + read time */}
        <div className="mb-3 flex items-center gap-3">
          <span
            className={cn(
              "inline-block border px-2 py-0.5",
              "font-heading text-[9px] uppercase tracking-[0.2em]",
              colors.tagBorder,
              colors.tagBg,
              colors.text
            )}
          >
            {categoryLabels[post.category] ?? post.category.toUpperCase()}
          </span>

          <div className="flex items-center gap-1.5 text-text-muted">
            <LuCalendar className="h-3 w-3" aria-hidden="true" />
            <span className="font-heading text-[10px] tracking-wider">
              {formattedDate}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-text-muted">
            <LuClock className="h-3 w-3" aria-hidden="true" />
            <span className="font-heading text-[10px] tracking-wider">
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-2 font-heading text-base font-semibold tracking-wide text-text-primary transition-colors group-hover:text-white">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="mb-4 flex-1 text-sm leading-relaxed text-text-secondary line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          <LuTag
            className="h-3 w-3 text-text-muted/60"
            aria-hidden="true"
          />
          {post.tags.slice(0, 3).map((tag) => (
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
          {post.tags.length > 3 && (
            <span className="inline-block px-1 py-0.5 font-heading text-[9px] text-text-muted">
              +{post.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* ── Full card link overlay ── */}
      <Link
        href={`/blog/${post.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Read ${post.title}`}
      >
        <span className="sr-only">Read post</span>
      </Link>
    </motion.div>
  );
}
