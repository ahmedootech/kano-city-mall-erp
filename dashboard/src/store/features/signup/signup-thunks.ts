import { createAsyncThunk } from "@reduxjs/toolkit";
import { newUserInterface } from "../signup/types";
import { setAuthToken } from "@/utils/auth";
import { getApiClientInstance } from "@/utils/axios/axios-client";

export const signup = createAsyncThunk<newUserInterface, newUserInterface>(
  "signup/create",
  async (
    userData,
    { rejectWithValue }
  ): Promise<newUserInterface | string | any> => {
    try {
      const api = getApiClientInstance();
      const response = await api.post("/users", userData);
      const { token, user } = response.data.data;
      setAuthToken(token);

      return user as newUserInterface;
    } catch (err: any) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue(err.message || "Signup failed");
    }
  }
);
