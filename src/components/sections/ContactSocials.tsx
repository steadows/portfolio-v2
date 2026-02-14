"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { LuMail } from "react-icons/lu";
import { HUDBracket } from "@/components/effects/HUDBracket";
import { cn } from "@/lib/utils";
import { socialLinks, contactCopy, type SocialLink } from "@/data/contact";

// ── Icon Map ────────────────────────────────────────────────────────────────

const iconMap = {
  github: SiGithub,
  linkedin: SiLinkedin,
  mail: LuMail,
} as const;

// ── Framer Motion Variants (stable — defined outside component) ─────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
} as const;

// ── Color Maps ──────────────────────────────────────────────────────────────

const accentColorMap: Record<
  SocialLink["accentColor"],
  {
    border: string;
    text: string;
    hoverBorder: string;
    hoverText: string;
    hoverGlow: string;
    iconIdle: string;
    iconHover: string;
  }
> = {
  cyan: {
    border: "border-white/10",
    text: "text-text-secondary",
    hoverBorder: "hover:border-accent-cyan/40",
    hoverText: "hover:text-accent-cyan",
    hoverGlow: "hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]",
    iconIdle: "text-text-muted",
    iconHover: "group-hover:text-accent-cyan group-hover:drop-glow-cyan",
  },
  green: {
    border: "border-white/10",
    text: "text-text-secondary",
    hoverBorder: "hover:border-accent-green/40",
    hoverText: "hover:text-accent-green",
    hoverGlow: "hover:shadow-[0_0_20px_rgba(57,255,20,0.2)]",
    iconIdle: "text-text-muted",
    iconHover: "group-hover:text-accent-green group-hover:drop-glow-green",
  },
  amber: {
    border: "border-white/10",
    text: "text-text-secondary",
    hoverBorder: "hover:border-accent-amber/40",
    hoverText: "hover:text-accent-amber",
    hoverGlow: "hover:shadow-[0_0_20px_rgba(255,191,0,0.2)]",
    iconIdle: "text-text-muted",
    iconHover: "group-hover:text-accent-amber group-hover:drop-glow-amber",
  },
};

// ── Component ───────────────────────────────────────────────────────────────

export function ContactSocials() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <HUDBracket
      label={contactCopy.socialsLabel}
      status={contactCopy.socialsStatus}
      accentColor="cyan"
      corners={false}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col gap-3 sm:flex-row sm:gap-4"
      >
        {socialLinks.map((link) => {
          const Icon = iconMap[link.icon];
          const colors = accentColorMap[link.accentColor];

          return (
            <motion.a
              key={link.id}
              variants={itemVariants}
              href={link.href}
              target={link.icon === "mail" ? undefined : "_blank"}
              rel={link.icon === "mail" ? undefined : "noopener noreferrer"}
              whileHover={
                prefersReducedMotion ? undefined : { scale: 1.03 }
              }
              whileTap={
                prefersReducedMotion ? undefined : { scale: 0.97 }
              }
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className={cn(
                "group flex flex-1 items-center gap-3 border px-4 py-3",
                "transition-all duration-300",
                colors.border,
                colors.hoverBorder,
                colors.hoverGlow
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-all duration-300",
                  colors.iconIdle,
                  colors.iconHover
                )}
              />
              <div className="flex flex-col">
                <span
                  className={cn(
                    "font-heading text-[10px] tracking-[0.15em] uppercase",
                    "text-text-muted transition-colors duration-300",
                    colors.hoverText
                  )}
                >
                  {link.label}
                </span>
                {link.icon === "mail" && (
                  <span className="text-[11px] text-text-muted/60">
                    {link.href.replace("mailto:", "")}
                  </span>
                )}
              </div>
            </motion.a>
          );
        })}
      </motion.div>
    </HUDBracket>
  );
}
