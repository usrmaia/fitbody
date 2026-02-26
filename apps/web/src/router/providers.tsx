import { Navigate, Outlet } from "react-router";

import { authClient } from "@/lib/auth-client";
import { LoaderCircle } from "lucide-react";

export const ProtectedRoute = () => {
  const { data, error, isPending } = authClient.useSession();

  if (isPending)
    return (
      <div className="flex h-svh w-full items-center justify-center">
        <LoaderCircle className="text-primary animate-spin" />
      </div>
    );

  if (!data?.session || !data.user) return <Navigate to="/auth/sign-in" />;

  if (error) {
    console.error("Error fetching session:", error);
    return <Navigate to="/auth/sign-in" />;
  }

  return <Outlet />;
};
