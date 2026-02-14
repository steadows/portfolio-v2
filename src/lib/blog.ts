import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost } from "@/data/blog";

// ─── Blog Utility ────────────────────────────────────────────────────────────
// Reads and parses MDX files from src/content/blog/ with gray-matter frontmatter.
// Used by blog pages for static generation.

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");

/**
 * Get all published blog posts, sorted by date (newest first).
 */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files
    .map((filename) => {
      const filePath = path.join(CONTENT_DIR, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      return {
        slug: filename.replace(/\.mdx$/, ""),
        title: data.title ?? "Untitled",
        date: data.date ?? new Date().toISOString(),
        updated: data.updated ?? undefined,
        excerpt: data.excerpt ?? "",
        tags: data.tags ?? [],
        category: data.category ?? "article",
        readTime: data.readTime ?? "5 min read",
        featured: data.featured ?? false,
        status: data.status ?? "published",
      } satisfies BlogPost;
    })
    .filter((post) => post.status === "published")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

/**
 * Get a single post by slug. Returns the frontmatter + raw MDX content.
 */
export function getPostBySlug(
  slug: string
): { post: BlogPost; content: string } | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const post: BlogPost = {
    slug,
    title: data.title ?? "Untitled",
    date: data.date ?? new Date().toISOString(),
    updated: data.updated ?? undefined,
    excerpt: data.excerpt ?? "",
    tags: data.tags ?? [],
    category: data.category ?? "article",
    readTime: data.readTime ?? "5 min read",
    featured: data.featured ?? false,
    status: data.status ?? "published",
  };

  return { post, content };
}

/**
 * Get all post slugs for generateStaticParams.
 */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/**
 * Get adjacent posts for prev/next navigation.
 */
export function getAdjacentPosts(
  currentSlug: string
): { prev: BlogPost | null; next: BlogPost | null } {
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === currentSlug);

  if (currentIndex === -1) return { prev: null, next: null };

  return {
    prev: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
    next: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
  };
}
