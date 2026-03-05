import { useWorkoutPlan } from "@/store";
import type { LoaderFunctionArgs } from "react-router";

export const WorkoutPlanLoader = async ({
  params: { workoutPlanId },
}: LoaderFunctionArgs) => {
  if (!workoutPlanId) return;

  const { getWorkoutPlan } = useWorkoutPlan.getState();
  await getWorkoutPlan(workoutPlanId);

  return;
};
