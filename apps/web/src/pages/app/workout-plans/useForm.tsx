import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { workoutPlanSchema, type WorkoutPlan } from "@/packages/schemas";
import { useProfile, useWorkoutPlan } from "@/store";
import { useNavigate } from "react-router";

export const useWorkoutPlanForm = ({ mode }: { mode: "add" | "edit" }) => {
  const navigate = useNavigate();

  const { workoutPlan, postWorkoutPlan, putWorkoutPlan } = useWorkoutPlan();
  const { profile } = useProfile();

  const form = useForm<WorkoutPlan>({
    resolver: zodResolver(workoutPlanSchema) as never,
    defaultValues: {
      startedAt: null,
      endedAt: null,
      visibility: "PUBLIC",
      createdById: profile?.userId,
    },
    values: mode === "edit" ? workoutPlan! : undefined,
  });

  const onSubmit = async (data: WorkoutPlan) => {
    let res;
    if (mode === "add") {
      res = await postWorkoutPlan(data);
    } else {
      if (!workoutPlan) return;
      res = await putWorkoutPlan(workoutPlan.id!, data);
    }
    if (!res.success) {
      form.setError("root", {
        message:
          res.error?.errors.join(", ") || "Erro ao criar plano de treino",
      });
      return;
    }
    navigate(`/app/workout-plans/${res.data!.id}`);
  };

  return { ...form, onSubmit };
};
