import reducer, { initialState, createLoadingSelector } from "../app";
import { APP_READY, REMOVE_ERROR } from "../../constants";

describe("app reducer", () => {
  const TODO = "FETCH_TODOS";

  it("handles APP_READY", () => {
    expect(reducer(undefined, { type: APP_READY })).toEqual({
      ...initialState,
      appReady: true
    });
  });

  it("handles REMOVE_ERROR", () => {
    const action = { type: REMOVE_ERROR, payload: 1 };
    const prevState = {
      ...initialState,
      errors: ["error1", "error2", "error3"]
    };

    expect(reducer(prevState, action)).toEqual({
      ...prevState,
      errors: ["error1", "error3"]
    });
  });

  it("handles request type ie X_REQUEST", () => {
    const action = { type: `${TODO}_REQUEST` };
    const prevState = { ...initialState, errors: ["error1"] };
    expect(reducer(prevState, action)).toEqual({
      ...prevState,
      errors: [],
      pendingRequests: { [TODO]: true }
    });
  });

  it("handles success type ie X_SUCCESS", () => {
    const action = { type: `${TODO}_SUCCESS` };
    const prevState = { ...initialState, pendingRequests: { [TODO]: true } };

    expect(reducer(prevState, action)).toEqual({
      ...prevState,
      pendingRequests: { [TODO]: false }
    });
  });

  it("handles failure type ie X_FAILURE", () => {
    const action = { type: `${TODO}_FAILURE`, payload: "error2" };
    const prevState = {
      ...initialState,
      errors: ["error1"],
      pendingRequests: { [TODO]: true }
    };

    expect(reducer(prevState, action)).toEqual({
      ...prevState,
      errors: [...prevState.errors, action.payload],
      pendingRequests: { [TODO]: false }
    });
  });

  describe("app selectors", () => {
    describe("createLoadingSelector", () => {
      it("selects loading state based on the the arguments provided", () => {
        const state = {
          app: {
            pendingRequests: {
              FIRST_TODO: false,
              SECOND_TODO: true
            }
          }
        };

        expect(createLoadingSelector("FIRST_TODO")(state)).toEqual(false);
        expect(createLoadingSelector("SECOND_TODO")(state)).toEqual(true);
        expect(expect(createLoadingSelector()(state)).toEqual(true));
      });
    });
  });
});
