export const LOAD_APP = "LOAD_APP";
export const APP_READY = "APP_READY";

export const CALL_API = "CALL_API";
export const REMOVE_ERROR = "REMOVE_ERROR";

export const LOGIN = createRequestTypes("LOGIN");
export const LOGOUT = "LOGOUT";

export const FETCH_BGREADINGS = createRequestTypes("FETCH_BGREADINGS");
export const CREATE_BGREADING = createRequestTypes("CREATE_BGREADING");
export const UPDATE_BGREADING = createRequestTypes("UPDATE_BGREADING");
export const DELETE_BGREADING = createRequestTypes("DELETE_BGREADING");

function createRequestTypes(requestName) {
  return {
    base: requestName,
    request: `${requestName}_REQUEST`,
    success: `${requestName}_SUCCESS`,
    failure: `${requestName}_FAILURE`
  };
}
