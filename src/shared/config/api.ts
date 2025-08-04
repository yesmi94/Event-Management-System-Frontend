// api/axios.ts
import keycloak from "@/lib/keycloak";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5243/api",
});

api.interceptors.request.use((config) => {
  if (keycloak?.token) {
    config.headers.Authorization = `Bearer ${keycloak.token}`;
  }
  return config;
});

export default api;
