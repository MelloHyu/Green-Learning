import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AuthContext = createContext(null);

// Custom hook to consume context
export function useAuth() {
  return useContext(AuthContext);
}

// Helper: get cookie by name
function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

// Provider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // On mount, check if user cookie exists
  useEffect(() => {
    const name = getCookie("loggedUser");
    if (name) setCurrentUser(name);
  }, []);

  // Register: save to localStorage
  function register({ name, email, password }) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.email === email)) {
      throw new Error("User already exists. Please login.");
    }
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
  }

  // Login: verify and set cookie + state
  function login({ email, password }) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) throw new Error("Invalid email or password.");
    document.cookie = `loggedUser=${user.name}; path=/`;
    setCurrentUser(user.name);
    return user.name;
  }

  // Logout: clear cookie + state
  function logout() {
    document.cookie =
      "loggedUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    setCurrentUser(null);
  }

  const value = { currentUser, register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
