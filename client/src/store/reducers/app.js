import { APP_READY, REMOVE_ERROR } from "../constants";

export const initialState = {
  appReady: false,
  errors: [],
  pendingRequests: {}
};

export default (state = initialState, action) => {
  const { type, payload, meta } = action;

  if (meta && meta.skipTracking) {
    return state;
  }

  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)$/.exec(type);

  if (matches) {
    const [, requestName, requestType] = matches;

    switch (requestType) {
      case "REQUEST":
        return {
          ...state,
          errors: [],
          pendingRequests: { ...state.pendingRequests, [requestName]: true }
        };

      case "SUCCESS":
        return {
          ...state,
          pendingRequests: { ...state.pendingRequests, [requestName]: false }
        };

      case "FAILURE":
        return {
          ...state,
          errors: [...state.errors, payload],
          pendingRequests: { ...state.pendingRequests, [requestName]: false }
        };

      default:
        return state;
    }
  }

  switch (type) {
    case APP_READY:
      return { ...state, appReady: true };

    case REMOVE_ERROR:
      const errors = [...state.errors];
      errors.splice(payload, 1);

      return { ...state, errors };

    default:
      return state;
  }
};

export const createLoadingSelector = (...args) => state => {
  if (!args.length) {
    return Object.values(state.app.pendingRequests).some(v => v);
  }

  return args.some(action => state.app.pendingRequests[action]);
};

export const getErrors = state => state.app.errors;
