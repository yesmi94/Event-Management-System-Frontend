import api from "@/shared/config/api";

export const getRegistrationsForUser = async () => {
  const res = await api.get("/user/registrations");
  return res.data;
};
