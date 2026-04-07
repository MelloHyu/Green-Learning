# 🌱 GreenLearning — React Project

Converted from plain HTML/CSS/JS to a full React application.

---

## 📁 Project Structure

```
src/
├── context/
│   └── AuthContext.jsx       ← createContext, useContext, useState, useEffect
├── hooks/
│   └── useForm.js            ← Custom hook: useState for form state + validation
├── components/
│   ├── Navbar.jsx            ← Shared component using useAuth + useNavigate
│   ├── Footer.jsx            ← Reusable footer component
│   └── ProtectedRoute.jsx    ← Route guard using useAuth + <Navigate>
├── pages/
│   ├── Home.jsx              ← Static page with <Link> navigation
│   ├── Company.jsx           ← Static page with mapped card data
│   ├── Course.jsx            ← useState + useEffect + useSearchParams
│   ├── Assessment.jsx        ← useState for quiz answers + form submit
│   ├── Feedback.jsx          ← useForm custom hook + form validation
│   ├── Login.jsx             ← useForm + useAuth + useNavigate
│   └── Register.jsx          ← useForm + useAuth
├── App.jsx                   ← BrowserRouter + Routes + AuthProvider
├── index.js                  ← ReactDOM entry point
└── index.css                 ← All styles (ported from style.css)
```

---

## ⚛️ React Concepts Used

### 1. Components
Every page and UI section is a **function component**:
```jsx
export default function Navbar() {
  return <header>...</header>;
}
```
- `Navbar`, `Footer`, `ProtectedRoute` are **shared components** — written once, used everywhere.
- Pages like `Course`, `Assessment` are **page components** — mapped to routes.

---

### 2. Hooks

#### `useState`
Manages local state inside components.

```jsx
// Course.jsx — tracks which sidebar section is active
const [activeSection, setActiveSection] = useState("herbs");

// Assessment.jsx — tracks user's selected quiz answers
const [answers, setAnswers] = useState({});
const [submitted, setSubmitted] = useState(false);
```

#### `useEffect`
Runs side effects — here used to sync URL params with component state.

```jsx
// Course.jsx
useEffect(() => {
  const sectionParam = searchParams.get("section");
  if (sectionParam && sections[sectionParam]) {
    setActiveSection(sectionParam);
  }
}, [searchParams]); // runs whenever searchParams changes
```

#### `useContext`
Reads from a React Context anywhere in the tree.

```jsx
// Any component can call:
const { currentUser, login, logout } = useAuth();
```

---

### 3. Context API (`createContext` + `useContext`)
Replaces the old cookie-check pattern (`checkLogin()` on every page).

```jsx
// AuthContext.jsx
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  // login, logout, register functions...
  return <AuthContext.Provider value={...}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
```
Wrap the entire app in `<AuthProvider>` (in `App.jsx`) so every component can access auth state.

---

### 4. React Router (`react-router-dom`)

Replaces multiple `.html` files with client-side routing.

```jsx
// App.jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/course" element={<ProtectedRoute><Course /></ProtectedRoute>} />
    <Route path="/login" element={<Login />} />
  </Routes>
</BrowserRouter>
```

**Hooks used:**
- `useNavigate()` — programmatic navigation (e.g. redirect after login)
- `useSearchParams()` — reads/writes `?section=herbs` in the URL (replaces `URLSearchParams`)
- `<Link>` — replaces `<a href="">` for in-app navigation (no page reload)
- `<Navigate>` — replaces `window.location.href` for redirects

---

### 5. ProtectedRoute (Route Guard)
Replaces the old `checkLogin()` + `alert()` pattern.

```jsx
// ProtectedRoute.jsx
export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
}
```

---

### 6. Custom Hook — `useForm`
Reusable form logic extracted into a hook (used in Login, Register, Feedback).

```jsx
// hooks/useForm.js
export function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" });

  function handleChange(e) { ... }
  function handleSubmit(onSubmit) { return (e) => { ... }; }

  return { values, errors, message, handleChange, handleSubmit, reset };
}
```

Usage:
```jsx
const { values, errors, message, handleChange, handleSubmit } =
  useForm({ name: "", email: "" }, validate);
```

---

### 7. Controlled Forms
All inputs use **controlled components** — React state owns the input value.

```jsx
<input
  type="email"
  name="email"
  value={values.email}        // controlled by state
  onChange={handleChange}     // updates state on every keystroke
/>
```
This replaces the old `document.getElementById("email").value` approach.

---

### 8. Form Submit Handling
```jsx
<form onSubmit={handleSubmit(onSubmit)}>
  <button type="submit">Login</button>
</form>
```
`e.preventDefault()` is called inside `handleSubmit` — no page refresh.

---

## 🚀 Getting Started

```bash
npm install
npm start
```

App runs at `http://localhost:3000`

---

## 🔑 Auth Flow
1. Register on `/register` → saved to `localStorage`
2. Login on `/login` → sets cookie `loggedUser`
3. `AuthContext` reads cookie on mount → sets `currentUser` state
4. `ProtectedRoute` blocks `/course` and `/assessment` if not logged in
5. Logout clears cookie and resets context state
