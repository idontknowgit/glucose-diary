import { all } from "redux-saga/effects";

import initialLoad from "./initialLoad";
import authSaga from "./auth";

export default function* rootSaga() {
  yield all([initialLoad(), authSaga()]);
}
