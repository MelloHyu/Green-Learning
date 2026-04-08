import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const sections = [
  {
    key: "herbs",
    label: "Herbs",
    desc: "Small soft-stemmed plants used in cooking & medicine — mint, basil, coriander.",
  },
  {
    key: "shrubs",
    label: "Shrubs",
    desc: "Woody multi-stem plants like rose, hibiscus, and jasmine.",
  },
  {
    key: "creepers",
    label: "Creepers",
    desc: "Ground-hugging plants that spread horizontally — pumpkin, watermelon, grass.",
  },
  {
    key: "climbers",
    label: "Climbers",
    desc: "Plants that grow upward using support — money plant, grapevine, ivy.",
  },
];

const stats = [
  { value: "4", label: "Plant Types" },
  { value: "8+", label: "Video Lessons" },
  { value: "10", label: "Quiz Questions" },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-badge">Interactive Plant Learning</div>
        <h1>Learn Plants the<br />Smart Way</h1>
        <p>Explore herbs, shrubs, creepers & climbers through curated video lessons and hands-on quizzes.</p>
      </section>

      <section className="section">
        <div style={{ display: "flex", gap: "32px", marginBottom: "48px", flexWrap: "wrap" }}>
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", fontWeight: 700, color: "var(--green-dark)", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: 500, marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2>What You Will Learn</h2>
        <div className="cards">
          {sections.map((s) => (
            <Link key={s.key} to={`/course?section=${s.key}`} className="card">
              <h3>{s.label}</h3>
              <p>{s.desc}</p>
              <div style={{ marginTop: "16px", fontSize: "13px", fontWeight: 600, color: "var(--green-soft)", display: "flex", alignItems: "center", gap: "4px" }}>
                Start learning →
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
