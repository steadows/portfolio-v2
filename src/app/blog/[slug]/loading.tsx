import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";

export default function BlogPostLoading() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 md:py-32">
      {/* Back link */}
      <Skeleton className="mb-8 h-4 w-28" />

      {/* Post header */}
      <div className="mb-10">
        <div className="mb-3 flex items-center gap-3">
          <Skeleton className="h-5 w-16 rounded-sm" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="mb-2 h-10 w-full" />
        <Skeleton className="mb-4 h-10 w-2/3" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-14 rounded-sm" />
          <Skeleton className="h-5 w-18 rounded-sm" />
          <Skeleton className="h-5 w-16 rounded-sm" />
        </div>
      </div>

      {/* Divider */}
      <Skeleton className="mx-auto mb-10 h-px w-48" />

      {/* Content */}
      <div className="space-y-6">
        <SkeletonText lines={4} />
        <Skeleton className="h-48 w-full" />
        <SkeletonText lines={5} />
        <SkeletonText lines={3} />
      </div>

      {/* Prev/Next nav */}
      <div className="mt-16 flex justify-between">
        <Skeleton className="h-10 w-36" />
        <Skeleton className="h-10 w-36" />
      </div>
    </main>
  );
}
