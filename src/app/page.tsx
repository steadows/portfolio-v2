import { HeroSection } from "@/components/sections/HeroSection";
import { TechArsenalSection } from "@/components/sections/TechArsenalSection";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center px-4">
      {/* ── Hero Section ── */}
      <HeroSection />

      {/* ── Skills & Tools Section ── */}
      <div id="content">
        <TechArsenalSection />
      </div>
    </main>
  );
}
