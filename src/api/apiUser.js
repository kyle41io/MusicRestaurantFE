import { API_ROUTE } from "@/constants/apiRoute";
import api from "@/lib/axios";

export const signUp = (payload) => {
  return api.post(API_ROUTE.USER, payload);
};
