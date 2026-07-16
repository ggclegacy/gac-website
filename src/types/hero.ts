export type PillarId = "ai" | "brand" | "web" | "systems";

export type Pillar = Readonly<{
  id: PillarId;
  name: string;
  description: string;
}>;
