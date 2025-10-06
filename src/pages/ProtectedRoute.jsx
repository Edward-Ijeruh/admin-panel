import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setHasToken(!!token);
    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;

  // To override auth for development (Remember to change it back later)
  if (import.meta.env.MODE === "development") {
    return <Outlet />;
  }

  return hasToken ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
