import { authClient } from "@/lib/auth-client";
import { useProfile } from "@/store";

export const AppPageLoader = async () => {
  const { data: userSession } = await authClient.getSession();

  if (!userSession?.user?.id) return null;

  const { getProfile } = useProfile.getState();

  await getProfile(userSession.user.id, {
    include: { user: true },
  });

  return null;
};
