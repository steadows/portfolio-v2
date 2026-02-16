import Link from "next/link";
import { GlitchText } from "@/components/effects/GlitchText";
import { HUDBracket } from "@/components/effects/HUDBracket";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4">
      <HUDBracket
        label="ERROR"
        status="SIGNAL LOST"
        accentColor="red"
        animated
        className="w-full max-w-lg"
        contentClassName="flex flex-col items-center gap-6 py-12"
      >
        {/* Error code */}
        <GlitchText
          as="h1"
          className="font-heading text-7xl tracking-wider text-accent-red sm:text-8xl"
          glowColor="red"
          continuous
        >
          404
        </GlitchText>

        {/* Status line */}
        <div className="flex items-center gap-3 font-heading text-xs tracking-[0.25em] text-text-muted">
          <span className="h-px w-8 bg-accent-red/30" />
          TARGET NOT FOUND
          <span className="h-px w-8 bg-accent-red/30" />
        </div>

        {/* Description */}
        <p className="max-w-xs text-center text-sm leading-relaxed text-text-secondary">
          The requested resource does not exist or has been relocated. Verify
          your coordinates and try again.
        </p>

        {/* Diagnostic readout */}
        <div className="w-full max-w-xs space-y-1 border border-white/5 bg-bg-base/50 px-4 py-3 font-heading text-[11px] tracking-wider text-text-muted">
          <div>
            <span className="text-accent-red">STATUS:</span> 404 — NOT FOUND
          </div>
          <div>
            <span className="text-accent-red">PROTOCOL:</span> HTTP/2
          </div>
          <div>
            <span className="text-accent-red">ACTION:</span> RETURN TO BASE
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/"
          className="group mt-2 flex items-center gap-2 border border-accent-cyan/40 px-6 py-2.5 font-heading text-xs tracking-[0.2em] text-accent-cyan transition-all hover:border-accent-cyan hover:bg-accent-cyan/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">
            &larr;
          </span>
          RETURN HOME
        </Link>
      </HUDBracket>
    </main>
  );
}
