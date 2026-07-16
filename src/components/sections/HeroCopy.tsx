import { HeroActions } from "@/components/sections/HeroActions";

export function HeroCopy() {
  return (
    <div className="hero-copy">
      <p className="hero-copy__eyebrow" data-hero-eyebrow>
        <span aria-hidden="true" />
        AI · BRAND · WEB · SYSTEMS
      </p>
      <h1 className="hero-copy__headline" id="hero-title" data-hero-headline>
        Digital infrastructure for businesses built to matter.
      </h1>
      <p className="hero-copy__support" data-hero-supporting-copy>
        Gent Ascend Collective helps ambitious local companies expand what they
        can offer, how they operate, and how people experience their brand.
      </p>
      <HeroActions />
    </div>
  );
}
