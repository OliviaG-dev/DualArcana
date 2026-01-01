import type { ArcaneFusionDescription, ArcaneFusionSet } from "../../data";
import "./FusionInterpretation.css";

interface FusionInterpretationProps {
  fusion?: ArcaneFusionDescription;
  fusionSet?: ArcaneFusionSet;
}

function FusionInterpretation({
  fusion,
  fusionSet,
}: FusionInterpretationProps) {
  if (!fusion) return null;

  return (
    <div className="fusion-interpretation">
      <div className="fusion-header">
        <div className="fusion-label">Interprétation de la fusion</div>
        {fusionSet?.collectiveName && (
          <div className="fusion-collective-name">
            Arcane collectif : {fusionSet.collectiveName}
          </div>
        )}
        {fusion.title && <div className="fusion-title">{fusion.title}</div>}
      </div>
      <div className="fusion-description">{fusion.description}</div>
    </div>
  );
}

export default FusionInterpretation;
