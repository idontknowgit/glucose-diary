import { takeLatest, take, put, call, fork, cancel } from "redux-saga/effects";
import { delay } from "redux-saga";

import api from "modules/api";
import { setAuthToken, removeAuthToken } from "modules/auth";
import { LOGIN, LOGOUT } from "../constants";
import { logout, sessionRefreshed } from "../actions/auth";

export default function* authSaga() {
  yield takeLatest(LOGIN.success, maintainSession);
}

export function* refreshSession(immediate = false) {
  try {
    if (!immediate) {
      yield call(delay, 1000 * 60 * 60);
    }

    const response = yield call(api.get, "/api/auth");

    yield put(sessionRefreshed(response.data.data));
  } catch (err) {
    yield put(logout());
  }
}

export function* maintainSession(action) {
  yield fork(setAuthToken, action.payload.token);
  const refresh = yield fork(refreshSession);

  yield take(LOGOUT);
  yield cancel(refresh);
  yield fork(removeAuthToken);
}
