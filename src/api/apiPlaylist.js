import { API_ROUTE } from "@/constants/apiRoute";
import api from "@/lib/axios";

export const getPlaylist = (id) => {
  return api.get(`${API_ROUTE.PLAYLISTS}/${id}`);
};

export const getUserPlaylists = ({ userId = 0, page = 1, sort = "DESC" }) => {
  return api.get(`${API_ROUTE.USERS}/${userId}/playlists`, {
    params: {
      page,
      sort,
    },
  });
};

export const getTopPlaylist = ({ page = 1, sort = "DESC" } = {}) => {
  return api.get(API_ROUTE.PLAYLISTS, {
    params: {
      page,
      sort,
    },
  });
};

export const getNewPlaylist = ({ page = 1 } = {}) => {
  return getTopPlaylist({ page, sort: "DESC" });
};

export const createPlaylist = (payload) => {
  return api.post(API_ROUTE.PLAYLISTS, payload);
};

export const editPlaylist = (id, payload) => {
  return api.put(`${API_ROUTE.PLAYLISTS}/${id}`, payload);
};

export const deletePlaylist = (id) => {
  return api.delete(`${API_ROUTE.PLAYLISTS}/${id}`);
};
