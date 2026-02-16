"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useReducedMotion,
} from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiPython,
  SiR,
  SiC,
  SiScikitlearn,
  SiPytorch,
  SiLangchain,
  SiTensorflow,
  SiHuggingface,
  SiPandas,
  SiNumpy,
  SiStreamlit,
  SiTableau,
  SiPlotly,
  SiGit,
  SiLinux,
  SiDocker,
  SiAmazonwebservices,
  SiSnowflake,
  SiGooglecloud,
} from "react-icons/si";
import {
  LuDatabase,
  LuCoffee,
  LuChartBar,
  LuGitMerge,
  LuChartLine,
  LuTarget,
  LuTrendingUp,
  LuActivity,
  LuFlaskConical,
  LuMinimize2,
  LuWrench,
} from "react-icons/lu";
import { SectionReveal } from "@/components/effects/SectionReveal";
import {
  skillCategories,
  totalSkillCount,
  type SkillCategoryId,
} from "@/data/skills";
import { cn } from "@/lib/utils";

// ─── Skill Icon Map ──────────────────────────────────────────────────────────
// Maps skill names to their brand / thematic icons.

const skillIconMap: Record<string, IconType> = {
  // Languages & Frameworks
  Python: SiPython,
  R: SiR,
  SQL: LuDatabase,
  C: SiC,
  Java: LuCoffee,
  SAS: LuChartBar,
  // ML / AI
  "scikit-learn": SiScikitlearn,
  PyTorch: SiPytorch,
  LangChain: SiLangchain,
  "Ensemble Methods": LuGitMerge,
  TensorFlow: SiTensorflow,
  "Hugging Face": SiHuggingface,
  // Data & Visualization
  Pandas: SiPandas,
  NumPy: SiNumpy,
  Streamlit: SiStreamlit,
  Matplotlib: LuChartLine,
  Tableau: SiTableau,
  Plotly: SiPlotly,
  // Statistics
  Classification: LuTarget,
  Regression: LuTrendingUp,
  "Time Series": LuActivity,
  "Hypothesis Testing": LuFlaskConical,
  "Dim. Reduction": LuMinimize2,
  "Feature Engineering": LuWrench,
  // DevOps & Cloud
  Git: SiGit,
  Linux: SiLinux,
  Docker: SiDocker,
  AWS: SiAmazonwebservices,
  Snowflake: SiSnowflake,
  "Google Cloud": SiGooglecloud,
};

// ─── Color Mappings ──────────────────────────────────────────────────────────

const accentColorMap = {
  cyan: {
    text: "text-accent-cyan",
    textGroupHover: "group-hover:text-accent-cyan",
    border: "border-accent-cyan/20",
    borderActive: "border-accent-cyan/60",
    borderHover: "hover:border-accent-cyan/40",
    bg: "bg-accent-cyan",
    bgMuted: "bg-accent-cyan/10",
    boxGlow: "box-glow-cyan",
    /** Raw box-shadow value for Framer Motion whileHover */
    glowShadow:
      "0 0 12px rgba(0, 240, 255, 0.4), 0 0 30px rgba(0, 240, 255, 0.15)",
  },
  green: {
    text: "text-accent-green",
    textGroupHover: "group-hover:text-accent-green",
    border: "border-accent-green/20",
    borderActive: "border-accent-green/60",
    borderHover: "hover:border-accent-green/40",
    bg: "bg-accent-green",
    bgMuted: "bg-accent-green/10",
    boxGlow: "box-glow-green",
    glowShadow:
      "0 0 12px rgba(57, 255, 20, 0.4), 0 0 30px rgba(57, 255, 20, 0.15)",
  },
  amber: {
    text: "text-accent-amber",
    textGroupHover: "group-hover:text-accent-amber",
    border: "border-accent-amber/20",
    borderActive: "border-accent-amber/60",
    borderHover: "hover:border-accent-amber/40",
    bg: "bg-accent-amber",
    bgMuted: "bg-accent-amber/10",
    boxGlow: "box-glow-amber",
    glowShadow:
      "0 0 12px rgba(255, 191, 0, 0.4), 0 0 30px rgba(255, 191, 0, 0.15)",
  },
  red: {
    text: "text-accent-red",
    textGroupHover: "group-hover:text-accent-red",
    border: "border-accent-red/20",
    borderActive: "border-accent-red/60",
    borderHover: "hover:border-accent-red/40",
    bg: "bg-accent-red",
    bgMuted: "bg-accent-red/10",
    boxGlow: "box-glow-red",
    glowShadow:
      "0 0 12px rgba(255, 0, 60, 0.4), 0 0 30px rgba(255, 0, 60, 0.15)",
  },
} as const;

// ─── Animation Variants (defined OUTSIDE component per perf best practice) ──

/** Fade + slide for tab content panel on switch */
const tabContentVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

/** Staggered container for skill items */
const skillGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

/** Individual skill item — spring entrance from left */
const skillItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 28,
    },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * TechArsenalSection — Skills / Tech Arsenal section for the home page.
 *
 * Phase 5, Tasks 1–2: Section shell with title, HUD framing, and interactive
 * tab-based category switching. Selecting a tab reveals the skills within that
 * category with staggered Framer Motion animations.
 *
 * Tabs use `layoutId` for a smooth sliding glow indicator, and
 * `AnimatePresence` handles crossfade between tab content panels.
 */
