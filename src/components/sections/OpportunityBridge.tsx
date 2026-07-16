export function OpportunityBridge() {
  return (
    <svg
      className="opportunity-bridge"
      aria-hidden="true"
      viewBox="0 0 120 360"
      preserveAspectRatio="none"
    >
      <path data-opportunity-path d="M0 48H38L82 48H120" />
      <path data-opportunity-path d="M0 136H38L82 136H120" />
      <path data-opportunity-path d="M0 224H38L82 224H120" />
      <path data-opportunity-path d="M0 312H38L82 312H120" />
      <path className="opportunity-bridge__spine" data-opportunity-path d="M60 24V336" />
      <circle cx="60" cy="48" r="2.5" />
      <circle cx="60" cy="136" r="2.5" />
      <circle cx="60" cy="224" r="2.5" />
      <circle cx="60" cy="312" r="2.5" />
    </svg>
  );
}
