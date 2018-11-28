import { combineReducers } from "redux";
import { routerReducer as router } from "react-router-redux";
import { reducer as form } from "redux-form";

import app from "./app";
import auth from "./auth";
import bGReadings from "./bGReadings";

const rootReducer = combineReducers({
  router,
  app,
  auth,
  form,
  bGReadings
});

export default rootReducer;
