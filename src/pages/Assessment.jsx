import { useState } from "react";
import Footer from "../components/Footer";

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

function getResultMeta(score, total) {
  if (score === total) return { emoji: "🎉", msg: "Perfect score! You're a plant expert!" };
  if (score >= 8)       return { emoji: "✅", msg: "Great job! Almost perfect." };
  if (score >= 6)       return { emoji: "👍", msg: "Good effort! Review a few topics." };
  return                       { emoji: "📚", msg: "Keep studying - you'll get there!" };
}

export default function Assessment() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const progressPct = (answeredCount / quizData.length) * 100;

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

  const meta = result !== null ? getResultMeta(result, quizData.length) : null;

  return (
    <>
      <section className="section">
        <div className="quiz-header">
          <h2>Plant Identification Quiz</h2>
          <p>Answer all 10 questions to test your plant knowledge.</p>
        </div>

        {!submitted && (
          <div className="quiz-progress-bar">
            <div className="quiz-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div id="quizContainer">
            {quizData.map((q, index) => (
              <div className="quiz-card" key={index}>
                <p className="quiz-question">
                  <span className="quiz-q-num">Q{index + 1}</span>
                  {q.question}
                </p>
                <div className="quiz-options-group">
                  {q.options.map((option) => {
                    const isSelected = answers[`q${index}`] === option;
                    const isCorrect = submitted && option === q.answer;
                    const isWrong = submitted && isSelected && option !== q.answer;

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
            <button type="submit" className="submit-btn" disabled={answeredCount < quizData.length}>
              {answeredCount < quizData.length
                ? `Answer all questions (${answeredCount}/${quizData.length})`
                : "Submit Quiz"}
            </button>
          )}
        </form>

        {submitted && meta && (
          <div className="result-box">
            <div className="result-emoji">{meta.emoji}</div>
            <h2>Score: {result} / {quizData.length}</h2>
            <p>{meta.msg}</p>
            <button onClick={handleRetry} className="retry-btn">
              Try Again
            </button>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
