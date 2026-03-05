import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import { useWorkoutPlan } from "@/store";
import { workoutDaySchema, type WorkoutDay } from "@/packages/schemas";

type Props = {
  workoutPlanId: string;
  workoutDayId?: string;
  mode: "add" | "edit";
};

export const useWorkoutDayForm = ({
  workoutPlanId,
  workoutDayId,
  mode,
}: Props) => {
  const { workoutPlan, workoutDay, putWorkoutDay, postWorkoutDay } =
    useWorkoutPlan();

  if (workoutPlan?.id !== workoutPlanId)
    throw new Error("workoutPlanId does not match the current workout plan");

  if (
    mode === "edit" &&
    (!workoutDayId || !workoutDay || workoutDay?.id !== workoutDayId)
  )
    throw new Error(
      "workoutDayId does not match the current workout day for editing",
    );

  const nextSeq =
    (workoutPlan?.workoutDays
      ?.map((d) => d.seq)
      .reduce((a, b) => Math.max(a, b), 0) || 0) + 1;

  const form = useForm<WorkoutDay>({
    resolver: zodResolver(workoutDaySchema) as never,
    defaultValues: {
      dayCode: "Dia de treino",
      focus: "BODYBUILDING",
      seq: nextSeq,
      type: "WORKOUT",
      workoutPlanId,
    },
    values: mode === "edit" ? workoutDay! : undefined,
  });

  const onSubmit = async (data: WorkoutDay) => {
    let res;
    if (mode === "edit") {
      if (!workoutDay?.id) {
        form.setError("root", {
          message: "Dia de treino não encontrado para edição.",
        });
        return;
      }

      res = await putWorkoutDay(workoutPlanId, workoutDay.id, data);
    } else {
      if (!workoutPlan) {
        form.setError("root", {
          message: "Plano de treino não encontrado para criação do dia.",
        });
        return;
      }

      res = await postWorkoutDay(workoutPlanId, data);
    }

    if (!res.success) {
      form.setError("root", {
        message: res.error?.errors.join(", ") || "Erro ao salvar dia de treino",
      });
      return;
    }
  };

  const workoutDayExercises = useWatch({
    control: form.control,
    name: "workoutDayExercises",
  });

  const exerciseMuscleGroup = (workoutDayExercises || []).flatMap(
    (wde) => wde.exercise?.exerciseMuscleGroups ?? [],
  );

  return {
    ...form,
    onSubmit,
    exerciseMuscleGroup,
  };
};
