import type { EnrichedArcaneResult } from "../../domain/interpretation";
import "./ArcanaInterpretation.css";

interface ArcanaInterpretationProps {
  arcane: EnrichedArcaneResult;
  type: "year" | "personal";
}

function ArcanaInterpretation({ arcane, type }: ArcanaInterpretationProps) {
  if (!arcane.data) return null;

  const label = type === "year" ? "Arcane de l'année" : "Arcane personnel";

  return (
    <div className="arcane-interpretation">
      <div className="interpretation-header">
        <div className="interpretation-label">{label}</div>
        <div className="interpretation-arcane-name">{arcane.name}</div>
        <div className="interpretation-arcane-number">Arcane {arcane.number}</div>
      </div>

      {arcane.data.keywords && arcane.data.keywords.length > 0 && (
        <div className="interpretation-keywords">
          {arcane.data.keywords.map((keyword, index) => (
            <span key={index} className="keyword-tag">
              {keyword}
            </span>
          ))}
        </div>
      )}

      {arcane.data.description && (
        <div className="interpretation-description">
          {arcane.data.description}
        </div>
      )}
    </div>
  );
}

export default ArcanaInterpretation;

