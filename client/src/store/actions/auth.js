import createAction from "./index";
import { LOGIN, LOGOUT } from "../constants";

export const login = {
  request: (userInfo, isRegistering = false) =>
    createAction(LOGIN.request, userInfo, { isRegistering }),
  success: user => createAction(LOGIN.success, user),
  failure: error => createAction(LOGIN.failure, error)
};

export const logout = () => createAction(LOGOUT);

export const sessionRefreshed = user =>
  createAction(LOGIN.success, user, { skipTracking: true });
