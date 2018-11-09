import { takeLatest, take, put, call, fork, cancel } from "redux-saga/effects";
import { delay } from "redux-saga";

import api, { apiError } from "modules/api";
import { setAuthToken, removeAuthToken } from "modules/auth";
import { LOGIN, LOGOUT } from "../constants";
import { login, logout, sessionRefreshed } from "../actions/auth";

export default function* authSaga() {
  yield takeLatest(LOGIN.request, loginWorker);
  yield takeLatest(LOGIN.success, maintainSession);
}

export function* loginWorker(action) {
  try {
    const { payload, meta } = action;
    let endpoint = "/api/auth";

    if (meta.isRegistering) {
      endpoint += "/register";
    }

    const response = yield call(api.post, endpoint, payload);
    const { data } = response.data;

    yield fork(setAuthToken, data.token);
    yield put(login.success(data));
  } catch (err) {
    yield put(login.failure(apiError(err)));
  }
}

export function* refreshSession(immediate = false) {
  try {
    if (!immediate) {
      yield call(delay, 1000 * 60 * 60);
    }

    const response = yield call(api.get, "/api/auth");
    const { data } = response.data;

    yield fork(setAuthToken, data.token);
    yield put(sessionRefreshed(data));
  } catch (err) {
    yield put(logout());
  }
}

export function* maintainSession() {
  const refresh = yield fork(refreshSession);

  yield take(LOGOUT);
  yield fork(removeAuthToken);
  yield cancel(refresh);
}
