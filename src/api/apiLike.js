import { API_ROUTE } from "@/constants/apiRoute";
import api from "@/lib/axios";

export const getLike = (id, page) => {
  return api.get(`${API_ROUTE.LIKE}/playlistId=${id}&page=${page}`);
};
export const postLike = (payload) => {
  return api.post(API_ROUTE.LIKE, payload);
};
export const editLike = (id, payload) => {
  return api.put(`${API_ROUTE.LIKE}/id=${id}`, payload);
};
export const deleteLike = (id) => {
  return api.delete(`${API_ROUTE.LIKE}/id=${id}`);
};
