import { HeroEmblem } from "@/components/sections/HeroEmblem";
import { PillarModule } from "@/components/ui/PillarModule";
import { HERO_PILLARS } from "@/lib/hero";

export function AscendChamber() {
  return (
    <div className="ascend-chamber" data-ascend-chamber>
      <div className="ascend-chamber__backing" data-chamber-depth="back" aria-hidden="true" />
      <div className="ascend-chamber__grid" aria-hidden="true" />
      <div
        className="ascend-chamber__plane ascend-chamber__plane--left"
        data-chamber-plane
        aria-hidden="true"
      />
      <div
        className="ascend-chamber__plane ascend-chamber__plane--right"
        data-chamber-plane
        aria-hidden="true"
      />

      <svg
        className="ascend-chamber__paths"
        aria-hidden="true"
        viewBox="0 0 600 520"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="chamber-path-gold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8b6c35" stopOpacity=".3" />
            <stop offset=".54" stopColor="#d0ad67" stopOpacity=".86" />
            <stop offset="1" stopColor="#194b70" stopOpacity=".48" />
          </linearGradient>
        </defs>
        <path data-chamber-path="ai" d="M120 112H205L258 205" />
        <path data-chamber-path="brand" d="M120 407H205L258 315" />
        <path data-chamber-path="web" d="M480 112H395L342 205" />
        <path data-chamber-path="systems" d="M480 407H395L342 315" />
      </svg>

      <HeroEmblem />

      <div className="ascend-chamber__modules" aria-label="Gent Ascend capabilities">
        {HERO_PILLARS.map((pillar) => (
          <PillarModule key={pillar.id} pillar={pillar} />
        ))}
      </div>

      <div className="ascend-chamber__foreground" data-chamber-depth="front" aria-hidden="true" />
    </div>
  );
}
