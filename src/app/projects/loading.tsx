import { Skeleton, SkeletonCard } from "@/components/ui/Skeleton";

export default function ProjectsLoading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-20 md:py-32">
      {/* Header */}
      <div className="mb-12 text-center">
        <Skeleton className="mx-auto mb-2 h-4 w-24" />
        <Skeleton className="mx-auto mb-4 h-10 w-64" />
        <Skeleton className="mx-auto h-px w-48" />
        <Skeleton className="mx-auto mt-4 h-4 w-80" />
      </div>

      {/* Filter tabs */}
      <div className="mb-10 flex justify-center gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-sm" />
        ))}
      </div>

      {/* Project grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </main>
  );
}
