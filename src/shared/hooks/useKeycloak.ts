// src/shared/hooks/useKeycloak.ts

import keycloak from "@/lib/keycloak";

export const useKeycloak = () => {
  return {
    keycloak,
    isAuthenticated: keycloak.authenticated,
    token: keycloak.token,
    user: keycloak.tokenParsed as {
      profileImage: any;
      preferred_username?: string;
      sub?: string;
      email?: string;
      name?: string;
      phone_number?: string;
      realm_access?: {
        roles: string[];
      };
    },
    login: () => keycloak.login(),
    logout: () => keycloak.logout(),
  };
};
