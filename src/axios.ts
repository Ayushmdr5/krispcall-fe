import axios from "axios";
import { getAuth } from "firebase/auth";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
});

api.interceptors.request.use(
  async (config) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user && config.headers) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
