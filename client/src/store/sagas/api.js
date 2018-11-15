import { call, put, takeEvery } from "redux-saga/effects";

import { CALL_API } from "../constants";
import createAction from "../actions";
import api from "modules/api";

export default function* apiSaga() {
  yield takeEvery(CALL_API, apiWorker);
}

export function* apiWorker(action) {
  const { requestTypes, method, endpoint, body } = action.payload;
  try {
    yield put(createAction(requestTypes.request));

    const response = yield call(api[method], endpoint, body);

    yield put(createAction(requestTypes.success, response.data.data));
  } catch (err) {
    const error = err.response
      ? err.response.data.error
      : { message: "Oops, something is broken." };
    yield put(createAction(requestTypes.failure, error));
  }
}
