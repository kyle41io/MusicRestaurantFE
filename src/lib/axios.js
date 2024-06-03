import axios from "axios";

const api = axios.create();

api.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
api.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
api.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default api;
