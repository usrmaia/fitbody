import { create } from "zustand";

import { http } from "@/http";
import type {
  Result,
  WorkoutSession,
  WorkoutSessionBody,
  WorkoutSessionQueryOptions,
} from "@/packages/schemas";

type State = {
  workoutSession: WorkoutSession | null;
  workoutSessions: WorkoutSession[];
};

type Actions = {
  getWorkoutSession: (
    workoutSessionId: string,
    params?: WorkoutSessionQueryOptions,
  ) => Promise<Result<WorkoutSession>>;
  getWorkoutSessions: (
    params?: WorkoutSessionQueryOptions,
  ) => Promise<Result<WorkoutSession[]>>;
  postWorkoutSession: (
    workoutDayId: string,
    body: WorkoutSessionBody,
    params?: WorkoutSessionQueryOptions,
  ) => Promise<Result<WorkoutSession>>;
  putWorkoutSession: (
    workoutSessionId: string,
    body: WorkoutSessionBody,
    params?: WorkoutSessionQueryOptions,
  ) => Promise<Result<WorkoutSession>>;
  deleteWorkoutSession: (
    workoutSessionId: string,
    params?: WorkoutSessionQueryOptions,
  ) => Promise<Result<WorkoutSession>>;
};

export const useWorkoutSession = create<State & Actions>((set) => ({
  workoutSession: null,
  workoutSessions: [],

  getWorkoutSession: async (
    workoutSessionId,
    params = defaultWorkoutSessionParams,
  ) => {
    const res = await http.get(`/api/workout-sessions/${workoutSessionId}`, {
      params,
    });
    const { data, success } = res.data as Result<WorkoutSession>;

    if (success) set({ workoutSession: data });

    return res.data;
  },

  getWorkoutSessions: async (params = defaultWorkoutSessionParams) => {
    const res = await http.get("/api/workout-sessions", { params });
    const { data, success } = res.data as Result<WorkoutSession[]>;

    if (success) set({ workoutSessions: data });

    return res.data;
  },

  postWorkoutSession: async (
    workoutDayId,
    body,
    params = defaultWorkoutSessionParams,
  ) => {
    const res = await http.post(`/api/workout-sessions/${workoutDayId}`, body, {
      params,
    });
    const { data, success } = res.data as Result<WorkoutSession>;

    if (success && data)
      set((state) => ({
        workoutSession: data,
        workoutSessions: [data, ...state.workoutSessions],
      }));

    return res.data;
  },

  putWorkoutSession: async (
    workoutSessionId,
    body,
    params = defaultWorkoutSessionParams,
  ) => {
    const res = await http.patch(
      `/api/workout-sessions/${workoutSessionId}`,
      body,
      {
        params,
      },
    );
    const { data, success } = res.data as Result<WorkoutSession>;

    if (success && data)
      set((state) => ({
        workoutSession: data,
        workoutSessions: state.workoutSessions.map((ws) =>
          ws.id === workoutSessionId ? data : ws,
        ),
      }));

    return res.data;
  },

  deleteWorkoutSession: async (
    workoutSessionId,
    params = defaultWorkoutSessionParams,
  ) => {
    const res = await http.delete(`/api/workout-sessions/${workoutSessionId}`, {
      params,
    });
    const { success } = res.data as Result<WorkoutSession>;

    if (success)
      set((state) => ({
        workoutSession: null,
        workoutSessions: state.workoutSessions.filter(
          (ws) => ws.id !== workoutSessionId,
        ),
      }));

    return res.data;
  },
}));

const defaultWorkoutSessionParams = {
  include: {
    workoutDay: true,
    workoutSets: {
      include: {
        exercise: { include: { exerciseMuscleGroups: true } },
      },
    },
  },
};
