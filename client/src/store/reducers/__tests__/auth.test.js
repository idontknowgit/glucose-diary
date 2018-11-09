import reducer, { initialState } from "../auth";
import { LOGIN, LOGOUT } from "../../constants";
import createAction from "../../actions";

describe("auth reducer", () => {
  it("handles login success", () => {
    const action = createAction(LOGIN.success, { _id: "user id" });
    const state = reducer(undefined, action);

    expect(state).toEqual({
      ...initialState,
      user: action.payload,
      isAuthenticated: true
    });
  });

  it("handles logout", () => {
    const action = createAction(LOGOUT);
    const state = reducer(undefined, action);

    expect(state).toEqual({
      ...initialState,
      user: {},
      isAuthenticated: false
    });
  });
});
