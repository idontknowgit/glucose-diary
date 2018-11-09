import { login } from "../auth";
import createAction from "../index";
import { LOGIN } from "../../constants";

describe("auth action creators", () => {
  const payload = { email: "test" };

  it("should create an action to login", () => {
    expect(login.request(payload)).toEqual(
      createAction(LOGIN.request, payload, { isRegistering: false })
    );
  });

  it("should create an action to register", () => {
    expect(login.request(payload, true)).toEqual(
      createAction(LOGIN.request, payload, { isRegistering: true })
    );
  });

  it("should create an action for login success", () => {
    expect(login.success(payload)).toEqual(
      createAction(LOGIN.success, payload)
    );
  });

  it("should create an action for login failure", () => {
    const error = { message: "error" };
    expect(login.failure(error)).toEqual(createAction(LOGIN.failure, error));
  });
});
