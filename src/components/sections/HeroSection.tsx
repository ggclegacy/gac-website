import { AscendChamber } from "@/components/sections/AscendChamber";
import { HeroIdentity } from "@/components/sections/HeroIdentity";
import { HeroMessage } from "@/components/sections/HeroMessage";
import { HeroMotion } from "@/components/sections/HeroMotion";

export function HeroSection() {
  return (
    <HeroMotion>
      <div className="ascend-hero__ambient" aria-hidden="true" />
      <div className="ascend-hero__inner">
        <HeroIdentity />
        <div className="ascend-hero__composition">
          <AscendChamber />
          <HeroMessage />
        </div>
      </div>
    </HeroMotion>
  );
}
