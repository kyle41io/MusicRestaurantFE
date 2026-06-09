import axios from "axios";

const api = axios.create();

const getFallbackBaseURL = () => {
  if (typeof window === "undefined") return "http://localhost:3001";
  return window.location.hostname === "localhost"
    ? "http://localhost:3001"
    : "https://music-restaurant-be.vercel.app";
};

api.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL || getFallbackBaseURL();
api.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
api.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default api;
