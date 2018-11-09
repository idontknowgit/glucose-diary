import { takeLatest, take, put, call, fork, cancel } from "redux-saga/effects";
import { delay } from "redux-saga";
import { createMockTask } from "redux-saga/utils";

import saga, * as workers from "../auth";
import api, { apiError } from "modules/api";
import { setAuthToken, removeAuthToken } from "modules/auth";
import { LOGIN, LOGOUT } from "../../constants";
import { login, logout, sessionRefreshed } from "../../actions/auth";

describe("auth sagas", () => {
  describe("loginWorker", () => {
    it("handles login success", () => {
      const action = login.request({ email: "test" });
      const worker = workers.loginWorker(action);
      const response = {
        data: {
          data: { token: "fake" }
        }
      };

      expect(worker.next().value).toEqual(
        call(api.post, "/api/auth", action.payload)
      );
      expect(worker.next(response).value).toEqual(
        fork(setAuthToken, response.data.data.token)
      );
      expect(worker.next().value).toEqual(
        put(login.success(response.data.data))
      );
    });

    it("updates endpoint if user is registering", () => {
      const action = login.request({ email: "test" }, true);
      const worker = workers.loginWorker(action);

      expect(worker.next().value).toEqual(
        call(api.post, "/api/auth/register", action.payload)
      );
    });

    it("handles login failure", () => {
      const action = login.request({ email: "test" });
      const worker = workers.loginWorker(action);
      const err = {
        response: {
          data: {
            error: {}
          }
        }
      };

      worker.next();
      expect(worker.throw(err).value).toEqual(
        put(login.failure(apiError(err)))
      );
    });
  });

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
        fork(setAuthToken, response.data.data.token)
      );
      expect(worker.next().value).toEqual(
        put(sessionRefreshed(response.data.data))
      );
    });
  });

  describe("maintainAuthSession worker", () => {
    it("calls a delayed refreshSession && cancels it if user logs out", () => {
      const worker = workers.maintainSession();
      const refresh = createMockTask();

      expect(worker.next().value).toEqual(fork(workers.refreshSession));
      expect(worker.next(refresh).value).toEqual(take(LOGOUT));
      expect(worker.next().value).toEqual(fork(removeAuthToken));
      expect(worker.next().value).toEqual(cancel(refresh));
    });
  });

  it("inititializes all the workers", () => {
    const authSaga = saga();

    expect(authSaga.next().value).toEqual(
      takeLatest(LOGIN.request, workers.loginWorker)
    );
    expect(authSaga.next().value).toEqual(
      takeLatest(LOGIN.success, workers.maintainSession)
    );
  });
});
