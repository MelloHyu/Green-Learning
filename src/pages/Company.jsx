import Footer from "../components/Footer";

const info = [
  {
    title: "Mission",
    text: "To simplify plant education using interactive learning.",
  },
  { title: "Vision", text: "Make botany accessible to everyone." },
  { title: "Goals", text: "Improve plant identification skills worldwide." },
];

export default function Company() {
  return (
    <>
      <section className="section">
        <h2>About GreenLearning</h2>
        <div className="cards">
          {info.map((item) => (
            <div key={item.title} className="card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
