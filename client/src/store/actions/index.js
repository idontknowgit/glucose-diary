const createAction = (type, payload, meta) => {
  const action = { type };

  if (typeof payload !== "undefined") {
    action.payload = payload;
  }

  if (typeof meta !== "undefined") {
    action.meta = meta;
  }

  return action;
};

export default createAction;
