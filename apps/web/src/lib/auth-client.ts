import { env } from "@/config";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: env.API_URL,
  basePath: "/api/auth",
  // fetchOptions: {
  //   timeout: 30000, // 30 seconds
  //   credentials: "include",
  //   mode: "cors",
  // },
});
