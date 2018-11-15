import { all, put, take } from "redux-saga/effects";

import { refreshSession } from "./auth";
import { LOAD_APP } from "../constants";
import { appReady } from "../actions/app";
import { getAuthToken } from "modules/auth";

export default function* initialLoad() {
  const tasksBeforeLoad = [];

  yield take(LOAD_APP);

  if (getAuthToken()) {
    const refreshAuthSession = refreshSession.bind(null, true);
    tasksBeforeLoad.push(refreshAuthSession);
  }

  yield all(tasksBeforeLoad.map(task => task()));
  //yield delay(2000);
  yield put(appReady());
}
