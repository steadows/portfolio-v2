"use client";

import { useState, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useReducedMotion,
} from "framer-motion";
import { SectionReveal } from "@/components/effects/SectionReveal";
import { ProjectCard } from "@/components/sections/ProjectCard";
import {
  projects,
  categoryMeta,
  totalProjectCount,
  type ProjectCategory,
} from "@/data/projects";
import { cn } from "@/lib/utils";

// ─── Color Mappings ──────────────────────────────────────────────────────────

const accentColorMap = {
  cyan: {
    text: "text-accent-cyan",
    border: "border-accent-cyan/20",
    borderActive: "border-accent-cyan/60",
    borderHover: "hover:border-accent-cyan/40",
    bg: "bg-accent-cyan",
    bgMuted: "bg-accent-cyan/10",
    boxGlow: "box-glow-cyan",
  },
  green: {
    text: "text-accent-green",
    border: "border-accent-green/20",
    borderActive: "border-accent-green/60",
    borderHover: "hover:border-accent-green/40",
    bg: "bg-accent-green",
    bgMuted: "bg-accent-green/10",
    boxGlow: "box-glow-green",
  },
  amber: {
    text: "text-accent-amber",
    border: "border-accent-amber/20",
    borderActive: "border-accent-amber/60",
    borderHover: "hover:border-accent-amber/40",
    bg: "bg-accent-amber",
    bgMuted: "bg-accent-amber/10",
    boxGlow: "box-glow-amber",
  },
  red: {
    text: "text-accent-red",
    border: "border-accent-red/20",
    borderActive: "border-accent-red/60",
    borderHover: "hover:border-accent-red/40",
    bg: "bg-accent-red",
    bgMuted: "bg-accent-red/10",
    boxGlow: "box-glow-red",
  },
} as const;

// ─── Animation Variants (defined OUTSIDE component) ─────────────────────────

/** Container for staggered card entrance */
const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

// ─── Component ───────────────────────────────────────────────────────────────

export function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState<
    ProjectCategory | "all"
  >("all");
  const shouldReduceMotion = useReducedMotion();

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const activeMeta = categoryMeta.find((c) => c.id === activeFilter)!;
  const activeColors = accentColorMap[activeMeta.accentColor];

  return (
    <section className="w-full max-w-6xl py-20 md:py-32">
      {/* ── Section Header ── */}
      <SectionReveal animation="fadeUp">
        <div className="space-y-4 text-center">
          {/* Decorative divider */}
          <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent" />

          <h2 className="font-heading text-3xl font-bold text-text-primary md:text-4xl">
            PROJECTS
          </h2>

          <p className="mx-auto max-w-2xl leading-relaxed text-text-secondary">
            Data science projects spanning machine learning, statistical
            analysis, database architecture, and software engineering.
          </p>

          {/* Stats bar */}
          <div className="mx-auto flex max-w-lg items-center justify-center gap-6 pt-2">
            <div className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-green motion-safe:animate-glow-pulse" />
              <span className="font-heading text-[10px] uppercase tracking-[0.2em] text-text-muted">
                {projects.filter((p) => p.featured).length} Featured
              </span>
            </div>
            <div className="h-3 w-px bg-text-muted/30" />
            <div className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-amber motion-safe:animate-glow-pulse" />
              <span className="font-heading text-[10px] uppercase tracking-[0.2em] text-text-muted">
                {projects.filter((p) => p.achievement).length} Awards
              </span>
            </div>
            <div className="h-3 w-px bg-text-muted/30" />
            <div className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-cyan motion-safe:animate-glow-pulse" />
              <span className="font-heading text-[10px] uppercase tracking-[0.2em] text-text-muted">
                {categoryMeta.length - 1} Categories
              </span>
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* ── Category Filter Tabs ── */}
      <SectionReveal animation="fadeUp" delay={0.2}>
        <LayoutGroup>
          <div
            className={cn(
              "mt-12 flex gap-2 overflow-x-auto pb-2",
              "sm:flex sm:flex-wrap sm:justify-center sm:gap-3 sm:overflow-visible sm:pb-0",
              "scrollbar-hide"
            )}
            role="tablist"
            aria-label="Project categories"
          >
            {categoryMeta.map((cat) => {
              const isActive = cat.id === activeFilter;
              const colors = accentColorMap[cat.accentColor];
              const count =
                cat.id === "all"
                  ? projects.length
                  : projects.filter((p) => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="projects-grid-panel"
                  id={`filter-tab-${cat.id}`}
                  className={cn(
                    "relative min-w-[100px] flex-shrink-0 cursor-pointer border px-4 py-2.5 text-center transition-colors",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan/50",
                    isActive
                      ? cn(colors.borderActive, "bg-bg-surface/80")
                      : cn(
                          colors.border,
                          colors.borderHover,
                          "bg-bg-surface/30 hover:bg-bg-surface/50"
                        )
                  )}
                >
                  {/* Animated glow overlay — slides between tabs via layoutId */}
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterGlow"
                      className={cn(
                        "absolute inset-0 border",
                        colors.borderActive,
                        colors.boxGlow
                      )}
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 500, damping: 35 }
                      }
                    />
                  )}

                  <div className="relative z-10">
                    <span
                      className={cn(
                        "font-heading text-xs font-semibold tracking-wide transition-colors",
                        isActive ? "text-text-primary" : "text-text-secondary"
                      )}
                    >
                      {cat.shortLabel}
                    </span>
                    <span
                      className={cn(
                        "ml-2 font-heading text-[9px] tracking-[0.1em] transition-colors",
                        isActive ? colors.text : "text-text-muted"
                      )}
                    >
                      [{count.toString().padStart(2, "0")}]
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </SectionReveal>

      {/* ── Category divider ── */}
      <div className="mt-8 mb-6 flex items-center gap-3">
        <span className={cn("h-px flex-1 opacity-20", activeColors.bg)} />
        <span
          className={cn(
            "font-heading text-[10px] tracking-[0.25em]",
            activeColors.text
          )}
        >
          {activeMeta.label}
        </span>
        <span className={cn("h-px flex-1 opacity-20", activeColors.bg)} />
      </div>

      {/* ── Projects Grid ── */}
      <div
        id="projects-grid-panel"
        role="tabpanel"
        aria-labelledby={`filter-tab-${activeFilter}`}
        className="min-h-[300px]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={shouldReduceMotion ? undefined : gridContainerVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            exit={shouldReduceMotion ? undefined : "exit"}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="font-heading text-sm text-text-muted">
              NO PROJECTS FOUND
            </p>
            <p className="mt-2 text-xs text-text-muted/60">
              No projects in this category yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
