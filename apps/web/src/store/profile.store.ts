import { create } from "zustand";

import { http } from "@/http";
import type {
  ProfileBody,
  ProfileQueryOptions,
  ProfileUser,
  Result,
  User,
  UserBody,
} from "@/packages/schemas";

type State = {
  profile: ProfileUser | null;
  profiles: ProfileUser[];
};

type Actions = {
  putUser: (userId: string, body: UserBody) => Promise<Result<User>>;

  getProfile: (
    userId: string,
    params?: ProfileQueryOptions,
  ) => Promise<Result<ProfileUser>>;
  getProfiles: (params?: ProfileQueryOptions) => Promise<Result<ProfileUser[]>>;
  postProfile: (
    userId: string,
    body: ProfileBody,
    params?: ProfileQueryOptions,
  ) => Promise<Result<ProfileUser>>;
  putProfile: (
    userId: string,
    body: ProfileBody,
    params?: ProfileQueryOptions,
  ) => Promise<Result<ProfileUser>>;
};

export const useProfile = create<State & Actions>((set, get) => ({
  profile: null,
  profiles: [],

  putUser: async (userId, body) => {
    const res = await http.patch(`/api/users/${userId}`, body);
    const { data: user, success } = res.data as Result<User>;

    if (success)
      set((state) => ({
        profile: { ...get().profile!, user },
        profiles: state.profiles.map((p) =>
          p.userId === user?.id ? { ...p, user } : p,
        ),
      }));

    return res.data;
  },

  getProfile: async (profileId, params) => {
    const res = await http.get(`/api/users/${profileId}/profiles`, { params });
    const { data: profile, success } = res.data as Result<ProfileUser>;

    if (success) set({ profile });

    return res.data;
  },

  getProfiles: async (params?) => {
    const res = await http.get("/api/users/profiles", { params });
    const { data: profiles, success } = res.data as Result<ProfileUser[]>;

    if (success) set({ profiles });

    return res.data;
  },

  postProfile: async (userId, body, params) => {
    const res = await http.post(`/api/users/${userId}/profiles`, body, {
      params,
    });
    const { data: profile, success } = res.data as Result<ProfileUser>;

    if (success)
      set({ profile, profiles: [profile!, ...(get().profiles || [])] });

    return res.data;
  },

  putProfile: async (userId, body, params) => {
    const res = await http.patch(`/api/users/${userId}/profiles`, body, {
      params,
    });
    const { data: profile, success } = res.data as Result<ProfileUser>;

    if (success)
      set((state) => ({
        profile,
        profiles: state.profiles.map((p) =>
          p.userId === profile?.userId ? profile! : p,
        ),
      }));

    return res.data;
  },
}));
