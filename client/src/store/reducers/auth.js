import { LOGIN, LOGOUT } from "../constants";

export const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN.success:
      return { ...state, isAuthenticated: true, user: payload };

    case LOGOUT:
      return { ...state, isAuthenticated: false, user: {} };

    default:
      return state;
  }
};

export const isAuthenticated = state => state.auth.isAuthenticated;
