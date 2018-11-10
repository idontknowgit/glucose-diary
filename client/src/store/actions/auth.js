import createAction from "./index";
import { CALL_API, LOGIN, LOGOUT } from "../constants";

export const login = (userInfo, isRegistering) => {
  let endpoint = "/api/auth";

  if (isRegistering) {
    endpoint += "/register";
  }

  return createAction(CALL_API, {
    requestTypes: LOGIN,
    method: "post",
    endpoint,
    body: userInfo
  });
};

export const logout = () => createAction(LOGOUT);

export const sessionRefreshed = user =>
  createAction(LOGIN.success, user, { skipTracking: true });
