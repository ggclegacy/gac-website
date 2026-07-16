export function HeroActions() {
  return (
    <div className="hero-actions" data-hero-cta-group>
      <a className="hero-action hero-action--primary" href="#possibility-shift">
        <span>Explore What’s Possible</span>
        <svg aria-hidden="true" viewBox="0 0 20 20">
          <path d="M4 10h11m-4-4 4 4-4 4" />
        </svg>
      </a>
      <a className="hero-action hero-action--secondary" href="#connected-ecosystem">
        See What We Build
        <span aria-hidden="true">↘</span>
      </a>
    </div>
  );
}
