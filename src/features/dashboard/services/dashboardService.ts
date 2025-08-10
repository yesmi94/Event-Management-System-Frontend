import api from "@/shared/config/api";

export const getDashboardStats = async () => {
  const res = await api.get("/dashboard");
  return res.data;
};
