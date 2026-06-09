import { API_ROUTE } from "@/constants/apiRoute";
import api from "@/lib/axios";

export const getMusic = (search, page) => {
  return api.get(API_ROUTE.MUSICS, {
    params: {
      search,
      page,
    },
  });
};

export const downloadMusic = (id) => {
  return api.get(`${API_ROUTE.MUSICS}/${id}`);
};

export const streamMusic = (id) => {
  return `${api.defaults.baseURL}${API_ROUTE.STREAMS}/${id}`;
};
