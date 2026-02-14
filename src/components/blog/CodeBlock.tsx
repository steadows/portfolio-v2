"use client";

import { useState } from "react";
import { LuCopy, LuCheck } from "react-icons/lu";
import { cn } from "@/lib/utils";

// ─── CodeBlock Component ─────────────────────────────────────────────────────
// Wraps pre/code blocks in MDX with a language label and copy button.
// Receives pre-highlighted HTML from shiki via next-mdx-remote.

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  /** Raw text content for copying (set by MDXComponents wrapper) */
  __rawString?: string;
}

export function CodeBlock({ children, className, __rawString }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Extract language from className (e.g., "language-python" → "python")
  const lang = className?.replace(/language-/, "") ?? "";

  const handleCopy = async () => {
    if (!__rawString) return;
    try {
      await navigator.clipboard.writeText(__rawString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback — clipboard API may fail in some contexts
    }
  };

  return (
    <div className="group relative my-4 overflow-hidden border border-white/5 bg-bg-surface">
      {/* Header bar: language label + copy button */}
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-1.5">
        <span className="font-heading text-[10px] uppercase tracking-[0.2em] text-accent-cyan/60">
          {lang || "code"}
        </span>
        {__rawString && (
          <button
            onClick={handleCopy}
            className={cn(
              "flex items-center gap-1 font-heading text-[10px] uppercase tracking-wider transition-colors",
              copied
                ? "text-accent-green"
                : "text-text-muted hover:text-accent-cyan"
            )}
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copied ? (
              <>
                <LuCheck className="h-3 w-3" />
                COPIED
              </>
            ) : (
              <>
                <LuCopy className="h-3 w-3" />
                COPY
              </>
            )}
          </button>
        )}
      </div>

      {/* Code content */}
      <div className="overflow-x-auto p-4 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}
