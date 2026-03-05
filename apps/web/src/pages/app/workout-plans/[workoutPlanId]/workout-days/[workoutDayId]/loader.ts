import { useExercise, useWorkoutPlan } from "@/store";
import type { LoaderFunctionArgs } from "react-router";

export const WorkoutDayIdLoader = async ({
  params: { workoutPlanId, workoutDayId },
}: LoaderFunctionArgs) => {
  if (!workoutPlanId || !workoutDayId) return;

  const { getWorkoutDay } = useWorkoutPlan.getState();
  await getWorkoutDay(workoutPlanId, workoutDayId);

  const { getExercises } = useExercise.getState();
  await getExercises();

  return;
};
