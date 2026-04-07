import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";

// Course data
const sections = {
  herbs: {
    title: "Herbs",
    text: "Herbs are small plants with soft stems. They are typically used in cooking and medicine. Examples include Mint, Coriander, Basil, and Spinach.",
    videos: [
      "https://www.youtube.com/embed/2ZK6A3J6c4U",
      "https://www.youtube.com/embed/D2Y_eEaxrYo",
    ],
  },
  shrubs: {
    title: "Shrubs",
    text: "Shrubs are medium-sized woody plants. They are smaller than trees but larger than herbs, with multiple stems rising from the base. Examples: Rose, Hibiscus, Jasmine.",
    videos: ["https://www.youtube.com/embed/3YpQz8Q1A7I"],
  },
  creepers: {
    title: "Creepers",
    text: "Creepers are plants that grow along the ground or other surfaces. They spread horizontally and are usually found in gardens and forests. Examples: Pumpkin, Watermelon, Grass.",
    videos: ["https://www.youtube.com/embed/GV8gF9bYlHY"],
  },
  climbers: {
    title: "Climbers",
    text: "Climbers are plants that grow upward using external support such as walls, fences, or other plants. Examples: Money Plant, Grapevine, Ivy.",
    videos: ["https://www.youtube.com/embed/Qq3Pdc8bY0k"],
  },
};

const sidebarItems = [
  { key: "herbs", label: "🌿 Herbs" },
  { key: "shrubs", label: "🌳 Shrubs" },
  { key: "creepers", label: "🍃 Creepers" },
  { key: "climbers", label: "🪴 Climbers" },
];

export default function Course() {
  // useSearchParams hook — reads ?section=herbs from URL
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState("herbs");

  // Sync active section with URL param on mount and when URL changes
  useEffect(() => {
    const sectionParam = searchParams.get("section");
    if (sectionParam && sections[sectionParam]) {
      setActiveSection(sectionParam);
    }
  }, [searchParams]);

  function handleSectionClick(key) {
    setActiveSection(key);
    setSearchParams({ section: key }); // updates URL without page reload
  }

  const current = sections[activeSection];

  return (
    <>
      <section className="section course-layout">
        {/* Sidebar — demonstrates component-driven navigation */}
        <div className="sidebar">
          {sidebarItems.map((item) => (
            <p
              key={item.key}
              className={`sidebar-item ${activeSection === item.key ? "sidebar-item-active" : ""}`}
              onClick={() => handleSectionClick(item.key)}
            >
              {item.label}
            </p>
          ))}
        </div>

        {/* Dynamic content box — re-renders when activeSection changes */}
        <div className="content-box">
          <h2>{current.title}</h2>
          <p>{current.text}</p>

          {current.videos.map((src, i) => (
            <div className="video-wrapper" key={i}>
              <iframe
                src={src}
                title={`${current.title} video ${i + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
