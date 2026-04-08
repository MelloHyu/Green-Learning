import { createContext, useContext, useState, useEffect } from "react";


const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}
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


export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const name = getCookie("loggedUser");
    if (name) setCurrentUser(name);
  }, []);

  function register({ name, email, password }) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.email === email)) {
      throw new Error("User already exists. Please login.");
    }
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
  }

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

  function logout() {
    document.cookie =
      "loggedUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    setCurrentUser(null);
  }

  const value = { currentUser, register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
