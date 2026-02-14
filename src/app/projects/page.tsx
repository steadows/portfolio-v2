import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects | Steve Meadows",
  description:
    "Data science projects spanning machine learning, statistics, databases, and computer science.",
};

export default function ProjectsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 pt-24 sm:px-6 lg:px-8">
      <ProjectsGrid />
    </main>
  );
}
