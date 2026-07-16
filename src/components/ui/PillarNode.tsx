import { PillarIcon } from "@/components/ui/PillarIcon";
import type { Pillar } from "@/types/hero";

type PillarNodeProps = Readonly<{
  pillar: Pillar;
}>;

export function PillarNode({ pillar }: PillarNodeProps) {
  return (
    <article
      className={`pillar-node pillar-node--${pillar.id}`}
      data-pillar-node={pillar.id}
      tabIndex={0}
      aria-label={`${pillar.name}: ${pillar.description}`}
    >
      <span className="pillar-node__index" aria-hidden="true">
        0{pillar.id === "ai" ? 1 : pillar.id === "brand" ? 2 : pillar.id === "web" ? 3 : 4}
      </span>
      <div className="pillar-node__icon">
        <PillarIcon pillar={pillar.id} />
      </div>
      <div>
        <h2>{pillar.name}</h2>
        <p>{pillar.description}</p>
      </div>
      <span className="pillar-node__notch" aria-hidden="true" />
    </article>
  );
}
