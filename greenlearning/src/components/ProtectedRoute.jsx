import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wraps protected pages — redirects to login if not authenticated
export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
