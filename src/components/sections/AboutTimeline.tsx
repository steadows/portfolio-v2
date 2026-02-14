"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type TimelineEntry } from "@/data/about";
import { HUDBracket } from "@/components/effects/HUDBracket";

// ── Color Maps ──

const dotColorMap: Record<string, string> = {
  cyan: "bg-accent-cyan",
  green: "bg-accent-green",
  amber: "bg-accent-amber",
  red: "bg-accent-red",
};

const glowColorMap: Record<string, string> = {
  cyan: "shadow-[0_0_8px_rgba(0,240,255,0.6)]",
  green: "shadow-[0_0_8px_rgba(57,255,20,0.6)]",
  amber: "shadow-[0_0_8px_rgba(255,191,0,0.6)]",
  red: "shadow-[0_0_8px_rgba(255,0,60,0.6)]",
};

const textColorMap: Record<string, string> = {
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

const typeBadgeMap: Record<string, { label: string; color: string }> = {
  work: { label: "WORK", color: "text-accent-cyan" },
  education: { label: "EDU", color: "text-accent-amber" },
};

// ── Framer Variants ──

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 250, damping: 24 },
  },
} as const;

// ── Component ──

interface AboutTimelineProps {
  entries: TimelineEntry[];
}

export function AboutTimeline({ entries }: AboutTimelineProps) {
  const prefersReducedMotion = useReducedMotion();

  const sorted = [...entries].sort((a, b) => b.order - a.order);

  return (
    <div className="relative">
      {/* Vertical spine */}
      <div
        className="absolute top-0 left-4 h-full w-px bg-gradient-to-b from-accent-cyan/30 via-accent-cyan/10 to-transparent md:left-1/2 md:-translate-x-px"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-10 md:gap-14">
        {sorted.map((entry, i) => {
          const isLeft = i % 2 === 0;
          const badge = typeBadgeMap[entry.type];

          return (
            <motion.div
              key={entry.id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: prefersReducedMotion ? 0 : i * 0.1,
              }}
              className={cn(
                "relative flex items-start gap-6 pl-12",
                "md:pl-0",
                isLeft
                  ? "md:flex-row md:pr-[calc(50%+2rem)]"
                  : "md:flex-row-reverse md:pl-[calc(50%+2rem)]"
              )}
            >
              {/* Timeline dot */}
              <div
                className={cn(
                  "absolute top-1 left-4 z-10 -translate-x-1/2",
                  "h-3 w-3 rounded-full",
                  dotColorMap[entry.accentColor],
                  glowColorMap[entry.accentColor],
                  "md:left-1/2"
                )}
                aria-hidden="true"
              />

              {/* Card */}
              <HUDBracket
                label={entry.period}
                status={badge.label}
                accentColor={entry.accentColor}
                corners={false}
                className="w-full"
                contentClassName="space-y-3"
              >
                {/* Role & Company */}
                <div>
                  <h3
                    className={cn(
                      "font-heading text-sm font-bold tracking-wider",
                      textColorMap[entry.accentColor]
                    )}
                  >
                    {entry.role}
                  </h3>
                  <p className="mt-0.5 font-heading text-xs tracking-wide text-text-secondary">
                    {entry.company} — {entry.location}
                  </p>
                </div>

                {/* Highlights */}
                <ul className="space-y-1.5">
                  {entry.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs leading-relaxed text-text-secondary">
                      <span
                        className={cn(
                          "mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full",
                          dotColorMap[entry.accentColor],
                          "opacity-50"
                        )}
                        aria-hidden="true"
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </HUDBracket>
            </motion.div>
          );
        })}
      </div>

      {/* Terminal end marker */}
      <div className="mt-8 flex items-center gap-2 pl-12 md:justify-center md:pl-0">
        <span className="h-px w-8 bg-accent-cyan/20" aria-hidden="true" />
        <span className="font-heading text-[9px] tracking-[0.25em] text-text-muted">
          END OF RECORD
        </span>
        <span className="h-px w-8 bg-accent-cyan/20" aria-hidden="true" />
      </div>
    </div>
  );
}
