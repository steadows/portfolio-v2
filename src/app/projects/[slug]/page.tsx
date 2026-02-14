import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getProjectBySlug,
  getAdjacentProjects,
  getAllProjectSlugs,
  categoryAccentMap,
} from "@/data/projects";
import { ProjectDetailContent } from "@/components/sections/ProjectDetailContent";

// ─── Static Generation ──────────────────────────────────────────────────────

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

// ─── Dynamic Metadata ───────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Steve Meadows`,
    description: project.description,
  };
}

// ─── Page Component ─────────────────────────────────────────────────────────

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);
  const accent = categoryAccentMap[project.category];

  return (
    <main className="relative min-h-screen px-4 pt-28 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* ── Back Navigation ── */}
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 font-heading text-xs uppercase tracking-[0.2em] text-text-muted transition-colors hover:text-accent-cyan"
        >
          <span aria-hidden="true">&larr;</span>
          BACK TO PROJECTS
        </Link>

        {/* ── Client-side interactive content ── */}
        <ProjectDetailContent
          project={project}
          accent={accent}
          prev={prev}
          next={next}
        />
      </div>
    </main>
  );
}
