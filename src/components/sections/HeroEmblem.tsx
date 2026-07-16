import Image from "next/image";

export function HeroEmblem() {
  return (
    <div className="chamber-emblem" data-chamber-emblem>
      <div className="chamber-emblem__plate chamber-emblem__plate--outer" aria-hidden="true" />
      <div className="chamber-emblem__plate chamber-emblem__plate--inner" aria-hidden="true" />
      <div className="chamber-emblem__reflection" data-chamber-reflection aria-hidden="true" />
      <div className="chamber-emblem__image">
        <Image
          src="/hero-logo.png"
          alt="Gent Ascend Collective gold winged emblem"
          width={2000}
          height={2000}
          priority
          sizes="(max-width: 767px) 52vw, (max-width: 1023px) 34vw, 24rem"
        />
      </div>
      <span className="chamber-emblem__mount chamber-emblem__mount--top" aria-hidden="true" />
      <span className="chamber-emblem__mount chamber-emblem__mount--bottom" aria-hidden="true" />
    </div>
  );
}
