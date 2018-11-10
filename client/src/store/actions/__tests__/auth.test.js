import { login } from "../auth";
import createAction from "../index";
import { LOGIN, CALL_API } from "../../constants";

describe("auth action creators", () => {
  const payload = { email: "test" };

  it("should create an action to login", () => {
    expect(login(payload)).toEqual(
      createAction(CALL_API, {
        method: "post",
        endpoint: "/api/auth",
        requestTypes: LOGIN,
        body: payload
      })
    );

    expect(login(payload, true).payload.endpoint).toEqual("/api/auth/register");
  });
});
