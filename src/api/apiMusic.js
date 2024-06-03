import { API_ROUTE } from "@/constants/apiRoute";
import api from "@/lib/axios";

export const getMusic = (search, page) => {
  return api.get(`${API_ROUTE.MUSIC}?search=${search}&page=${page}`);
};
export const listenMusic = (id) => {
  return api.post(`${API_ROUTE.MUSIC}/id=${id}`);
};
