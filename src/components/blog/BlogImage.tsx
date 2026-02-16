import Image from "next/image";
import { cn } from "@/lib/utils";

// ─── BlogImage Component ─────────────────────────────────────────────────────
// next/image wrapper for use inside MDX blog posts.
// Supports optional caption and responsive sizing.

interface BlogImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function BlogImage({
  src,
  alt,
  caption,
  width = 720,
  height = 400,
  className,
}: BlogImageProps) {
  return (
    <figure className={cn("my-6", className)}>
      <div className="overflow-hidden border border-white/5">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          className="h-auto w-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center font-heading text-[11px] tracking-wider text-text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
