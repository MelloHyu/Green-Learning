import { useForm } from "../hooks/useForm";
import Footer from "../components/Footer";

function validate(values) {
  const errors = {};
  if (!values.name || values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!values.email || !values.email.match(emailPattern)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.feedback || values.feedback.trim().length < 10) {
    errors.feedback = "Feedback must be at least 10 characters.";
  }
  return errors;
}

export default function Feedback() {
  const { values, errors, message, handleChange, handleSubmit, reset } =
    useForm({ name: "", email: "", feedback: "" }, validate);

  function onSubmit(values, setMessage) {
    console.log("Feedback submitted:", values);
    setMessage({ text: "Thank you for your feedback!", type: "success" });
    reset();
  }

  return (
    <>
      <section className="section">
        <h2 style={{ textAlign: "center" }}>We Value Your Feedback</h2>

        <div className="form-box">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="field-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && <p className="field-error">{errors.name}</p>}
            </div>

            <div className="field-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>

            <div className="field-group">
              <textarea
                name="feedback"
                rows="5"
                placeholder="Write your feedback here..."
                value={values.feedback}
                onChange={handleChange}
              />
              {errors.feedback && (
                <p className="field-error">{errors.feedback}</p>
              )}
            </div>

            <button type="submit">Submit Feedback</button>

            {message.text && (
              <p
                className={
                  message.type === "success" ? "msg-success" : "msg-error"
                }
              >
                {message.text}
              </p>
            )}
          </form>

          <p style={{ marginTop: "15px", fontSize: "14px", color: "#555" }}>
            📧 info@greenlearning.com
            <br />
            📞 +1-856-0123
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
