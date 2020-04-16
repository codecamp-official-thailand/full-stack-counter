import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

axios.interceptors.request.use(
  (config) => {
    if (config.url.includes("/login") || config.url.includes("/register")) {
      return config;
    }

    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    throw error;
  }
);

axios.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.request.status === 401) {
      localStorage.removeItem("ACCESS_TOKEN");
      window.location.reload();
    }
  }
);

export default axios;
