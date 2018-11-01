import { all, take, put } from "redux-saga/effects";
import { delay } from "redux-saga";

import { LOAD_APP, APP_READY } from "../constants";

export default function* rootSaga() {
  yield all([initialLoad()]);
}

export function* initialLoad() {
  yield take(LOAD_APP);
  //yield delay(2000);
  yield put({ type: APP_READY });
}
