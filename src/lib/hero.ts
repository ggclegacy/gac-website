import type { Pillar } from "@/types/hero";

export const HERO_PILLARS: readonly Pillar[] = [
  { id: "ai", name: "AI", description: "Useful intelligence" },
  { id: "brand", name: "Brand", description: "Identity and trust" },
  { id: "web", name: "Web", description: "Connected experience" },
  { id: "systems", name: "Systems", description: "Operational structure" },
] as const;
