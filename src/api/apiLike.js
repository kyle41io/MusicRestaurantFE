import { API_ROUTE } from "@/constants/apiRoute";
import api from "@/lib/axios";

export const getLike = (id, page) => {
  return api.get(API_ROUTE.LIKES, {
    params: {
      playlistId: id,
      page,
      sort: "DESC",
    },
  });
};
export const postLike = (payload) => {
  return api.post(API_ROUTE.LIKES, payload);
};
export const deleteLike = (id) => {
  return api.delete(`${API_ROUTE.LIKES}/${id}`);
};
