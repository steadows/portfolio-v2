"use client";

import { useState } from "react";
import { useReducedMotion } from "@/hooks/useMediaPreference";
import { cn } from "@/lib/utils";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const reducedMotion = useReducedMotion();
  const [skipEntrance, setSkipEntrance] = useState(reducedMotion);
  // A new route template gets a fresh entrance. An interrupted one stays finished.
  if (reducedMotion && !skipEntrance) setSkipEntrance(true);

  return (
    <>
      {/* HUD scan-line flash on page enter */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none fixed left-0 right-0 top-16 z-50 h-px origin-left opacity-0 motion-reduce:invisible",
          !skipEntrance && "animate-page-scan"
        )}
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent-cyan), transparent)",
          boxShadow:
            "0 0 8px var(--accent-cyan), 0 0 2px var(--accent-cyan)",
        }}
      />

      {/* Page content entrance */}
      <div data-motion-reveal className={skipEntrance ? undefined : "animate-page-enter"}>
        {children}
      </div>
    </>
  );
}
