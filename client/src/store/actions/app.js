import { REMOVE_ERROR } from "../constants";

export const removeError = index => ({ type: REMOVE_ERROR, payload: index });
