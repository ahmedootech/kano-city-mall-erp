import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignupState, newUserInterface } from "../signup/types";
import { signup } from "./signup-thunks";

const initialState: SignupState = {
  newUser: null,
  loading: false,
  error: null,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    clearSignupState: (state) => {
      state.newUser = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<newUserInterface>) => {
        state.loading = false;
        state.newUser = action.payload;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const signupSliceAction = signupSlice.actions;
export const signupReducer = signupSlice.reducer;

