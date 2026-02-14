import { Github, Linkedin } from "lucide-react";
import { socialLinks, type SocialLink } from "@/data/navigation";

// ─── Icon map ─────────────────────────────────────────────────────────────────

const iconMap: Record<SocialLink["icon"], React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-accent-cyan/10">
      {/* Accent glow line at top */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent" />

      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        {/* ── Left: Status badge ── */}
        <div className="flex items-center gap-3">
          {/* Pulsing status light */}
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
          </span>

          <span className="font-heading text-[10px] tracking-[0.3em] text-text-muted">
            <span className="text-accent-green text-glow-green">AVAILABLE</span>
          </span>
        </div>

        {/* ── Center: Copyright ── */}
        <p className="font-heading text-[10px] tracking-[0.2em] text-text-muted">
          &copy; {currentYear}{" "}
          <span className="text-text-secondary">STEVE MEADOWS</span>
          <span className="hidden sm:inline">
            {" "}
            // All rights reserved
          </span>
        </p>

        {/* ── Right: Social links ── */}
        <div className="flex items-center gap-1">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="group flex h-9 w-9 items-center justify-center rounded-sm text-text-muted transition-all duration-200 hover:bg-accent-cyan/5 hover:text-accent-cyan"
              >
                <Icon className="h-4 w-4 transition-all duration-200 group-hover:drop-glow-cyan" />
              </a>
            );
          })}
        </div>
      </div>

      {/* ── Bottom decorative line ── */}
      <div className="mx-auto max-w-[1200px] px-6 pb-4">
        <div className="flex items-center gap-3 font-heading text-[9px] tracking-[0.25em] text-text-muted/40">
          <span className="h-px flex-1 bg-accent-cyan/5" />
          <span>SM.PORTFOLIO.V2</span>
          <span className="h-px flex-1 bg-accent-cyan/5" />
        </div>
      </div>
    </footer>
  );
}
