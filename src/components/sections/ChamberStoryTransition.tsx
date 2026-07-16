export function ChamberStoryTransition() {
  return (
    <div className="chamber-story-transition" data-chamber-transition aria-hidden="true">
      <div className="chamber-story-transition__plane chamber-story-transition__plane--left" />
      <div className="chamber-story-transition__plane chamber-story-transition__plane--right" />
      <svg viewBox="0 0 600 180" preserveAspectRatio="none">
        <defs>
          <linearGradient id="story-channel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d0ad67" stopOpacity=".54" />
            <stop offset=".6" stopColor="#8b6c35" stopOpacity=".3" />
            <stop offset="1" stopColor="#194b70" stopOpacity=".18" />
          </linearGradient>
        </defs>
        <path d="M156 0 214 48 258 102 275 180" />
        <path d="M444 0 386 48 342 102 325 180" />
        <path className="chamber-story-transition__center" d="M300 0V180" />
      </svg>
    </div>
  );
}
