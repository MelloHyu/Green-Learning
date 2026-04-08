import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";

const sections = {
  herbs: {
    title: "Herbs",
    emoji: "",
    text: "Herbs are small plants with soft, non-woody stems. They are widely used in cooking, medicine, and aromatherapy. Most herbs are annual or biennial plants that thrive in well-drained soil with plenty of sunlight.",
    examples: ["Mint", "Coriander", "Basil", "Spinach", "Parsley", "Turmeric"],
    videos: [
      { id: "6PQkZjFOaVo", title: "Introduction to Herbs - Types & Uses" },
      { id: "5rkxLNrBGzQ", title: "How to Grow Common Herbs at Home" },
    ],
  },
  shrubs: {
    title: "Shrubs",
    emoji: "🌸",
    text: "Shrubs are medium-sized woody plants with multiple stems rising from the base. They are smaller than trees but larger than herbs, and are commonly found in gardens and natural landscapes. Shrubs can be flowering or non-flowering.",
    examples: ["Rose", "Hibiscus", "Jasmine", "Lavender", "Bougainvillea"],
    videos: [
      { id: "XHQbBGGkjKo", title: "What Are Shrubs? – Plant Classification" },
      { id: "J53yuRzTBp4", title: "Growing Flowering Shrubs – Rose & Hibiscus" },
    ],
  },
  creepers: {
    title: "Creepers",
    emoji: "",
    text: "Creepers are plants that grow along the ground or other surfaces, spreading horizontally with the help of their weak stems. They use tendrils, hooks, or adhesive pads to attach themselves to surfaces. Creepers are commonly found in gardens, forests, and farmlands.",
    examples: ["Pumpkin", "Watermelon", "Strawberry", "Grass", "Clover"],
    videos: [
      { id: "nqNOIeObO0Q", title: "Creepers vs Climbers – Key Differences" },
      { id: "Qm49bpQJjUk", title: "How Creeper Plants Grow – Pumpkin & Gourd" },
    ],
  },
  climbers: {
    title: "Climbers",
    emoji: "",
    text: "Climbers are plants that grow upward using external support such as walls, fences, trellises, or other plants. They use specialized structures like tendrils, aerial roots, or twining stems to attach themselves and climb toward sunlight.",
    examples: ["Money Plant", "Grapevine", "Ivy", "Cucumber", "Passion Fruit"],
    videos: [
      { id: "HzoRGEDSSQc", title: "Climbing Plants – How They Grow & Attach" },
      { id: "6c7SDzv4jNs", title: "Money Plant Care & Growing Guide" },
    ],
  },
};

const sidebarItems = [
  { key: "herbs",    label: "Herbs",    emoji: "" },
  { key: "shrubs",   label: "Shrubs",   emoji: "" },
  { key: "creepers", label: "Creepers", emoji: "" },
  { key: "climbers", label: "Climbers", emoji: "" },
];

export default function Course() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState("herbs");

  useEffect(() => {
    const sectionParam = searchParams.get("section");
    if (sectionParam && sections[sectionParam]) {
      setActiveSection(sectionParam);
    }
  }, [searchParams]);

  function handleSectionClick(key) {
    setActiveSection(key);
    setSearchParams({ section: key });
  }

  const current = sections[activeSection];

  return (
    <>
      <section className="section course-layout">
        <div className="sidebar">
          <div className="sidebar-label">Topics</div>
          {sidebarItems.map((item) => (
            <div
              key={item.key}
              className={`sidebar-item ${activeSection === item.key ? "sidebar-item-active" : ""}`}
              onClick={() => handleSectionClick(item.key)}
            >
              <span>{item.emoji}</span>
              {item.label}
            </div>
          ))}
        </div>

        <div className="content-box">
          <h2>{current.emoji} {current.title}</h2>
          <p>{current.text}</p>

          <div className="content-facts">
            {current.examples.map((ex) => (
              <span key={ex} className="fact-chip">{ex}</span>
            ))}
          </div>

          <div className="video-section-title">📹 Video Lessons</div>

          {current.videos.map((video, i) => (
            <div key={i}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px" }}>
                {video.title}
              </div>
              <div className="video-wrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
