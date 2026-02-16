import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";

export default function ProjectDetailLoading() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-20 md:py-32">
      {/* Back link */}
      <Skeleton className="mb-8 h-4 w-32" />

      {/* Hero */}
      <div className="mb-10">
        <div className="mb-3 flex gap-2">
          <Skeleton className="h-5 w-16 rounded-sm" />
          <Skeleton className="h-5 w-20 rounded-sm" />
        </div>
        <Skeleton className="mb-2 h-10 w-3/4" />
        <Skeleton className="mb-6 h-5 w-1/2" />
        <Skeleton className="h-64 w-full rounded-none" />
      </div>

      {/* Content sections */}
      <div className="space-y-10">
        <div>
          <Skeleton className="mb-4 h-6 w-40" />
          <SkeletonText lines={4} />
        </div>
        <div>
          <Skeleton className="mb-4 h-6 w-48" />
          <SkeletonText lines={5} />
        </div>
        <div>
          <Skeleton className="mb-4 h-6 w-36" />
          <SkeletonText lines={3} />
        </div>
      </div>

      {/* Tech stack badges */}
      <div className="mt-10 flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-20 rounded-sm" />
        ))}
      </div>
    </main>
  );
}
