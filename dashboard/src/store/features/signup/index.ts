import { combineReducers } from "@reduxjs/toolkit";
import {signupSliceAction, signupReducer } from "./signup-slice"
import * as signupThunk  from "./signup-thunks"


export const signInReducer = combineReducers({
  main: signupReducer,
});

export const signInActions = {
  main: { ...signupSliceAction, ...signupThunk },
};