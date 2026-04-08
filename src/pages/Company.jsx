import Footer from "../components/Footer";

const info = [
  {
    icon: "",
    title: "Mission",
    text: "To simplify plant education through interactive, video-first learning experiences that make botany engaging for everyone.",
  },
  {
    icon: "",
    title: "Vision",
    text: "Make plant identification and botany knowledge accessible to learners of all ages, anywhere in the world.",
  },
  {
    icon: "",
    title: "Goals",
    text: "Help students develop a genuine appreciation for plants and improve their ability to identify and understand the natural world.",
  },
];

export default function Company() {
  return (
    <>
      <section className="section">
        <div style={{ maxWidth: 680, marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, color: "var(--green-dark)", marginBottom: 10, fontWeight: 700 }}>
            About GreenLearning
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 16, lineHeight: 1.7 }}>
            GreenLearning is a modern botanical education platform combining curated video lessons, 
            interactive quizzes, and structured content to make plant science approachable and enjoyable.
          </p>
        </div>
        <div className="cards">
          {info.map((item) => (
            <div key={item.title} className="card">
              <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
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
