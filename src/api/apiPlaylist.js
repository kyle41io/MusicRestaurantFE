import { API_ROUTE } from "@/constants/apiRoute";
import api from "@/lib/axios";

export const getPlaylist = () => {
  return api.get(API_ROUTE.PLAYPLIST);
};
export const getTopPlaylist = () => {
  return api.get(API_ROUTE.PLAYPLIST + `/top`);
};
export const getNewPlaylist = () => {
  return api.get(API_ROUTE.PLAYPLIST + `/new`);
};
export const createPlaylist = (payload) => {
  return api.post(API_ROUTE.PLAYPLIST, payload);
};
export const editPlaylist = (payload) => {
  return api.put(`${API_ROUTE.PLAYPLIST}/id=${id}`, payload);
};
export const deletePlaylist = (id) => {
  return api.delete(`${API_ROUTE.PLAYPLIST}/id=${id}`);
};
