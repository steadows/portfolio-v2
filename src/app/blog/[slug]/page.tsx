import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { LuArrowLeft, LuCalendar, LuClock, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { getPostBySlug, getPostSlugs, getAdjacentPosts } from "@/lib/blog";
import { blogCategoryAccentMap } from "@/data/blog";
import { mdxComponents } from "@/components/blog/MDXComponents";
import { SectionReveal } from "@/components/effects/SectionReveal";
import { GlitchText } from "@/components/effects/GlitchText";
import { HUDBracket } from "@/components/effects/HUDBracket";
import { cn } from "@/lib/utils";

// ─── Static Params ───────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

// ─── Dynamic Metadata ────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = getPostBySlug(slug);
  if (!result) return { title: "Post Not Found" };

  const { post } = result;
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      tags: post.tags,
    },
  };
}

// ─── Category Color Map ──────────────────────────────────────────────────────

const accentColorMap = {
  cyan: {
    text: "text-accent-cyan",
    tagBg: "bg-accent-cyan/8",
    tagBorder: "border-accent-cyan/15",
    tagText: "text-accent-cyan/80",
  },
  green: {
    text: "text-accent-green",
    tagBg: "bg-accent-green/8",
    tagBorder: "border-accent-green/15",
    tagText: "text-accent-green/80",
  },
  amber: {
    text: "text-accent-amber",
    tagBg: "bg-accent-amber/8",
    tagBorder: "border-accent-amber/15",
    tagText: "text-accent-amber/80",
  },
  red: {
    text: "text-accent-red",
    tagBg: "bg-accent-red/8",
    tagBorder: "border-accent-red/15",
    tagText: "text-accent-red/80",
  },
} as const;

const categoryLabels: Record<string, string> = {
  article: "ARTICLE",
  research: "RESEARCH",
  tutorial: "TUTORIAL",
  wip: "WIP",
};

// ─── Page Component ──────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const result = getPostBySlug(slug);

  if (!result) notFound();

  const { post, content } = result;
  const { prev, next } = getAdjacentPosts(slug);
  const accent = blogCategoryAccentMap[post.category];
  const colors = accentColorMap[accent];

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const { content: mdxContent } = await compileMDX({
    source: content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return (
    <main className="mx-auto max-w-3xl px-4 py-20 md:py-32">
      {/* ── Back Link ── */}
      <SectionReveal animation="fadeUp">
        <Link
          href="/blog"
          className="group mb-10 inline-flex items-center gap-2 text-text-muted transition-colors hover:text-accent-cyan"
        >
          <LuArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="font-heading text-xs tracking-wider">
            BACK TO BLOG
          </span>
        </Link>
      </SectionReveal>

      {/* ── Post Header ── */}
      <SectionReveal animation="fadeUp" delay={0.1}>
        <header className="mb-12">
          {/* Category badge */}
          <span
            className={cn(
              "mb-4 inline-block border px-2.5 py-1",
              "font-heading text-[10px] uppercase tracking-[0.2em]",
              colors.tagBorder,
              colors.tagBg,
              colors.text
            )}
          >
            {categoryLabels[post.category] ?? post.category.toUpperCase()}
          </span>

          {/* Title */}
          <GlitchText
            as="h1"
            glowColor="cyan"
            className="mb-4 font-heading text-3xl font-bold text-text-primary md:text-5xl"
          >
            {post.title}
          </GlitchText>

          {/* Meta row */}
          <div className="mb-6 flex flex-wrap items-center gap-4 text-text-muted">
            <div className="flex items-center gap-1.5">
              <LuCalendar className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="font-heading text-xs tracking-wider">
                {formattedDate}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <LuClock className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="font-heading text-xs tracking-wider">
                {post.readTime}
              </span>
            </div>
            {post.updated && (
              <span className="font-heading text-[10px] tracking-wider text-text-muted/60">
                Updated{" "}
                {new Date(post.updated).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "inline-block border px-2 py-0.5",
                  "font-heading text-[9px] uppercase tracking-[0.15em]",
                  colors.tagBorder,
                  colors.tagBg,
                  colors.tagText
                )}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div
            className="mt-8 h-px bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent"
            aria-hidden="true"
          />
        </header>
      </SectionReveal>

      {/* ── MDX Content ── */}
      <SectionReveal animation="fadeUp" delay={0.2} threshold={0.01}>
        <HUDBracket
          label="CONTENT"
          status="READING"
          accentColor={accent}
          corners={false}
        >
          <article className="prose-custom">{mdxContent}</article>
        </HUDBracket>
      </SectionReveal>

      {/* ── Previous / Next Navigation ── */}
      <SectionReveal animation="fadeUp" delay={0.1} threshold={0.01}>
        <nav
          className="mt-16 grid grid-cols-1 gap-4 border-t border-white/5 pt-8 sm:grid-cols-2"
          aria-label="Blog post navigation"
        >
          {/* Previous (older) */}
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="group flex flex-col gap-1 border border-white/5 p-4 transition-colors hover:border-accent-cyan/30 hover:bg-bg-surface/40"
            >
              <div className="flex items-center gap-1 text-text-muted transition-colors group-hover:text-accent-cyan">
                <LuChevronLeft className="h-3.5 w-3.5" />
                <span className="font-heading text-[10px] uppercase tracking-[0.2em]">
                  Previous
                </span>
              </div>
              <span className="text-sm font-medium text-text-primary transition-colors group-hover:text-white line-clamp-1">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {/* Next (newer) */}
          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="group flex flex-col items-end gap-1 border border-white/5 p-4 text-right transition-colors hover:border-accent-cyan/30 hover:bg-bg-surface/40"
            >
              <div className="flex items-center gap-1 text-text-muted transition-colors group-hover:text-accent-cyan">
                <span className="font-heading text-[10px] uppercase tracking-[0.2em]">
                  Next
                </span>
                <LuChevronRight className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-medium text-text-primary transition-colors group-hover:text-white line-clamp-1">
                {next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </SectionReveal>

      {/* ── End of File ── */}
      <div className="mt-16 flex items-center justify-center gap-3">
        <span className="h-px w-12 bg-accent-cyan/15" aria-hidden="true" />
        <span className="font-heading text-[9px] tracking-[0.3em] text-text-muted/50">
          END OF FILE
        </span>
        <span className="h-px w-12 bg-accent-cyan/15" aria-hidden="true" />
      </div>
    </main>
  );
}
