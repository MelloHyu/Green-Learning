import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="header">
      <div className="navbar">
        <Link to="/" className="logo">🌱 GreenLearning</Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/company">Company Profile</Link>
          <Link to="/course">Course Learning</Link>
          <Link to="/assessment">Assessment</Link>
          <Link to="/feedback">Feedback</Link>

          {currentUser ? (
            <>
              <span className="user-greeting">Welcome, {currentUser}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
