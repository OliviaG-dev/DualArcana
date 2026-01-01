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
        <div className="interpretation-arcane-number">
          Arcane {arcane.number}
        </div>
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

      {"intro" in arcane.data && (
        <div className="interpretation-content">
          {arcane.data.intro && (
            <div className="interpretation-section">
              <div className="interpretation-section-label">Introduction</div>
              <div className="interpretation-section-text">
                {arcane.data.intro}
              </div>
            </div>
          )}
          {arcane.data.experience && (
            <div className="interpretation-section">
              <div className="interpretation-section-label">Expérience</div>
              <div className="interpretation-section-text">
                {arcane.data.experience}
              </div>
            </div>
          )}
          {arcane.data.challenge && (
            <div className="interpretation-section">
              <div className="interpretation-section-label">Défi</div>
              <div className="interpretation-section-text">
                {arcane.data.challenge}
              </div>
            </div>
          )}
          {arcane.data.outcome && (
            <div className="interpretation-section">
              <div className="interpretation-section-label">Résultat</div>
              <div className="interpretation-section-text">
                {arcane.data.outcome}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ArcanaInterpretation;
