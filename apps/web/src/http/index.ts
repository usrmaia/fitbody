import axios from "axios";

import { env } from "@/config";
import type { Result } from "@/packages/schemas";

export const http = axios.create({
  baseURL: env.API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const result: Result = {
      success: false,
      data: null,
      code: 500,
    };

    if (axios.isAxiosError(error)) {
      console.error("HTTP Error:", {
        message: error.message,
        name: error.name,
        config: error.config,
        code: error.code,
        status: error.response?.status,
        responseData: error.response?.data,
      });

      if (
        error.response &&
        error.response.data &&
        typeof error.response.data === "object"
      ) {
        const responseData = error.response?.data;
        result.data = responseData.data || null;
        result.code = responseData.code || error.response.status || 500;
        result.error = responseData.error || { errors: [error.message] };

        console.error("HTTP Error details:", result);
      }
    }

    return Promise.resolve({ ...error, data: result });
  },
);
