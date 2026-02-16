import { Skeleton } from "@/components/ui/Skeleton";

export default function ContactLoading() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-20 md:py-32">
      {/* Header */}
      <div className="mb-12 text-center">
        <Skeleton className="mx-auto mb-2 h-4 w-20" />
        <Skeleton className="mx-auto mb-4 h-10 w-64" />
        <Skeleton className="mx-auto h-px w-48" />
        <Skeleton className="mx-auto mt-4 h-4 w-80" />
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Form skeleton */}
        <div className="space-y-5">
          <div>
            <Skeleton className="mb-2 h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="mb-2 h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="mb-2 h-4 w-20" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Socials skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 border border-white/5 bg-bg-surface/50 p-4"
            >
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <Skeleton className="mb-2 h-4 w-24" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
