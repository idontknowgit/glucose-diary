import * as actions from "../bGReading";
import createAction from "../index";
import {
  CALL_API,
  FETCH_BGREADINGS,
  CREATE_BGREADING,
  UPDATE_BGREADING,
  DELETE_BGREADING
} from "../../constants";
import { createQueryURL } from "modules/api";

describe("bgReading actions", () => {
  const reading = { _id: "id" };
  it("creates action to fetch bgr's", () => {
    const query = { query1: "q1" };

    expect(actions.fetchBGReadings(query)).toEqual(
      createAction(CALL_API, {
        method: "get",
        endpoint: createQueryURL("/api/blood-glucose-readings", query),
        requestTypes: FETCH_BGREADINGS
      })
    );
  });

  it("creates action to create a bgr", () => {
    expect(actions.createBGReading(reading)).toEqual(
      createAction(CALL_API, {
        method: "post",
        endpoint: "/api/blood-glucose-readings",
        body: reading,
        requestTypes: CREATE_BGREADING
      })
    );
  });
});
