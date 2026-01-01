import { useState, useEffect, useRef } from "react";
import "./Home.css";
import backgroundImage from "../../assets/background.png";
import { getDualArcana } from "../../domain";
import { enrichDualArcanaResult, type EnrichedDualArcanaResult } from "../../domain/interpretation";
import Modal from "../../components/Modal/Modal";
import ArcanaInterpretation from "../../components/ArcanaInterpretation/ArcanaInterpretation";
import FusionInterpretation from "../../components/FusionInterpretation/FusionInterpretation";

/**
 * Retourne le chemin de l'image de l'arcane
 * @param number - Le numéro de l'arcane (1-22)
 * @returns Le chemin vers l'image (ex: /arcanes/01.png)
 */
const getArcaneImagePath = (number: number): string => {
  const formattedNumber = number.toString().padStart(2, "0");
  return `/arcanes/${formattedNumber}.png`;
};

const CARD_BACK_PATH = "/arcanes/back.svg";

function Home() {
  const [day, setDay] = useState<number>(1);
  const [month, setMonth] = useState<number>(1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [result, setResult] = useState<ReturnType<typeof getDualArcana> | null>(
    null
  );
  const [enrichedResult, setEnrichedResult] = useState<EnrichedDualArcanaResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [cardImageHeight, setCardImageHeight] = useState<number | null>(null);
  const backImageRef = useRef<HTMLImageElement>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFlipped(false);
    const calculated = getDualArcana(day, month, year);
    setResult(calculated);
    const enriched = enrichDualArcanaResult(calculated);
    setEnrichedResult(enriched);
    
    // Déclencher l'animation de retournement après un court délai
    setTimeout(() => {
      setIsFlipped(true);
    }, 100);
  };

  const handleOpenModal = () => {
    if (enrichedResult) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Mesurer la hauteur réelle d'une image de carte pour ajuster le SVG
  useEffect(() => {
    const measureCardHeight = () => {
      const img = new Image();
      img.onload = () => {
        // Calculer la hauteur à 100px de largeur (comme défini dans le CSS)
        const aspectRatio = img.height / img.width;
        const heightAt100px = Math.round(100 * aspectRatio);
        setCardImageHeight(heightAt100px);
        console.log('Card dimensions:', img.width, 'x', img.height, 'Ratio:', aspectRatio.toFixed(4), 'Height at 100px:', heightAt100px);
        
        // Ajuster le viewBox du SVG pour correspondre au ratio réel
        const svgViewBoxHeight = Math.round(100 * aspectRatio);
        
        // Forcer la hauteur du SVG après un court délai pour s'assurer qu'il est rendu
        setTimeout(() => {
          const backImages = document.querySelectorAll('.card-back-image') as NodeListOf<HTMLImageElement>;
          backImages.forEach((backImg) => {
            if (backImg) {
              // Mettre à jour le viewBox du SVG si c'est un SVG
              if (backImg.tagName === 'img' && backImg.src.endsWith('.svg')) {
                // Charger le SVG et mettre à jour son viewBox
                fetch(backImg.src)
                  .then(response => response.text())
                  .then(svgText => {
                    const parser = new DOMParser();
                    const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
                    const svgElement = svgDoc.querySelector('svg');
                    if (svgElement) {
                      svgElement.setAttribute('viewBox', `0 0 100 ${svgViewBoxHeight}`);
                      svgElement.setAttribute('preserveAspectRatio', 'none');
                      const serializer = new XMLSerializer();
                      const updatedSvg = serializer.serializeToString(svgDoc);
                      const blob = new Blob([updatedSvg], { type: 'image/svg+xml' });
                      const url = URL.createObjectURL(blob);
                      backImg.src = url;
                    }
                  })
                  .catch(err => console.error('Error updating SVG viewBox:', err));
              }
              
              backImg.style.setProperty('height', `${heightAt100px}px`, 'important');
              backImg.style.setProperty('width', '100px', 'important');
              backImg.style.setProperty('min-height', `${heightAt100px}px`, 'important');
              backImg.style.setProperty('max-height', `${heightAt100px}px`, 'important');
            }
          });
        }, 200);
      };
      img.onerror = () => {
        console.error('Failed to load card image for measurement');
        // Valeur par défaut si l'image ne charge pas
        setCardImageHeight(140);
      };
      img.src = getArcaneImagePath(1); // Utiliser la première carte comme référence
    };

    measureCardHeight();
  }, []);

  return (
    <div className="home">
      <div className="background-overlay" />
      <div
        className="background-image"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      <main className="main-content">
        <section className="hero">
          <h1 className="hero-title">DualArcana</h1>
          <p className="hero-slogan">Deux arcanes. Un chemin.</p>
          <p className="hero-subtitle">
            DualArcana révèle la rencontre entre l'arcane de l'année et ton
            arcane personnel, pour éclairer les dynamiques qui façonnent ton
            cycle.
          </p>
        </section>

        <div className="section-divider"></div>

        <section className="section">
          <form onSubmit={handleCalculate} className="arcana-form">
            <div className="form-group">
              <label htmlFor="day">Jour</label>
              <div className="input-wrapper">
                <button
                  type="button"
                  className="input-button input-button-decrease"
                  onClick={() => setDay(Math.max(1, day - 1))}
                  aria-label="Diminuer le jour"
                >
                  <span className="input-button-icon">−</span>
                </button>
                <input
                  type="number"
                  id="day"
                  min="1"
                  max="31"
                  value={day}
                  onChange={(e) => setDay(Number(e.target.value))}
                  required
                />
                <button
                  type="button"
                  className="input-button input-button-increase"
                  onClick={() => setDay(Math.min(31, day + 1))}
                  aria-label="Augmenter le jour"
                >
                  <span className="input-button-icon">+</span>
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="month">Mois</label>
              <div className="input-wrapper">
                <button
                  type="button"
                  className="input-button input-button-decrease"
                  onClick={() => setMonth(Math.max(1, month - 1))}
                  aria-label="Diminuer le mois"
                >
                  <span className="input-button-icon">−</span>
                </button>
                <input
                  type="number"
                  id="month"
                  min="1"
                  max="12"
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                  required
                />
                <button
                  type="button"
                  className="input-button input-button-increase"
                  onClick={() => setMonth(Math.min(12, month + 1))}
                  aria-label="Augmenter le mois"
                >
                  <span className="input-button-icon">+</span>
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="year">Année</label>
              <div className="input-wrapper">
                <button
                  type="button"
                  className="input-button input-button-decrease"
                  onClick={() => setYear(Math.max(1900, year - 1))}
                  aria-label="Diminuer l'année"
                >
                  <span className="input-button-icon">−</span>
                </button>
                <input
                  type="number"
                  id="year"
                  min="1900"
                  max="2100"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  required
                />
                <button
                  type="button"
                  className="input-button input-button-increase"
                  onClick={() => setYear(Math.min(2100, year + 1))}
                  aria-label="Augmenter l'année"
                >
                  <span className="input-button-icon">+</span>
                </button>
              </div>
            </div>
            <button type="submit" className="calculate-button">
              Calculer
            </button>
          </form>

          <div className="result-container">
            <div className={`arcane-card ${isFlipped ? "flipped" : ""}`}>
              <div className="arcane-label">Arcane de l'année</div>
              <div className="card-flip-container">
                <div className="card-front">
                  <img
                    ref={backImageRef}
                    src={CARD_BACK_PATH}
                    alt="Dos de carte"
                    className="arcane-image card-back-image"
                    style={cardImageHeight ? { height: `${cardImageHeight}px`, width: '100px', minHeight: `${cardImageHeight}px` } : { width: '100px' }}
                  />
                  <div className="arcane-number">?</div>
                  <div className="arcane-name">—</div>
                </div>
                <div className="card-back">
                  {result ? (
                    <>
                      <img
                        src={getArcaneImagePath(result.year.number)}
                        alt={result.year.name}
                        className="arcane-image"
                      />
                      <div className="arcane-number">{result.year.number}</div>
                      <div className="arcane-name">{result.year.name}</div>
                    </>
                  ) : (
                    <>
                      <img
                        src={CARD_BACK_PATH}
                        alt="Dos de carte"
                        className="arcane-image card-back-image"
                        style={cardImageHeight ? { height: `${cardImageHeight}px`, width: '100px' } : { width: '100px' }}
                      />
                      <div className="arcane-number">?</div>
                      <div className="arcane-name">—</div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="arcane-separator">×</div>
            <div className={`arcane-card ${isFlipped ? "flipped" : ""}`}>
              <div className="arcane-label">Arcane personnel</div>
              <div className="card-flip-container">
                <div className="card-front">
                  <img
                    ref={backImageRef}
                    src={CARD_BACK_PATH}
                    alt="Dos de carte"
                    className="arcane-image card-back-image"
                    style={cardImageHeight ? { height: `${cardImageHeight}px`, width: '100px', minHeight: `${cardImageHeight}px` } : { width: '100px' }}
                  />
                  <div className="arcane-number">?</div>
                  <div className="arcane-name">—</div>
                </div>
                <div className="card-back">
                  {result ? (
                    <>
                      <img
                        src={getArcaneImagePath(result.personal.number)}
                        alt={result.personal.name}
                        className="arcane-image"
                      />
                      <div className="arcane-number">{result.personal.number}</div>
                      <div className="arcane-name">{result.personal.name}</div>
                    </>
                  ) : (
                    <>
                      <img
                        src={CARD_BACK_PATH}
                        alt="Dos de carte"
                        className="arcane-image card-back-image"
                        style={cardImageHeight ? { height: `${cardImageHeight}px`, width: '100px' } : { width: '100px' }}
                      />
                      <div className="arcane-number">?</div>
                      <div className="arcane-name">—</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {result && isFlipped && (
            <div className="interpretation-button-container">
              <button
                type="button"
                onClick={handleOpenModal}
                className="interpretation-button"
              >
                Voir l'interprétation
              </button>
            </div>
          )}

          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title="Interprétation DualArcana"
          >
            {enrichedResult && (
              <div className="modal-interpretations">
                <div className="interpretations-grid">
                  <div className="interpretation-column">
                    <ArcanaInterpretation
                      arcane={enrichedResult.year}
                      type="year"
                    />
                  </div>
                  <div className="interpretations-separator"></div>
                  <div className="interpretation-column">
                    <ArcanaInterpretation
                      arcane={enrichedResult.personal}
                      type="personal"
                    />
                  </div>
                </div>
                <FusionInterpretation 
                  fusion={enrichedResult.fusion} 
                  fusionSet={enrichedResult.fusionSet}
                />
              </div>
            )}
          </Modal>
        </section>
      </main>
    </div>
  );
}

export default Home;
