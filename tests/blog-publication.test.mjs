import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { createJiti } from "jiti";
import { compileMDX } from "next-mdx-remote/rsc";
import { renderToStaticMarkup } from "react-dom/server";

const src = fileURLToPath(new URL("../src", import.meta.url));
const jiti = createJiti(import.meta.url, {
  alias: { "@": src },
  jsx: { runtime: "automatic" },
  fsCache: false,
});
const props = (slug) => ({ params: Promise.resolve({ slug }) });

test("a Markdown image produces valid inline markup within a paragraph", async () => {
  const { mdxComponents } = jiti("@/components/blog/MDXComponents");
  const { content } = await compileMDX({
    source: "Before ![Graph](/blog/obsidian_graph.png) after.",
    components: mdxComponents,
  });
  const html = renderToStaticMarkup(content);
  assert.match(html, /<p\b[^>]*>Before <img\b[^>]*alt="Graph"[^>]*> after\.<\/p>/);
});

test("public blog selection", async (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "blog-publication-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const dir = path.join(root, "src/content/blog");
  fs.mkdirSync(dir, { recursive: true });
  function writePost(filename, status, date, body = "# Public body") {
    const fields = [`title: "${filename}"`, `date: "${date}"`];
    if (status !== undefined) fields.push(`status: ${JSON.stringify(status)}`);
    fs.writeFileSync(path.join(dir, filename), ["---", ...fields, "---", body].join("\n"), { mode: 0o444 });
  }
  writePost("released.mdx", "published", "2025-03-01");
  writePost("legacy.mdx", undefined, "2025-02-01");
  writePost("null-status.mdx", null, "2025-01-01");
  writePost("draft.mdx", "draft", "2025-04-01", "{invalid MDX");
  writePost("pending.mdx", "pending", "2025-05-01");
  writePost("notes.md", "published", "2025-06-01");
  fs.mkdirSync(path.join(dir, "folder.mdx"));
  fs.symlinkSync("released.mdx", path.join(dir, "linked.mdx"));
  t.mock.method(process, "cwd", () => root);

  const blog = await jiti.import("@/lib/blog");
  const page = await jiti.import("@/app/blog/[slug]/page");
  const image = await jiti.import("@/app/blog/[slug]/opengraph-image");
  const slugs = ["released", "legacy", "null-status"];
  const staticParams = slugs.map((slug) => ({ slug }));

  await t.test("lists, navigation and both static routes agree on publication", () => {
    assert.deepEqual(blog.getAllPosts().map((post) => post.slug), slugs);
    assert.deepEqual(blog.getPostSlugs(), slugs);
    assert.deepEqual(page.generateStaticParams(), staticParams);
    assert.deepEqual(image.generateStaticParams(), staticParams);
    const { prev, next } = blog.getAdjacentPosts("legacy");
    assert.equal(prev.slug, "null-status");
    assert.equal(next.slug, "released");
  });

  await t.test("published and legacy posts reach page and metadata", async () => {
    for (const slug of slugs) {
      const result = blog.getPostBySlug(slug);
      assert.equal(result.post.status, "published");
      assert.match(result.content, /# Public body/);
      assert.equal((await page.generateMetadata(props(slug))).title, result.post.title);
      assert.equal((await page.default(props(slug))).type, "main");
    }
  });

  await t.test("rejected slugs stop before MDX compilation or image work", async (t) => {
    const fetch = t.mock.method(globalThis, "fetch", () => assert.fail("unexpected font fetch"));
    const reads = t.mock.method(fs, "readFileSync");
    const notFound = { digest: "NEXT_HTTP_ERROR_FALLBACK;404" };
    for (const slug of ["draft", "pending", "missing", "./released", "RELEASED", "linked", "folder", "notes"]) {
      reads.mock.resetCalls();
      assert.equal(blog.getPostBySlug(slug), null);
      await assert.rejects(page.generateMetadata(props(slug)), notFound);
      await assert.rejects(page.default(props(slug)), notFound);
      const response = await image.default(props(slug));
      assert.equal(response.status, 404);
      assert.equal(response.body, null);
      for (const call of reads.mock.calls) {
        assert.ok(slug === "draft" || slug === "pending", "unexpected file read for an unknown slug");
        assert.equal(call.arguments[0], path.join(dir, `${slug}.mdx`));
      }
    }
    assert.equal(fetch.mock.callCount(), 0);
  });
});
