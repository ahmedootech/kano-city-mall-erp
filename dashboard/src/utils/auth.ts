import Cookies from "js-cookie";
import { config } from "./config";

export const setAuthToken = (token: string) => {
  Cookies.set(config.authToken, token, { expires: 7 }); // Set token with 7 days expiry
};

export const getAuthToken = () => {
  return Cookies.get(config.authToken); // Retrieve token
};

export const clearAuthToken = () => {
  Cookies.remove(config.authToken); // Remove token
};
