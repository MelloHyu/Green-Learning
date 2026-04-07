import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const sections = [
  { key: "herbs", label: "🌿 Herbs" },
  { key: "shrubs", label: "🌳 Shrubs" },
  { key: "creepers", label: "🍃 Creepers" },
  { key: "climbers", label: "🪴 Climbers" },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>Learn Plants the Smart Way</h1>
        <p>Word of the Day: <strong>Photosynthesis</strong></p>
      </section>

      <section className="section">
        <h2>What You Will Learn</h2>
        <div className="cards">
          {sections.map((s) => (
            <Link
              key={s.key}
              to={`/course?section=${s.key}`}
              className="card"
            >
              <h3>{s.label}</h3>
              <p>Explore {s.label.split(" ")[1]} and their characteristics.</p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
