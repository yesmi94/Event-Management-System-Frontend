// src/shared/providers/AuthProvider.tsx

import { useEffect, useState, type ReactNode } from "react";
import keycloak from "@/lib/keycloak";
import Spinner from "../components/spinner";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (keycloak.authenticated !== undefined) {
          setIsAuthenticated(keycloak.authenticated);
          setIsLoading(false);
          return;
        }

        const authenticated = await keycloak.init({
          onLoad: "login-required",
          checkLoginIframe: false,
        });

        setIsAuthenticated(authenticated);
        setIsLoading(false);
      } catch (err) {
        console.error("Keycloak init failed", err);
        setError("Authentication initialization failed");
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (error) {
    return (
      <div>
        <p>Authentication Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Spinner></Spinner>;
  }

  return <>{children}</>;
};
