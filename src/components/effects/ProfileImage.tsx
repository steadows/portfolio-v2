import Image from "next/image";
import { cn } from "@/lib/utils";

// ── Types ──

type CornerPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface ProfileImageProps {
  /** Path to profile image. If omitted, a tactical placeholder is shown. */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Width & height in pixels — defaults to 160 */
  size?: number;
  /** Additional classes for the outer wrapper */
  className?: string;
}

// ── Corner bracket positions ──

const cornerPositionClasses: Record<CornerPosition, string> = {
  "top-left": "top-0 left-0 border-t border-l",
  "top-right": "top-0 right-0 border-t border-r",
  "bottom-left": "bottom-0 left-0 border-b border-l",
  "bottom-right": "bottom-0 right-0 border-b border-r",
};

const dotPositionClasses: Record<CornerPosition, string> = {
  "top-left": "-top-px -left-px",
  "top-right": "-top-px -right-px",
  "bottom-left": "-bottom-px -left-px",
  "bottom-right": "-bottom-px -right-px",
};

const corners: CornerPosition[] = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];

// ── Sub-components ──

function Corner({
  position,
  size,
}: {
  position: CornerPosition;
  size: number;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute border-accent-cyan/50",
        cornerPositionClasses[position]
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}

function CornerDot({ position }: { position: CornerPosition }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute h-[3px] w-[3px] rounded-full bg-accent-cyan opacity-60",
        dotPositionClasses[position]
      )}
      aria-hidden="true"
    />
  );
}

function Placeholder() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-bg-surface via-bg-elevated to-bg-surface">
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0, 240, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.15) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      />
      {/* User silhouette */}
      <svg
        viewBox="0 0 80 80"
        className="relative h-3/5 w-3/5 text-accent-cyan/15"
        fill="currentColor"
        aria-hidden="true"
      >
        <circle cx="40" cy="28" r="13" />
        <path d="M14 70 C14 52 26 44 40 44 54 44 66 52 66 70" />
      </svg>
    </div>
  );
}

// ── Main Component ──

/**
 * ProfileImage — Tactical HUD-framed profile photo with scan sweep effect.
 *
 * Displays a profile image (or tactical placeholder) inside a HUD-style
 * square frame with corner brackets, animated scan line, and data readouts.
 * Entrance animation is handled by the parent (e.g. HeroSection stagger).
 *
 * The scan effect respects `prefers-reduced-motion` via `motion-safe:`.
 *
 * @example
 * ```tsx
 * <ProfileImage src="/images/profile.jpg" size={180} />
 * <ProfileImage /> // Shows tactical placeholder
 * ```
 */
export function ProfileImage({
  src,
  alt = "Steve Meadows",
  size = 160,
  className,
}: ProfileImageProps) {
  const cornerSize = Math.max(12, Math.round(size * 0.09));

  return (
    <div
      className={cn("relative", className)}
      style={{ width: size, height: size }}
    >
      {/* ── HUD corner brackets ── */}
      {corners.map((pos) => (
        <Corner key={pos} position={pos} size={cornerSize} />
      ))}

      {/* ── Corner dots ── */}
      {corners.map((pos) => (
        <CornerDot key={`dot-${pos}`} position={pos} />
      ))}

      {/* ── Image container (inset from brackets) ── */}
      <div className="absolute inset-[5px] overflow-hidden bg-bg-surface">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes={`${size}px`}
            priority
          />
        ) : (
          <Placeholder />
        )}

        {/* ── Scan sweep effect ── */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-full motion-safe:animate-profile-scan"
          aria-hidden="true"
        >
          {/* Bright scan line */}
          <div className="h-[2px] w-full bg-accent-cyan/70 shadow-[0_0_8px_rgba(0,240,255,0.6),0_0_20px_rgba(0,240,255,0.3)]" />
          {/* Fading trail below the line */}
          <div className="h-8 w-full bg-gradient-to-b from-accent-cyan/15 to-transparent" />
        </div>

        {/* ── Depth gradient overlay ── */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-base/50 via-transparent to-bg-base/20"
          aria-hidden="true"
        />
      </div>

      {/* ── Data readout ── */}
      <div
        className="pointer-events-none absolute -bottom-5 left-0 right-0 flex justify-center"
        aria-hidden="true"
      >
        <span className="font-heading text-[7px] tracking-[0.25em] text-accent-cyan/40">
          ID VERIFIED // CLEARANCE: ACTIVE
        </span>
      </div>
    </div>
  );
}
