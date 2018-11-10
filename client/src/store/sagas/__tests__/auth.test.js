import { takeLatest, take, put, call, fork, cancel } from "redux-saga/effects";
import { delay } from "redux-saga";
import { createMockTask } from "redux-saga/utils";

import saga, * as workers from "../auth";
import { setAuthToken, removeAuthToken } from "modules/auth";
import { LOGIN, LOGOUT } from "../../constants";
import { logout, sessionRefreshed } from "../../actions/auth";
import api from "modules/api";

describe("auth sagas", () => {
  describe("refreshSession", () => {
    it("refreshes user session after an hour", () => {
      const worker = workers.refreshSession();
      const response = {
        data: {
          data: { token: "fake" }
        }
      };

      expect(worker.next().value).toEqual(call(delay, 1000 * 60 * 60));
      expect(worker.next().value).toEqual(call(api.get, "/api/auth"));
      expect(worker.next(response).value).toEqual(
        put(sessionRefreshed(response.data.data))
      );
    });
  });

  describe("maintainSession worker", () => {
    it("calls a delayed refreshSession && cancels it if user logs out", () => {
      const action = { payload: { token: "token" } };
      const worker = workers.maintainSession(action);
      const refresh = createMockTask();

      expect(worker.next().value).toEqual(
        fork(setAuthToken, action.payload.token)
      );
      expect(worker.next().value).toEqual(fork(workers.refreshSession));
      expect(worker.next(refresh).value).toEqual(take(LOGOUT));
      expect(worker.next().value).toEqual(cancel(refresh));
      expect(worker.next().value).toEqual(fork(removeAuthToken));
    });
  });

  it("initializes  all the workers", () => {
    const authSaga = saga();

    expect(authSaga.next().value).toEqual(
      takeLatest(LOGIN.success, workers.maintainSession)
    );
  });
});
