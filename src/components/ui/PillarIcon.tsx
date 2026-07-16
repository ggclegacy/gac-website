import type { PillarId } from "@/types/hero";

type PillarIconProps = Readonly<{
  pillar: PillarId;
}>;

export function PillarIcon({ pillar }: PillarIconProps) {
  const commonProps = {
    "aria-hidden": true,
    className: "pillar-icon",
    fill: "none",
    viewBox: "0 0 24 24",
  } as const;

  if (pillar === "ai") {
    return (
      <svg {...commonProps}>
        <path d="M8 8.25 12 6l4 2.25v4.5L12 15l-4-2.25v-4.5Z" />
        <path d="M12 2.5V6m0 9v6.5M4.5 7 8 9m8 4 3.5 2M4.5 17 9 14.4M15 7.6 19.5 5" />
      </svg>
    );
  }

  if (pillar === "brand") {
    return (
      <svg {...commonProps}>
        <path d="M12 3 5.5 6v5.5c0 4.1 2.6 7.6 6.5 9.5 3.9-1.9 6.5-5.4 6.5-9.5V6L12 3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }

  if (pillar === "web") {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.8 9.5h16.4M3.8 14.5h16.4M12 3.5c2.1 2.3 3.2 5.2 3.2 8.5S14.1 18.2 12 20.5C9.9 18.2 8.8 15.3 8.8 12S9.9 5.8 12 3.5Z" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="9" y="14" width="6" height="6" rx="1" />
      <path d="M7 10v2h10v-2M12 12v2" />
    </svg>
  );
}
