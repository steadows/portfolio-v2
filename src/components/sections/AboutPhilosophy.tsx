"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { philosophy } from "@/data/about";
import { HUDBracket } from "@/components/effects/HUDBracket";

// ── Color cycling for each principle card ──

const accentCycle: Array<"cyan" | "green" | "amber" | "red"> = [
  "cyan",
  "green",
  "amber",
  "red",
];

const textColorMap: Record<string, string> = {
  cyan: "text-accent-cyan",
  green: "text-accent-green",
  amber: "text-accent-amber",
  red: "text-accent-red",
};

// ── Framer Variants ──

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 250, damping: 24 },
  },
} as const;

// ── Component ──

export function AboutPhilosophy() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {philosophy.principles.map((principle, i) => {
        const accent = accentCycle[i % accentCycle.length];
        return (
          <motion.div
            key={principle.id}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: prefersReducedMotion ? 0 : i * 0.1,
            }}
          >
            <HUDBracket
              label={`0${i + 1}`}
              accentColor={accent}
              corners={false}
              className="h-full"
              contentClassName="space-y-2"
            >
              <h3
                className={cn(
                  "font-heading text-sm font-bold tracking-wider",
                  textColorMap[accent]
                )}
              >
                {principle.label}
              </h3>
              <p className="text-xs leading-relaxed text-text-secondary md:text-sm">
                {principle.description}
              </p>
            </HUDBracket>
          </motion.div>
        );
      })}
    </div>
  );
}
