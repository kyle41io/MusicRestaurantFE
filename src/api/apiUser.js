import { API_ROUTE } from "@/constants/apiRoute";
import api from "@/lib/axios";

export const getUser = (id) => {
  return api.get(`${API_ROUTE.USERS}/${id}`);
};

export const getUsers = () => {
  return api.get(`${API_ROUTE.USERS}/all`);
};
