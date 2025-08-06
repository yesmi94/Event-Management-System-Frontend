import Keycloak, { type KeycloakConfig } from "keycloak-js";

const keycloakConfig: KeycloakConfig = {
  url: "http://localhost:8080",
  realm: "event-management-system",
  clientId: "event-system-backend",
};

const keyCloak = new Keycloak(keycloakConfig);

export default keyCloak;
