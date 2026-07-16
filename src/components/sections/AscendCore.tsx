import Image from "next/image";

import { PillarNode } from "@/components/ui/PillarNode";
import { HERO_PILLARS } from "@/lib/hero";

export function AscendCore() {
  return (
    <div className="ascend-core" data-hero-environment>
      <div
        className="ascend-core__depth ascend-core__depth--back"
        data-depth-layer="back"
        aria-hidden="true"
      />
      <div
        className="ascend-core__plane ascend-core__plane--left"
        data-depth-layer="plane-left"
        aria-hidden="true"
      />
      <div
        className="ascend-core__plane ascend-core__plane--right"
        data-depth-layer="plane-right"
        aria-hidden="true"
      />

      <svg
        className="ascend-core__connections"
        aria-hidden="true"
        viewBox="0 0 760 680"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="connection-gold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#896b36" stopOpacity=".2" />
            <stop offset=".5" stopColor="#d0ad67" stopOpacity=".75" />
            <stop offset="1" stopColor="#896b36" stopOpacity=".2" />
          </linearGradient>
        </defs>
        <path data-connection-path="ai" d="M190 160H290l50 105" />
        <path data-connection-path="brand" d="M190 525h100l50-108" />
        <path data-connection-path="web" d="M570 160H470l-50 105" />
        <path data-connection-path="systems" d="M570 525H470l-50-108" />
        <circle cx="340" cy="265" r="3" />
        <circle cx="340" cy="417" r="3" />
        <circle cx="420" cy="265" r="3" />
        <circle cx="420" cy="417" r="3" />
      </svg>

      <div className="ascend-core__stage">
        <div className="ascend-core__engraving" aria-hidden="true" />
        <div className="ascend-core__halo" aria-hidden="true" />
        <div className="ascend-core__edge-light" data-edge-light aria-hidden="true" />
        <div className="ascend-core__ring ascend-core__ring--outer" aria-hidden="true" />
        <div className="ascend-core__ring ascend-core__ring--inner" aria-hidden="true" />
        <div className="ascend-core__logo" data-hero-logo>
          <Image
            src="/hero-logo.png"
            alt="Gent Ascend Collective gold winged emblem"
            width={2000}
            height={2000}
            priority
            sizes="(max-width: 767px) 76vw, (max-width: 991px) 50vw, (max-width: 1199px) 32vw, 27rem"
          />
        </div>
      </div>

      <svg
        className="ascend-core__mobile-connections"
        aria-hidden="true"
        viewBox="0 0 100 30"
        preserveAspectRatio="none"
      >
        <path data-connection-path="ai" d="M50 0 20 30" />
        <path data-connection-path="brand" d="M50 0 40 30" />
        <path data-connection-path="web" d="M50 0 60 30" />
        <path data-connection-path="systems" d="M50 0 80 30" />
      </svg>

      <div className="ascend-core__pillars" aria-label="Gent Ascend capabilities">
        {HERO_PILLARS.map((pillar) => (
          <PillarNode key={pillar.id} pillar={pillar} />
        ))}
      </div>

      <div
        className="ascend-core__depth ascend-core__depth--front"
        data-depth-layer="front"
        aria-hidden="true"
      />
    </div>
  );
}
