// ─── Blog Data ───────────────────────────────────────────────────────────────
// Structured data for the Blog section.
// Categories, metadata types, and static content for the blog index.

// ─── Types ───────────────────────────────────────────────────────────────────

export type BlogCategory = "article" | "research" | "tutorial" | "wip";

export interface BlogPost {
  slug: string;
  title: string;
  /** ISO 8601 date string */
  date: string;
  /** ISO 8601 date string — optional, only set if post was updated */
  updated?: string;
  excerpt: string;
  tags: string[];
  category: BlogCategory;
  /** e.g. "8 min read" */
  readTime: string;
  /** Short subtitle for OG images and social previews */
  subtitle?: string;
  featured: boolean;
  status: "published" | "draft";
  /** Optional background image for OG image generation (path relative to /public) */
  ogImage?: string;
}

// ─── Category Metadata ───────────────────────────────────────────────────────

export interface BlogCategoryMeta {
  id: BlogCategory | "all";
  label: string;
  shortLabel: string;
  accentColor: "cyan" | "green" | "amber" | "red";
}

export const blogCategoryMeta: BlogCategoryMeta[] = [
  { id: "all", label: "ALL POSTS", shortLabel: "ALL", accentColor: "cyan" },
  { id: "article", label: "ARTICLES", shortLabel: "ARTICLES", accentColor: "cyan" },
  { id: "research", label: "RESEARCH", shortLabel: "RESEARCH", accentColor: "green" },
  { id: "tutorial", label: "TUTORIALS", shortLabel: "TUTORIALS", accentColor: "amber" },
  { id: "wip", label: "WORK IN PROGRESS", shortLabel: "WIP", accentColor: "red" },
] as const;

// ─── Accent Color → Category Mapping ─────────────────────────────────────────

export const blogCategoryAccentMap: Record<BlogCategory, "cyan" | "green" | "amber" | "red"> = {
  article: "cyan",
  research: "green",
  tutorial: "amber",
  wip: "red",
} as const;

// ─── Page Copy ───────────────────────────────────────────────────────────────

export const blogCopy = {
  sectionIndex: "FILE // 003",
  heading: "BLOG",
  subtitle: "Articles, research notes, and work-in-progress write-ups",
  endTag: "END OF FILE",
} as const;
