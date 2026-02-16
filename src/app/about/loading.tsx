import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";

export default function AboutLoading() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-20 md:py-32">
      {/* Header */}
      <div className="mb-12 text-center">
        <Skeleton className="mx-auto mb-2 h-4 w-20" />
        <Skeleton className="mx-auto mb-4 h-10 w-56" />
        <Skeleton className="mx-auto h-px w-48" />
      </div>

      {/* Bio section */}
      <div className="mb-16">
        <SkeletonText lines={4} />
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-6">
            <div className="flex flex-col items-center">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-full w-px" />
            </div>
            <div className="flex-1 pb-8">
              <Skeleton className="mb-2 h-5 w-48" />
              <Skeleton className="mb-3 h-4 w-32" />
              <SkeletonText lines={2} />
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="border border-white/5 bg-bg-surface/50 p-5"
          >
            <Skeleton className="mb-3 h-8 w-8 rounded-full" />
            <Skeleton className="mb-2 h-5 w-3/4" />
            <SkeletonText lines={2} />
          </div>
        ))}
      </div>
    </main>
  );
}
