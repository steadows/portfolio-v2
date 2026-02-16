"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiPython,
  SiTensorflow,
  SiPytorch,
  SiR,
  SiScikitlearn,
  SiTableau,
  SiLangchain,
  SiDocker,
  SiGithub,
} from "react-icons/si";
import { LuDatabase } from "react-icons/lu";
import { GlitchText } from "@/components/effects/GlitchText";
import { ProfileImage } from "@/components/effects/ProfileImage";
import { TypeWriter } from "@/components/effects/TypeWriter";
import { ScrollIndicator } from "@/components/effects/ScrollIndicator";
import { cn } from "@/lib/utils";

// ── Framer Motion Variants (stable — defined outside component) ──

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
} as const;

const profileItemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
} as const;

const badgeContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 1.0,
    },
  },
} as const;

const badgeItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 20 },
  },
} as const;

// ── Skill Badge Data ──

type BadgeColor = "cyan" | "green" | "amber";

interface SkillBadge {
  label: string;
  color: BadgeColor;
  icon: IconType;
}

const skillBadges: SkillBadge[] = [
  { label: "PYTHON", color: "cyan", icon: SiPython },
  { label: "TENSORFLOW", color: "cyan", icon: SiTensorflow },
  { label: "PYTORCH", color: "cyan", icon: SiPytorch },
  { label: "R", color: "cyan", icon: SiR },
  { label: "SQL", color: "cyan", icon: LuDatabase },
  { label: "SCIKIT-LEARN", color: "cyan", icon: SiScikitlearn },
  { label: "TABLEAU", color: "cyan", icon: SiTableau },
  { label: "LANGCHAIN", color: "cyan", icon: SiLangchain },
  { label: "DOCKER", color: "cyan", icon: SiDocker },
  { label: "GITHUB", color: "cyan", icon: SiGithub },
];

const badgeColorMap: Record<
  BadgeColor,
  {
    border: string;
    text: string;
    bg: string;
    /** Subtle tinted idle state — visible but muted */
    idle: string;
    /** Full accent color + glow on hover */
    hover: string;
  }
> = {
  cyan: {
    border: "border-accent-cyan/30",
    text: "text-accent-cyan",
    bg: "bg-accent-cyan/5",
    idle: "text-accent-cyan/25 drop-shadow-[0_0_3px_rgba(0,240,255,0.15)]",
    hover:
      "group-hover:text-accent-cyan group-hover:drop-glow-cyan",
  },
  green: {
    border: "border-accent-green/30",
    text: "text-accent-green",
    bg: "bg-accent-green/5",
    idle: "text-accent-green/25 drop-shadow-[0_0_3px_rgba(57,255,20,0.15)]",
    hover:
      "group-hover:text-accent-green group-hover:drop-glow-green",
  },
  amber: {
    border: "border-accent-amber/30",
    text: "text-accent-amber",
    bg: "bg-accent-amber/5",
    idle: "text-accent-amber/25 drop-shadow-[0_0_3px_rgba(255,191,0,0.15)]",
    hover:
      "group-hover:text-accent-amber group-hover:drop-glow-amber",
  },
};

// ── Component ──

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative flex w-full min-h-[calc(100svh-4rem)] flex-col overflow-x-clip">
      {/* ── Decorative HUD corner markers ── */}
      <div
        className="pointer-events-none absolute inset-0 hidden sm:block"
        aria-hidden="true"
      >
        <span className="absolute top-6 left-6 font-heading text-[9px] tracking-[0.2em] text-text-muted/40">
          38.9072°N // 77.0369°W
        </span>
        <span className="absolute bottom-6 right-6 font-heading text-[9px] tracking-[0.2em] text-text-muted/40">
          v2.0
        </span>
      </div>

      {/* ── Center content (flex-1 to fill space above badge bar) ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-1 flex-col items-center justify-center gap-3 px-4 text-center sm:gap-5"
      >
        {/* Decorative divider */}
        <motion.div
          variants={itemVariants}
          className="h-px w-32 bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent"
          aria-hidden="true"
        />

        {/* Profile image with HUD frame + scan effect */}
        <motion.div variants={profileItemVariants} className="pb-1">
          <ProfileImage src="/images/profile.png" size={160} />
        </motion.div>

        {/* Main name — GlitchText with continuous effect */}
        <motion.div variants={itemVariants}>
          <GlitchText
            as="h1"
            glowColor="cyan"
            continuous
            className="font-heading text-5xl font-bold text-text-primary md:text-7xl lg:text-8xl"
          >
            STEVE MEADOWS
          </GlitchText>
        </motion.div>

        {/* Subtitle typewriter */}
        <motion.div variants={itemVariants}>
          <TypeWriter
            strings={[
              "Data Scientist",
              "AI/ML Engineer",
              "Problem Solver",
            ]}
            speed={60}
            deleteSpeed={35}
            pauseTime={2000}
            cursorColor="cyan"
            className="text-lg text-text-secondary md:text-xl"
            startDelay={800}
          />
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          variants={itemVariants}
          className="h-px w-48 bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent"
          aria-hidden="true"
        />

        {/* Brief intro */}
        <motion.div
          variants={itemVariants}
          className="max-w-sm text-center"
        >
          <p className="text-sm leading-relaxed text-text-secondary">
            Turning raw data into clear insights — one model, one pipeline,
            one problem at a time.
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-2 flex flex-col gap-3 sm:flex-row sm:gap-4"
        >
          <motion.div
            whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="/projects"
              className={cn(
                "inline-block border border-accent-cyan px-8 py-3",
                "font-heading text-sm tracking-wider text-accent-cyan",
                "transition-all duration-300",
                "hover:bg-accent-cyan/10 hover:shadow-[0_0_25px_rgba(0,240,255,0.3)]"
              )}
            >
              View Projects
            </Link>
          </motion.div>
          <motion.div
            whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="/contact"
              className={cn(
                "inline-block border border-text-muted px-8 py-3",
                "font-heading text-sm tracking-wider text-text-secondary",
                "transition-all duration-300",
                "hover:border-accent-green hover:text-accent-green hover:shadow-[0_0_25px_rgba(57,255,20,0.2)]"
              )}
            >
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Scroll-down indicator (lifted above in-flow badge bar) ── */}
      <ScrollIndicator targetId="content" className="bottom-16" />

      {/* ── Horizontal tech logo bar (in-flow — sits below center content) ── */}
      <motion.div
        variants={badgeContainerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mt-auto border-t border-white/5 bg-bg-base/60 backdrop-blur-sm"
        aria-label="Core technologies"
      >
        <div className="mx-auto flex max-w-4xl items-center justify-center gap-3 px-4 py-3 sm:gap-8 md:gap-10">
          {skillBadges.map((badge) => {
            const Icon = badge.icon;
            const colors = badgeColorMap[badge.color];
            return (
              <motion.div
                key={badge.label}
                variants={badgeItemVariants}
                className="group flex flex-col items-center gap-1"
                title={badge.label}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 sm:h-5 sm:w-5",
                    "transition-all duration-300",
                    colors.idle,
                    colors.hover
                  )}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
