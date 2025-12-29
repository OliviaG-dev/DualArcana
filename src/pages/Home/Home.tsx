import "./Home.css";
import backgroundImage from "../../assets/background.png";

function Home() {
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

        <section className="section">
          <p className="section-text">
            DualArcana associe l'arcane majeur de l'année en cours à ton arcane
            personnel. En croisant ces deux énergies, elle propose une lecture
            symbolique de ton chemin.
          </p>
          <p className="section-text emphasis">
            Le résultat n'est pas une prédiction, mais une clé de lecture : un
            outil d'introspection, de compréhension et d'alignement.
          </p>
        </section>
      </main>
    </div>
  );
}

export default Home;
