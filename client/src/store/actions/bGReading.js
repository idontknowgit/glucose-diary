import createAction from "./index";
import {
  CALL_API,
  FETCH_BGREADINGS,
  CREATE_BGREADING,
  UPDATE_BGREADING,
  DELETE_BGREADING
} from "../constants";
import { createQueryURL } from "modules/api";

export const fetchBGReadings = query =>
  createAction(CALL_API, {
    requestTypes: FETCH_BGREADINGS,
    endpoint: createQueryURL("/api/blood-glucose-readings", query),
    method: "get"
  });

export const createBGReading = reading =>
  createAction(CALL_API, {
    requestTypes: CREATE_BGREADING,
    endpoint: "/api/blood-glucose-readings",
    method: "post",
    body: reading
  });
