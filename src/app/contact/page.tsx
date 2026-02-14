import type { Metadata } from "next";
import { contactCopy } from "@/data/contact";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactSocials } from "@/components/sections/ContactSocials";
import { SectionReveal } from "@/components/effects/SectionReveal";
import { GlitchText } from "@/components/effects/GlitchText";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch — Steve Meadows, Data Scientist & ML Engineer.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-24 px-4 py-20 md:py-32">
      {/* ── Page Header ── */}
      <SectionReveal animation="fadeUp">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Decorative index */}
          <span className="font-heading text-[10px] tracking-[0.3em] text-text-muted">
            {contactCopy.sectionIndex}
          </span>

          <GlitchText
            as="h1"
            glowColor="cyan"
            className="font-heading text-4xl font-bold text-text-primary md:text-6xl"
          >
            {contactCopy.heading}
          </GlitchText>

          <div
            className="h-px w-24 bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent"
            aria-hidden="true"
          />

          <p className="font-heading text-sm tracking-wider text-accent-cyan/70">
            {contactCopy.subtitle}
          </p>
        </div>
      </SectionReveal>

      {/* ── Contact Form ── */}
      <SectionReveal animation="fadeUp" delay={0.1}>
        <ContactForm />
      </SectionReveal>

      {/* ── Social Links ── */}
      <SectionReveal animation="fadeUp" delay={0.1}>
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <span className="font-heading text-[10px] tracking-[0.3em] text-text-muted">
            SECTION // 002
          </span>
          <GlitchText
            as="h2"
            glowColor="green"
            className="font-heading text-2xl font-bold text-text-primary md:text-3xl"
          >
            FIND ME
          </GlitchText>
          <div
            className="h-px w-16 bg-gradient-to-r from-transparent via-accent-green/30 to-transparent"
            aria-hidden="true"
          />
        </div>
        <ContactSocials />
      </SectionReveal>

      {/* ── End of File ── */}
      <div className="flex items-center justify-center gap-3 pt-4">
        <span className="h-px w-12 bg-accent-cyan/15" aria-hidden="true" />
        <span className="font-heading text-[9px] tracking-[0.3em] text-text-muted/50">
          {contactCopy.endTag}
        </span>
        <span className="h-px w-12 bg-accent-cyan/15" aria-hidden="true" />
      </div>
    </main>
  );
}