export function TechArsenalSection() {
  const [activeCategory, setActiveCategory] =
    useState<SkillCategoryId>("languages");
  const shouldReduceMotion = useReducedMotion();

  const activeData = skillCategories.find((c) => c.id === activeCategory)!;
  const activeColors = accentColorMap[activeData.accentColor];

  return (
    <section id="tech-arsenal" className="w-full max-w-5xl py-20 md:py-32">
      {/* ── Section Header ── */}
      <SectionReveal animation="fadeUp">
        <div className="space-y-5 text-center">
          {/* Decorative divider */}
          <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent" />

          <h2 className="font-heading text-3xl font-bold text-text-primary md:text-4xl">
            SKILLS & <span className="text-accent-cyan">TOOLS</span>
          </h2>

          <p className="mx-auto max-w-2xl leading-relaxed text-text-secondary">
            I specialize in machine learning, statistical modeling, and
            building end-to-end data pipelines. Here&apos;s the stack I work
            with — from deep learning frameworks to cloud infrastructure.
          </p>

          {/* Stats bar */}
          <div className="mx-auto flex max-w-md items-center justify-center gap-6 pt-1">
            <div className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-cyan motion-safe:animate-glow-pulse" />
              <span className="font-heading text-[10px] uppercase tracking-[0.2em] text-text-muted">
                {skillCategories.length} Categories
              </span>
            </div>
            <div className="h-3 w-px bg-text-muted/30" />
            <div className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-green motion-safe:animate-glow-pulse" />
              <span className="font-heading text-[10px] uppercase tracking-[0.2em] text-text-muted">
                {totalSkillCount} Tools
              </span>
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* ── Category Tabs ── */}
      <SectionReveal animation="fadeUp" delay={0.2}>
        <LayoutGroup>
          <div
            className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-3"
            role="tablist"
            aria-label="Skill categories"
          >
            {skillCategories.map((category) => {
              const isActive = category.id === activeCategory;
              const colors = accentColorMap[category.accentColor];

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`tabpanel-${category.id}`}
                  id={`tab-${category.id}`}
                  className={cn(
                    "relative cursor-pointer border p-2.5 text-left transition-colors",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan/50",
                    "sm:p-3",
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
                      layoutId="activeTabGlow"
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

                  {/* Tab label content */}
                  <div className="relative z-10">
                    {/* Category index */}
                    <p
                      className={cn(
                        "font-heading text-[10px] tracking-[0.2em]",
                        isActive ? colors.text : "text-text-muted"
                      )}
                    >
                      {category.index} //
                    </p>

                    {/* Category name */}
                    <h3
                      className={cn(
                        "mt-1 font-heading text-xs font-semibold transition-colors sm:text-sm",
                        isActive ? "text-text-primary" : "text-text-secondary"
                      )}
                    >
                      {category.shortLabel}
                    </h3>

                    {/* Skill count + dot */}
                    <div className="mt-2 flex items-center gap-1.5">
                      <span
                        className={cn(
                          "inline-block h-1 w-1 rounded-full transition-opacity",
                          colors.bg,
                          isActive ? "opacity-100" : "opacity-40"
                        )}
                      />
                      <span className="font-heading text-[9px] uppercase tracking-[0.15em] text-text-muted">
                        {category.skills.length} skills
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </SectionReveal>

      {/* ── Tab Content Panel ── */}
      <div className="mt-6 min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            id={`tabpanel-${activeCategory}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeCategory}`}
            variants={shouldReduceMotion ? undefined : tabContentVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            exit={shouldReduceMotion ? undefined : "exit"}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }
            }
          >
            {/* Category divider with label */}
            <div className="mb-4 flex items-center gap-3">
              <span
                className={cn("h-px flex-1 opacity-20", activeColors.bg)}
              />
              <span
                className={cn(
                  "font-heading text-[10px] tracking-[0.25em]",
                  activeColors.text
                )}
              >
                {activeData.label}
              </span>
              <span
                className={cn("h-px flex-1 opacity-20", activeColors.bg)}
              />
            </div>

            {/* Skills grid — staggered entrance */}
            <motion.div
              variants={shouldReduceMotion ? undefined : skillGridVariants}
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6"
            >
              {activeData.skills.map((skill) => {
                const Icon = skillIconMap[skill.name];
                return (
                  <motion.div
                    key={skill.name}
                    variants={
                      shouldReduceMotion ? undefined : skillItemVariants
                    }
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y: -4,
                            boxShadow: activeColors.glowShadow,
                            transition: {
                              type: "spring" as const,
                              stiffness: 400,
                              damping: 25,
                            },
                          }
                    }
                    whileTap={
                      shouldReduceMotion ? undefined : { scale: 0.97 }
                    }
                    className={cn(
                      "group flex items-center gap-2.5 border p-3",
                      "bg-bg-surface/30 hover:bg-bg-surface/60",
                      "transition-colors cursor-default",
                      activeColors.border,
                      activeColors.borderHover
                    )}
                  >
                    {/* Skill icon */}
                    {Icon ? (
                      <Icon
                        className={cn(
                          "h-3.5 w-3.5 flex-shrink-0 transition-colors",
                          "text-text-muted",
                          activeColors.textGroupHover
                        )}
                        aria-hidden="true"
                      />
                    ) : (
                      <span
                        className={cn(
                          "inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full transition-opacity",
                          activeColors.bg,
                          "opacity-60 group-hover:opacity-100"
                        )}
                      />
                    )}
                    {/* Skill name */}
                    <span className="font-heading text-xs text-text-secondary transition-colors group-hover:text-text-primary">
                      {skill.name}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
