import axios from "axios";

const instance = axios.create({
  headers: {
    Accept: "application/json",
    "Content-type": "application/json"
  }
});

instance.interceptors.request.use(config => {
  let token;
  if (window.localStorage) {
    token = window.localStorage.getItem("token");
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;

export const createQueryURL = (endpoint, query = {}) => {
  const keys = Object.keys(query);

  if (keys.length) {
    const esc = encodeURIComponent;
    endpoint += "?";
    endpoint += keys.map(key => esc(key) + "=" + esc(query[key])).join("&");
  }

  return endpoint;
};
