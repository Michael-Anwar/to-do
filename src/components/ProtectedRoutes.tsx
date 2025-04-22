import { ReactNode } from "react";
import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { loggedin } = useAuth();

  if (!loggedin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
