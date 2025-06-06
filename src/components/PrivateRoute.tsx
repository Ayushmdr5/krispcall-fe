// PrivateRoute.tsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // If not logged in, redirect to /login, remember the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If logged in, render child routes
  return <Outlet />;
};

export default PrivateRoute;
