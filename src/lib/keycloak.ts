import Keycloak, { type KeycloakConfig } from "keycloak-js";

const keycloakConfig: KeycloakConfig = {
  url: "https://web-app-event-management-keycloak.azurewebsites.net",
  realm: "event-management-system",
  clientId: "event-system-backend",
};

const keyCloak = new Keycloak(keycloakConfig);

export default keyCloak;
