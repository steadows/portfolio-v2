import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost } from "@/data/blog";

// ─── Blog Utility ────────────────────────────────────────────────────────────
// Reads and parses MDX files from src/content/blog/ with gray-matter frontmatter.
// Used by blog pages for static generation.

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");

function getPostFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && path.extname(entry.name) === ".mdx")
    .map((entry) => entry.name);
}

function readPublishedPost(
  filename: string
): { post: BlogPost; content: string } | null {
  const filePath = path.join(CONTENT_DIR, filename);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const status = data.status ?? "published";
  if (status !== "published") return null;

  const post: BlogPost = {
    slug: path.basename(filename, ".mdx"),
    title: data.title ?? "Untitled",
    date: data.date ?? new Date().toISOString(),
    updated: data.updated ?? undefined,
    excerpt: data.excerpt ?? "",
    tags: data.tags ?? [],
    category: data.category ?? "article",
    readTime: data.readTime ?? "5 min read",
    subtitle: data.subtitle ?? undefined,
    featured: data.featured ?? false,
    status,
    ogImage: data.ogImage ?? undefined,
  };

  return { post, content };
}

/** Get all published posts, sorted by date (newest first). */
export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = [];
  for (const filename of getPostFiles()) {
    const result = readPublishedPost(filename);
    if (result) posts.push(result.post);
  }
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Match an exact directory entry before opening a post. */
export function getPostBySlug(slug: string) {
  const filename = getPostFiles().find((name) => name === `${slug}.mdx`);
  return filename ? readPublishedPost(filename) : null;
}

/**
 * Get all post slugs for generateStaticParams.
 */
export function getPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
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
