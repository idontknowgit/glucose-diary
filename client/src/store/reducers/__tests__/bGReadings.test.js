import reducer from "../bGReadings";
import {
  FETCH_BGREADINGS,
  CREATE_BGREADING,
  UPDATE_BGREADING,
  DELETE_BGREADING
} from "../../constants";
import createAction from "../../actions";
import { arrToHashByKey } from "modules/util";

describe("bGReading reducer", () => {
  let fakeDoc = { _id: "1" };
  it("handles fetch bgreadings success", () => {
    const payload = [fakeDoc];
    const action = createAction(FETCH_BGREADINGS.success, payload);

    expect(reducer(undefined, action)).toEqual(arrToHashByKey(payload));
  });

  it("handles create bgreading success", () => {
    const action = createAction(CREATE_BGREADING.success, fakeDoc);
    const prevState = { _id: "2" };
    expect(reducer(prevState, action)).toEqual({
      ...prevState,
      [fakeDoc._id]: fakeDoc
    });
  });
});
