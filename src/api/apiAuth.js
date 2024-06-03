import { API_ROUTE } from "@/constants/apiRoute";
import api from "@/lib/axios";

export const signIn = async (payload) => {
  try {
    const response = await api.post(API_ROUTE.AUTH, JSON.stringify(payload));
    return response.data;
  } catch (error) {
    throw error;
  }
};
