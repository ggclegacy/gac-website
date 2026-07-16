import { HeroActions } from "@/components/sections/HeroActions";

export function HeroMessage() {
  return (
    <div className="chamber-message" data-chamber-message>
      <h1 id="hero-title">Helping strong local businesses build what comes next.</h1>
      <p>
        We create custom websites, intelligent tools, client experiences, and connected systems
        around the way your company actually works.
      </p>
      <HeroActions />
    </div>
  );
}
