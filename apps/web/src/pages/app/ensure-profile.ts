import { authClient } from "@/lib/auth-client";
import type { ProfileUser } from "@/packages/schemas";
import { useProfile } from "@/store";

const PROFILE_CACHE_KEY = "fitbody:profile";

const getProfileFromCache = (userId: string): ProfileUser | null => {
  const raw = window.localStorage.getItem(PROFILE_CACHE_KEY);
  if (!raw) return null;

  const parsed = JSON.parse(raw) as ProfileUser;
  if (!parsed?.userId || parsed.userId !== userId) return null;

  return parsed;
};

const saveProfileToCache = (profile: ProfileUser) => {
  if (!profile?.userId) return;

  try {
    window.localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(profile));
  } catch {
    return;
  }
};

export const ensureProfile = async () => {
  const { profile, getProfile } = useProfile.getState();

  if (profile?.userId) {
    if (!getProfileFromCache(profile.userId)) saveProfileToCache(profile);
    return profile;
  }

  const { data: userSession } = await authClient.getSession();

  if (!userSession?.user?.id) return null;

  const cachedProfile = getProfileFromCache(userSession.user.id);
  if (cachedProfile) {
    useProfile.setState({ profile: cachedProfile });
    return cachedProfile;
  }

  const profileResult = await getProfile(userSession.user.id, {
    include: { user: true },
  });

  if (!profileResult.success || !profileResult.data) return null;

  const fetchedProfile = profileResult.data;
  saveProfileToCache(fetchedProfile);

  return fetchedProfile;
};
