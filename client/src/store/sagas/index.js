import { all } from "redux-saga/effects";

import initialLoad from "./initialLoad";
import authSaga from "./auth";
import apiSaga from "./api";

export default function* rootSaga() {
  yield all([initialLoad(), apiSaga(), authSaga()]);
}
