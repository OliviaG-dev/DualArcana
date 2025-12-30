import { useState } from "react";
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

function Home() {
  const [day, setDay] = useState<number>(1);
  const [month, setMonth] = useState<number>(1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [result, setResult] = useState<ReturnType<typeof getDualArcana> | null>(
    null
  );
  const [enrichedResult, setEnrichedResult] = useState<EnrichedDualArcanaResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const calculated = getDualArcana(day, month, year);
    setResult(calculated);
    const enriched = enrichDualArcanaResult(calculated);
    setEnrichedResult(enriched);
  };

  const handleOpenModal = () => {
    if (enrichedResult) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
              <input
                type="number"
                id="day"
                min="1"
                max="31"
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="month">Mois</label>
              <input
                type="number"
                id="month"
                min="1"
                max="12"
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="year">Année</label>
              <input
                type="number"
                id="year"
                min="1900"
                max="2100"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                required
              />
            </div>
            <button type="submit" className="calculate-button">
              Calculer
            </button>
          </form>

          {result && (
            <>
              <div className="result-container">
                <div className="arcane-card">
                  <div className="arcane-label">Arcane de l'année</div>
                  <img
                    src={getArcaneImagePath(result.year.number)}
                    alt={result.year.name}
                    className="arcane-image"
                  />
                  <div className="arcane-number">{result.year.number}</div>
                  <div className="arcane-name">{result.year.name}</div>
                </div>
                <div className="arcane-separator">×</div>
                <div className="arcane-card">
                  <div className="arcane-label">Arcane personnel</div>
                  <img
                    src={getArcaneImagePath(result.personal.number)}
                    alt={result.personal.name}
                    className="arcane-image"
                  />
                  <div className="arcane-number">{result.personal.number}</div>
                  <div className="arcane-name">{result.personal.name}</div>
                </div>
              </div>
              <div className="interpretation-button-container">
                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="interpretation-button"
                >
                  Voir l'interprétation
                </button>
              </div>
            </>
          )}

          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title="Interprétation DualArcana"
          >
            {enrichedResult && (
              <>
                <ArcanaInterpretation
                  arcane={enrichedResult.year}
                  type="year"
                />
                <ArcanaInterpretation
                  arcane={enrichedResult.personal}
                  type="personal"
                />
                <FusionInterpretation fusion={enrichedResult.fusion} />
              </>
            )}
          </Modal>
        </section>
      </main>
    </div>
  );
}

export default Home;
