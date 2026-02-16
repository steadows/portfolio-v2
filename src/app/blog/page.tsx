import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { blogCopy } from "@/data/blog";
import { BlogFilters } from "@/components/sections/BlogFilters";
import { SectionReveal } from "@/components/effects/SectionReveal";
import { GlitchText } from "@/components/effects/GlitchText";

// Force server-side render on every request (avoids stale cache in dev/prod)
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles, research notes, and work-in-progress write-ups on data science, machine learning, and software engineering.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-20 md:py-32">
      {/* ── Page Header ── */}
      <SectionReveal animation="fadeUp">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Decorative index */}
          <span className="font-heading text-[10px] tracking-[0.3em] text-text-muted">
            {blogCopy.sectionIndex}
          </span>

          <GlitchText
            as="h1"
            glowColor="cyan"
            className="font-heading text-4xl font-bold text-text-primary md:text-6xl"
          >
            {blogCopy.heading}
          </GlitchText>

          <div
            className="h-px w-24 bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent"
            aria-hidden="true"
          />

          <p className="font-heading text-sm tracking-wider text-accent-cyan/70">
            {blogCopy.subtitle}
          </p>
        </div>
      </SectionReveal>

      {/* ── Filters + Post Grid ── */}
      <BlogFilters posts={posts} />

      {/* ── End of File ── */}
      <div className="flex items-center justify-center gap-3 pt-4">
        <span className="h-px w-12 bg-accent-cyan/15" aria-hidden="true" />
        <span className="font-heading text-[9px] tracking-[0.3em] text-text-muted/50">
          {blogCopy.endTag}
        </span>
        <span className="h-px w-12 bg-accent-cyan/15" aria-hidden="true" />
      </div>
    </main>
  );
}
