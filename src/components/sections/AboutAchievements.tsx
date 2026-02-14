"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  LuTrophy,
  LuMedal,
  LuStar,
  LuChartBar,
  LuCode,
  LuBrain,
} from "react-icons/lu";
import { cn } from "@/lib/utils";
import { type Achievement } from "@/data/about";

// ── Icon Map ──

const iconMap: Record<Achievement["icon"], React.ComponentType<{ className?: string }>> = {
  trophy: LuTrophy,
  medal: LuMedal,
  star: LuStar,
  chart: LuChartBar,
  code: LuCode,
  brain: LuBrain,
};

// ── Color Maps ──

const iconColorMap: Record<string, string> = {
  cyan: "text-accent-cyan",
  green: "text-accent-green",
  amber: "text-accent-amber",
  red: "text-accent-red",
};

const borderColorMap: Record<string, string> = {
  cyan: "border-accent-cyan/20",
  green: "border-accent-green/20",
  amber: "border-accent-amber/20",
  red: "border-accent-red/20",
};

const glowHoverMap: Record<string, string> = {
  cyan: "hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]",
  green: "hover:shadow-[0_0_20px_rgba(57,255,20,0.15)]",
  amber: "hover:shadow-[0_0_20px_rgba(255,191,0,0.15)]",
  red: "hover:shadow-[0_0_20px_rgba(255,0,60,0.15)]",
};

const bgMap: Record<string, string> = {
  cyan: "bg-accent-cyan/5",
  green: "bg-accent-green/5",
  amber: "bg-accent-amber/5",
  red: "bg-accent-red/5",
};

// ── Framer Variants ──

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
} as const;

// ── Component ──

interface AboutAchievementsProps {
  achievements: Achievement[];
}

export function AboutAchievements({ achievements }: AboutAchievementsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {achievements.map((a, i) => {
        const Icon = iconMap[a.icon];
        return (
          <motion.div
            key={a.id}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: prefersReducedMotion ? 0 : i * 0.08,
            }}
            className={cn(
              "group relative border bg-bg-surface/50 p-5",
              "transition-all duration-300",
              borderColorMap[a.accentColor],
              glowHoverMap[a.accentColor]
            )}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center",
                  bgMap[a.accentColor]
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-all duration-300",
                    iconColorMap[a.accentColor],
                    "group-hover:scale-110"
                  )}
                />
              </div>

              {/* Text */}
              <div className="min-w-0">
                <h3
                  className={cn(
                    "font-heading text-xs font-bold tracking-wider",
                    iconColorMap[a.accentColor]
                  )}
                >
                  {a.title}
                </h3>
                <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">
                  {a.subtitle}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
