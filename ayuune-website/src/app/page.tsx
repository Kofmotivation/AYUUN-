import { ArchiveSection } from "@/components/archive-section";
import { FirstObjects } from "@/components/first-objects";
import { HeroSection } from "@/components/hero-section";
import { JournalSection } from "@/components/journal-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <main id="top">
      <HeroSection />
      <div aria-hidden="true" className="h-0" />
      <FirstObjects />
      <div
        aria-hidden="true"
        className="h-[clamp(120px,22vh,260px)]"
      />
      <ArchiveSection />
      <JournalSection />
      <SiteFooter />
    </main>
  );
}
