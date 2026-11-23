"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ─── Timeline Component ────────────────────────────────────────────────────
// Vertical glowing timeline for MDX blog posts. Auto-numbers children.
// Usage:
//   <Timeline>
//     <TimelineItem label="The Spark">Content here...</TimelineItem>
//   </Timeline>

interface TimelineProps {
  children: React.ReactNode;
}

interface TimelineItemProps {
  label: string;
  children: React.ReactNode;
}

const nodeStyle = {
  border: "border-accent-cyan/40",
  text: "text-accent-cyan",
  ring: "ring-accent-cyan/20",
  shadow: "0 0 8px rgba(0, 240, 255, 0.4)",
};

export function Timeline({ children }: TimelineProps) {
  const items: React.ReactNode[] = [];
  let index = 1;
  for (const child of React.Children.toArray(children)) {
    if (React.isValidElement<{ index?: number }>(child)) {
      items.push(React.cloneElement(child, { index }));
      index += 1;
    } else {
      items.push(child);
    }
  }

  return (
    <div className="relative my-8 ml-1">
      {/* Vertical line */}
      <div
        className="absolute left-[11px] top-2 bottom-2 w-px bg-accent-cyan/20"
      />
      <div className="space-y-6">{items}</div>
    </div>
  );
}

export function TimelineItem({ label, children, index = 1 }: TimelineItemProps & { index?: number }) {
  return (
    <span className="relative block pl-10">
      {/* Node dot */}
      <span
        className={cn(
          "absolute left-0 top-[6px] h-[23px] w-[23px] rounded-full",
          "flex items-center justify-center",
          "border",
          nodeStyle.border,
          "bg-bg-base",
          "ring-2",
          nodeStyle.ring
        )}
        style={{ boxShadow: nodeStyle.shadow }}
      >
        <span
          className={cn(
            "font-heading text-[10px] font-bold",
            nodeStyle.text
          )}
        >
          {index}
        </span>
      </span>

      {/* Content */}
      <span className="block pb-2">
        <span
          className={cn(
            "font-heading text-[11px] font-semibold uppercase tracking-[0.2em]",
            nodeStyle.text
          )}
        >
          {label}
        </span>
        <span className="mt-1.5 block text-base leading-[1.8] text-text-secondary [&>p]:mb-0">
          {children}
        </span>
      </span>
    </span>
  );
}
