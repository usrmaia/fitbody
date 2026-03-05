import { create } from "zustand";

import { http } from "@/http";
import type {
  Exercise,
  ExerciseBody,
  ExerciseQueryOptions,
  Result,
} from "@/packages/schemas";

type State = {
  exercise: Exercise | null;
  exercises: Exercise[];
};

type Actions = {
  getExercise: (
    exerciseId: string,
    params?: ExerciseQueryOptions,
  ) => Promise<Result<Exercise>>;
  getExercises: (params?: ExerciseQueryOptions) => Promise<Result<Exercise[]>>;
  postExercise: (
    body: ExerciseBody,
    params?: ExerciseQueryOptions,
  ) => Promise<Result<Exercise>>;
  putExercise: (
    exerciseId: string,
    body: ExerciseBody,
    params?: ExerciseQueryOptions,
  ) => Promise<Result<Exercise>>;
  deleteExercise: (
    exerciseId: string,
    params?: ExerciseQueryOptions,
  ) => Promise<Result<Exercise>>;
};

export const useExercise = create<State & Actions>((set, get) => ({
  exercise: null,
  exercises: [],

  getExercise: async (
    exerciseId,
    params = { include: { createdBy: true, exerciseMuscleGroups: true } },
  ) => {
    const res = await http.get(`/api/exercises/${exerciseId}`, { params });
    const { data, success } = res.data as Result<Exercise>;

    if (success) set({ exercise: data });

    return res.data;
  },

  getExercises: async (
    params = {
      include: { createdBy: true, exerciseMuscleGroups: true },
      orderBy: [{ createdBy: { name: "asc" } }, { name: "asc" }],
    },
  ) => {
    const res = await http.get("/api/exercises", { params });
    const { data, success } = res.data as Result<Exercise[]>;

    if (success) set({ exercises: data });

    return res.data;
  },

  postExercise: async (
    body,
    params = { include: { createdBy: true, exerciseMuscleGroups: true } },
  ) => {
    const res = await http.post("/api/exercises", body, { params });
    const { data, success } = res.data as Result<Exercise>;

    if (success)
      set({ exercise: data, exercises: [data!, ...(get().exercises || [])] });

    return res.data;
  },

  putExercise: async (
    exerciseId,
    body,
    params = { include: { createdBy: true, exerciseMuscleGroups: true } },
  ) => {
    const res = await http.patch(`/api/exercises/${exerciseId}`, body, {
      params,
    });
    const { data, success } = res.data as Result<Exercise>;

    if (success)
      set((state) => ({
        exercise: data,
        exercises: state.exercises.map((ex) =>
          ex.id === exerciseId ? data! : ex,
        ),
      }));

    return res.data;
  },

  deleteExercise: async (exerciseId, params) => {
    const res = await http.delete(`/api/exercises/${exerciseId}`, {
      params,
    });
    const { success } = res.data as Result<Exercise>;

    if (success)
      set((state) => ({
        exercise: null,
        exercises: state.exercises.filter((ex) => ex.id !== exerciseId),
      }));

    return res.data;
  },
}));
