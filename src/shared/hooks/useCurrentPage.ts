// src/shared/hooks/useCurrentEventPage.ts
import { useLocation } from "react-router-dom";

export const useCurrentEventPage = () => {
  const location = useLocation();
  const path = location.pathname;

  return {
    isUpdatePage: path.includes("/events-update"),
    isDeletePage: path.includes("/events-delete"),
    isBrowsePage: path.includes("/events"),
  };
};
