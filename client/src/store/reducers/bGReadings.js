import {
  FETCH_BGREADINGS,
  CREATE_BGREADING,
  UPDATE_BGREADING,
  DELETE_BGREADING
} from "../constants";
import { arrToHashByKey } from "modules/util";

export default (state = null, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_BGREADINGS.success:
      return arrToHashByKey(payload);

    case CREATE_BGREADING.success:
      return { ...state, [payload._id]: payload };

    default:
      return state;
  }
};

export const getBGReadings = state => Object.values(state.bGReadings);
