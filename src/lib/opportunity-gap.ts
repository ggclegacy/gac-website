import type { OpportunityLayerItem } from "@/types/opportunity-gap";

export const FOUNDATION_STRENGTHS: readonly OpportunityLayerItem[] = [
  { id: "reputation", label: "Reputation" },
  { id: "experience", label: "Experience" },
  { id: "service", label: "Service" },
  { id: "relationships", label: "Relationships" },
] as const;

export const EXPANSION_CAPABILITIES: readonly OpportunityLayerItem[] = [
  { id: "brand", label: "Brand" },
  { id: "web", label: "Web" },
  { id: "ai", label: "AI" },
  { id: "systems", label: "Systems" },
] as const;
