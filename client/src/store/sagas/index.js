import { all, take, put } from "redux-saga/effects";
import { delay } from "redux-saga";

import { getAuthToken } from "modules/auth";
import authSaga, { refreshSession } from "./auth";
import { LOAD_APP } from "../constants";
import { appReady } from "../actions/app";

export default function* rootSaga() {
  yield all([initialLoad(), authSaga()]);
}

export function* initialLoad() {
  const tasksBeforeLoad = [];

  yield take(LOAD_APP);

  if (getAuthToken()) {
    tasksBeforeLoad.push(refreshSession);
  }

  yield all(tasksBeforeLoad.map(task => task()));
  //yield delay(2000);
  yield put(appReady());
}
