import { ensureProfile } from "./ensure-profile";

export const AppPageLoader = async () => {
  await ensureProfile();

  return null;
};
