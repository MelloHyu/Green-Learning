import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";

// Validation for login fields
function validate(values) {
  const errors = {};
  if (!values.email) errors.email = "Email is required.";
  if (!values.password) errors.password = "Password is required.";
  return errors;
}

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { values, errors, message, handleChange, handleSubmit, setMessage } =
    useForm({ email: "", password: "" }, validate);

  // Called on successful validation
  function onSubmit(values, setMessage) {
    try {
      login({ email: values.email, password: values.password });
      setMessage({ text: "Login successful! Redirecting...", type: "success" });
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setMessage({ text: err.message, type: "error" });
    }
  }

  return (
    <section className="section">
      <h2 style={{ textAlign: "center" }}>Login</h2>

      <div className="form-box">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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

          <button type="submit">Login</button>

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
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </section>
  );
}
