import { PillarIcon } from "@/components/ui/PillarIcon";
import type { Pillar } from "@/types/hero";

type PillarModuleProps = Readonly<{
  pillar: Pillar;
}>;

export function PillarModule({ pillar }: PillarModuleProps) {
  return (
    <button
      className={`pillar-module pillar-module--${pillar.id}`}
      type="button"
      data-pillar-module={pillar.id}
      aria-label={`${pillar.name}: ${pillar.description}`}
      aria-pressed="false"
    >
      <span className="pillar-module__status" data-pillar-status aria-hidden="true" />
      <span className="pillar-module__icon" data-pillar-icon>
        <PillarIcon pillar={pillar.id} />
      </span>
      <span className="pillar-module__copy">
        <strong>{pillar.name.toUpperCase()}</strong>
        <span>{pillar.description}</span>
      </span>
    </button>
  );
}
