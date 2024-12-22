import axios from "axios";
import Cookies from "js-cookie"; // Client-side cookies
import { config } from "@/utils/config";

const v1URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/v1";

export const createClientInstance = () => {
  const token = Cookies.get(config.authToken);

  return axios.create({
    baseURL: v1URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
};

export const getApiClientInstance = () => {
  return createClientInstance();
};
