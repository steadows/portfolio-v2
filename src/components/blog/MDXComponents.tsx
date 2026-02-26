import Link from "next/link";
import type { MDXComponents as MDXComponentsType } from "mdx/types";
import { CodeBlock } from "@/components/blog/CodeBlock";
import { Callout } from "@/components/blog/Callout";
import { BlogImage } from "@/components/blog/BlogImage";
import { cn } from "@/lib/utils";

// ─── MDX Component Map ──────────────────────────────────────────────────────
// Custom rendering for all standard HTML elements inside MDX blog posts.
// Follows the site's dark HUD theme while prioritizing readability for
// long-form content (Inter body, comfortable line height, proper spacing).

function extractTextContent(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractTextContent).join("");
  if (node !== null && node !== undefined && typeof node === "object" && "props" in node) {
    const element = node as { props: { children?: React.ReactNode } };
    return extractTextContent(element.props.children);
  }
  return "";
}

export const mdxComponents: MDXComponentsType = {
  // ── Headings ───────────────────────────────────────────────────────────────
  h1: ({ children, ...props }) => (
    <h1
      className="mb-6 mt-10 font-heading text-3xl font-bold tracking-wide text-text-primary md:text-4xl"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="mb-4 mt-10 border-b border-white/5 pb-2 font-heading text-2xl font-bold tracking-wide text-text-primary"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mb-3 mt-8 font-heading text-xl font-semibold tracking-wide text-text-primary"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4
      className="mb-2 mt-6 font-heading text-lg font-semibold tracking-wide text-accent-cyan"
      {...props}
    >
      {children}
    </h4>
  ),

  // ── Body Text ──────────────────────────────────────────────────────────────
  p: ({ children, ...props }) => (
    <p
      className="mb-4 text-base leading-[1.8] text-text-secondary"
      {...props}
    >
      {children}
    </p>
  ),

  // ── Links ──────────────────────────────────────────────────────────────────
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-cyan underline decoration-accent-cyan/30 underline-offset-2 transition-colors hover:text-accent-cyan hover:decoration-accent-cyan/60"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href ?? "#"}
        className="text-accent-cyan underline decoration-accent-cyan/30 underline-offset-2 transition-colors hover:text-accent-cyan hover:decoration-accent-cyan/60"
        {...props}
      >
        {children}
      </Link>
    );
  },

  // ── Code ───────────────────────────────────────────────────────────────────
  pre: ({ children, ...props }) => {
    // Extract language and raw text from the nested code element
    const codeElement = children as React.ReactElement<{
      className?: string;
      children?: React.ReactNode;
    }>;
    const className = codeElement?.props?.className ?? "";
    const rawString = extractTextContent(codeElement?.props?.children);

    return (
      <CodeBlock className={className} __rawString={rawString} {...props}>
        <pre className="font-mono text-sm text-text-primary/90">
          {codeElement?.props?.children}
        </pre>
      </CodeBlock>
    );
  },
  code: ({ children, className, ...props }) => {
    // Inline code (no className means it's not inside a pre block)
    if (!className) {
      return (
        <code
          className="rounded bg-bg-surface px-1.5 py-0.5 font-mono text-[0.875em] text-accent-cyan/90"
          {...props}
        >
          {children}
        </code>
      );
    }
    // Block code — handled by the pre wrapper
    return (
      <code className={cn("font-mono", className)} {...props}>
        {children}
      </code>
    );
  },

  // ── Blockquote ─────────────────────────────────────────────────────────────
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-6 border-l-2 border-accent-cyan/30 py-1 pl-4 italic text-text-secondary/80"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // ── Lists ──────────────────────────────────────────────────────────────────
  ul: ({ children, ...props }) => (
    <ul
      className="mb-4 ml-6 list-disc space-y-1 text-text-secondary marker:text-accent-cyan/40"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="mb-4 ml-6 list-decimal space-y-1 text-text-secondary marker:text-accent-cyan/40"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-base leading-[1.8]" {...props}>
      {children}
    </li>
  ),

  // ── Horizontal Rule ────────────────────────────────────────────────────────
  hr: (props) => (
    <hr
      className="my-8 h-px border-0 bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent"
      {...props}
    />
  ),

  // ── Table ──────────────────────────────────────────────────────────────────
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto rounded-md border border-white/8 bg-bg-surface/30">
      <table
        className="w-full min-w-[36rem] border-separate border-spacing-0 text-sm"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-accent-cyan/5" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }) => (
    <tbody className="[&_tr:last-child_td]:border-b-0" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }) => (
    <tr className="align-top" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border-b border-accent-cyan/20 px-3 py-2.5 text-left font-heading text-[11px] uppercase tracking-[0.15em] text-accent-cyan md:px-4"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="border-b border-white/6 px-3 py-2.5 text-text-secondary md:px-4"
      {...props}
    >
      {children}
    </td>
  ),

  // ── Strong / Emphasis ──────────────────────────────────────────────────────
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-text-primary" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic text-text-secondary/90" {...props}>
      {children}
    </em>
  ),

  // ── Images ─────────────────────────────────────────────────────────────────
  img: ({ src, alt, ...props }) => (
    <BlogImage
      src={src ?? ""}
      alt={alt ?? ""}
      {...props}
    />
  ),

  // ── Custom Components (available in MDX) ───────────────────────────────────
  Callout,
  BlogImage,
};
