"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

// ─── Variants (defined outside component to avoid re-creation) ────────────────

const contentVariants: Variants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

const scanLineVariants: Variants = {
  initial: {
    scaleX: 0,
    opacity: 0,
  },
  animate: {
    scaleX: [0, 1, 1, 0],
    opacity: [0, 0.8, 0.8, 0],
  },
};

// ─── Transition configs ───────────────────────────────────────────────────────

const contentTransition = {
  duration: 0.3,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

const scanLineTransition = {
  duration: 0.5,
  times: [0, 0.3, 0.6, 1],
  ease: "easeInOut" as const,
};

// ─── Component ────────────────────────────────────────────────────────────────

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <>
      {/* HUD scan-line flash on page enter */}
      <motion.div
        variants={scanLineVariants}
        initial="initial"
        animate="animate"
        transition={scanLineTransition}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 right-0 top-16 z-50 h-px origin-left"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent-cyan), transparent)",
          boxShadow:
            "0 0 8px var(--accent-cyan), 0 0 2px var(--accent-cyan)",
        }}
      />

      {/* Page content entrance */}
      <motion.div
        variants={contentVariants}
        initial="initial"
        animate="animate"
        transition={contentTransition}
      >
        {children}
      </motion.div>
    </>
  );
}
