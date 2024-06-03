import { API_ROUTE } from "@/constants/apiRoute";
import api from "@/lib/axios";

export const getComment = (id, page) => {
  return api.get(`${API_ROUTE.COMMENT}/playlistId=${id}&page=${page}`);
};
export const postComment = (payload) => {
  return api.post(API_ROUTE.COMMENT, payload);
};
export const editComment = (id, payload) => {
  return api.put(`${API_ROUTE.COMMENT}/id=${id}`, payload);
};
export const deleteComment = (id) => {
  return api.delete(`${API_ROUTE.COMMENT}/id=${id}`);
};
