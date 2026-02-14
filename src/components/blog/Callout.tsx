"use client";

import { LuInfo, LuTriangleAlert, LuLightbulb } from "react-icons/lu";
import { cn } from "@/lib/utils";

// ─── Callout / Admonition Component ─────────────────────────────────────────
// Used inside MDX blog posts for info, warning, and tip callouts.

type CalloutType = "info" | "warning" | "tip";

interface CalloutProps {
  type?: CalloutType;
  children: React.ReactNode;
}

const calloutConfig: Record<
  CalloutType,
  {
    icon: React.ElementType;
    label: string;
    border: string;
    bg: string;
    text: string;
    iconColor: string;
  }
> = {
  info: {
    icon: LuInfo,
    label: "Note",
    border: "border-accent-cyan/30",
    bg: "bg-accent-cyan/5",
    text: "text-accent-cyan",
    iconColor: "text-accent-cyan",
  },
  warning: {
    icon: LuTriangleAlert,
    label: "Warning",
    border: "border-accent-amber/30",
    bg: "bg-accent-amber/5",
    text: "text-accent-amber",
    iconColor: "text-accent-amber",
  },
  tip: {
    icon: LuLightbulb,
    label: "Tip",
    border: "border-accent-green/30",
    bg: "bg-accent-green/5",
    text: "text-accent-green",
    iconColor: "text-accent-green",
  },
};

export function Callout({ type = "info", children }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "my-6 border-l-2 px-4 py-3",
        config.border,
        config.bg
      )}
    >
      <div className="mb-1 flex items-center gap-2">
        <Icon className={cn("h-4 w-4", config.iconColor)} aria-hidden="true" />
        <span
          className={cn(
            "font-heading text-[10px] font-semibold uppercase tracking-[0.2em]",
            config.text
          )}
        >
          {config.label}
        </span>
      </div>
      <div className="text-sm leading-relaxed text-text-secondary [&>p]:mb-0">
        {children}
      </div>
    </div>
  );
}
