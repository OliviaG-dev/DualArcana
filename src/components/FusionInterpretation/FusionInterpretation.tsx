import type { ArcaneFusionDescription } from "../../data";
import "./FusionInterpretation.css";

interface FusionInterpretationProps {
  fusion?: ArcaneFusionDescription;
}

function FusionInterpretation({ fusion }: FusionInterpretationProps) {
  if (!fusion) return null;

  return (
    <div className="fusion-interpretation">
      <div className="fusion-header">
        <div className="fusion-label">Interprétation de la fusion</div>
        <div className="fusion-subtitle">La rencontre des deux énergies</div>
      </div>
      <div className="fusion-description">{fusion.description}</div>
    </div>
  );
}

export default FusionInterpretation;

