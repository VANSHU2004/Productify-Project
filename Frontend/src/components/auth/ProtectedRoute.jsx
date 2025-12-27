import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/* Central role → dashboard mapping */
const ROLE_DASHBOARD = {
  admin: "/admin",
  vendor: "/vendor",
  user: "/dashboard",
};

export default function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role restricted route
  if (requiredRole && user.role !== requiredRole) {
    return (
      <Navigate
        to={ROLE_DASHBOARD[user.role] || "/dashboard"}
        replace
      />
    );
  }

  return children;
}
