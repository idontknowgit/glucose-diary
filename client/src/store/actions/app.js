import createAction from "./index";
import { REMOVE_ERROR, APP_READY, LOAD_APP } from "../constants";

export const removeError = index => createAction(REMOVE_ERROR, index);

export const appReady = () => createAction(APP_READY);
export const loadApp = () => createAction(LOAD_APP);
