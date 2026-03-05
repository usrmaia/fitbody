import { create } from "zustand";

import { http } from "@/http";
import type {
  WorkoutDay,
  WorkoutPlan,
  Result,
  WorkoutDayQueryOptions,
  WorkoutPlanQueryOptions,
  WorkoutDayExerciseQueryOptions,
} from "@/packages/schemas";

type State = {
  workoutPlan: WorkoutPlan | null;
  workoutPlans: WorkoutPlan[];
  workoutDay: WorkoutDay | null;
};

type Actions = {
  getWorkoutPlan: (
    workoutPlanId: string,
    params?: WorkoutPlanQueryOptions,
  ) => Promise<Result<WorkoutPlan>>;
  getWorkoutPlans: (
    params?: WorkoutPlanQueryOptions,
  ) => Promise<Result<WorkoutPlan[]>>;
  postWorkoutPlan: (
    body: WorkoutPlan,
    params?: WorkoutPlanQueryOptions,
  ) => Promise<Result<WorkoutPlan>>;
  putWorkoutPlan: (
    workoutPlanId: string,
    body: WorkoutPlan,
    params?: WorkoutPlanQueryOptions,
  ) => Promise<Result<WorkoutPlan>>;
  cloneWorkoutPlan: (
    workoutPlanId: string,
    params?: WorkoutPlanQueryOptions,
  ) => Promise<Result<WorkoutPlan>>;
  deleteWorkoutPlan: (
    workoutPlanId: string,
    params?: WorkoutPlanQueryOptions,
  ) => Promise<Result>;

  getWorkoutDay: (
    workoutPlanId: string,
    workoutDayId: string,
    params?: WorkoutDayQueryOptions,
  ) => Promise<Result<WorkoutDay>>;
  postWorkoutDay: (
    workoutPlanId: string,
    body: WorkoutDay,
    params?: WorkoutDayQueryOptions,
  ) => Promise<Result<WorkoutDay>>;
  putWorkoutDay: (
    workoutPlanId: string,
    workoutDayId: string,
    body: WorkoutDay,
    params?: WorkoutDayQueryOptions,
  ) => Promise<Result<WorkoutDay>>;
  deleteWorkoutDay: (
    workoutPlanId: string,
    workoutDayId: string,
    params?: WorkoutDayQueryOptions,
  ) => Promise<Result>;

  deleteWorkoutDayExercises: (
    workoutPlanId: string,
    workoutDayId: string,
    workoutDayExerciseId: string,
    params?: WorkoutDayExerciseQueryOptions,
  ) => Promise<Result>;
};

