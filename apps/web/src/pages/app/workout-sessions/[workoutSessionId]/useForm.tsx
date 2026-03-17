import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useWorkoutPlan, useWorkoutSession } from "@/store";
import { workoutSessionSchema, type WorkoutSession } from "@/packages/schemas";
import { formatDateTimeForLocal } from "@/utils";

export type Props = {
  mode: "add" | "edit";
  workoutSessionId?: string;
  workoutDayId?: string;
  userId: string;
  // Only used in "add" mode to pre-fill the form with data from the previous session of the same workout day
  prevWorkoutSession?: WorkoutSession;
};

export const useWorkoutSessionForm = ({
  workoutSessionId,
  workoutDayId,
  userId,
  mode,
  prevWorkoutSession,
}: Props) => {
  const { workoutSession, putWorkoutSession, postWorkoutSession } =
    useWorkoutSession();
  const { workoutDay } = useWorkoutPlan();

  if (mode === "add" && !workoutDay)
    throw new Error("workoutDay is required to create a workout session");

  if (mode === "add" && workoutDay?.id !== workoutDayId)
    throw new Error("workoutDayId does not match the current workout day");

  if (mode === "edit" && workoutSession?.id !== workoutSessionId)
    throw new Error(
      "workoutSessionId does not match the current workout session",
    );

  const form = useForm<WorkoutSession>({
    resolver: zodResolver(workoutSessionSchema) as never,
    defaultValues:
      mode === "add"
        ? ({
            workoutDayId,
            workoutDay,
            userId,
            startedAt: formatDateTimeForLocal(new Date()),
            workoutSets: workoutDay?.workoutDayExercises?.map((wde) => ({
              exerciseId: wde.exerciseId,
              exercise: wde.exercise,
              seq: wde.seq,
            })),
            // Pre-fill the form with data from the previous session of the same workout day, if available
            ...prevWorkoutSession,
          } as WorkoutSession)
        : undefined,
    values: mode === "edit" ? workoutSession! : undefined,
  });

  console.log("form errors", form.formState.errors);

  const onSubmit = form.handleSubmit(async (data: WorkoutSession) => {
    let res;
    if (mode === "edit") res = await putWorkoutSession(workoutSessionId!, data);
    else res = await postWorkoutSession(workoutDayId!, data);

    if (!res.success) {
      form.setError("root", {
        message:
          res.error?.errors.join(", ") || "Erro ao salvar sessão de treino",
      });
      return;
    }
  });

  return {
    ...form,
    onSubmit,
  };
};
