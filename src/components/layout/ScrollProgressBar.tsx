"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  // Smooth the scroll progress with a spring for polished feel
  // Skip spring if user prefers reduced motion — use raw value instead
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX: shouldReduceMotion ? scrollYProgress : smoothProgress }}
      className="pointer-events-none fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-accent-cyan"
      // Subtle neon glow beneath the bar
      aria-hidden="true"
    >
      {/* Glow layer — a slightly taller, blurred version for the neon effect */}
      <div className="absolute inset-0 h-[4px] bg-accent-cyan/40 blur-[6px]" />
    </motion.div>
  );
}