export const useWorkoutPlan = create<State & Actions>((set) => ({
  workoutPlan: null,
  workoutPlans: [],
  workoutDay: null,

  getWorkoutPlan: async (
    workoutPlanId,
    params = {
      include: {
        workoutDays: {
          include: { workoutDayExercises: { include: { exercise: true } } },
        },
      },
    },
  ) => {
    const res = await http.get(`/api/workout-plans/${workoutPlanId}`, {
      params,
    });
    const { data, success } = res.data as Result<WorkoutPlan>;

    if (success) set({ workoutPlan: data });

    return res.data;
  },

  getWorkoutPlans: async (
    params = {
      include: {
        createdBy: true,
        workoutDays: { include: { workoutDayExercises: true } },
      },
    },
  ) => {
    const res = await http.get("/api/workout-plans", { params });
    const { data, success } = res.data as Result<WorkoutPlan[]>;

    if (success) set({ workoutPlans: data });

    return res.data;
  },

  postWorkoutPlan: async (
    body,
    params = {
      include: {
        createdBy: true,
        workoutDays: { include: { workoutDayExercises: true } },
      },
    },
  ) => {
    const res = await http.post("/api/workout-plans", body, { params });
    const { data, success } = res.data as Result<WorkoutPlan>;

    if (success && data)
      set((state) => ({
        workoutPlan: data,
        workoutPlans: [data, ...(state.workoutPlans || [])],
      }));

    return res.data;
  },

  putWorkoutPlan: async (
    workoutPlanId,
    body,
    params = {
      include: {
        createdBy: true,
        workoutDays: { include: { workoutDayExercises: true } },
      },
    },
  ) => {
    const res = await http.patch(`/api/workout-plans/${workoutPlanId}`, body, {
      params,
    });
    const { data, success } = res.data as Result<WorkoutPlan>;

    if (success && data)
      set((state) => ({
        workoutPlan: data,
        workoutPlans: state.workoutPlans.map((wp) =>
          wp.id === data.id ? data : wp,
        ),
      }));

    return res.data;
  },

  cloneWorkoutPlan: async (
    workoutPlanId,
    params = {
      include: {
        createdBy: true,
        workoutDays: { include: { workoutDayExercises: true } },
      },
    },
  ) => {
    const res = await http.post(`/api/workout-plans/${workoutPlanId}/clone`, {
      params,
    });
    const { data, success } = res.data as Result<WorkoutPlan>;

    if (success && data)
      set((state) => ({
        workoutPlan: data,
        workoutPlans: [data, ...(state.workoutPlans || [])],
      }));

    return res.data;
  },

  deleteWorkoutPlan: async (workoutPlanId, params) => {
    const res = await http.delete(`/api/workout-plans/${workoutPlanId}`, {
      params,
    });
    const { success } = res.data as Result;

    if (success)
      set((state) => ({
        workoutPlan:
          state.workoutPlan?.id === workoutPlanId ? null : state.workoutPlan,
        workoutPlans: state.workoutPlans.filter(
          (wp) => wp.id !== workoutPlanId,
        ),
      }));

    return res.data;
  },

  getWorkoutDay: async (
    workoutPlanId,
    workoutDayId,
    params = {
      include: {
        workoutDayExercises: {
          include: { exercise: { include: { exerciseMuscleGroups: true } } },
        },
      },
    },
  ) => {
    const res = await http.get(
      `/api/workout-plans/${workoutPlanId}/workout-days/${workoutDayId}`,
      { params },
    );
    const { data, success } = res.data as Result<WorkoutDay>;

    if (success) set({ workoutDay: data });

    return res.data;
  },

  postWorkoutDay: async (
    workoutPlanId,
    body,
    params = {
      include: {
        workoutDayExercises: {
          include: { exercise: { include: { exerciseMuscleGroups: true } } },
        },
      },
    },
  ) => {
    const res = await http.post(
      `/api/workout-plans/${workoutPlanId}/workout-days`,
      body,
      { params },
    );
    const { data, success } = res.data as Result<WorkoutDay>;

    if (success && data)
      set((state) => ({
        workoutDay: data,
        workoutPlan: state.workoutPlan
          ? {
              ...state.workoutPlan,
              workoutDays: state.workoutPlan.workoutDays
                ? [...state.workoutPlan.workoutDays, data]
                : [data],
            }
          : null,
      }));

    return res.data;
  },

  putWorkoutDay: async (workoutPlanId, workoutDayId, body, params) => {
    const res = await http.patch(
      `/api/workout-plans/${workoutPlanId}/workout-days/${workoutDayId}`,
      body,
      { params },
    );
    const { data, success } = res.data as Result<WorkoutDay>;

    if (success) set({ workoutDay: data });

    return res.data;
  },

  deleteWorkoutDay: async (workoutPlanId, workoutDayId, params) => {
    const res = await http.delete(
      `/api/workout-plans/${workoutPlanId}/workout-days/${workoutDayId}`,
      { params },
    );
    const { success } = res.data as Result;

    if (success)
      set((state) => ({
        workoutDay:
          state.workoutDay?.id === workoutDayId ? null : state.workoutDay,
        workoutPlan: state.workoutPlan
          ? {
              ...state.workoutPlan,
              workoutDays: state.workoutPlan.workoutDays
                ? state.workoutPlan.workoutDays.filter(
                    (wd) => wd.id !== workoutDayId,
                  )
                : undefined,
            }
          : null,
      }));

    return res.data;
  },

  deleteWorkoutDayExercises: async (
    workoutPlanId,
    workoutDayId,
    workoutDayExerciseId,
    params,
  ) => {
    const res = await http.delete(
      `/api/workout-plans/${workoutPlanId}/workout-days/${workoutDayId}/workout-day-exercises/${workoutDayExerciseId}`,
      { params },
    );
    const { success } = res.data as Result;

    if (success)
      set((state) => ({
        workoutDay: state.workoutDay
          ? {
              ...state.workoutDay,
              workoutDayExercises: state.workoutDay.workoutDayExercises
                ? state.workoutDay.workoutDayExercises.filter(
                    (wde) => wde.id !== workoutDayExerciseId,
                  )
                : undefined,
            }
          : null,
      }));

    return res.data;
  },
}));
