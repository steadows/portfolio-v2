"use client";

import { useEffect, useEffectEvent, useState } from "react";
import { useReducedMotion } from "@/hooks/useMediaPreference";
import { cn } from "@/lib/utils";

interface TypeWriterProps {
  /** Single string or array of strings to cycle through */
  strings: string | string[];
  /** Typing speed in ms per character */
  speed?: number;
  /** Deletion speed in ms per character */
  deleteSpeed?: number;
  /** Pause duration (ms) after typing a string before deleting */
  pauseTime?: number;
  /** Pause duration (ms) after deleting before typing next string */
  pauseBeforeType?: number;
  /** Loop through strings continuously — defaults to true when multiple strings */
  loop?: boolean;
  /** Cursor character */
  cursor?: string;
  /** Cursor glow color accent */
  cursorColor?: "cyan" | "green" | "amber" | "red";
  /** Show the blinking cursor — defaults to true */
  showCursor?: boolean;
  /** Delay (ms) before typing starts */
  startDelay?: number;
  /** Wrapper element type */
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "div";
  /** Additional classes for the wrapper */
  className?: string;
  /** Additional classes for the cursor */
  cursorClassName?: string;
  /** Callback fired when all strings have been typed (only when loop=false) */
  onComplete?: () => void;
}

const cursorGlowMap = {
  cyan: "text-accent-cyan text-glow-cyan",
  green: "text-accent-green text-glow-green",
  amber: "text-accent-amber text-glow-amber",
  red: "text-accent-red text-glow-red",
} as const;

type Phase = "start" | "typing" | "pausing" | "deleting" | "waiting" | "done";

export function TypeWriter({
  strings,
  speed = 50,
  deleteSpeed = 30,
  pauseTime = 1500,
  pauseBeforeType = 500,
  loop = true,
  cursor = "▊",
  cursorColor = "cyan",
  showCursor = true,
  startDelay = 0,
  as: Tag = "span",
  className,
  cursorClassName,
  onComplete,
}: TypeWriterProps) {
  const normalizedStrings = Array.isArray(strings) ? strings : [strings];
  const shouldLoop = normalizedStrings.length > 1 ? loop : false;

  const prefersReducedMotion = useReducedMotion();
  const complete = useEffectEvent(() => onComplete?.());
  const [frame, setFrame] = useState({
    phase: "start" as Phase,
    stringIndex: 0,
    charCount: 0,
  });
  const stringCount = normalizedStrings.length;
  const currentString = normalizedStrings[frame.stringIndex] ?? "";

  useEffect(() => {
    const { phase, stringIndex, charCount } = frame;
    if (prefersReducedMotion || !stringCount || phase === "done") return;

    const delay = {
      start: startDelay,
      typing: speed,
      pausing: pauseTime,
      deleting: deleteSpeed,
      waiting: pauseBeforeType,
    }[phase];

    const timer = setTimeout(() => {
      switch (phase) {
        case "start":
        case "typing":
          if (charCount < currentString.length) {
            setFrame({ phase: "typing", stringIndex, charCount: charCount + 1 });
          } else if (shouldLoop || stringIndex < stringCount - 1) {
            setFrame({ ...frame, phase: "pausing" });
          } else {
            setFrame({ ...frame, phase: "done" });
            complete();
          }
          break;
        case "pausing":
          setFrame({ ...frame, phase: "deleting" });
          break;
        case "deleting":
          if (charCount > 0) {
            setFrame({ ...frame, charCount: charCount - 1 });
          } else {
            setFrame({
              phase: "waiting",
              stringIndex: (stringIndex + 1) % stringCount,
              charCount: 0,
            });
          }
          break;
        case "waiting":
          setFrame({ ...frame, phase: "typing" });
          break;
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [
    prefersReducedMotion, frame, currentString, stringCount, shouldLoop,
    startDelay, speed, pauseTime, deleteSpeed, pauseBeforeType,
  ]);

  return (
    <Tag
      className={cn("font-heading", className)}
      aria-label={normalizedStrings.join(", ")}
    >
      <span aria-hidden="true" className="hidden motion-reduce:inline">
        {normalizedStrings[0]}
      </span>
      <span aria-hidden="true" className="motion-reduce:hidden">
        {currentString.slice(0, frame.charCount)}
      </span>
      {showCursor && (
        <span
          className={cn(
            "ml-[1px] inline-block motion-safe:animate-typing-cursor",
            cursorGlowMap[cursorColor],
            cursorClassName
          )}
          aria-hidden="true"
        >
          {cursor}
        </span>
      )}
      {/* Screen reader accessible text */}
      <span className="sr-only">{normalizedStrings.join(", ")}</span>
    </Tag>
  );
}
