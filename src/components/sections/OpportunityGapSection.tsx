import { ExpansionLayer } from "@/components/sections/ExpansionLayer";
import { FoundationLayer } from "@/components/sections/FoundationLayer";
import { OpportunityBridge } from "@/components/sections/OpportunityBridge";
import { OpportunityGapMotion } from "@/components/sections/OpportunityGapMotion";

export function OpportunityGapSection() {
  return (
    <OpportunityGapMotion>
      <div className="opportunity-gap__ambient" aria-hidden="true" />
      <div className="opportunity-gap__inner">
        <header className="opportunity-gap__copy" data-opportunity-copy>
          <p className="opportunity-gap__eyebrow">BUILT STRONG. READY FOR MORE.</p>
          <h2 id="opportunity-gap-title">The foundation is already there.</h2>
          <p className="opportunity-gap__support">
            Strong local businesses are built through trust, experience, service, and years of
            real work. Gent Ascend Collective does not replace that foundation. We help strengthen
            the digital experience, intelligence, and systems around it.
          </p>
        </header>

        <div className="opportunity-gap__architecture">
          <FoundationLayer />
          <OpportunityBridge />
          <ExpansionLayer />
        </div>

        <p className="opportunity-gap__closing" data-opportunity-closing>
          The opportunity is not changing what makes the company valuable. It is making more
          possible because of it.
        </p>
      </div>
    </OpportunityGapMotion>
  );
}
