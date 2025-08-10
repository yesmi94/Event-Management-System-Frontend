// api/axios.ts
import keycloak from "@/lib/keycloak";
import axios from "axios";

const api = axios.create({
  baseURL: "https://web-app-event-management-backend.azurewebsites.net/api/",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${keycloak?.token}`
  },
});

api.interceptors.request.use((config) => {
  if (keycloak?.token) {
    config.headers.Authorization = `Bearer ${keycloak.token}`;
  }
  return config;
});

export default api;
