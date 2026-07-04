import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Wraps a route so it can only be reached by a logged-in user.
 * Pass adminOnly to additionally restrict it to ADMIN accounts.
 */
function ProtectedRoute({ children, adminOnly = false }) {
  const { auth } = useAuth();

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && auth.role !== "ADMIN") {
    return <Navigate to="/products" replace />;
  }

  return children;
}

export default ProtectedRoute;
