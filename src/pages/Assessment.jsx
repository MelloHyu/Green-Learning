import { useState } from "react";
import Footer from "../components/Footer";

// Quiz data
const quizData = [
  { question: "Which of these is a creeper?", options: ["Pumpkin", "Rose", "Mango", "Money Plant"], answer: "Pumpkin" },
  { question: "Which plant is a herb?", options: ["Mint", "Mango", "Banyan", "Rose"], answer: "Mint" },
  { question: "Which is a climber?", options: ["Money Plant", "Pumpkin", "Grass", "Mint"], answer: "Money Plant" },
  { question: "Which plant is a shrub?", options: ["Rose", "Mint", "Pumpkin", "Grass"], answer: "Rose" },
  { question: "Which plant spreads along the ground?", options: ["Pumpkin", "Mango", "Neem", "Rose"], answer: "Pumpkin" },
  { question: "Which plant needs support to grow upward?", options: ["Money Plant", "Grass", "Mint", "Banyan"], answer: "Money Plant" },
  { question: "Which is NOT a herb?", options: ["Rose", "Mint", "Coriander", "Spinach"], answer: "Rose" },
  { question: "Which is a large tree?", options: ["Mango", "Mint", "Pumpkin", "Rose"], answer: "Mango" },
  { question: "Which plant has soft stems?", options: ["Herbs", "Trees", "Shrubs", "Climbers"], answer: "Herbs" },
  { question: "Which plant category grows with support?", options: ["Climbers", "Trees", "Herbs", "Shrubs"], answer: "Climbers" },
];

export default function Assessment() {
  // useState to track selected answers: { q0: "Pumpkin", q2: "Mint", ... }
  const [answers, setAnswers] = useState({});
  // useState to hold result after submission
  const [result, setResult] = useState(null);
  // useState to track if quiz was submitted
  const [submitted, setSubmitted] = useState(false);

  function handleOptionChange(questionIndex, value) {
    setAnswers((prev) => ({ ...prev, [`q${questionIndex}`]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    let score = 0;
    quizData.forEach((q, i) => {
      if (answers[`q${i}`] === q.answer) score++;
    });

    setResult(score);
    setSubmitted(true);
  }

  function handleRetry() {
    setAnswers({});
    setResult(null);
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <section className="section">
        <h2>Plant Identification Quiz</h2>

        <form onSubmit={handleSubmit}>
          <div id="quizContainer">
            {quizData.map((q, index) => (
              <div className="quiz-card" key={index}>
                <p className="quiz-question">
                  {index + 1}. {q.question}
                </p>
                <div className="quiz-options-group">
                  {q.options.map((option) => {
                    const isSelected = answers[`q${index}`] === option;
                    const isCorrect = submitted && option === q.answer;
                    const isWrong =
                      submitted && isSelected && option !== q.answer;

                    return (
                      <label
                        key={option}
                        className={`quiz-option ${isCorrect ? "option-correct" : ""} ${isWrong ? "option-wrong" : ""}`}
                      >
                        <input
                          type="radio"
                          name={`q${index}`}
                          value={option}
                          checked={isSelected}
                          onChange={() => handleOptionChange(index, option)}
                          disabled={submitted}
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {!submitted && (
            <button type="submit" className="submit-btn">
              Submit Quiz
            </button>
          )}
        </form>

        {/* Result section — shown after submission */}
        {submitted && result !== null && (
          <div className="result-box">
            <h2>
              Your Score: {result}/{quizData.length}
            </h2>
            <p>
              {result === quizData.length
                ? "🎉 Perfect score!"
                : result >= 7
                ? "✅ Great job!"
                : result >= 5
                ? "👍 Good effort!"
                : "📚 Keep studying!"}
            </p>
            <button onClick={handleRetry} className="retry-btn">
              Retry Quiz
            </button>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
