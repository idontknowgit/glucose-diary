const jwtDecode = require("jwt-decode");

export const setAuthToken = token =>
  window.localStorage.setItem("token", token);

export const removeAuthToken = () => window.localStorage.removeItem("token");

export const getAuthToken = () => {
  try {
    const token = window.localStorage.getItem("token");

    if (token && isTokenValid(token)) {
      return token;
    }

    removeAuthToken();
    return null;
  } catch (err) {
    removeAuthToken();
    return null;
  }
};

export const isTokenValid = token => {
  try {
    const msBuffer = 1000 * 60;
    const decoded = jwtDecode(token);
    const exp = decoded.exp * 1000 - msBuffer;

    if (new Date().getTime() >= exp) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
};
