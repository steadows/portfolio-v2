import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="font-heading text-6xl text-accent-red">
        404
      </h1>
      <p className="font-heading text-2xl text-text-primary">
        PAGE NOT FOUND
      </p>
      <p className="text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-4 border border-accent-cyan px-6 py-2 font-heading text-sm text-accent-cyan transition-all hover:bg-accent-cyan/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
      >
        Back to Home
      </Link>
    </main>
  );
}
