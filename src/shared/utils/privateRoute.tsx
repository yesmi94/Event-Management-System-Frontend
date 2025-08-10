import { useKeycloak } from "@/shared/hooks/useKeycloak";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { keycloak, isAuthenticated } = useKeycloak();

  if (!isAuthenticated) return null;
  if (!keycloak.authenticated) {
    keycloak.login();
    return null;
  }

  return keycloak?.authenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
