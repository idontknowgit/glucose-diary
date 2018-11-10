export const LOAD_APP = "LOAD_APP";
export const APP_READY = "APP_READY";

export const CALL_API = "CALL_API";
export const REMOVE_ERROR = "REMOVE_ERROR";

export const LOGIN = createRequestTypes("LOGIN");
export const LOGOUT = "LOGOUT";

function createRequestTypes(requestName) {
  return {
    request: `${requestName}_REQUEST`,
    success: `${requestName}_SUCCESS`,
    failure: `${requestName}_FAILURE`
  };
}
