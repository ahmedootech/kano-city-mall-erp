import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginCredentials, UserType } from "./types";
import { setAuthToken } from "@/utils/auth";
import { getApiClientInstance } from "@/utils/axios/axios-client";

export const login = createAsyncThunk<UserType, LoginCredentials>(
  "auth/login",
  async (
    credentials,
    { rejectWithValue }
  ): Promise<UserType | string | any> => {
    try {
      const api = getApiClientInstance();
      const response = await api.post("/users/login", credentials);
      const { token, user } = response.data.data;
      setAuthToken(token);

      return user as UserType;
    } catch (err: any) {
      if (err.response && err.response.data) {
        rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message || "Login failed");
      }
    }
  }
);

export const initializeUser = createAsyncThunk<UserType, void>(
  "auth/initialize-user",
  async (_, { rejectWithValue }): Promise<UserType | string | any> => {
    try {
      const response = await getApiClientInstance().get(
        "/users/get-user-by-token"
      );
      console.log(response);
      const { user } = response.data.data;

      return user as UserType;
    } catch (err: any) {
      if (err.response && err.response.data) {
        rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue("Failed to user data");
      }
    }
  }
);
