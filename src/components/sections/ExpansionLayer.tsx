import { EXPANSION_CAPABILITIES } from "@/lib/opportunity-gap";

export function ExpansionLayer() {
  return (
    <div className="opportunity-layer opportunity-layer--expansion">
      <div className="opportunity-layer__heading">
        <span>02</span>
        <h3>What can be built around it</h3>
      </div>
      <ol className="expansion-markers">
        {EXPANSION_CAPABILITIES.map((capability) => (
          <li key={capability.id} data-opportunity-expansion-item>
            <span className="expansion-markers__node" aria-hidden="true" />
            <span>{capability.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
