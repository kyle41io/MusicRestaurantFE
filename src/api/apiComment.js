import { API_ROUTE } from "@/constants/apiRoute";
import api from "@/lib/axios";

export const getComment = (id, page) => {
  return api.get(API_ROUTE.COMMENTS, {
    params: {
      playlistId: id,
      page,
      sort: "DESC",
    },
  });
};
export const postComment = (payload) => {
  return api.post(API_ROUTE.COMMENTS, payload);
};
export const editComment = (id, payload) => {
  return api.put(`${API_ROUTE.COMMENTS}/${id}`, payload);
};
export const deleteComment = (id) => {
  return api.delete(`${API_ROUTE.COMMENTS}/${id}`);
};
