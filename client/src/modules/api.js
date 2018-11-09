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

export const apiError = err => {
  let result;

  if (err.response) {
    result = err.response.data.error;
  }

  return result || { message: "Oops, something is broken." };
};
