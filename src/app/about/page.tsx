import type { Metadata } from "next";
import { bio, timeline, achievements, philosophy } from "@/data/about";
import { AboutTimeline } from "@/components/sections/AboutTimeline";
import { AboutAchievements } from "@/components/sections/AboutAchievements";
import { AboutPhilosophy } from "@/components/sections/AboutPhilosophy";
import { SectionReveal } from "@/components/effects/SectionReveal";
import { HUDBracket } from "@/components/effects/HUDBracket";
import { GlitchText } from "@/components/effects/GlitchText";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, experience, and approach — Steve Meadows, Data Scientist & ML Engineer.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-24 px-4 py-20 md:py-32">
      {/* ── Page Header ── */}
      <SectionReveal animation="fadeUp">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Decorative index */}
          <span className="font-heading text-[10px] tracking-[0.3em] text-text-muted">
            FILE // 001
          </span>

          <GlitchText
            as="h1"
            glowColor="cyan"
            className="font-heading text-4xl font-bold text-text-primary md:text-6xl"
          >
            ABOUT
          </GlitchText>

          <div
            className="h-px w-24 bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent"
            aria-hidden="true"
          />

          <p className="font-heading text-sm tracking-wider text-accent-cyan/70">
            {bio.headline}
          </p>
        </div>
      </SectionReveal>

      {/* ── Bio Section ── */}
      <SectionReveal animation="fadeUp" delay={0.1}>
        <HUDBracket label="SUMMARY" status="OVERVIEW" accentColor="cyan" corners={false}>
          <div className="space-y-4">
            {bio.summary.map((paragraph, i) => (
              <p
                key={i}
                className="text-sm leading-relaxed text-text-secondary md:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Quick stats bar */}
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/5 pt-6 md:grid-cols-4">
            {bio.funFacts.map((fact) => (
              <div key={fact.label} className="text-center">
                <p className="font-heading text-xs tracking-wider text-accent-cyan">
                  {fact.value}
                </p>
                <p className="mt-1 text-[10px] tracking-wider text-text-muted uppercase">
                  {fact.label}
                </p>
              </div>
            ))}
          </div>
        </HUDBracket>
      </SectionReveal>

      {/* ── Experience & Education Timeline ── */}
      <SectionReveal animation="fadeUp" delay={0.1}>
        <div className="mb-10 flex flex-col items-center gap-2 text-center">
          <span className="font-heading text-[10px] tracking-[0.3em] text-text-muted">
            SECTION // 002
          </span>
          <GlitchText
            as="h2"
            glowColor="cyan"
            className="font-heading text-2xl font-bold text-text-primary md:text-3xl"
          >
            EXPERIENCE
          </GlitchText>
          <div
            className="h-px w-16 bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent"
            aria-hidden="true"
          />
        </div>
        <AboutTimeline entries={timeline} />
      </SectionReveal>

      {/* ── Achievements ── */}
      <SectionReveal animation="fadeUp" delay={0.1}>
        <div className="mb-10 flex flex-col items-center gap-2 text-center">
          <span className="font-heading text-[10px] tracking-[0.3em] text-text-muted">
            SECTION // 003
          </span>
          <GlitchText
            as="h2"
            glowColor="green"
            className="font-heading text-2xl font-bold text-text-primary md:text-3xl"
          >
            ACHIEVEMENTS
          </GlitchText>
          <div
            className="h-px w-16 bg-gradient-to-r from-transparent via-accent-green/30 to-transparent"
            aria-hidden="true"
          />
        </div>
        <AboutAchievements achievements={achievements} />
      </SectionReveal>

      {/* ── Philosophy / Approach ── */}
      <SectionReveal animation="fadeUp" delay={0.1}>
        <div className="mb-10 flex flex-col items-center gap-2 text-center">
          <span className="font-heading text-[10px] tracking-[0.3em] text-text-muted">
            SECTION // 004
          </span>
          <GlitchText
            as="h2"
            glowColor="amber"
            className="font-heading text-2xl font-bold text-text-primary md:text-3xl"
          >
            APPROACH
          </GlitchText>
          <div
            className="h-px w-16 bg-gradient-to-r from-transparent via-accent-amber/30 to-transparent"
            aria-hidden="true"
          />
        </div>
        <AboutPhilosophy />
      </SectionReveal>

      {/* ── End of File ── */}
      <div className="flex items-center justify-center gap-3 pt-4">
        <span className="h-px w-12 bg-accent-cyan/15" aria-hidden="true" />
        <span className="font-heading text-[9px] tracking-[0.3em] text-text-muted/50">
          END OF FILE
        </span>
        <span className="h-px w-12 bg-accent-cyan/15" aria-hidden="true" />
      </div>
    </main>
  );
}
