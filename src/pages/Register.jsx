import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";

function validate(values) {
  const errors = {};
  if (!values.name || values.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters.";
  }
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!values.email || !values.email.match(emailPattern)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.password || values.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }
  return errors;
}

export default function Register() {
  const { register } = useAuth();

  const { values, errors, message, handleChange, handleSubmit, reset } =
    useForm({ name: "", email: "", password: "" }, validate);

  function onSubmit(values, setMessage) {
    try {
      register({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      setMessage({
        text: "Registration successful! Please login.",
        type: "success",
      });
      reset();
    } catch (err) {
      setMessage({ text: err.message, type: "error" });
    }
  }

  return (
    <section className="section">
      <h2 style={{ textAlign: "center" }}>Course Registration</h2>

      <div className="form-box">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="field-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && <p className="field-error">{errors.name}</p>}
          </div>

          <div className="field-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>

          <div className="field-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="field-error">{errors.password}</p>
            )}
          </div>

          <button type="submit">Register</button>

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

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </section>
  );
}
