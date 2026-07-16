import { FOUNDATION_STRENGTHS } from "@/lib/opportunity-gap";

export function FoundationLayer() {
  return (
    <div className="opportunity-layer opportunity-layer--foundation">
      <div className="opportunity-layer__heading">
        <span>01</span>
        <h3>What built the business</h3>
      </div>
      <ol className="foundation-markers">
        {FOUNDATION_STRENGTHS.map((strength, index) => (
          <li key={strength.id} data-opportunity-foundation-item>
            <span className="foundation-markers__number" aria-hidden="true">
              0{index + 1}
            </span>
            <span>{strength.label}</span>
          </li>
        ))}
      </ol>
      <p className="opportunity-layer__base">Craft and persistence beneath every layer.</p>
    </div>
  );
}
