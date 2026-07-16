import Link from "next/link";

export function HeroNavigation() {
  return (
    <nav className="hero-navigation" aria-label="Primary navigation">
      <Link className="hero-navigation__mark" href="/" aria-label="Gent Ascend Collective home">
        <span aria-hidden="true">GA</span>
      </Link>
      <a className="hero-navigation__link" href="#opportunity-gap">
        Our approach
        <span aria-hidden="true">↓</span>
      </a>
    </nav>
  );
}
