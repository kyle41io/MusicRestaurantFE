import { API_ROUTE } from "@/constants/apiRoute";
import api from "@/lib/axios";

export const signIn = async (payload) => {
  try {
    const response = await api.post(API_ROUTE.AUTH, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (payload) => {
  const response = await api.post(API_ROUTE.AUTH_NEW, payload);
  return response.data;
};
