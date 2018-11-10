import { call, put, takeEvery } from "redux-saga/effects";

import saga, * as workers from "../api";
import { CALL_API } from "../../constants";
import createAction from "../../actions";
import api from "modules/api";

describe("api saga", () => {
  describe("apiWorker", () => {
    const action = createAction(CALL_API, {
      method: "post",
      endpoint: "/api",
      body: "fake",
      requestTypes: {
        request: "request",
        success: "success",
        failure: "failure"
      }
    });
    const { payload } = action;

    it("handles successful api call", () => {
      const worker = workers.apiWorker(action);
      const response = { data: { data: "fake-data" } };

      expect(worker.next().value).toEqual(
        put(createAction(payload.requestTypes.request))
      );
      expect(worker.next().value).toEqual(
        call(api[payload.method], payload.endpoint, payload.body)
      );
      expect(worker.next(response).value).toEqual(
        put(createAction(payload.requestTypes.success, response.data.data))
      );
      expect(worker.next().done).toEqual(true);
    });

    it("handles failed api call", () => {
      const worker = workers.apiWorker(action);
      const error = { response: { data: { error: "fake error" } } };

      worker.next();
      expect(worker.throw(error).value).toEqual(
        put(
          createAction(payload.requestTypes.failure, error.response.data.error)
        )
      );
    });
  });
});
