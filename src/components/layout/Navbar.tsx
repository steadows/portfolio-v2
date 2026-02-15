"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { navItems } from "@/data/navigation";

// ─── Variants (defined OUTSIDE component — rerender-variants-object) ────────

const mobileOverlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn", when: "afterChildren" },
  },
};

const mobileNavVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const mobileItemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

const reducedMobileItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
  exit: { opacity: 0, transition: { duration: 0 } },
};

// ─── Hamburger line variants ─────────────────────────────────────────────────

const topLineVariants: Variants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: 45, y: 6 },
};

const middleLineVariants: Variants = {
  closed: { opacity: 1, scaleX: 1 },
  open: { opacity: 0, scaleX: 0 },
};

const bottomLineVariants: Variants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: -45, y: -6 },
};

// ─── Component ───────────────────────────────────────────────────────────────

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // ── Scroll detection ──
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll(); // check on mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Lock body scroll when mobile menu is open ──
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-accent-cyan/10 bg-bg-base/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        {/* ── Logo / Name ── */}
        <Link
          href="/"
          className="group flex items-center gap-2 font-heading text-sm tracking-[0.2em] text-text-primary transition-colors hover:text-accent-cyan"
          onClick={closeMobile}
        >
          {/* Logo */}
          <Image
            src="/logo.png"
            alt="Steve Meadows"
            width={36}
            height={36}
            className="transition-all group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]"
          />
          <span className="hidden text-text-muted sm:inline">
            //
          </span>
          <span className="hidden text-text-secondary sm:inline">
            PORTFOLIO
          </span>
        </Link>

        {/* ── Desktop Navigation ── */}
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-2 font-heading text-xs tracking-[0.15em] transition-colors",
                    isActive
                      ? "text-accent-cyan"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {/* Status dot — active indicator */}
                  <span
                    className={cn(
                      "h-1 w-1 rounded-full transition-all duration-300",
                      isActive
                        ? "bg-accent-cyan shadow-[0_0_6px_rgba(0,240,255,0.8)]"
                        : "bg-text-muted"
                    )}
                  />
                  {item.label}

                  {/* Animated underline — shared layoutId for sliding effect */}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-underline"
                      className="absolute bottom-0 left-4 right-4 h-px bg-accent-cyan shadow-[0_0_8px_rgba(0,240,255,0.6)]"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : {
                              type: "spring",
                              stiffness: 400,
                              damping: 30,
                            }
                      }
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Mobile Hamburger ── */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <motion.span
            variants={topLineVariants}
            animate={mobileOpen ? "open" : "closed"}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="block h-[2px] w-5 origin-center bg-text-primary"
          />
          <motion.span
            variants={middleLineVariants}
            animate={mobileOpen ? "open" : "closed"}
            transition={{ duration: 0.15 }}
            className="block h-[2px] w-5 origin-center bg-text-primary"
          />
          <motion.span
            variants={bottomLineVariants}
            animate={mobileOpen ? "open" : "closed"}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="block h-[2px] w-5 origin-center bg-text-primary"
          />
        </button>
      </nav>

      {/* ── Mobile Full-Screen Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={mobileOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 flex flex-col bg-bg-base/95 backdrop-blur-lg md:hidden"
          >
            {/* Decorative grid overlay */}
            <div className="pointer-events-none absolute inset-0 grid-overlay opacity-[0.03]" />

            {/* Nav items — staggered reveal */}
            <motion.nav
              variants={mobileNavVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-1 flex-col items-start justify-center gap-2 px-8"
            >
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    variants={
                      shouldReduceMotion
                        ? reducedMobileItemVariants
                        : mobileItemVariants
                    }
                  >
                    <Link
                      href={item.href}
                      onClick={closeMobile}
                      className={cn(
                        "group flex items-center gap-4 py-3 font-heading text-2xl tracking-[0.2em] transition-colors",
                        isActive
                          ? "text-accent-cyan text-glow-cyan"
                          : "text-text-secondary hover:text-text-primary"
                      )}
                    >
                      {/* Index number — militaristic numbering */}
                      <span
                        className={cn(
                          "font-heading text-xs tabular-nums",
                          isActive
                            ? "text-accent-cyan"
                            : "text-text-muted"
                        )}
                      >
                        0{index + 1}
                      </span>

                      {/* Divider dash */}
                      <span
                        className={cn(
                          "h-px w-6 transition-all duration-300 group-hover:w-10",
                          isActive
                            ? "bg-accent-cyan shadow-[0_0_6px_rgba(0,240,255,0.6)]"
                            : "bg-text-muted group-hover:bg-text-secondary"
                        )}
                      />

                      {item.label}

                      {/* Active status dot */}
                      {isActive && (
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-40" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-cyan" />
                        </span>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* Bottom status bar */}
            <div className="border-t border-accent-cyan/10 px-8 py-6">
              <p className="font-heading text-[10px] tracking-[0.3em] text-text-muted">
                STEVE MEADOWS{" "}
                <span className="text-text-muted/60">
                  // PORTFOLIO
                </span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
