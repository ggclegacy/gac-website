import { AscendCore } from "@/components/sections/AscendCore";
import { HeroCopy } from "@/components/sections/HeroCopy";
import { HeroMotion } from "@/components/sections/HeroMotion";

export function HeroSection() {
  return (
    <HeroMotion>
      <div className="hero__ambient" data-depth-layer="ambient" aria-hidden="true" />
      <div className="hero__grid">
        <HeroCopy />
        <AscendCore />
      </div>
    </HeroMotion>
  );
}
